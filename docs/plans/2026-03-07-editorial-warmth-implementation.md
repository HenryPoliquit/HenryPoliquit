# Editorial Warmth — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the entire portfolio with a warm, human, editorial aesthetic — light/dark mode, amber gold accent, Lora serif body, ditching cold indigo for warm surfaces throughout.

**Architecture:** Two Vuetify named themes (`warmLight` / `warmDark`) replace the single theme. Theme toggle lives in Navbar, persists to localStorage. All hardcoded hex colors in components are replaced with Vuetify CSS custom property references (`rgb(var(--v-theme-*))`) so every component responds to theme switches automatically.

**Tech Stack:** Vue 3, Vuetify 3 (themes + useTheme composable), Pinia, Vite, @fontsource/lora (new)

---

## Task 1: Install Lora font

**Files:**
- Run: `npm install @fontsource/lora`
- Modify: `src/main.js`

**Step 1: Install package**

```bash
cd "D:/Portfolio/portfolio/henrypoliquit"
npm install @fontsource/lora
```

Expected output: `added 1 package` (or similar), no errors.

**Step 2: Import Lora weights in main.js**

Add these three imports after the existing `@emailjs/browser` import line. Keep all other content in `main.js` unchanged.

```js
import '@fontsource/lora/400.css'
import '@fontsource/lora/400-italic.css'
import '@fontsource/lora/700.css'
```

Also update the console banner colors from indigo to amber (lines 13-16 in main.js):

```js
console.log(
    '%cPaul Henry Poliquit%c  Full-Stack Developer',
    'background:#D4890A;color:#1C1A18;font-size:16px;font-weight:bold;padding:6px 12px;border-radius:6px 0 0 6px;',
    'background:#1C1A18;color:#F5F0E8;font-size:16px;padding:6px 12px;border-radius:0 6px 6px 0;'
)
console.log(
    '%c👋 Hey there, curious dev! Try: window.portfolio',
    'color:#D4890A;font-size:12px;font-style:italic;'
)
```

**Step 3: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds, no errors about missing modules.

**Step 4: Commit**

```bash
git add package.json package-lock.json src/main.js
git commit -m "feat: add Lora serif font and warm console banner"
```

---

## Task 2: Rewrite Vuetify theme — two warm themes

**Files:**
- Rewrite: `src/plugins/vuetify.js`

**Step 1: Rewrite the entire file**

```js
/**
 * Vuetify Configuration — Editorial Warmth Theme
 * Two themes: warmLight (ivory/cream) and warmDark (espresso/charcoal)
 * Accent: amber gold throughout
 */
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'

// ── Light theme: warm ivory + cream surfaces ──────────────────────────────
const warmLight = {
    dark: false,
    colors: {
        primary: '#8B6914',
        'primary-darken-1': '#6B4F0E',
        'primary-lighten-1': '#A67C1A',

        secondary: '#6B6560',
        'secondary-darken-1': '#524E49',
        'secondary-lighten-1': '#857F79',

        accent: '#D4890A',
        'accent-darken-1': '#B5720A',
        'accent-lighten-1': '#E8A030',

        background: '#FAF7F2',
        surface: '#F0EBE1',
        'surface-variant': '#E8E0D0',
        'surface-bright': '#FFFFFF',

        'on-background': '#1C1A18',
        'on-surface': '#1C1A18',
        'on-surface-variant': '#6B6560',
        'on-primary': '#FFFFFF',
        'on-secondary': '#FFFFFF',
        'on-accent': '#1C1A18',

        info: '#5B8DD9',
        success: '#4A7C59',
        warning: '#D4890A',
        error: '#C0392B',
    },
}

// ── Dark theme: deep espresso + warm charcoal surfaces ───────────────────
const warmDark = {
    dark: true,
    colors: {
        primary: '#D4890A',
        'primary-darken-1': '#B5720A',
        'primary-lighten-1': '#E8A030',

        secondary: '#9E9589',
        'secondary-darken-1': '#7A7168',
        'secondary-lighten-1': '#B8B0A7',

        accent: '#F0A832',
        'accent-darken-1': '#D4890A',
        'accent-lighten-1': '#F5C06A',

        background: '#18140F',
        surface: '#221E17',
        'surface-variant': '#2D271E',
        'surface-bright': '#3A3228',

        'on-background': '#F5F0E8',
        'on-surface': '#F5F0E8',
        'on-surface-variant': '#9E9589',
        'on-primary': '#1C1A18',
        'on-secondary': '#F5F0E8',
        'on-accent': '#1C1A18',

        info: '#7BAFD4',
        success: '#6AB07A',
        warning: '#F0A832',
        error: '#E57373',
    },
}

const vuetify = createVuetify({
    components,
    directives,

    theme: {
        defaultTheme: 'warmDark',
        themes: {
            warmLight,
            warmDark,
        },
    },

    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },

    defaults: {
        VBtn: {
            variant: 'flat',
            color: 'accent',
            style: 'text-transform: none; letter-spacing: 0.5px; font-weight: 500;',
            elevation: 2,
            rounded: 'lg',
        },
        VAppBar: {
            elevation: 0,
            VBtn: {
                variant: 'text',
                rounded: 'lg',
            },
        },
        VCard: {
            elevation: 2,
            rounded: 'xl',
        },
        VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'accent',
            rounded: 'lg',
        },
        VTextarea: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'accent',
            rounded: 'lg',
        },
        VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'accent',
            rounded: 'lg',
        },
        VChip: {
            rounded: 'pill',
            elevation: 0,
        },
        VAvatar: {
            rounded: 'lg',
        },
    },
})

export default vuetify
```

**Step 2: Verify**

```bash
npm run dev
```

Open browser — the site should load with dark espresso background. No console errors.

**Step 3: Commit**

```bash
git add src/plugins/vuetify.js
git commit -m "feat: replace single theme with warmLight/warmDark Vuetify themes"
```

---

## Task 3: Update global styles

**Files:**
- Rewrite: `src/assets/style.css`

**Step 1: Replace entire file**

```css
/* Global Styles — Editorial Warmth */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Lora', Georgia, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* DM Sans for UI elements — applied by Vuetify component defaults */
.ui-font {
  font-family: 'DM Sans', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Syne', sans-serif;
}

html {
  scroll-behavior: smooth;
}

a {
  text-decoration: none !important;
}

/* ── Custom scrollbar ── */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgb(var(--v-theme-background));
}

::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-accent));
  border-radius: 4px;
  opacity: 0.6;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--v-theme-primary));
}

/* ── Grain texture overlay ── */
/* Applied as a fixed pseudo-element via .grain-overlay in App.vue */
.grain-overlay {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9997;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
}

/* ── Section divider motif ── */
.section-rule {
  border: none;
  border-top: 1px solid rgb(var(--v-theme-surface-variant));
  margin: 0;
}

/* ── Section label style: "01 — TITLE" ── */
.section-label {
  font-family: 'Syne', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgb(var(--v-theme-accent));
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-label::after {
  content: '';
  flex: 1;
  max-width: 48px;
  height: 1px;
  background: rgb(var(--v-theme-accent));
  opacity: 0.5;
}

/* ── Lora italic pull quote ── */
.pull-quote {
  font-family: 'Lora', Georgia, serif;
  font-style: italic;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  line-height: 1.8;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.85;
}

/* ── Amber text gradient ── */
.text-gradient {
  background: linear-gradient(135deg, #D4890A 0%, #F0A832 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Hover lift ── */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(212, 137, 10, 0.18) !important;
}

/* ── Fade-in animation ── */
.fade-in {
  animation: fadeIn 0.6s ease-in both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Section spacing ── */
.section-spacing {
  padding: 80px 0;
}

@media (max-width: 960px) {
  .section-spacing { padding: 60px 0; }
}

@media (max-width: 600px) {
  .section-spacing { padding: 40px 0; }
}

/* ── Image shimmer (shared by ProjectCard and FeaturedWork) ── */
.img-shimmer {
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgb(var(--v-theme-surface)) 25%,
    rgb(var(--v-theme-surface-variant)) 50%,
    rgb(var(--v-theme-surface)) 75%
  );
  background-size: 400% 100%;
  animation: imgShimmer 1.5s infinite linear;
}

@keyframes imgShimmer {
  from { background-position: 100% 0; }
  to   { background-position: -100% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .img-shimmer { animation: none; }
  .fade-in { animation: none; }
}
```

