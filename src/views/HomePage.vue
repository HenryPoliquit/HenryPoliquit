<template>
    <v-main class="home-page">
        <HeroSection />
        <CaseStudy />
        <FoundationsList />
        <NowStatus />
    </v-main>
</template>

<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import CaseStudy from '../components/projects/CaseStudy.vue'
import FoundationsList from '../components/projects/FoundationsList.vue'
import NowStatus from '../components/common/NowStatus.vue'
</script>

<style scoped>
.home-page {
    background: rgb(var(--v-theme-background));
}
</style>
