<template>
    <v-main class="about-page">
        <v-container class="page-top">
            <SectionHeader
                tag="h1"
                title="About"
                label="Who is issuing this"
                subtitle="Where I work from, how I got here, and what I actually use."
            />
        </v-container>

        <section class="band band--open">
            <v-container><ProfileCard /></v-container>
        </section>

        <section class="band">
            <v-container><TimelineSection /></v-container>
        </section>

        <section class="band">
            <v-container><SkillsSection /></v-container>
        </section>
    </v-main>
</template>

<script setup>
import SectionHeader from '../components/common/SectionHeader.vue'
import ProfileCard from '../components/about/ProfileCard.vue'
import TimelineSection from '../components/about/TimelineSection.vue'
import SkillsSection from '../components/about/SkillsSection.vue'
</script>

<style scoped>
.about-page {
    background: rgb(var(--v-theme-background));
}

.page-top {
    padding-top: clamp(40px, 8vh, 80px);
    padding-bottom: var(--band-y);
}
</style>