**Step 2: Verify**

```bash
npm run dev
```

Open browser — typography should be Lora for body text.

**Step 3: Commit**

```bash
git add src/assets/style.css
git commit -m "feat: update global styles for Editorial Warmth — Lora body, amber utilities, grain overlay"
```

---

## Task 4: Update App.vue — theme persistence + warm cursor glow

**Files:**
- Modify: `src/App.vue`

**Step 1: Add grain overlay div and theme persistence**

Replace the entire `<template>` and `<script setup>` sections. Keep the `<style>` block content but update the colors within it.

```vue
<template>
  <v-app>
    <a href="#main-content" class="skip-link">Skip to content</a>

    <!-- Grain texture overlay -->
    <div class="grain-overlay" aria-hidden="true"></div>

    <!-- Cursor glow — amber, hidden on touch/reduced-motion -->
    <div class="cursor-glow" :style="glowStyle" aria-hidden="true"></div>

    <v-layout id="main-content">
      <Navbar />
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <KeepAlive>
            <component :is="Component" :key="$route.path" />
          </KeepAlive>
        </Transition>
      </router-view>
      <Footer />
    </v-layout>

    <BackToTop />

    <v-snackbar
      v-model="store.snackbar.show"
      :color="store.snackbar.color"
      :timeout="4000"
      location="bottom right"
      rounded="pill"
      elevation="6"
    >
      <v-icon v-if="store.snackbar.icon" :icon="store.snackbar.icon" start></v-icon>
      {{ store.snackbar.message }}
      <template v-slot:actions>
        <v-btn variant="text" size="small" @click="store.hideSnackbar">Dismiss</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import BackToTop from './components/common/BackToTop.vue'
import './assets/style.css'
import { usePortfolioStore } from './stores/portfolio'
import { useEasterEggs } from './composables/useEasterEggs'

const store = usePortfolioStore()
const theme = useTheme()
useEasterEggs()

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ── Theme persistence ─────────────────────────────────────────────────────
onMounted(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved && (saved === 'warmLight' || saved === 'warmDark')) {
        theme.global.name.value = saved
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        theme.global.name.value = prefersDark ? 'warmDark' : 'warmLight'
    }
})

// ── Welcome greeting ──────────────────────────────────────────────────────
onMounted(() => {
    setTimeout(() => {
        const h = new Date().getHours()
        const greeting = h < 12 ? 'Good morning!' : h < 18 ? 'Good afternoon!' : 'Good evening!'
        store.showSnackbar(`${greeting} Welcome to my portfolio.`, 'primary', 'mdi-human-greeting')
    }, 1500)
})

// ── Contextual page messages ──────────────────────────────────────────────
const route = useRoute()
const routeMessages = {
    '/about':    { msg: 'Get to know me a bit better!', color: 'primary', icon: 'mdi-account' },
    '/projects': { msg: "Here's what I've been building!", color: 'accent', icon: 'mdi-briefcase' },
    '/contact':  { msg: "Let's build something together!", color: 'success', icon: 'mdi-email' },
}
watch(() => route.path, (path) => {
    const cfg = routeMessages[path]
    if (cfg) store.showSnackbar(cfg.msg, cfg.color, cfg.icon)
})

// ── Cursor glow (amber) ───────────────────────────────────────────────────
const mouse = reactive({ x: -400, y: -400 })
const glowStyle = computed(() => ({
    transform: `translate(${mouse.x - 200}px, ${mouse.y - 200}px)`,
}))
function onMouseMove(e) {
    mouse.x = e.clientX
    mouse.y = e.clientY
}
onMounted(() => window.addEventListener('mousemove', onMouseMove, { passive: true }))
onUnmounted(() => window.removeEventListener('mousemove', onMouseMove))
</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from {
    opacity: 0;
    transform: translateY(10px);
}
.page-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
    .page-enter-active,
    .page-leave-active { transition: none; }
}

.cursor-glow {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212, 137, 10, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    will-change: transform;
}

@media (prefers-reduced-motion: reduce),
       (hover: none) {
    .cursor-glow { display: none; }
}

.skip-link {
    position: absolute;
    top: -100%;
    left: 8px;
    z-index: 9999;
    padding: 8px 16px;
    background: #D4890A;
    color: #1C1A18;
    font-weight: 700;
    border-radius: 0 0 4px 4px;
    text-decoration: none;
    transition: top 0.2s;
}
.skip-link:focus {
    top: 0;
}
</style>
```

**Step 2: Verify**

```bash
npm run dev
```

No console errors. Grain overlay visible (very subtle). Cursor glow is amber.

**Step 3: Commit**

```bash
git add src/App.vue
git commit -m "feat: theme persistence, amber cursor glow, grain overlay in App.vue"
```

---

## Task 5: Navbar — theme toggle + warm palette

**Files:**
- Rewrite: `src/components/Navbar.vue`

**Step 1: Rewrite the file**

