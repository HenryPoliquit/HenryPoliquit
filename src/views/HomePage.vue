<template>
    <v-main class="home-page">
        <HeroSection />
        <CaseStudy />
        <FoundationsOrbit />
        <NowStatus />
    </v-main>
</template>

<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import CaseStudy from '../components/projects/CaseStudy.vue'
// Home shows the coursework as a spinning card index; /projects keeps the
// flat ruled list, because that page's job is reading, not first impression.
import FoundationsOrbit from '../components/projects/FoundationsOrbit.vue'
import NowStatus from '../components/common/NowStatus.vue'
</script>

<style scoped>
.home-page {
    background: rgb(var(--v-theme-background));
}
</style>
