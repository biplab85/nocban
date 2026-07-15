// newsstrip.js — play/pause control for the Latest News ticker (claude.md §5.14)

export function initNewsStrip() {
  document.querySelectorAll('.news-strip').forEach((strip) => {
    const btn = strip.querySelector('.news-strip__toggle');
    const track = strip.querySelector('.news-strip__track');
    if (!btn || !track) return;

    btn.addEventListener('click', () => {
      const paused = strip.classList.toggle('is-paused');
      btn.setAttribute('aria-pressed', String(paused));
      btn.setAttribute('aria-label', paused ? 'Play news ticker' : 'Pause news ticker');
    });
  });
}
