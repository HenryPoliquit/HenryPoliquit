<template>
    <v-main>
        <v-container class="section-spacing">
            <SectionHeader title="ABOUT ME" />
            <ProfileCard />
            <FeatureCards />
            <SkillsSection />
        </v-container>
    </v-main>
</template>

<script setup>
import SectionHeader from '../components/common/SectionHeader.vue'
import ProfileCard from '../components/about/ProfileCard.vue'
import FeatureCards from '../components/about/FeatureCards.vue'
import SkillsSection from '../components/about/SkillsSection.vue'
</script>
