<template>
    <v-app-bar app :elevation="scrolled ? 8 : 0" :class="{ 'navbar-scrolled': scrolled }" color="primary" dark
        height="72">
        <v-container fluid class="d-flex align-center px-4 px-md-8">
            <!-- Logo/Brand -->
            <div class="brand-section" @click="handleLogoClick">
                <router-link to="/" class="brand-link d-flex align-center">
                    <v-avatar color="accent" size="40" class="mr-3">
                        <span class="text-h6 font-weight-bold">PH</span>
                    </v-avatar>
                    <div class="d-none d-sm-block">
                        <div class="brand-name text-h6 font-weight-bold">Paul Henry Poliquit</div>
                        <div class="brand-subtitle text-caption">Software Engineer</div>
                    </div>
                </router-link>
            </div>

            <v-spacer></v-spacer>

            <!-- Desktop Navigation -->
            <nav class="d-none d-md-flex align-center">
                <v-btn v-for="item in store.navItems" :key="item.path" :to="item.path"
                    :class="{ 'nav-link-active': isActive(item.path) }" class="nav-link mx-1" variant="text"
                    size="large">
                    <v-icon :icon="item.icon" size="20" class="mr-2"></v-icon>
                    {{ item.title }}
                </v-btn>
            </nav>

            <!-- Mobile Menu Button -->
            <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none ml-2" size="large"></v-app-bar-nav-icon>
        </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary location="right" width="280" class="mobile-drawer">
        <v-list class="pa-4" nav>
            <v-list-item class="mb-4">
                <v-list-item-title class="text-h6 font-weight-bold">Menu</v-list-item-title>
            </v-list-item>

            <v-divider class="mb-4"></v-divider>

            <v-list-item v-for="item in store.navItems" :key="item.path" :to="item.path" :prepend-icon="item.icon"
                :title="item.title" :active="isActive(item.path)" @click="drawer = false" class="mb-2 rounded-lg"
                color="accent"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useScroll } from '../composables/useScroll'
import { usePortfolioStore } from '../stores/portfolio'

const route = useRoute()
const drawer = ref(false)
const { scrolled } = useScroll()
const store = usePortfolioStore()

const isActive = (path) => route.path === path

// Easter egg: 5 rapid logo clicks → snackbar hint
let logoClicks = 0
let logoTimer = null

function handleLogoClick() {
    logoClicks++
    clearTimeout(logoTimer)
    if (logoClicks >= 5) {
        logoClicks = 0
        store.showSnackbar('✨ Easter egg! Try the Konami Code: ↑↑↓↓←→←→BA', 'accent', 'mdi-star-shooting')
        console.log('%c✨ Easter egg found! Now try: ↑↑↓↓←→←→BA', 'color:#00BCD4;font-weight:bold;font-size:13px;')
    } else {
        logoTimer = setTimeout(() => { logoClicks = 0 }, 2000)
    }
}
</script>

<style scoped>
.navbar-scrolled {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, #2C3E50 0%, #1A252F 100%) !important;
}

.brand-link {
    text-decoration: none;
    color: inherit;
    transition: opacity 0.3s ease;
}

.brand-link:hover {
    opacity: 0.9;
}

.brand-name {
    line-height: 1.2;
    letter-spacing: 0.5px;
}

.brand-subtitle {
    opacity: 0.8;
    line-height: 1;
    margin-top: 2px;
}

.nav-link {
    position: relative;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 80%;
    height: 2px;
    background: #00BCD4;
    transition: transform 0.3s ease;
}

.nav-link:hover::after {
    transform: translateX(-50%) scaleX(1);
}

.nav-link-active {
    background: rgba(0, 188, 212, 0.1);
}

.nav-link-active::after {
    transform: translateX(-50%) scaleX(1);
}

.mobile-drawer {
    background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
}

.mobile-drawer :deep(.v-list-item) {
    border-radius: 12px;
}

.mobile-drawer :deep(.v-list-item--active) {
    background: rgba(0, 188, 212, 0.15);
    border-left: 4px solid #00BCD4;
}
</style>
