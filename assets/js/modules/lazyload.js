// lazyload.js — native lazy loading fallback + fade-in on load

import { qsa } from './utils.js';

export function initLazyLoad() {
  qsa('img[loading="lazy"]').forEach((img) => {
    if (img.complete) {
      img.classList.add('is-loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
    }
  });
}
