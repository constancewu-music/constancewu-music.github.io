/* Hamburger menu, scroll-aware topbar, copy-to-clipboard email, gallery lightbox */
(function () {
  'use strict';

  var hamburger = document.querySelector('.topbar__hamburger');
  var overlay   = document.querySelector('.overlay-menu');
  var topbar    = document.querySelector('.topbar');
  var hero      = document.querySelector('.hero');

  /* ── Hamburger ── */
  function toggleMenu() {
    var open = hamburger.classList.toggle('is-active');
    overlay.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target.closest('.overlay-menu__link')) toggleMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) toggleMenu();
  });

  /* ── Scroll-aware topbar ── */
  function onScroll() {
    var threshold = hero ? hero.offsetHeight - 80 : 60;
    topbar.classList.toggle('topbar--scrolled', window.scrollY > threshold);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Copy-to-clipboard email ── */
  document.querySelectorAll('[data-copy-email]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var email = this.getAttribute('data-copy-email');
      navigator.clipboard.writeText(email).then(function () {
        var toast = document.getElementById('copy-toast');
        if (!toast) return;
        toast.classList.add('is-visible');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(function () {
          toast.classList.remove('is-visible');
        }, 2000);
      });
    });
  });

  /* ── Gallery lightbox ── */
  var lightbox    = document.querySelector('.lightbox');
  var lightboxImg = document.querySelector('.lightbox__img');

  if (lightbox) {
    document.querySelectorAll('.gallery-masonry img').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target !== lightboxImg) {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }
})();
