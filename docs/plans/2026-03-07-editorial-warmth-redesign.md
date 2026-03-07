# Portfolio Redesign — Editorial Warmth

**Date:** 2026-03-07
**Goal:** Make the portfolio unique, professional, and memorable. Stand out from typical cold/technical dev portfolios with a warm, human, story-driven aesthetic.

---

## Design Direction

**Personality:** Warm & human — craftsman who happens to code. Approachable, story-driven, not a resume dump.
**Theme:** Light + Dark mode, both intentional (not just inverted).
**Accent:** Amber gold — honest, timeless, distinctive.

---

## Design System

### Color Tokens

| Token | Light Mode | Dark Mode |
|---|---|---|
| Background | `#FAF7F2` warm ivory | `#18140F` deep espresso |
| Surface | `#F0EBE1` cream | `#221E17` warm charcoal |
| Text primary | `#1C1A18` warm near-black | `#F5F0E8` warm cream |
| Text secondary | `#6B6560` warm gray | `#9E9589` muted warm |
| Accent | `#D4890A` amber gold | `#F0A832` bright amber |
| Border | `#E8E0D0` warm beige | `#3A3228` dark warm border |

Cold indigo `#6272F5` removed entirely. No cool grays, no navy.

### Typography

- **Display / Headings:** Syne (existing) — geometric strength
- **Body:** Lora (new, via @fontsource/lora) — humanist serif, warm and readable
- **UI / Labels / Captions:** DM Sans (existing) — functional, clean

### Motif & Texture

- Subtle CSS noise grain texture as background layer overlay
- Thin ruled horizontal lines as section dividers (`<hr>` or border-bottom)
- Section labels: `01 — WORK`, `02 — ABOUT` — small Syne caps, amber dash

---

## Technology Stack

**Core (unchanged):** Vue 3, Vuetify 3, Pinia, Vite, Vue Router (hash history)

**Additions:**
- `@fontsource/lora` — humanist serif body font
- Vuetify custom theme updated with warm color tokens
- CSS custom properties for grain texture and warm surfaces

---

## Page Designs

### Navbar (`Navbar.vue`)
- Vuetify `v-app-bar` retained, restyled
- Light: warm ivory bg, warm charcoal text, amber active underline
- Dark: espresso bg, cream text
- Frosted glass blur on scroll (`backdrop-filter: blur`) in both modes
- Monogram `PH` — amber-gold filled square (replaces cold indigo border)
- Mobile drawer inherits warm palette

### Home Page

**HeroSection.vue**
- Background: CSS grain texture + warm gradient (replaces dot-grid)
- Left column:
  - Overline in Lora italic: *"Hello, I'm"*
  - Name in Syne, large display size
  - Typewriter role stays
  - Bio in Lora body type
  - CTA buttons restyled warm
  - Stats row below
- Right column: profile photo with amber glow (replaces indigo glow)

**TechStackSection.vue**
- Horizontal scrolling strip, warm surface card

**FeaturedWork.vue**
- Stays as landmark card
- Editorial typography: project number `01` large Syne
- Warm border treatment, amber accents

### About Page (`AboutPage.vue`)

Story-driven reflow:

**ProfileCard.vue**
- Large Lora italic pull quote from bio
- Photo beside it, warm amber border

**TimelineSection.vue**
- Vertical editorial timeline
- Year markers in Syne, amber dot connectors, warm surface cards

**FeatureCards.vue**
- Replaced generic icon cards with 2x2 editorial grid
- Amber accent numbers (01, 02, 03, 04) instead of icons

**SkillsSection.vue**
- Grouped tag rows with warm pill style
- Replaces generic Vuetify chips

### Projects Page (`ProjectsPage.vue`)

- Filter: Vuetify `v-btn-toggle` styled as warm pill buttons — replaces generic `v-select`
- ProjectCard: project number overlay, editorial title treatment, warm border hover state

### Contact Page (`ContactPage.vue`)

- Heading: *"Let's build something"* in Syne large
- Form: warm-surfaced Vuetify inputs, amber focus rings
- Contact info: amber icons, editorial spacing

### 404 Page (`NotFoundPage.vue`)

- Large `404` in Syne as background decorative text
- Warm, human copy
- Amber CTA button

---

## Implementation Notes

- Vuetify theme: update `src/plugins/vuetify.js` with warm color tokens for both light and dark
- Theme toggle: add to Navbar (sun/moon icon button using Vuetify's `useTheme`)
- All existing Vuetify components retained — styling via theme tokens + scoped CSS
- Animations: scroll-triggered reveals via IntersectionObserver, no jarring effects
- `prefers-reduced-motion` respected throughout
