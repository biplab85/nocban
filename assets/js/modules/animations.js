// animations.js — GSAP micro-interactions + ScrollTrigger reveals (claude.md §6)

import { prefersReducedMotion, qsa } from './utils.js';

export function initAnimations() {
  if (prefersReducedMotion()) return;
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  // --- Section reveals (staggered children) ---
  qsa('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll('[data-reveal]');
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 82%', once: true },
    });
  });

  // --- Standalone reveals ---
  qsa('[data-reveal]:not([data-reveal-group] [data-reveal])').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  // --- Hero entrance is handled per-slide in sliders.js (reveal + typewriter) ---

  // --- Counters ---
  qsa('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => {
        el.textContent = Math.round(obj.val).toLocaleString();
      },
    });
  });
}
