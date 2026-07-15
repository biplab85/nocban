// forms.js — newsletter & simple validation

import { qsa } from './utils.js';

export function initForms() {
  qsa('[data-subscribe]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const field = form.closest('.field') || form;
      const valid = input && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value.trim());
      const note = form.parentElement.querySelector('[data-subscribe-note]');
      if (!valid) {
        field.classList.add('field--error');
        if (note) note.textContent = 'Please enter a valid email address.';
        input?.focus();
        return;
      }
      field.classList.remove('field--error');
      if (note) note.textContent = 'Thank you — you are subscribed to Team Bangladesh updates.';
      form.reset();
    });
  });
}
