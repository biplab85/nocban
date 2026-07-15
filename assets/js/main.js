// main.js — entry point. Inits all modules once the DOM is ready.

import { initNavigation } from './modules/navigation.js?v=40';
import { initSliders } from './modules/sliders.js?v=40';
import { initLightbox } from './modules/lightbox.js?v=40';
import { initAnimations } from './modules/animations.js?v=40';
import { initForms } from './modules/forms.js?v=40';
import { initLazyLoad } from './modules/lazyload.js?v=40';
import { initCountdowns } from './modules/countdown.js?v=40';
import { initMasonry } from './modules/masonry.js?v=40';
import { initFooterAccordion } from './modules/footer.js?v=57';
import { initNewsStrip } from './modules/newsstrip.js?v=59';

// Signal JS is active (used by reveal styles to avoid FOUC when JS is off)
document.documentElement.classList.add('js');

function boot() {
  initNavigation();
  initSliders();
  initLightbox();
  initForms();
  initLazyLoad();
  initCountdowns();
  initMasonry();
  initAnimations();
  initFooterAccordion();
  initNewsStrip();

  // Current year in footer
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
