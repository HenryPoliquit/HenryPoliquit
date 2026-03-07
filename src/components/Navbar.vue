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