```vue
<template>
    <v-app-bar
        app
        :elevation="scrolled ? 4 : 0"
        :class="{ 'navbar-scrolled': scrolled }"
        color="surface"
        height="72"
    >
        <v-container fluid class="d-flex align-center px-4 px-md-8">
            <!-- Logo/Brand -->
            <div class="brand-section" @click="handleLogoClick">
                <router-link to="/" class="brand-link d-flex align-center">
                    <div class="monogram mr-3">PH</div>
                    <div class="d-none d-sm-block">
                        <div class="brand-name text-h6 font-weight-bold">Paul Henry Poliquit</div>
                        <div class="brand-subtitle text-caption">Software Engineer</div>
                    </div>
                </router-link>
            </div>

            <v-spacer></v-spacer>

            <!-- Desktop Navigation -->
            <nav class="d-none d-md-flex align-center">
                <v-btn
                    v-for="item in store.navItems"
                    :key="item.path"
                    :to="item.path"
                    :class="{ 'nav-link-active': isActive(item.path) }"
                    class="nav-link mx-1"
                    variant="text"
                    size="large"
                    color="on-surface"
                >
                    {{ item.title }}
                </v-btn>
            </nav>

            <!-- Theme toggle -->
            <v-btn
                :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                variant="text"
                color="accent"
                size="small"
                class="ml-2"
                :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                @click="toggleTheme"
            ></v-btn>

            <!-- Mobile Menu Button -->
            <v-app-bar-nav-icon
                @click="drawer = !drawer"
                class="d-md-none ml-1"
                size="large"
                color="on-surface"
            ></v-app-bar-nav-icon>
        </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary location="right" width="280" color="surface">
        <v-list class="pa-4" nav>
            <v-list-item class="mb-4">
                <v-list-item-title class="text-h6 font-weight-bold" style="font-family: 'Syne', sans-serif;">Menu</v-list-item-title>
            </v-list-item>

            <v-divider class="mb-4" color="surface-variant"></v-divider>

            <v-list-item
                v-for="item in store.navItems"
                :key="item.path"
                :to="item.path"
                :prepend-icon="item.icon"
                :title="item.title"
                :active="isActive(item.path)"
                @click="drawer = false"
                class="mb-2 rounded-lg"
                color="accent"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { useScroll } from '../composables/useScroll'
import { usePortfolioStore } from '../stores/portfolio'

const route = useRoute()
const drawer = ref(false)
const { scrolled } = useScroll()
const store = usePortfolioStore()
const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)

function toggleTheme() {
    const next = isDark.value ? 'warmLight' : 'warmDark'
    theme.global.name.value = next
    localStorage.setItem('portfolio-theme', next)
}

const isActive = (path) => route.path === path

// Easter egg: 5 rapid logo clicks
let logoClicks = 0
let logoTimer = null

function handleLogoClick() {
    logoClicks++
    clearTimeout(logoTimer)
    if (logoClicks >= 5) {
        logoClicks = 0
        store.showSnackbar('Easter egg! Try the Konami Code: ↑↑↓↓←→←→BA', 'accent', 'mdi-star-shooting')
        console.log('%cEaster egg found! Now try: ↑↑↓↓←→←→BA', 'color:#D4890A;font-weight:bold;font-size:13px;')
    } else {
        logoTimer = setTimeout(() => { logoClicks = 0 }, 2000)
    }
}
</script>

<style scoped>
.navbar-scrolled {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgb(var(--v-theme-surface-variant)) !important;
}

.brand-link {
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s ease;
}

.brand-link:hover {
    opacity: 0.85;
}

.monogram {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 1.5px;
    color: rgb(var(--v-theme-on-accent));
    background: rgb(var(--v-theme-accent));
    border-radius: 6px;
    padding: 5px 9px;
    line-height: 1;
    flex-shrink: 0;
}

.brand-name {
    font-family: 'Syne', sans-serif;
    line-height: 1.2;
    letter-spacing: 0.3px;
    color: rgb(var(--v-theme-on-surface));
}

.brand-subtitle {
    font-family: 'DM Sans', sans-serif;
    opacity: 0.6;
    line-height: 1;
    margin-top: 2px;
    color: rgb(var(--v-theme-on-surface));
}

.nav-link {
    position: relative;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: all 0.2s ease;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 70%;
    height: 1.5px;
    background: rgb(var(--v-theme-accent));
    transition: transform 0.25s ease;
}

.nav-link:hover::after {
    transform: translateX(-50%) scaleX(1);
}

.nav-link-active::after {
    transform: translateX(-50%) scaleX(1);
}
</style>
```

**Step 2: Verify**

```bash
npm run dev
```

- Navbar uses warm surface color (ivory in light, espresso in dark)
- Amber `PH` monogram square visible
- Sun/moon icon appears and toggles theme when clicked
- Theme persists on page reload (check localStorage in DevTools: `portfolio-theme`)

**Step 3: Commit**

```bash
git add src/components/Navbar.vue
git commit -m "feat: Navbar with theme toggle, warm palette, amber monogram"
```

---

## Task 6: HeroSection — grain bg, Lora overline, amber glow

**Files:**
- Rewrite: `src/components/home/HeroSection.vue`

**Step 1: Rewrite the file**

```vue
<template>
    <div class="hero-wrapper">
        <v-container fluid class="hero-section">
            <v-row align="center" class="hero-content" no-gutters>
                <!-- Left: Text content -->
                <v-col cols="12" lg="7" class="hero-left pr-lg-12">
                    <!-- Availability badge -->
                    <div v-if="store.personal.available" class="fade-in availability-badge mb-6">
                        <span class="status-dot"></span>
                        <span class="badge-text">Available for opportunities</span>
                    </div>

                    <!-- Lora italic greeting -->
                    <div class="fade-in lora-greeting mb-2" style="animation-delay: 0.05s">
                        Hello, I'm
                    </div>

                    <!-- Name -->
                    <div class="fade-in">
                        <h1 class="hero-name mb-4">
                            {{ store.personal.name }}
                        </h1>
                    </div>

                    <!-- Typewriter Role -->
                    <div class="fade-in" style="animation-delay: 0.15s">
                        <p class="hero-role mb-6">
                            <span class="role-prefix">A </span>
                            <span class="role-accent">{{ typewriterText }}</span>
                            <span class="cursor-blink">{{ showCursor ? '_' : '' }}</span>
                        </p>
                    </div>

                    <!-- Bio in Lora -->
                    <div class="fade-in" style="animation-delay: 0.3s">
                        <p class="hero-bio mb-10">
                            Passionate about building scalable, cloud-native web applications.
                            Currently studying Software Engineering — open to internships and
                            junior roles.
                        </p>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="fade-in d-flex flex-wrap ga-3 mb-12" style="animation-delay: 0.4s">
                        <v-btn color="accent" size="large" to="/projects" class="px-7" elevation="3">
                            <v-icon icon="mdi-briefcase" start></v-icon>
                            View Projects
                        </v-btn>
                        <v-btn color="accent" size="large" variant="outlined" class="px-7" to="/contact">
                            <v-icon icon="mdi-email" start></v-icon>
                            Get In Touch
                        </v-btn>
                        <v-btn size="large" variant="outlined" class="px-7 resume-btn" disabled>
                            <v-icon icon="mdi-file-account" start></v-icon>
                            Resume
                        </v-btn>
                    </div>

                    <!-- Stats -->
                    <div class="fade-in" style="animation-delay: 0.55s">
                        <StatsGrid :stats="store.stats" />
                    </div>
                </v-col>

                <!-- Right: Profile photo (desktop only) -->
                <v-col cols="12" lg="5" class="d-none d-lg-flex align-center justify-center hero-right">
                    <div class="fade-in photo-frame-wrapper" style="animation-delay: 0.2s">
                        <div class="photo-glow"></div>
                        <div class="photo-frame">
                            <v-img
                                src="/profile.jpg"
                                alt="Paul Henry Poliquit"
                                width="380"
                                height="460"
                                cover
                                class="profile-photo"
                            >
                                <template v-slot:error>
                                    <div class="photo-fallback d-flex align-center justify-center">
                                        <span class="fallback-initials">PH</span>
                                    </div>
                                </template>
                            </v-img>
                        </div>

                        <!-- Floating tech badge -->
                        <div class="tech-badge">
                            <v-icon icon="mdi-code-braces" size="15" color="accent" class="mr-2"></v-icon>
                            <span class="tech-badge-text">Full-Stack Dev</span>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { useTypewriter } from '../../composables/useTypewriter'
import { usePortfolioStore } from '../../stores/portfolio'
import StatsGrid from './StatsGrid.vue'

const store = usePortfolioStore()
const { typewriterText, showCursor } = useTypewriter([
    'Software Engineering Student',
    'Full-Stack Web Developer',
    'Cloud Infrastructure Enthusiast',
])
</script>

<style scoped>
.hero-wrapper {
    position: relative;
    min-height: calc(100vh - 72px);
    background-color: rgb(var(--v-theme-background));
    display: flex;
    align-items: center;
    overflow: hidden;
}

/* Warm radial gradient atmosphere */
.hero-wrapper::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 60%;
    height: 80%;
    background: radial-gradient(ellipse at center, rgba(212, 137, 10, 0.07) 0%, transparent 65%);
    pointer-events: none;
}

.hero-section {
    position: relative;
    z-index: 1;
    padding: 80px 48px;
    width: 100%;
}

.hero-content {
    min-height: calc(100vh - 72px);
}

.hero-left {
    padding-top: 40px;
    padding-bottom: 40px;
}

/* ── Availability badge ── */
.availability-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(74, 124, 89, 0.12);
    border: 1px solid rgba(74, 124, 89, 0.3);
    padding: 6px 16px;
    border-radius: 99px;
}

.status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgb(var(--v-theme-success));
    flex-shrink: 0;
    animation: statusPulse 2s ease-in-out infinite;
}

.badge-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.8;
}

@keyframes statusPulse {
    0%   { box-shadow: 0 0 0 0 rgba(74, 124, 89, 0.5); }
    70%  { box-shadow: 0 0 0 7px rgba(74, 124, 89, 0); }
    100% { box-shadow: 0 0 0 0 rgba(74, 124, 89, 0); }
}

/* ── Lora greeting ── */
.lora-greeting {
    font-family: 'Lora', Georgia, serif;
    font-style: italic;
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    color: rgb(var(--v-theme-accent));
    font-weight: 400;
}

/* ── Typography ── */
.hero-name {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.6rem, 5.5vw, 4.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -1.5px;
    color: rgb(var(--v-theme-on-background));
}

.hero-role {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    color: rgb(var(--v-theme-on-surface-variant));
    font-weight: 400;
    line-height: 1.5;
}

.role-prefix {
    opacity: 0.6;
}

.role-accent {
    color: rgb(var(--v-theme-accent));
}

.hero-bio {
    font-family: 'Lora', Georgia, serif;
    font-size: 1.05rem;
    line-height: 1.85;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.78;
    max-width: 500px;
}

.cursor-blink {
    animation: blink 1s step-end infinite;
    color: rgb(var(--v-theme-accent));
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
}

.resume-btn {
    border-color: rgb(var(--v-theme-surface-variant));
    color: rgb(var(--v-theme-on-surface-variant));
    opacity: 0.5;
}

/* ── Photo ── */
.hero-right {
    padding-top: 40px;
    padding-bottom: 40px;
}

.photo-frame-wrapper {
    position: relative;
    display: inline-block;
}

.photo-glow {
    position: absolute;
    inset: -24px;
    background: radial-gradient(ellipse at center, rgba(212, 137, 10, 0.18) 0%, transparent 68%);
    pointer-events: none;
    border-radius: 20px;
}

.photo-frame {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(212, 137, 10, 0.25);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(212, 137, 10, 0.1);
}

.photo-fallback {
    width: 380px;
    height: 460px;
    background: rgb(var(--v-theme-surface));
}

.fallback-initials {
    font-family: 'Syne', sans-serif;
    font-size: 5rem;
    font-weight: 800;
    color: rgb(var(--v-theme-accent));
    opacity: 0.25;
    letter-spacing: 4px;
}

/* ── Floating tech badge ── */
.tech-badge {
    position: absolute;
    bottom: -16px;
    left: -20px;
    display: flex;
    align-items: center;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgba(212, 137, 10, 0.3);
    border-radius: 10px;
    padding: 10px 16px;
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.tech-badge-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
    letter-spacing: 0.3px;
}

/* ── Mobile ── */
@media (max-width: 1279px) {
    .hero-section { padding: 60px 24px; }
    .hero-content { min-height: auto; padding: 40px 0; }
    .hero-bio { max-width: 100%; }
}

@media (max-width: 600px) {
    .hero-section { padding: 40px 16px; }
}

@media (prefers-reduced-motion: reduce) {
    .status-dot { animation: none; }
    .cursor-blink { animation: none; }
}
</style>
```

