<template>
  <v-app>
    <!-- Cursor glow follows mouse — hidden on touch/reduced-motion -->
    <div class="cursor-glow" :style="glowStyle" aria-hidden="true"></div>

    <v-layout>
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

    <!-- Global snackbar — all store.showSnackbar() calls render here -->
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
        <v-btn variant="text" size="small" color="white" @click="store.hideSnackbar">Dismiss</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import './assets/style.css'
import { usePortfolioStore } from './stores/portfolio'
import { useEasterEggs } from './composables/useEasterEggs'

const store = usePortfolioStore()
useEasterEggs()

// ── Time-based welcome greeting on first load ─────────────────────────────
onMounted(() => {
    setTimeout(() => {
        const h = new Date().getHours()
        const greeting = h < 12 ? '☀️ Good morning!' : h < 18 ? '🌤️ Good afternoon!' : '🌙 Good evening!'
        store.showSnackbar(`${greeting} Welcome to my portfolio.`, 'primary', 'mdi-human-greeting')
    }, 1500)
})

// ── Contextual page messages on navigation ────────────────────────────────
const route = useRoute()
const routeMessages = {
    '/about':    { msg: 'Get to know me a bit better! 👋', color: 'primary', icon: 'mdi-account' },
    '/projects': { msg: "Here's what I've been building! 🚀", color: 'accent', icon: 'mdi-briefcase' },
    '/contact':  { msg: "Let's build something together! 📬", color: 'success', icon: 'mdi-email' },
}
watch(() => route.path, (path) => {
    const cfg = routeMessages[path]
    if (cfg) store.showSnackbar(cfg.msg, cfg.color, cfg.icon)
})

// ── Cursor glow: use transform (GPU-composited, no layout cost) ───────────
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
/* ── Page transitions ── */
.page-enter-active,
.page-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from {
    opacity: 0;
    transform: translateY(12px);
}
.page-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
    .page-enter-active,
    .page-leave-active { transition: none; }
}

/* ── Cursor glow ── */
.cursor-glow {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 188, 212, 0.10) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    will-change: transform;
}

@media (prefers-reduced-motion: reduce),
       (hover: none) {
    .cursor-glow { display: none; }
}
</style>
