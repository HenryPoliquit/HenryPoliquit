<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-app-bar app :elevation="0" class="bar" color="background" height="64">
        <v-container fluid class="d-flex align-center px-4 px-md-8">
            <div class="brand-section" @click="handleLogoClick">
                <router-link to="/" class="brand-link">
                    <span class="monogram">PHP</span>
                    <span class="brand-name d-none d-sm-inline">Poliquit</span>
                </router-link>
            </div>

            <v-spacer></v-spacer>

            <nav class="d-none d-md-flex align-center ga-1" aria-label="Primary">
                <router-link
                    v-for="item in store.navItems"
                    :key="item.path"
                    :to="item.path"
                    class="nav-link fig"
                    :class="{ 'is-active': isActive(item.path) }"
                    :aria-current="isActive(item.path) ? 'page' : undefined"
                >{{ item.title }}</router-link>
            </nav>

            <v-btn
                :icon="isDark ? mdiWeatherSunny : mdiWeatherNight"
                variant="text"
                color="on-background"
                size="small"
                class="ml-4"
                :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                @click="toggleTheme"
            ></v-btn>

            <v-app-bar-nav-icon
                class="d-md-none ml-1"
                color="on-background"
                aria-label="Open navigation menu"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
        </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary location="right" width="260" color="background">
        <nav class="drawer-nav" aria-label="Primary">
            <p class="col-head drawer-head">Contents</p>
            <router-link
                v-for="item in store.navItems"
                :key="item.path"
                :to="item.path"
                class="drawer-link fig"
                :class="{ 'is-active': isActive(item.path) }"
                :aria-current="isActive(item.path) ? 'page' : undefined"
                @click="drawer = false"
            >{{ item.title }}</router-link>
        </nav>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { mdiWeatherSunny, mdiWeatherNight, mdiStarShooting } from '@mdi/js'
import { usePortfolioStore } from '../stores/portfolio'

const route = useRoute()
const drawer = ref(false)
const store = usePortfolioStore()
const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)

function toggleTheme() {
    const next = isDark.value ? 'warmLight' : 'warmDark'
    theme.change(next)
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
        store.recordDiscovery('logo')
        store.showSnackbar('Easter egg. Now try the Konami Code: ↑↑↓↓←→←→BA', 'accent', mdiStarShooting)
        console.log('%cEaster egg found. Now try: ↑↑↓↓←→←→BA', 'color:#8C2F39;font-weight:bold;font-size:13px;')
    } else {
        logoTimer = setTimeout(() => { logoClicks = 0 }, 2000)
    }
}
</script>

<style scoped>
.bar {
    border-bottom: var(--rule);
}

.brand-link {
    display: inline-flex;
    align-items: baseline;
    gap: 10px;
    color: inherit;
}

.monogram {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    color: rgb(var(--v-theme-on-accent));
    background: rgb(var(--v-theme-accent));
    padding: 3px 6px;
    line-height: 1;
}

.brand-name {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 700;
    font-stretch: 80%;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: rgb(var(--v-theme-on-background));
}

.nav-link {
    padding: 6px 10px;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: lowercase;
    color: rgb(var(--v-theme-on-surface-variant));
    border-bottom: 1px solid transparent;
    transition: color 0.2s var(--ease-out), border-color 0.2s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .nav-link:hover {
        color: rgb(var(--v-theme-on-background));
    }
}


.nav-link.is-active {
    color: rgb(var(--v-theme-accent));
    border-bottom-color: rgb(var(--v-theme-accent));
}

.drawer-nav {
    display: flex;
    flex-direction: column;
    padding: 24px 20px;
}

.drawer-head {
    margin-bottom: 16px;
}

.drawer-link {
    padding: 14px 0;
    font-size: 0.9rem;
    color: rgb(var(--v-theme-on-background));
    border-bottom: var(--rule);
}

.drawer-link.is-active {
    color: rgb(var(--v-theme-accent));
}
</style>