**Step 2: Verify**

```bash
npm run dev
```

- Hero background is warm (ivory in light mode, espresso in dark)
- Lora italic "Hello, I'm" greeting appears above the name
- Photo glow is amber, not indigo
- Toggle theme in navbar — hero responds correctly in both modes

**Step 3: Commit**

```bash
git add src/components/home/HeroSection.vue
git commit -m "feat: Hero redesign — Lora greeting, amber photo glow, warm theme-aware background"
```

---

## Task 7: StatsGrid — warm amber restyling

**Files:**
- Modify: `src/components/home/StatsGrid.vue`

**Step 1: Replace the `<style scoped>` block only (keep template and script unchanged)**

```vue
<style scoped>
.stats-section {
    margin-top: 40px;
    padding: 20px 0;
}

.stat-card {
    padding: 20px 16px;
    border-radius: 14px;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}

.stat-card:hover {
    background: rgb(var(--v-theme-surface-variant));
    border-color: rgb(var(--v-theme-accent));
    transform: translateY(-4px);
}

.stat-number {
    color: rgb(var(--v-theme-accent)) !important;
    font-family: 'Syne', sans-serif;
}

.stat-label {
    color: rgb(var(--v-theme-on-surface-variant)) !important;
    font-family: 'DM Sans', sans-serif;
}
</style>
```

Also update the template: replace `class="stat-number text-accent text-h4 font-weight-bold"` with `class="stat-number text-h4 font-weight-bold"` and `class="stat-label text-white text-body-2 stat-opacity"` with `class="stat-label text-body-2"`.

**Step 2: Commit**

```bash
git add src/components/home/StatsGrid.vue
git commit -m "feat: StatsGrid warm amber restyling"
```

---

## Task 8: TechStackSection — warm restyling

**Files:**
- Modify: `src/components/home/TechStackSection.vue`

**Step 1: Replace hardcoded colors with CSS custom properties**

In the `<style scoped>` block, replace:

- `.tech-section { background: #1A252F; ... }` → `background: rgb(var(--v-theme-surface));`
- `.tech-chip` background: `rgba(0, 188, 212, 0.07)` → `rgba(212, 137, 10, 0.07)`
- `.tech-chip` border: `rgba(0, 188, 212, 0.22)` → `rgba(212, 137, 10, 0.22)`
- `.tech-chip` color: `rgba(255, 255, 255, 0.8)` → `rgb(var(--v-theme-on-surface))`
- `.tech-chip:hover` background → `rgba(212, 137, 10, 0.16)`
- `.tech-chip:hover` border → `rgba(212, 137, 10, 0.5)`
- `.tech-chip:hover` color → `rgb(var(--v-theme-on-surface))`
- `.marquee-fade-left` background → `linear-gradient(to right, rgb(var(--v-theme-surface)) 20%, transparent)`
- `.marquee-fade-right` background → `linear-gradient(to left, rgb(var(--v-theme-surface)) 20%, transparent)`

In the `<template>` section:
- Change `class="text-white"` on h2 → remove it (Vuetify theme handles text color)
- Change `class="text-accent"` on overline → keep (accent resolves to amber now)

**Step 2: Commit**

```bash
git add src/components/home/TechStackSection.vue
git commit -m "feat: TechStackSection warm amber chips, theme-aware marquee fades"
```

---

## Task 9: FeaturedWork — editorial project number

**Files:**
- Modify: `src/components/home/FeaturedWork.vue`

**Step 1: Update template — add project number, warm styling**

Replace the entire `<template>` section:

