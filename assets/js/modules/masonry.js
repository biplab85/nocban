// masonry.js — Featured Moments gallery (Masonry + imagesLoaded)
// https://masonry.desandro.com/

export function initMasonry() {
  const grid = document.querySelector('[data-masonry]');
  if (!grid) return;
  if (typeof Masonry === 'undefined') { grid.classList.add('is-ready'); return; } // graceful fallback

  const build = () =>
    new Masonry(grid, {
      itemSelector: '.gallery__item',
      columnWidth: '.gallery__sizer',
      gutter: '.gallery__gutter',
      percentPosition: true,
      transitionDuration: '0.3s',
    });

  // Lay out only once images have measured (prevents overlap).
  if (typeof imagesLoaded === 'function') {
    imagesLoaded(grid, () => {
      grid.classList.add('is-ready');
      build();
    });
  } else {
    grid.classList.add('is-ready');
    const m = build();
    window.addEventListener('load', () => m.layout());
  }
}
