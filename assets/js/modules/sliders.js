// sliders.js — all Swiper instances (guarded: only init if element exists)

export function initSliders() {
  if (typeof Swiper === 'undefined') return;

  // Hero
  if (document.querySelector('.hero .swiper')) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGsap = typeof gsap !== 'undefined';

    // Split into grapheme clusters so Bengali (and any language) types cleanly
    const graphemes = (str) => {
      try {
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
          return [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(str)].map((s) => s.segment);
        }
      } catch (e) { /* fall through */ }
      return Array.from(str);
    };

    const typeText = (title, full) => {
      const chars = graphemes(full);
      let i = 0;
      clearInterval(title._tw);
      title.classList.add('is-typing');
      title._tw = setInterval(() => {
        title.textContent = chars.slice(0, ++i).join('');
        if (i >= chars.length) {
          clearInterval(title._tw);
          title.classList.remove('is-typing');
          title.style.minHeight = '';
        }
      }, 42);
    };

    // Reveal the active slide's text from a hidden state — identical for every
    // slide/language, fired the instant the slide becomes active (no flash).
    const revealSlide = (swiper) => {
      const slide = swiper.slides[swiper.activeIndex];
      if (!slide) return;
      const eyebrow = slide.querySelector('.hero__eyebrow');
      const title = slide.querySelector('.hero__title');
      const actions = slide.querySelector('.hero__actions');
      if (!title) return;

      const full = title.dataset.text || title.textContent.trim();
      title.dataset.text = full;
      const els = [eyebrow, title, actions].filter(Boolean);

      // No-animation fallback: just show everything
      if (reduce || !hasGsap) {
        clearInterval(title._tw);
        title.textContent = full;
        els.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
        return;
      }

      // reserve the title's height so the buttons don't jump while it types
      title.textContent = full;
      title.style.minHeight = title.offsetHeight + 'px';
      title.textContent = '';

      gsap.killTweensOf(els);
      clearInterval(title._tw);
      gsap.set(els, { opacity: 0, y: 24 });

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.5 })
        .to(title, { opacity: 1, y: 0, duration: 0.5, onStart: () => typeText(title, full) }, '-=0.25')
        .to(actions, { opacity: 1, y: 0, duration: 0.5 }, '-=0.1');
    };

    new Swiper('.hero .swiper', {
      loop: true,
      speed: 900,
      autoplay: { delay: 6000, disableOnInteraction: false },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      pagination: { el: '.hero__pagination', clickable: true },
      on: {
        init: (sw) => revealSlide(sw),
        slideChangeTransitionStart: (sw) => revealSlide(sw),
      },
    });
  }

  // News
  if (document.querySelector('.news .swiper')) {
    new Swiper('.news .swiper', {
      slidesPerView: 1.1,
      spaceBetween: 16,
      grabCursor: true,
      navigation: { nextEl: '.news .slider-nav__next', prevEl: '.news .slider-nav__prev' },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      },
    });
  }

  // Social
  if (document.querySelector('.social .swiper')) {
    new Swiper('.social .swiper', {
      slidesPerView: 1.3,
      spaceBetween: 16,
      grabCursor: true,
      breakpoints: {
        480: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 24 },
      },
    });
  }
}