```vue
<template>
    <section class="featured-section">
        <v-container class="py-8 py-sm-16">
            <!-- Editorial section label -->
            <div class="section-label mb-2">01 — SPOTLIGHT</div>
            <h2 class="section-title mb-10">Featured Work</h2>

            <div class="featured-card">
                <v-row no-gutters align="stretch">
                    <!-- Image -->
                    <v-col cols="12" md="5" class="image-col">
                        <v-img
                            :src="featured.image"
                            :alt="featured.title"
                            height="100%"
                            min-height="340"
                            cover
                            class="featured-img"
                        >
                            <template v-slot:placeholder>
                                <div class="img-shimmer"></div>
                            </template>
                            <template v-slot:error>
                                <div class="fallback-bg d-flex align-center justify-center" style="height:100%">
                                    <v-icon icon="mdi-image-broken" size="64" style="opacity:0.2"></v-icon>
                                </div>
                            </template>
                            <div class="img-overlay"></div>
                        </v-img>
                    </v-col>

                    <!-- Content -->
                    <v-col cols="12" md="7">
                        <div class="content-side pa-8 pa-md-12 d-flex flex-column justify-center">
                            <div class="d-flex align-center ga-3 mb-5">
                                <v-chip color="success" size="small" variant="tonal" class="pulse-chip">
                                    <v-icon icon="mdi-circle" size="8" start></v-icon>
                                    Live Project
                                </v-chip>
                                <v-chip color="accent" size="small" variant="tonal">Full-Stack</v-chip>
                            </div>

                            <h3 class="featured-project-title mb-4">{{ featured.title }}</h3>

                            <p class="featured-desc mb-6">{{ featured.description }}</p>

                            <div class="mb-8">
                                <v-chip
                                    v-for="tech in featured.technologies"
                                    :key="tech"
                                    size="small"
                                    class="mr-2 mb-2"
                                    color="accent"
                                    variant="outlined"
                                >
                                    {{ tech }}
                                </v-chip>
                            </div>

                            <div class="d-flex flex-wrap ga-3">
                                <v-btn
                                    v-if="featured.liveUrl"
                                    color="accent"
                                    :href="featured.liveUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="large"
                                    class="px-6"
                                    elevation="3"
                                >
                                    <v-icon icon="mdi-open-in-new" start></v-icon>
                                    Visit Site
                                </v-btn>
                                <v-btn
                                    to="/projects"
                                    size="large"
                                    variant="outlined"
                                    color="accent"
                                    class="px-6"
                                >
                                    All Projects
                                    <v-icon icon="mdi-arrow-right" end></v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </section>
</template>
```

**Step 2: Replace `<style scoped>` block**

```vue
<style scoped>
.featured-section {
    background: rgb(var(--v-theme-background));
    border-top: 1px solid rgb(var(--v-theme-surface-variant));
}

.section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: rgb(var(--v-theme-on-background));
    letter-spacing: -0.5px;
}

.featured-card {
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    border-radius: 20px;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.featured-card:hover {
    border-color: rgba(212, 137, 10, 0.35);
    box-shadow: 0 0 40px rgba(212, 137, 10, 0.06);
}

.image-col { min-height: 220px; }

@media (min-width: 960px) {
    .image-col { min-height: 340px; }
}

.featured-img { width: 100%; height: 100%; }

.img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212, 137, 10, 0.06), rgba(0, 0, 0, 0.15));
}

.fallback-bg {
    background: rgb(var(--v-theme-surface-variant));
}

.content-side { min-height: auto; }

@media (min-width: 960px) {
    .content-side { min-height: 340px; }
}

.featured-project-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 800;
    color: rgb(var(--v-theme-on-surface));
    letter-spacing: -0.5px;
    line-height: 1.1;
}

.featured-desc {
    font-family: 'Lora', Georgia, serif;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.75;
    line-height: 1.85;
}

.pulse-chip {
    animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(74, 124, 89, 0.4); }
    50% { box-shadow: 0 0 0 6px rgba(74, 124, 89, 0); }
}
</style>
```

**Step 3: Commit**

```bash
git add src/components/home/FeaturedWork.vue
git commit -m "feat: FeaturedWork editorial section label, warm surfaces, Lora description"
```

---

## Task 10: SectionHeader — editorial style with section number prop

**Files:**
- Rewrite: `src/components/common/SectionHeader.vue`

**Step 1: Rewrite**

```vue
<template>
    <v-row>
        <v-col cols="12" class="mb-10">
            <div v-if="label" class="section-label mb-3">{{ label }}</div>
            <h2 class="section-header-title mb-4">{{ title }}</h2>
            <div class="section-header-rule"></div>
            <p v-if="subtitle" class="section-header-subtitle mt-4">{{ subtitle }}</p>
        </v-col>
    </v-row>
</template>

<script setup>
defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    label: { type: String, default: '' },
    dark: { type: Boolean, default: false }, // kept for backwards compatibility, unused
})
</script>

<style scoped>
.section-header-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.5px;
    color: rgb(var(--v-theme-on-background));
    line-height: 1.1;
}

.section-header-rule {
    width: 48px;
    height: 2px;
    background: rgb(var(--v-theme-accent));
    border-radius: 2px;
}

.section-header-subtitle {
    font-family: 'Lora', Georgia, serif;
    font-style: italic;
    font-size: 1.05rem;
    color: rgb(var(--v-theme-on-surface-variant));
    line-height: 1.7;
}
</style>
```

**Step 2: Update callers to pass `label` prop**

In `src/views/AboutPage.vue`, update:
```vue
<SectionHeader title="About Me" label="02 — ABOUT" subtitle="The story so far." />
```

In `src/views/ProjectsPage.vue`, update:
```vue
<SectionHeader title="Projects" label="03 — WORK" subtitle="What I've been building." />
```

In `src/views/ContactPage.vue`, update:
```vue
<SectionHeader title="Let's build something" label="04 — CONTACT" subtitle="Have a project in mind? I'd love to hear about it." />
```

**Step 3: Commit**

```bash
git add src/components/common/SectionHeader.vue src/views/AboutPage.vue src/views/ProjectsPage.vue src/views/ContactPage.vue
git commit -m "feat: SectionHeader editorial style with section label and amber rule"
```

---

## Task 11: ProfileCard — editorial pull quote layout

**Files:**
- Rewrite: `src/components/about/ProfileCard.vue`

**Step 1: Rewrite**

```vue
<template>
    <div class="profile-section fade-in mb-14">
        <v-row align="center" class="ga-6">
            <!-- Photo -->
            <v-col cols="12" md="3" class="text-center">
                <div class="profile-photo-wrap">
                    <v-avatar size="160" class="profile-avatar">
                        <v-img :src="store.personal.avatarUrl" alt="Profile photo"></v-img>
                    </v-avatar>
                    <div class="profile-photo-ring"></div>
                </div>
                <p class="profile-name mt-4">{{ store.personal.name }}</p>
                <p class="profile-title mt-1">{{ store.personal.title }}</p>
            </v-col>

            <!-- Pull quote bio -->
            <v-col cols="12" md="9">
                <div class="profile-quote-wrapper">
                    <div class="quote-mark" aria-hidden="true">&ldquo;</div>
                    <p class="pull-quote">{{ store.personal.bio }}</p>
                </div>
            </v-col>
        </v-row>

        <div class="section-rule mt-12"></div>
    </div>
</template>

<script setup>
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()
</script>

<style scoped>
.profile-photo-wrap {
    position: relative;
    display: inline-block;
}

.profile-avatar {
    border: 2px solid rgb(var(--v-theme-accent));
    position: relative;
    z-index: 1;
}

.profile-photo-ring {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px solid rgba(212, 137, 10, 0.25);
    pointer-events: none;
}

.profile-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
}

.profile-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    color: rgb(var(--v-theme-accent));
    font-weight: 500;
}

.profile-quote-wrapper {
    position: relative;
    padding-left: 24px;
    border-left: 2px solid rgb(var(--v-theme-accent));
}

.quote-mark {
    font-family: 'Lora', Georgia, serif;
    font-size: 5rem;
    line-height: 0.8;
    color: rgb(var(--v-theme-accent));
    opacity: 0.2;
    position: absolute;
    top: -8px;
    left: -8px;
    user-select: none;
}
</style>
```

