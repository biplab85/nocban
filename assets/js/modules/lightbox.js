// lightbox.js — Fancybox for gallery & video (claude.md §5.8)

export function initLightbox() {
  if (typeof Fancybox === 'undefined') return;
  Fancybox.bind('[data-fancybox]', {
    Toolbar: {
      display: { left: ['infobar'], middle: [], right: ['slideshow', 'thumbs', 'close'] },
    },
    Thumbs: { type: 'classic' },
  });
}
