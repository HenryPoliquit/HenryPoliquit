<template>
    <v-main class="projects-page">
        <v-container class="section-spacing">
            <SectionHeader title="PROJECTS" subtitle="What I've been building" :dark="true" />
            <v-row>
                <v-col
                    v-for="(project, index) in store.projects"
                    :key="project.title"
                    cols="12"
                    md="6"
                    class="fade-in"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                >
                    <ProjectCard :project="project" />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script setup>
import { usePortfolioStore } from '../stores/portfolio'
import SectionHeader from '../components/common/SectionHeader.vue'
import ProjectCard from '../components/projects/ProjectCard.vue'

const store = usePortfolioStore()
</script>

<style scoped>
.projects-page {
    background: linear-gradient(135deg, #34495E 0%, #2C3E50 100%);
    min-height: calc(100vh - 72px);
}
</style>