**Step 2: Commit**

```bash
git add src/components/about/ProfileCard.vue
git commit -m "feat: ProfileCard editorial pull quote layout with Lora bio"
```

---

## Task 12: TimelineSection — amber dots, warm cards, editorial dates

**Files:**
- Rewrite: `src/components/about/TimelineSection.vue`

**Step 1: Rewrite**

```vue
<template>
    <section class="timeline-section my-12">
        <div class="section-label mb-3">MY JOURNEY</div>
        <h3 class="timeline-heading mb-10">The story so far</h3>

        <div class="timeline">
            <div
                v-for="(item, i) in milestones"
                :key="i"
                class="timeline-item"
                :style="{ animationDelay: `${i * 0.12}s` }"
            >
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-date">{{ item.date }}</span>
                    <h4 class="timeline-title mt-1">{{ item.title }}</h4>
                    <p class="timeline-desc mt-2">{{ item.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const milestones = [
    {
        date: 'Sep 2022',
        title: 'Started Software Engineering at Lithan EduClaaS',
        description: 'Began the journey into software engineering, diving into Java, Spring Framework, and foundational web technologies.',
    },
    {
        date: '2023',
        title: 'Built First Full-Stack Applications',
        description: 'Shipped three school projects — ABC Car Portal, ABC Job Portal, and Meals on Wheels — gaining hands-on experience with Spring Boot, MySQL, and REST APIs.',
    },
    {
        date: '2024',
        title: 'Expanded into Cloud & Modern Frontend',
        description: 'Levelled up to Vue.js, Fastify, and the GCP ecosystem (Cloud Run, Cloud SQL, Firebase). Began architecting cloud-native, production-grade applications.',
    },
    {
        date: '2025',
        title: 'Shipped CompareIP.sg to Production',
        description: "Launched a live, real-user platform serving Singapore's insurance market — end-to-end ownership from architecture to deployment.",
    },
]
</script>

<style scoped>
.timeline-section {
    max-width: 700px;
}

.timeline-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    color: rgb(var(--v-theme-on-background));
    letter-spacing: -0.3px;
}

.timeline {
    position: relative;
    padding-left: 36px;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 6px;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
        180deg,
        rgb(var(--v-theme-accent)) 0%,
        rgba(212, 137, 10, 0.1) 100%
    );
}

.timeline-item {
    position: relative;
    margin-bottom: 40px;
    animation: fadeSlideIn 0.5s ease both;
}

.timeline-item:last-child {
    margin-bottom: 0;
}

.timeline-dot {
    position: absolute;
    left: -30px;
    top: 6px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgb(var(--v-theme-accent));
    border: 2px solid rgb(var(--v-theme-background));
    box-shadow: 0 0 0 2px rgb(var(--v-theme-accent));
}

.timeline-content {
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    border-radius: 12px;
    padding: 18px 22px;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.timeline-content:hover {
    border-color: rgba(212, 137, 10, 0.35);
    box-shadow: 0 4px 16px rgba(212, 137, 10, 0.08);
}

.timeline-date {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgb(var(--v-theme-accent));
}

.timeline-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
    line-height: 1.4;
}

.timeline-desc {
    font-family: 'Lora', Georgia, serif;
    font-size: 0.92rem;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.72;
    line-height: 1.75;
}

@keyframes fadeSlideIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
    .timeline-item { animation: none; }
}
</style>
```

**Step 2: Commit**

```bash
git add src/components/about/TimelineSection.vue
git commit -m "feat: TimelineSection amber dots, warm surfaces, Lora descriptions"
```

---

## Task 13: FeatureCards — editorial 2×2 grid with amber numbers

**Files:**
- Rewrite: `src/components/about/FeatureCards.vue`

**Step 1: Rewrite**

```vue
<template>
    <div class="features-section mb-14">
        <div class="section-label mb-3">WHAT I BRING</div>
        <h3 class="features-heading mb-10">Core strengths</h3>

        <v-row>
            <v-col
                v-for="(feature, index) in store.features"
                :key="feature.title"
                cols="12"
                sm="6"
            >
                <div
                    class="feature-card fade-in"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                >
                    <div class="feature-number">{{ String(index + 1).padStart(2, '0') }}</div>
                    <h4 class="feature-title mt-4 mb-2">{{ feature.title }}</h4>
                    <p class="feature-desc">{{ feature.description }}</p>
                </div>
            </v-col>
        </v-row>

        <div class="section-rule mt-12"></div>
    </div>
</template>

<script setup>
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()
</script>

<style scoped>
.features-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 1.9rem);
    font-weight: 700;
    color: rgb(var(--v-theme-on-background));
    letter-spacing: -0.3px;
}

.feature-card {
    padding: 28px 28px 32px;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    border-radius: 16px;
    height: 100%;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.feature-card:hover {
    border-color: rgba(212, 137, 10, 0.35);
    box-shadow: 0 8px 28px rgba(212, 137, 10, 0.07);
    transform: translateY(-3px);
}

.feature-number {
    font-family: 'Syne', sans-serif;
    font-size: 2.8rem;
    font-weight: 800;
    color: rgb(var(--v-theme-accent));
    opacity: 0.3;
    line-height: 1;
    letter-spacing: -2px;
}

.feature-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
}

.feature-desc {
    font-family: 'Lora', Georgia, serif;
    font-size: 0.92rem;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.72;
    line-height: 1.75;
}
</style>
```

**Step 2: Commit**

```bash
git add src/components/about/FeatureCards.vue
git commit -m "feat: FeatureCards editorial 2x2 grid with amber numbers"
```

---

## Task 14: SkillsSection — warm grouped pill tags

**Files:**
- Rewrite: `src/components/about/SkillsSection.vue`

**Step 1: Rewrite**

```vue
<template>
    <div class="skills-section mb-8">
        <div class="section-label mb-3">TECHNICAL SKILLS</div>
        <h3 class="skills-heading mb-10">What I work with</h3>

        <v-row>
            <v-col cols="12" md="4" v-for="(group, key) in skillGroups" :key="key">
                <div class="skill-group">
                    <div class="skill-group-header mb-4">
                        <v-icon :icon="group.icon" color="accent" size="18" class="mr-2"></v-icon>
                        <span class="skill-group-label">{{ group.label }}</span>
                    </div>
                    <div class="skill-tags">
                        <span
                            v-for="skill in group.skills"
                            :key="skill"
                            class="skill-tag"
                        >{{ skill }}</span>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()

const skillGroups = computed(() => ({
    frontend: {
        label: 'Frontend',
        icon: 'mdi-vuejs',
        skills: store.skills.frontend,
    },
    backend: {
        label: 'Backend',
        icon: 'mdi-server',
        skills: store.skills.backend,
    },
    cloud: {
        label: 'Cloud (GCP)',
        icon: 'mdi-cloud',
        skills: store.skills.cloud,
    },
}))
</script>

<style scoped>
.skills-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 1.9rem);
    font-weight: 700;
    color: rgb(var(--v-theme-on-background));
    letter-spacing: -0.3px;
}

.skill-group {
    margin-bottom: 32px;
}

.skill-group-header {
    display: flex;
    align-items: center;
}

.skill-group-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgb(var(--v-theme-on-surface-variant));
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill-tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    padding: 5px 14px;
    border-radius: 99px;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    color: rgb(var(--v-theme-on-surface));
    transition: border-color 0.2s ease, background 0.2s ease;
    cursor: default;
}

.skill-tag:hover {
    border-color: rgb(var(--v-theme-accent));
    background: rgba(212, 137, 10, 0.07);
}
</style>
```

