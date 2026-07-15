# claude.md — NOCBAN Website Redesign

> **Design & Architecture Blueprint** for the Bangladesh Olympic Association (NOCBAN) website redesign.
> This is the single source of truth. Read this before writing any code. Do not begin implementation until this document is approved.

---

## 1. Project Overview

### 1.1 What This Is
A complete visual and UX redesign of the official **Bangladesh Olympic Association** website (current: https://nocban.org/). We are **not** rewriting content — we are re-presenting the existing content (news, events, athletes, activities, gallery, sponsors, federations, downloads, contact) inside a premium, modern, athlete-centric, mobile-first experience.

### 1.2 Organization Context
- **Entity:** Bangladesh Olympic Association (BOA / NOCBAN), IOC code **BAN**.
- **Established:** 1979, following IOC recognition.
- **HQ:** Olympic Bhaban, Rajuk Avenue, Outer Stadium, Purana Paltan, Dhaka 1000, Bangladesh.
- **Mandate:** National Olympic Committee; also responsible for Bangladesh's Commonwealth Games representation.
- **Emotional core:** The pride, excellence, and energy of Team Bangladesh.

### 1.3 Project Goals
1. Transform a traditional information portal into a **world-class Olympic digital experience**.
2. Feel premium, clean, modern, fast, and emotionally engaging.
3. **Mobile-first** — the mobile experience is the #1 priority and should feel like a native app.
4. Preserve **100% of existing content**.
5. Be maintainable, scalable, and performant (excellent Core Web Vitals).

### 1.4 Design Philosophy
- **Story over data dump.** Every page guides the visitor through a narrative, not a wall of information.
- **Athlete-centric.** People and achievements are the heroes — large imagery, human faces, motion.
- **Bright & spacious.** Generous whitespace, a light theme only, soft shadows, rounded corners.
- **Olympic-inspired restraint.** Premium and elegant, never loud or cluttered. Motion enhances; it never distracts.
- **Bangladesh identity.** National green + red woven in with an Olympic gold accent — proud, not gaudy.

### 1.5 Development Approach
- **Mobile-first** CSS: base styles target mobile; `min-width` media queries scale up.
- **SCSS only**, compiled via Node.js to a single minified production CSS file.
- **Modular vanilla JavaScript** (ES modules). Libraries limited to **GSAP**, **Swiper.js**, **Fancybox**.
- **Progressive enhancement**: content and core layout work without JS; animations are additive.
- **Component-driven**: reusable partials and BEM-style class naming.

---

## 2. Typography

- **Primary (Display / Headings):** `"Archivo Expanded"` — the wide/expanded width axis of the Archivo superfamily. Confident, athletic, institutional; reads like Olympic wordmarks and stadium signage. Used for the hero, section titles, big numerals, and medal tallies.
  - Fallback stack: `"Archivo Expanded", "Archivo", "Segoe UI", system-ui, sans-serif`.
- **Secondary (Body / UI):** `"Archivo"` — the normal-width sibling. Highly legible for body copy, meta, and UI. Sharing one superfamily across two width axes keeps the system cohesive and intentional (deliberately avoiding generic Inter/Roboto defaults).
  - Fallback stack: `"Archivo", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- **Numeric/Accent:** `"Archivo Expanded"` for counters, results, and medal tallies (tabular numerals).

> Loaded via Google Fonts `<link>` in dev; self-host WOFF2 in `assets/fonts/` for production. `font-display: swap`.

> Fonts are self-hosted in `assets/fonts/` (WOFF2, `font-display: swap`) for performance and privacy. No external font CDN in production.

### 2.2 Type Scale (fluid, mobile-first)
Uses `clamp()` so type scales smoothly between mobile and large desktop.

| Token        | Role                     | clamp(min → max)                         | Weight | Line-height |
|--------------|--------------------------|------------------------------------------|--------|-------------|
| `display`    | Hero headline            | `clamp(2.5rem, 6vw, 5rem)` (40→80px)     | 700    | 1.05        |
| `h1`         | Page title               | `clamp(2rem, 4.5vw, 3.5rem)` (32→56px)   | 700    | 1.1         |
| `h2`         | Section title            | `clamp(1.6rem, 3.5vw, 2.5rem)` (26→40px) | 600    | 1.15        |
| `h3`         | Card / block title       | `clamp(1.25rem, 2.5vw, 1.75rem)` (20→28px)| 600   | 1.2         |
| `h4`         | Sub-block                | `clamp(1.1rem, 2vw, 1.375rem)` (18→22px) | 600    | 1.3         |
| `body-lg`    | Lead paragraph           | `1.125rem` (18px)                        | 400    | 1.7         |
| `body`       | Default body             | `1rem` (16px)                            | 400    | 1.65        |
| `body-sm`    | Secondary text           | `0.875rem` (14px)                        | 400    | 1.6         |
| `caption`    | Meta, labels, eyebrows   | `0.75rem` (12px)                         | 500    | 1.5         |
| `overline`   | Eyebrow labels (uppercase, letter-spacing 0.08em) | `0.75rem` (12px) | 600 | 1.4 |

### 2.3 Font Weights
`300` (light — sparingly), `400` (regular body), `500` (medium — UI/labels), `600` (semibold — subheads), `700` (bold — headlines). Avoid 800/900 to keep an elegant feel.

### 2.4 Line-Height Principles
- Headlines: tight (`1.05–1.2`).
- Body: comfortable (`1.6–1.7`) for readability.
- UI elements/buttons: `1.2`.

### 2.5 Measure (line length)
Body text max width ~`68ch` for optimal readability.

---

## 3. Color Palette

Light theme only. Anchored on Bangladesh national colors with an Olympic gold accent.

### 3.1 Brand
| Token              | Hex        | Use                                             |
|--------------------|------------|-------------------------------------------------|
| `--c-primary`      | `#006A4E`  | Bangladesh bottle green — primary brand, headers, primary buttons |
| `--c-primary-dark` | `#00543E`  | Hover/active on primary                         |
| `--c-primary-tint` | `#E6F1EE`  | Light green surfaces, section backgrounds       |
| `--c-secondary`    | `#F42A41`  | Bangladesh red — energy accents, highlights, badges |
| `--c-secondary-dark`| `#C81E32` | Hover on secondary                              |
| `--c-accent`       | `#D4A537`  | Olympic gold — medals, premium CTAs, emphasis   |
| `--c-accent-soft`  | `#F6E9C6`  | Gold tint surfaces                              |

### 3.2 Semantic / Status
| Token          | Hex       | Use                 |
|----------------|-----------|---------------------|
| `--c-success`  | `#1E9E5A` | Success states      |
| `--c-warning`  | `#E8A200` | Warnings            |
| `--c-error`    | `#D93025` | Errors, validation  |
| `--c-info`     | `#2B6CB0` | Info (Olympic blue nod) |

### 3.3 Neutrals
| Token          | Hex       | Use                              |
|----------------|-----------|----------------------------------|
| `--c-ink-900`  | `#0F1A17` | Primary text (near-black green)  |
| `--c-ink-700`  | `#334039` | Headings on light                |
| `--c-ink-500`  | `#5B6B63` | Secondary text                   |
| `--c-ink-300`  | `#9AA7A0` | Muted text, placeholders         |
| `--c-line`     | `#E2E8E4` | Borders, dividers                |
| `--c-line-soft`| `#EEF2F0` | Subtle separators                |

### 3.4 Backgrounds
| Token           | Hex       | Use                            |
|-----------------|-----------|--------------------------------|
| `--c-bg`        | `#FFFFFF` | Page background                |
| `--c-bg-soft`   | `#F7F9F8` | Alternating section background  |
| `--c-bg-muted`  | `#F0F4F2` | Cards on white, input fields   |
| `--c-bg-invert` | `#0F1A17` | Footer / dark contrast blocks (still light theme overall) |

### 3.5 Contrast Rules
- Body text on background must meet **WCAG AA (≥ 4.5:1)**; large text ≥ 3:1.
- Primary green `#006A4E` on white ≈ 5.9:1 ✓. Never place gold text on white for body copy (fails AA) — gold is for large accents, borders, and fills only.

---

## 4. Design Tokens

### 4.1 Border Radius
| Token        | Value   | Use                        |
|--------------|---------|----------------------------|
| `--r-xs`     | `4px`   | Tags, small chips          |
| `--r-sm`     | `8px`   | Inputs, buttons            |
| `--r-md`     | `12px`  | Cards, small media         |
| `--r-lg`     | `20px`  | Large cards, hero panels   |
| `--r-xl`     | `28px`  | Feature blocks             |
| `--r-full`   | `999px` | Pills, avatars, icon buttons |

### 4.2 Shadows (soft, elevation-based)
| Token        | Value                                             | Use               |
|--------------|---------------------------------------------------|-------------------|
| `--sh-xs`    | `0 1px 2px rgba(15,26,23,.06)`                    | Subtle lift       |
| `--sh-sm`    | `0 2px 8px rgba(15,26,23,.08)`                    | Cards resting     |
| `--sh-md`    | `0 8px 24px rgba(15,26,23,.10)`                   | Card hover        |
| `--sh-lg`    | `0 16px 40px rgba(15,26,23,.12)`                  | Modals, popovers  |
| `--sh-focus` | `0 0 0 3px rgba(0,106,78,.35)`                    | Focus ring        |

### 4.3 Spacing Scale (4px base)
`--sp-1: 4px` · `--sp-2: 8px` · `--sp-3: 12px` · `--sp-4: 16px` · `--sp-5: 20px` · `--sp-6: 24px` · `--sp-8: 32px` · `--sp-10: 40px` · `--sp-12: 48px` · `--sp-16: 64px` · `--sp-20: 80px` · `--sp-24: 96px` · `--sp-32: 128px`.
Section vertical rhythm: `--sp-16` mobile → `--sp-24`/`--sp-32` desktop.

### 4.4 Container Widths
| Token            | Value    | Use                       |
|------------------|----------|---------------------------|
| `--container-xl` | `1440px` | Max content width         |
| `--container-lg` | `1140px` | Standard sections         |
| `--container-md` | `960px`  | Text-heavy pages          |
| `--container-sm` | `720px`  | Article/reading width     |
| Gutter           | `20px` mobile → `40px` desktop | Side padding |

### 4.5 Breakpoints (mobile-first, `min-width`)
| Token   | Value    | Target          |
|---------|----------|-----------------|
| `sm`    | `480px`  | Large phones    |
| `md`    | `768px`  | Tablet          |
| `lg`    | `1024px` | Laptop          |
| `xl`    | `1280px` | Desktop         |
| `xxl`   | `1536px` | Large desktop   |

### 4.6 Icon Sizes
`--ic-sm: 16px` · `--ic-md: 20px` · `--ic-lg: 24px` · `--ic-xl: 32px`. SVG icons, `currentColor`, `stroke-width` consistent. Stored in `assets/icons/` (inline SVG sprite preferred).

### 4.7 Z-Index Scale
`base: 0` · `dropdown: 100` · `sticky-header: 200` · `mobile-appbar: 300` · `overlay: 400` · `modal: 500` · `toast: 600`.

---

## 5. Component Library

All components use BEM naming (`.block__element--modifier`) and live in `scss/components/`.

### 5.1 Buttons (`_buttons.scss`)
- Variants: `primary` (green fill), `secondary` (red fill), `accent` (gold fill), `outline`, `ghost`, `link`.
- Sizes: `sm`, `md` (default), `lg`.
- States: default, hover (lift + darken), active, focus-visible (focus ring), disabled, loading (spinner).
- Icon support: leading/trailing icon, icon-only (circular, `--r-full`).
- Radius `--r-sm`; premium feel via subtle shadow + 150ms transition.

### 5.2 Cards (`_cards.scss`)
- Types: **News card**, **Event card** (with date badge), **Athlete card** (portrait + sport + medals), **Activity card**, **Gallery card**, **Federation card** (logo), **Video card** (play overlay), **Stat/Counter card**.
- Anatomy: media (16:9 or portrait), body (title, meta, excerpt), footer (CTA/meta).
- Resting `--sh-sm`, hover `--sh-md` + image zoom + slight translateY.
- Radius `--r-md`/`--r-lg`.

### 5.3 Navbar / Header (`layout/_header.scss`)
- **Desktop:** transparent-over-hero → solid on scroll (sticky), logo left, menu center/right, primary CTA + search. Mega-menu/dropdown for "About BOA".
- **Mobile:** sticky **app bar** (logo + hamburger + search), full-screen slide-in drawer nav with large touch targets, expandable submenus (accordion).
- Active-link indicator; smooth show/hide on scroll direction.

### 5.4 Footer (`layout/_footer.scss`)
- Dark green (`--c-bg-invert`) block: logo + mission blurb, quick links (About, Activities, Games & Results, Anti-Doping, Contact), federations/affiliations, contact (address, phone, email), social icons, newsletter mini-form, IOC/Olympic affiliation marks, copyright + legal.

### 5.5 Hero (`components/_hero.scss`)
- Full-bleed **Swiper hero slider**: large imagery/video, overlay gradient, eyebrow + display headline + subtext + dual CTA, animated entrance (GSAP text reveal), slide pagination, scroll cue. Mobile: portrait-safe framing, reduced text.

### 5.6 Gallery (`components/_gallery.scss`)
- Masonry/grid of images opening in **Fancybox** lightbox; optional filter tabs by category; lazy-loaded responsive images; hover zoom + caption.

### 5.7 Forms & Inputs (`components/_forms.scss`)
- Inputs, textarea, select, checkbox, radio, toggle, search field, newsletter field.
- Floating or top-aligned labels, helper text, inline validation (error/success), focus ring `--sh-focus`, radius `--r-sm`, comfortable 44px+ touch height.

### 5.8 Modals / Popups (`components/_modal.scss`)
- **Fancybox** for image galleries, video playback (YouTube/local), media previews, and generic modal dialogs. Centered, `--sh-lg`, backdrop blur/dim, close on Esc/overlay, focus trap.

### 5.9 Sliders (`components/_slider.scss`) — all via **Swiper.js**
Hero slider · Athlete slider · Sponsor carousel (auto-scroll, grayscale→color hover) · Gallery slider · News slider · Video slider · Testimonial slider. Custom nav arrows + pagination styled to brand; touch/drag on mobile; `loop` + `autoplay` where appropriate; respects reduced-motion.

### 5.10 Badges & Tags (`components/_badge.scss`)
- Status/category badges (news category, event type, "Live", "Upcoming", medal color), date badge for events, count pills. Colors from semantic/brand tokens.

### 5.11 Tabs (`components/_tabs.scss`)
- Used on Games & Results (National/International), gallery filters, athlete disciplines. Accessible (`role="tablist"`, arrow-key nav), animated active underline.

### 5.12 Accordions (`components/_accordion.scss`)
- Used for FAQs, About submenus on mobile, documents/downloads groupings. Smooth height animation, single/multi-open, chevron rotate, ARIA `aria-expanded`.

### 5.14 News Strip / Ticker (`components/_news-strip.scss`)
- Continuous **left-to-right marquee** of latest news headlines under the hero. CSS/GSAP-driven infinite scroll, **pause on hover/focus**, each item links to its news article. "Latest News" label pill on the left. Fully keyboard/reduced-motion safe (falls back to a static scrollable list).

### 5.15 Social Media Feed (`components/_social.scss`)
- **Social Media Post** section: curated latest posts (Facebook/Instagram/X) rendered as cards (thumbnail, platform icon, caption excerpt, date) in a grid or Swiper. Each links to the source; section links out to official profiles. Lazy-loaded; graceful fallback if a feed is unavailable.

### 5.16 Supporting Components
- **Section header** (eyebrow + title + description + optional CTA).
- **Counter/stat block** (GSAP count-up: athletes, medals, federations, years) — used in About Us.
- **Timeline** (Olympic Journey — vertical on mobile, alternating on desktop, scroll-triggered).
- **Connect band** (contact info + social links + stay-updated prompt — homepage §11.13).
- **Breadcrumbs**, **Pagination**, **Toast/notification**, **Newsletter CTA band**, **Partner/sponsor strip**, **Download list item**, **Contact info block + map**.

---

## 6. Animation Guidelines (GSAP + ScrollTrigger)

> **Scope:** GSAP is used strictly for **micro-animations / micro-interactions** — subtle, purposeful motion (fade-ins, text reveals, card hovers, counters, scroll-triggered entrances, button feedback). It is not used for heavy, cinematic, or attention-grabbing effects. Motion supports the content; it never dominates it.

### 6.1 Durations
| Token        | Value  | Use                              |
|--------------|--------|----------------------------------|
| `fast`       | `150ms`| Buttons, hovers, small UI        |
| `base`       | `300ms`| Cards, dropdowns, most transitions|
| `slow`       | `500ms`| Section reveals, hero elements   |
| `xslow`      | `800ms`| Large staged entrances           |

### 6.2 Easing
- UI micro-interactions: `cubic-bezier(0.4, 0, 0.2, 1)` (standard).
- Entrances: `power3.out` / `expo.out` (GSAP).
- Exits: `power2.in`.
- Playful accents (counters, badges): slight `back.out(1.4)`.

### 6.3 Hover Effects
- Buttons: translateY(-2px) + shadow deepen + color shift.
- Cards: translateY(-4px) + `--sh-md` + inner image `scale(1.05)`.
- Links: animated underline (grow from left).
- Sponsor logos: grayscale → full color.

### 6.4 Scroll Effects (ScrollTrigger)
- Section fade-in + rise (`opacity 0→1`, `y 30→0`), staggered children.
- Text reveal (word/line mask) on headings.
- Counter count-up when in view.
- Parallax on hero/feature imagery (subtle, ≤ 10%).
- Timeline draw-in for Olympic Journey.
- Trigger once (no re-trigger jitter); `start: "top 80%"`.

### 6.5 Transition Timing / Page Transitions
- Smooth in-page anchor scrolling.
- Optional lightweight page transition overlay (fade) between pages — must not delay content meaningfully.

### 6.6 Motion Principles
1. **Purposeful** — motion communicates hierarchy or feedback, never decoration for its own sake.
2. **Fast & subtle** — nothing blocks interaction; keep it under ~800ms.
3. **Consistent** — same easing/duration tokens everywhere.
4. **Respect `prefers-reduced-motion`** — disable non-essential animation, keep functionality.
5. **Performance-safe** — animate `transform`/`opacity` only; avoid layout thrash.

---

## 7. Responsive Strategy

Mobile-first; layouts scale up at breakpoints. Desktop evolves from mobile, not the reverse.

| Device        | Range           | Layout behavior                                                                 |
|---------------|-----------------|---------------------------------------------------------------------------------|
| **Mobile**    | `< 768px`       | Single column; sticky app bar + drawer nav; full-width cards; stacked sections; large touch targets (≥44px); horizontal scroll sliders; app-like spacing. |
| **Tablet**    | `768–1023px`    | 2-column grids; condensed nav (still drawer or hybrid); larger imagery; side-by-side hero text/media. |
| **Laptop**    | `1024–1279px`   | Full horizontal navbar; 3-column card grids; mega-menu; two-column article layouts. |
| **Desktop**   | `1280–1535px`   | Max `--container-lg/xl`; 3–4 column grids; generous whitespace; parallax/scroll effects active. |
| **Large Desktop** | `≥ 1536px`  | Cap content at `--container-xl` (1320px), center; scale type via `clamp()`; more gutter, larger hero. |

**Mobile app-feel checklist:** sticky bottom or top app bar, gesture-friendly sliders, momentum scrolling, thumb-reachable CTAs, comfortable padding, no hover-dependent actions, fast tap feedback.

---

## 8. Accessibility (WCAG 2.1 AA)

- **Contrast:** All text meets AA (4.5:1 body, 3:1 large). Verified against tokens in §3.5.
- **Semantic HTML:** `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`; one `h1` per page; logical heading order.
- **Keyboard:** All interactive elements reachable and operable by keyboard; logical tab order; skip-to-content link; no keyboard traps (except intentional modal focus trap with Esc to close).
- **Focus states:** Visible `focus-visible` ring (`--sh-focus`) on every interactive element; never `outline: none` without replacement.
- **Alt text:** Meaningful `alt` on all content images; empty `alt=""` for decorative; captions for gallery.
- **ARIA:** Used only where semantics fall short — `aria-expanded` (accordions/menus), `aria-current` (active nav), `role="tablist/tab/tabpanel"`, `aria-label` on icon buttons, `aria-live` for toasts, `aria-modal` for dialogs.
- **Forms:** Every input has an associated `<label>`; errors announced and linked via `aria-describedby`.
- **Motion:** Honor `prefers-reduced-motion: reduce`.
- **Media:** Video controls accessible; provide captions/transcripts where source content allows.
- **Language:** `lang="en"` (and `lang` on any Bangla content blocks).
- **Touch targets:** Minimum 44×44px.

---

## 9. Technical Architecture

### 9.1 Folder Structure
```
project/
├── assets/
│   ├── css/            # compiled output: main.css, main.min.css
│   ├── scss/           # source styles (see 9.2)
│   ├── js/             # modular JS (see 9.3)
│   ├── images/         # optimized responsive images
│   ├── icons/          # SVG sprite / individual icons
│   ├── fonts/          # self-hosted WOFF2 (Sora, Inter)
│   └── videos/         # highlight/hero video assets
├── components/         # reusable HTML component snippets (dev reference)
├── pages/              # inner page HTML (about, news, events, etc.)
├── partials/           # header, footer, head, scripts includes
├── vendors/            # GSAP, Swiper, Fancybox (or via npm/CDN)
├── node_modules/
├── dist/               # production build output
├── index.html
├── package.json
├── README.md
└── claude.md
```

### 9.2 SCSS Architecture (7-1 pattern)
```
scss/
├── abstracts/    # _variables.scss, _tokens.scss, _functions.scss, _mixins.scss, _breakpoints.scss
├── base/         # _reset.scss, _typography.scss, _base.scss, _fonts.scss
├── components/   # _buttons, _cards, _forms, _modal, _slider, _badge, _tabs, _accordion, _hero, _gallery, _counter, _timeline
├── layout/       # _header, _footer, _navigation, _grid, _container, _sections
├── pages/        # _home, _about, _news, _events, _athletes, _gallery, _games-results, _contact
├── utilities/    # _spacing, _visibility, _text, _helpers
├── vendors/      # _swiper, _fancybox overrides
└── main.scss     # imports all, in order
```
- All tokens (§3, §4) defined as SCSS variables **and** exported as CSS custom properties on `:root` for runtime use.
- Mobile-first mixins: `@include respond(md) { ... }`.
- Compile: `sass` (Dart Sass) via npm script → `assets/css/main.css` (expanded, dev) and `main.min.css` (compressed, prod) with autoprefixer + sourcemaps in dev only.

### 9.3 JavaScript Modules (ES modules)
```
js/
├── main.js            # entry: imports & inits modules
├── modules/
│   ├── navigation.js  # mobile drawer, sticky header, scroll behavior
│   ├── sliders.js     # Swiper instances (hero, athletes, sponsors, news, gallery, video, testimonial)
│   ├── lightbox.js    # Fancybox init (gallery, video, modals)
│   ├── animations.js  # GSAP + ScrollTrigger reveals, counters, timeline
│   ├── forms.js       # validation, newsletter, contact
│   ├── lazyload.js    # image/video lazy loading
│   └── utils.js       # helpers, debounce, reduced-motion check
```
- No jQuery. Libraries only: **GSAP (+ScrollTrigger)**, **Swiper.js**, **Fancybox**.
- Feature-detect and guard inits (only run if element exists).

### 9.4 Build & Tooling (`package.json` scripts)
- `sass:dev` — watch + compile expanded with sourcemaps.
- `sass:build` — compile compressed + autoprefixer → `main.min.css`.
- `build` — full production build to `dist/` (minify CSS/JS, optimize images).
- Node.js-based; dependencies: `sass`, `postcss`, `autoprefixer`, (optional) `esbuild`/`terser` for JS minify, `imagemin` for images.

### 9.5 Performance
- Responsive images: `srcset`/`sizes`, WebP/AVIF with fallbacks, correct dimensions to avoid CLS.
- `loading="lazy"` + `decoding="async"` on non-critical images; eager-load hero.
- Preload key fonts + hero image; `font-display: swap`.
- Minified CSS/JS; defer non-critical JS; code-split library inits.
- Critical CSS inlined for above-the-fold (optional enhancement).
- Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

## 10. Content Inventory (from current nocban.org — to be preserved)

Sourced from the live site; the redesign re-presents **all** of this. No content invented.

- **Home** — News, Upcoming Events, Latest Activities, Featured Athletes, Featured Moments, Newsletter, International Affiliation.
- **About BOA** — History & Mission/Vision, Executive Committee, General Assembly, Previous Presidents & Secretary Generals, Organogram & Administration, Commissions & Sub-Committees, National Olympic Academy, BOA Statute, Affiliated Organizations, Sports Awards, Documents & Annual Reports.
- **Activities** — organizational updates/events.
- **Games & Results** — National, International (tabs).
- **BOA Election**.
- **Anti-Doping**.
- **BOA Library and Museum**.
- **Contact Us** — Olympic Bhaban, Rajuk Avenue, Outer Stadium, Purana Paltan, Dhaka 1000; phone +880 2 956 0369; fax +880 2 956 3304; email nocban@gmail.com.
- **Media** — Gallery (photos), Video Highlights.
- **Sponsors / Affiliations** — IOC, Olympic recognition, partners, federations.
- **Downloads** — statute, forms, annual reports, documents.

> During build, exact text, images, and assets will be pulled from the current site so nothing is lost.

---

## 11. Homepage Narrative (section order)

The homepage tells the Team Bangladesh story through 14 ordered sections:

1. **Header** — sticky navbar (desktop) / app bar + drawer (mobile). See §5.3.
2. **Hero Section** — full-bleed Swiper slider, Team Bangladesh imagery/video, eyebrow + display headline + subtext + dual CTA, GSAP text reveal, scroll cue.
3. **News Strip** — continuous left-to-right **marquee/ticker** of latest news headlines (auto-scroll, pause on hover, links to news). Thin band directly under hero. See §5.14.
4. **About Us** — mission/vision intro: text block + imagery + key stats/counters (years since 1979, athletes, federations, medals) with GSAP count-up.
5. **Upcoming Events** — event cards with date badges; optional Swiper on mobile.
6. **Featured Athletes** — athlete slider/cards (portrait, sport, medals).
7. **Latest Activities** — activity cards grid.
8. **Social Media Post** — embedded/curated feed of latest social posts (Facebook/Instagram/X) as cards or slider; links out to profiles. See §5.15.
9. **Featured Moments (Gallery)** — photo grid/masonry → Fancybox lightbox; hover zoom + captions.
10. **Newsletter** — CTA band with signup form.
11. **International Affiliation** — IOC / Olympic recognition & affiliated bodies (logos + short blurb).
12. **Worldwide Olympic Partners** — sponsor/partner auto-scroll carousel (grayscale → color on hover).
13. **Connect With Us & Stay Updated** — combined contact + engagement section: quick contact info (address, phone, email), social links, and stay-updated prompt in one block.
14. **Footer** — full footer (§5.4).

Each section: eyebrow → title → content → optional CTA; alternating `--c-bg` / `--c-bg-soft` backgrounds; entrance via GSAP ScrollTrigger.

---

## 12. Build Phasing

The project is built page-by-page. **Phase 1 = Homepage** (`index.html`) with all 14 sections (§11), the full design system (tokens, SCSS architecture, components used on the homepage), and the JS modules it needs (navigation, sliders, lightbox, animations, news-strip, forms, lazyload). Inner pages (About, News, Events, Athletes, Games & Results, Contact, etc.) follow in later phases, reusing the same tokens and components. Real content/images are integrated from the current nocban.org source as each page is built; Phase 1 ships with structured placeholders where live assets are not yet pulled.

---

## 13. Working Agreements / Definition of Done

- [ ] No content changed, added, or removed vs. source site — presentation only.
- [ ] SCSS compiles clean to minified production CSS.
- [ ] Mobile-first; verified at 360px, 768px, 1024px, 1280px, 1536px.
- [ ] Only GSAP, Swiper, Fancybox as JS libraries.
- [ ] Light theme only; no dark mode.
- [ ] WCAG AA checks pass (contrast, keyboard, focus, alt, ARIA).
- [ ] Core Web Vitals within targets on mobile.
- [ ] Reduced-motion respected.
- [ ] All components match tokens in this document.

---

*End of claude.md — approve or request changes before implementation begins.*
