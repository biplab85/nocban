// footer.js — footer link columns behave as accordions on mobile only.
// On desktop the <details> panels are forced open and made non-interactive,
// so the footer looks and behaves exactly as before.

export function initFooterAccordion() {
  const cols = document.querySelectorAll('.footer__col');
  if (!cols.length) return;

  const mq = window.matchMedia('(min-width: 768px)');

  const sync = () => {
    const desktop = mq.matches;
    cols.forEach((d) => {
      // Desktop: always open (static). Mobile: start collapsed (accordion).
      d.open = desktop;
    });
  };

  sync();
  mq.addEventListener('change', sync);
}
