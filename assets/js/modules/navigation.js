// navigation.js — sticky header, scroll behavior, mobile drawer

import { qs, qsa } from './utils.js';

export function initNavigation() {
  const header = qs('.header');
  const hamburger = qs('.hamburger');
  const drawer = qs('.drawer');
  const body = document.body;
  if (!header) return;

  // --- Sticky / scrolled state + hide-on-scroll-down ---
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 20);
    lastY = y;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Mobile drawer ---
  const setDrawer = (open) => {
    if (!drawer) return;
    drawer.classList.toggle('is-open', open);
    hamburger?.classList.toggle('is-active', open);
    header.classList.toggle('is-open', open);
    hamburger?.setAttribute('aria-expanded', String(open));
    body.classList.toggle('no-scroll', open);
  };

  hamburger?.addEventListener('click', () =>
    setDrawer(!drawer.classList.contains('is-open'))
  );

  // Bottom app-bar "Menu" opens the full drawer
  qs('.appbar__menu')?.addEventListener('click', () => setDrawer(true));
  qs('.drawer__backdrop', drawer || document)?.addEventListener('click', () => setDrawer(false));

  // Close the drawer only when an actual navigation link is tapped (not a submenu toggle)
  qsa('a.drawer-nav__link, .drawer-nav__sublink', drawer || document).forEach((a) =>
    a.addEventListener('click', () => setDrawer(false))
  );

  // Mobile accordion submenus
  qsa('.drawer-nav__toggle', drawer || document).forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.drawer-nav__group');
      const open = group.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // Desktop dropdowns: click support (in addition to hover/focus-within)
  qsa('.nav__toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = btn.closest('.nav__item');
      const open = item.classList.toggle('is-menu-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setDrawer(false);
  });

  // --- Active link on scroll (scrollspy) — desktop nav + bottom app bar ---
  const links = qsa('[data-nav], [data-appnav]');
  const sections = links
    .map((l) => qs(l.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          links.forEach((l) =>
            l.classList.toggle('is-active', l.getAttribute('href') === id)
          );
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
  }
}
