<template>
    <v-main class="home-page">
        <HeroSection />
        <TechStackSection />
        <FeaturedWork />
    </v-main>
</template>

<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import TechStackSection from '../components/home/TechStackSection.vue'
import FeaturedWork from '../components/home/FeaturedWork.vue'
</script>

<style scoped>
.home-page {
    background: #0F1419;
}
</style>