**Step 2: Commit**

```bash
git add src/components/about/SkillsSection.vue
git commit -m "feat: SkillsSection warm grouped pill tags"
```

---

## Task 15: ProjectsPage + ProjectCard — pill filter, editorial cards

**Files:**
- Rewrite: `src/views/ProjectsPage.vue`
- Rewrite: `src/components/projects/ProjectCard.vue`

**Step 1: Rewrite ProjectsPage.vue**

```vue
<template>
    <v-main class="projects-page">
        <v-container class="section-spacing">
            <SectionHeader title="Projects" label="03 — WORK" subtitle="What I've been building." />

            <!-- Warm pill filter -->
            <div class="filter-bar mb-8">
                <span class="filter-label">Filter:</span>
                <div class="filter-pills">
                    <button
                        class="filter-pill"
                        :class="{ active: selectedTechs.length === 0 }"
                        @click="selectedTechs = []"
                    >All</button>
                    <button
                        v-for="tech in allTechnologies"
                        :key="tech"
                        class="filter-pill"
                        :class="{ active: selectedTechs.includes(tech) }"
                        @click="toggleTech(tech)"
                    >{{ tech }}</button>
                </div>
            </div>

            <v-row>
                <v-col
                    v-for="(project, index) in filteredProjects"
                    :key="project.title"
                    cols="12"
                    md="6"
                    class="fade-in"
                    :style="{ animationDelay: `${index * 0.08}s` }"
                >
                    <ProjectCard :project="project" :index="index" />
                </v-col>
            </v-row>

            <div v-if="filteredProjects.length === 0" class="text-center py-12">
                <v-icon icon="mdi-filter-off" size="48" color="accent" class="mb-4" style="opacity:0.4"></v-icon>
                <p class="no-results">No projects match the selected filters.</p>
            </div>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'
import SectionHeader from '../components/common/SectionHeader.vue'
import ProjectCard from '../components/projects/ProjectCard.vue'

const store = usePortfolioStore()
const selectedTechs = ref([])

const allTechnologies = computed(() =>
    [...new Set(store.projects.flatMap(p => p.technologies))].sort()
)

const filteredProjects = computed(() => {
    if (selectedTechs.value.length === 0) return store.projects
    return store.projects.filter(p =>
        selectedTechs.value.every(t => p.technologies.includes(t))
    )
})

function toggleTech(tech) {
    const idx = selectedTechs.value.indexOf(tech)
    if (idx === -1) {
        selectedTechs.value = [...selectedTechs.value, tech]
    } else {
        selectedTechs.value = selectedTechs.value.filter(t => t !== tech)
    }
}

onMounted(() => {
    const cache = []
    store.projects.forEach(({ image }) => {
        if (!image || image.includes('onedrive.live.com/embed')) return
        const img = new Image()
        img.src = image
        cache.push(img)
    })
})
</script>

<style scoped>
.projects-page {
    background: rgb(var(--v-theme-background));
    min-height: calc(100vh - 72px);
}

.filter-bar {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    flex-wrap: wrap;
}

.filter-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgb(var(--v-theme-on-surface-variant));
    padding-top: 6px;
    flex-shrink: 0;
}

.filter-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.filter-pill {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    padding: 5px 16px;
    border-radius: 99px;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    color: rgb(var(--v-theme-on-surface));
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.filter-pill:hover {
    border-color: rgb(var(--v-theme-accent));
}

.filter-pill.active {
    background: rgb(var(--v-theme-accent));
    border-color: rgb(var(--v-theme-accent));
    color: rgb(var(--v-theme-on-accent));
}

.no-results {
    font-family: 'Lora', Georgia, serif;
    color: rgb(var(--v-theme-on-surface-variant));
    font-style: italic;
}
</style>
```

**Step 2: Rewrite ProjectCard.vue**

```vue
<template>
    <div class="project-card">
        <!-- Image -->
        <div class="project-image-wrap">
            <v-img :src="project.image" :alt="project.title" height="220" cover class="project-img">
                <template v-slot:default>
                    <div v-if="project.liveUrl" class="live-badge-wrapper">
                        <span class="live-badge">LIVE</span>
                    </div>
                    <div class="project-number-overlay">{{ String(index + 1).padStart(2, '0') }}</div>
                </template>
                <template v-slot:placeholder>
                    <div class="img-shimmer"></div>
                </template>
                <template v-slot:error>
                    <div class="fallback-image d-flex align-center justify-center">
                        <v-icon icon="mdi-image-broken" size="48" style="opacity:0.3"></v-icon>
                    </div>
                </template>
            </v-img>
        </div>

        <!-- Content -->
        <div class="project-content">
            <h3 class="project-title mb-2">{{ project.title }}</h3>
            <p class="project-desc mb-4">{{ project.description }}</p>

            <div class="project-tags mb-5">
                <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="project-tag"
                >{{ tech }}</span>
            </div>

            <div class="d-flex flex-wrap ga-2">
                <v-btn
                    v-if="project.liveUrl"
                    color="accent"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="flat"
                    size="small"
                    class="flex-grow-1"
                >
                    <v-icon icon="mdi-open-in-new" start></v-icon>
                    Live Demo
                </v-btn>
                <v-btn
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    color="accent"
                    size="small"
                    class="flex-grow-1"
                >
                    <v-icon icon="mdi-github" start></v-icon>
                    View Code
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    project: { type: Object, required: true },
    index: { type: Number, default: 0 },
})
</script>

<style scoped>
.project-card {
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    border-radius: 18px;
    overflow: hidden;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.project-card:hover {
    border-color: rgba(212, 137, 10, 0.4);
    box-shadow: 0 8px 32px rgba(212, 137, 10, 0.1);
    transform: translateY(-3px);
}

.project-image-wrap {
    position: relative;
    overflow: hidden;
}

.project-img {
    transition: transform 0.4s ease;
}

.project-card:hover .project-img {
    transform: scale(1.03);
}

.live-badge-wrapper {
    position: absolute;
    top: 12px;
    right: 12px;
}

.live-badge {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 2px;
    padding: 4px 10px;
    border-radius: 99px;
    background: rgb(var(--v-theme-success));
    color: white;
}

.project-number-overlay {
    position: absolute;
    bottom: 10px;
    left: 14px;
    font-family: 'Syne', sans-serif;
    font-size: 2.5rem;
    font-weight: 800;
    color: white;
    opacity: 0.12;
    line-height: 1;
    letter-spacing: -2px;
    user-select: none;
}

.fallback-image {
    height: 220px;
    background: rgb(var(--v-theme-surface-variant));
}

.project-content {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.project-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
    letter-spacing: -0.2px;
    line-height: 1.3;
}

.project-desc {
    font-family: 'Lora', Georgia, serif;
    font-size: 0.9rem;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.72;
    line-height: 1.75;
    flex: 1;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.project-tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 99px;
    background: rgba(212, 137, 10, 0.08);
    border: 1px solid rgba(212, 137, 10, 0.2);
    color: rgb(var(--v-theme-accent));
}
</style>
```

**Step 3: Commit**

```bash
git add src/views/ProjectsPage.vue src/components/projects/ProjectCard.vue
git commit -m "feat: Projects page warm pill filter, editorial project cards with number overlay"
```

---

## Task 16: ContactPage + ContactForm + ContactInfo — warm editorial

**Files:**
- Modify: `src/views/ContactPage.vue`
- Modify: `src/components/contact/ContactForm.vue`
- Modify: `src/components/contact/ContactInfo.vue`

**Step 1: Update ContactPage.vue**

The view already uses SectionHeader — just ensure the label is passed (done in Task 10).
Also update the background color:

