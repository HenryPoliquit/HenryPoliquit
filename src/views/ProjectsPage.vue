<template>
    <v-main class="projects-page">
        <v-container class="page-top">
            <SectionHeader
                tag="h1"
                title="Work"
                label="Record of work"
                subtitle="One thing in production, and the coursework that got me there."
            />
        </v-container>

        <CaseStudy />
        <FoundationsList />
    </v-main>
</template>

<script setup>
import SectionHeader from '../components/common/SectionHeader.vue'
import CaseStudy from '../components/projects/CaseStudy.vue'
import FoundationsList from '../components/projects/FoundationsList.vue'
</script>

<style scoped>
.projects-page {
    background: rgb(var(--v-theme-background));
}

.page-top {
    padding-top: clamp(40px, 8vh, 80px);
    padding-bottom: var(--band-y);
}
</style>
