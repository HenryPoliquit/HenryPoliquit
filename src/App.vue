<template>
  <v-app>
    <a href="#main-content" class="skip-link">Skip to content</a>

    <!-- Paper grain -->
    <div class="grain-overlay" aria-hidden="true"></div>

    <v-layout id="main-content">
      <Navbar />
      <div class="page-flow">
        <router-view v-slot="{ Component }">
          <KeepAlive :max="6">
            <component :is="Component" :key="$route.path" />
          </KeepAlive>
        </router-view>
        <Footer />
      </div>
    </v-layout>

    <BackToTop />

    <v-snackbar
      v-model="store.snackbar.show"
      :color="store.snackbar.color"
      :timeout="4000"
      location="bottom right"
      rounded="0"
      elevation="0"
      content-class="doc-snackbar"
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
import { onMounted } from 'vue'
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

// ── Hydrate content from Supabase (falls back to hardcoded defaults on failure) ──
store.loadContent()
store.fetchDiscoveryCount()
store.subscribeDiscoveries()

// ── Theme persistence ─────────────────────────────────────────────────────
onMounted(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved && (saved === 'warmLight' || saved === 'warmDark')) {
        theme.change(saved)
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        theme.change(prefersDark ? 'warmDark' : 'warmLight')
    }
})

// The snackbar is now reserved for things the visitor did — form results and
// easter eggs. Unprompted greetings on load were noise.
</script>

<style>
.doc-snackbar {
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 500;
}

/* The page and its footer share one column, so the footer flows after the
   content instead of being positioned by Vuetify's layout system. The
   min-height keeps it off the fold on short pages. */
.page-flow {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-width: 0;
    min-height: 100vh;
}

.page-flow > :deep(.v-main) {
    flex: 1 0 auto;
}

.page-flow > :deep(.v-footer) {
    flex: 0 0 auto;
}

.skip-link {
    position: absolute;
    top: -100%;
    left: 8px;
    z-index: 9999;
    padding: 8px 16px;
    background: rgb(var(--v-theme-accent));
    color: rgb(var(--v-theme-on-accent));
    font-family: var(--font-mono);
    font-size: 0.8rem;
    transition: top 0.2s;
}

.skip-link:focus {
    top: 0;
}
</style>