```vue
<template>
    <v-main class="contact-page">
        <v-container class="section-spacing">
            <SectionHeader title="Let's build something" label="04 — CONTACT" subtitle="Have a project in mind? I'd love to hear about it." />
            <v-row>
                <v-col cols="12" md="7">
                    <ContactForm />
                </v-col>
                <v-col cols="12" md="5">
                    <ContactInfo />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup>
import SectionHeader from '../components/common/SectionHeader.vue'
import ContactForm from '../components/contact/ContactForm.vue'
import ContactInfo from '../components/contact/ContactInfo.vue'
</script>

<style scoped>
.contact-page {
    background: rgb(var(--v-theme-background));
    min-height: calc(100vh - 72px);
}
</style>
```

**Step 2: Update ContactForm.vue**

Replace only the `<style scoped>` block and update the card header:

In the template, replace `<v-card-title class="text-h5 font-weight-bold pa-6 bg-primary text-white">` with:
```vue
<v-card-title class="form-card-title pa-6">
    <v-icon icon="mdi-email-edit" start color="accent"></v-icon>
    Send Me a Message
</v-card-title>
```

Replace `<style scoped>`:
```vue
<style scoped>
.contact-card {
    border-top: 3px solid rgb(var(--v-theme-accent));
    background: rgb(var(--v-theme-surface));
}

.form-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
    border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
}
</style>
```

**Step 3: Update ContactInfo.vue**

Replace `<v-card-title class="text-h5 font-weight-bold pa-6 bg-secondary text-white">` with:
```vue
<v-card-title class="info-card-title pa-6">
    <v-icon icon="mdi-information" start color="accent"></v-icon>
    Contact Information
</v-card-title>
```

Add to the `<style scoped>` block:
```css
.contact-info-card {
    height: 100%;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
}

.info-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
    border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
}
```

**Step 4: Commit**

```bash
git add src/views/ContactPage.vue src/components/contact/ContactForm.vue src/components/contact/ContactInfo.vue
git commit -m "feat: Contact page warm editorial styling, amber accent borders"
```

---

## Task 17: Footer — warm palette

**Files:**
- Modify: `src/components/Footer.vue`

**Step 1: Replace `color="secondary"` with `color="surface"` on v-footer**

Change `<v-footer app color="secondary" dark class="footer-enhanced">` to:
```vue
<v-footer app color="surface" class="footer-enhanced">
```

Remove `dark` prop — theme handles text color automatically.

**Step 2: Update social btn color**

Change `color="white"` on social v-btn to `color="accent"`.

**Step 3: Replace `<style scoped>` block**

```vue
<style scoped>
.footer-enhanced {
    margin-top: auto;
    border-top: 1px solid rgb(var(--v-theme-surface-variant));
}

.social-btn {
    transition: transform 0.25s ease;
}

.social-btn:hover {
    transform: scale(1.12);
}

.footer-link :deep(.v-list-item-title) {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    color: rgb(var(--v-theme-on-surface-variant));
    transition: color 0.2s ease;
}

.footer-link:hover :deep(.v-list-item-title) {
    color: rgb(var(--v-theme-accent));
}
</style>
```

**Step 4: Commit**

```bash
git add src/components/Footer.vue
git commit -m "feat: Footer warm surface palette, amber social icons"
```

---

## Task 18: NotFoundPage — warm decorative 404

**Files:**
- Rewrite: `src/views/NotFoundPage.vue`

**Step 1: Rewrite**

```vue
<template>
    <v-main class="not-found-page">
        <div class="not-found-wrapper d-flex align-center justify-center">
            <div class="text-center px-4">
                <div class="error-bg-text" aria-hidden="true">404</div>
                <div class="error-content">
                    <p class="not-found-label mb-2">Page not found</p>
                    <h1 class="not-found-heading mb-4">You've wandered off the map.</h1>
                    <p class="not-found-desc mb-10">
                        The page you're looking for doesn't exist, or has moved somewhere else.
                    </p>
                    <v-btn color="accent" size="large" to="/" class="px-10">
                        <v-icon icon="mdi-home" start></v-icon>
                        Back to Home
                    </v-btn>
                </div>
            </div>
        </div>
    </v-main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
    console.warn('[404]', route.fullPath)
})
</script>

<style scoped>
.not-found-page {
    background: rgb(var(--v-theme-background));
}

.not-found-wrapper {
    min-height: calc(100vh - 72px);
    position: relative;
    overflow: hidden;
}

.error-bg-text {
    position: absolute;
    font-family: 'Syne', sans-serif;
    font-size: clamp(12rem, 30vw, 22rem);
    font-weight: 800;
    color: rgb(var(--v-theme-accent));
    opacity: 0.04;
    line-height: 1;
    letter-spacing: -8px;
    user-select: none;
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
}

.error-content {
    position: relative;
    z-index: 1;
}

.not-found-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgb(var(--v-theme-accent));
}

.not-found-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: rgb(var(--v-theme-on-background));
    letter-spacing: -0.5px;
}

.not-found-desc {
    font-family: 'Lora', Georgia, serif;
    font-style: italic;
    font-size: 1.05rem;
    color: rgb(var(--v-theme-on-surface-variant));
    max-width: 380px;
    margin-inline: auto;
    line-height: 1.75;
}
</style>
```

**Step 2: Commit**

```bash
git add src/views/NotFoundPage.vue
git commit -m "feat: 404 page warm decorative background text, Lora description"
```

---

## Task 19: AboutPage view — remove container background interference

**Files:**
- Modify: `src/views/AboutPage.vue`

**Step 1: Ensure background is theme-aware**

The current file has no `<style>` block so Vuetify handles background via `v-main`. Confirm `v-main` inherits `background: rgb(var(--v-theme-background))`. Add a scoped style if needed:

```vue
<style scoped>
:deep(.v-main) {
    background: rgb(var(--v-theme-background)) !important;
}
</style>
```

**Step 2: Commit**

```bash
git add src/views/AboutPage.vue
git commit -m "fix: AboutPage explicit theme-aware background"
```

---

## Task 20: Final verification — build + visual check both modes

**Step 1: Build**

```bash
npm run build
```

Expected: No errors. Check for any TypeScript or Vite warnings.

**Step 2: Preview**

```bash
npm run preview
```

Open `http://localhost:4173/HenryPoliquit/` in browser.

**Visual checklist (light mode — click sun icon):**
- [ ] Background is warm ivory (`#FAF7F2`)
- [ ] Body text renders in Lora serif
- [ ] Section headings are Syne
- [ ] Hero has amber glow behind photo, Lora italic greeting
- [ ] Navbar is ivory with amber PH monogram
- [ ] TechStack chips are amber-tinted
- [ ] Featured Work has editorial section label "01 — SPOTLIGHT"
- [ ] About page bio is a Lora italic pull quote
- [ ] Timeline has amber dots and warm surface cards
- [ ] Feature cards have amber number overlays (01–04)
- [ ] Skills render as warm pill tags
- [ ] Projects use pill filter buttons (no v-select)
- [ ] Project cards have project number overlays
- [ ] Contact page reads "Let's build something"
- [ ] Footer has amber social icons
- [ ] 404 page has decorative ghost "404" in background

**Visual checklist (dark mode — click moon icon):**
- [ ] Background is deep espresso (`#18140F`)
- [ ] All cards use warm charcoal surface
- [ ] Amber accent still pops clearly
- [ ] No cold indigo/navy anywhere
- [ ] Theme persists on page reload (localStorage)

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: Editorial Warmth redesign complete — warm dual-mode portfolio"
```
