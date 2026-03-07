<template>
    <v-main>
        <v-container class="section-spacing">
            <SectionHeader title="About Me" label="02 — ABOUT" subtitle="The story so far." />
            <ProfileCard />
            <TimelineSection />
            <FeatureCards />
            <SkillsSection />
        </v-container>
    </v-main>
</template>

<script setup>
import SectionHeader from '../components/common/SectionHeader.vue'
import ProfileCard from '../components/about/ProfileCard.vue'
import TimelineSection from '../components/about/TimelineSection.vue'
import FeatureCards from '../components/about/FeatureCards.vue'
import SkillsSection from '../components/about/SkillsSection.vue'
</script>
