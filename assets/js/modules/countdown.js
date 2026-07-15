// countdown.js — live countdown timers for Upcoming Events.
// Target dates come from nocban.org (game_start_from), set via data-countdown="ISO".

import { qsa } from './utils.js';

export function initCountdowns() {
  const timers = qsa('[data-countdown]');
  if (!timers.length) return;

  const pad = (n) => String(n).padStart(2, '0');

  const render = () => {
    const now = Date.now();
    timers.forEach((el) => {
      const target = new Date(el.dataset.countdown).getTime();
      if (Number.isNaN(target)) return;
      let diff = Math.floor((target - now) / 1000);

      const set = (key, val) => {
        const node = el.querySelector(`[data-cd="${key}"]`);
        if (node) node.textContent = pad(val);
      };

      if (diff <= 0) {
        el.classList.add('is-ended');
        set('days', 0); set('hours', 0); set('mins', 0); set('secs', 0);
        return;
      }
      const days = Math.floor(diff / 86400); diff %= 86400;
      const hours = Math.floor(diff / 3600); diff %= 3600;
      const mins = Math.floor(diff / 60);
      const secs = diff % 60;
      set('days', days); set('hours', hours); set('mins', mins); set('secs', secs);
    });
  };

  render();
  setInterval(render, 1000);
}
