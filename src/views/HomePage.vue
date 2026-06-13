<template>
    <v-main class="home-page">
        <HeroSection />
        <NowStatus />
        <TechStackSection />
        <FeaturedWork />
    </v-main>
</template>

<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import NowStatus from '../components/common/NowStatus.vue'
import TechStackSection from '../components/home/TechStackSection.vue'
import FeaturedWork from '../components/home/FeaturedWork.vue'
</script>

<style scoped>
.home-page {
    background: rgb(var(--v-theme-background));
}
</style>
