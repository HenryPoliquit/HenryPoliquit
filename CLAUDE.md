# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Vite HMR)
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run lint         # ESLint with auto-fix + cache
npm run format       # Prettier format src/
npm run test:unit    # Run Vitest unit tests
```

## Architecture

**Vue 3 + Vuetify 3 portfolio** deployed to GitHub Pages at `https://henrypoliquit.github.io/HenryPoliquit/`.

### Routing
Hash-based (`createWebHashHistory`) — required for GitHub Pages static hosting. 5 routes: `/`, `/about`, `/projects`, `/contact`, `/:pathMatch(.*)*`. All views are lazy-loaded. Pages are wrapped in `<KeepAlive>` to avoid remounting on navigation.

### State — `src/stores/portfolio.js` (Pinia)
Single store holds all content: personal info, projects (5), skills, social links, nav items. Also owns the global snackbar state with `showSnackbar(message, color, icon)` / `hideSnackbar()`. All user-facing notifications must go through this.

### Component Layout
```
App.vue → Navbar + <router-view> (with transitions) + Footer + global v-snackbar
Views (src/views/) → composed of section components (src/components/{home,about,contact,projects}/)
Shared: src/components/common/SectionHeader.vue, StatsGrid.vue
```

### Composables (`src/composables/`)
- `useContactForm.js` — form state, validation, EmailJS submission
- `useTypewriter.js` — cycling animated text in HeroSection
- `useScroll.js` — navbar scroll-aware behavior
- `useEasterEggs.js` — Konami Code (↑↑↓↓←→←→BA) + logo click spam detection

### Styling
Custom dark Vuetify theme: primary `#2C3E50` charcoal, accent `#00BCD4` cyan. Fonts self-hosted via `@fontsource` (Plus Jakarta Sans, Roboto). Scoped `<style>` per component. Global base in `src/assets/style.css`. Animations use `transform` (GPU) not positional props.

### Email
EmailJS configured in `main.js` (public key, service `service_05uptif`, template `template_n4ib3bf`). No backend — purely client-side form submission via `@emailjs/browser`.

### Build Config
- Vite base path: `/HenryPoliquit/` (critical for GitHub Pages subpath assets)
- Manual chunks: `vuetify`, `vendor`, app code split separately
- Path alias: `@/` → `src/`
- Prettier: no semicolons, single quotes, 100-char line width

### Deployment
`gh-pages` branch is the deployed branch. Build output (`dist/`) is pushed there.
