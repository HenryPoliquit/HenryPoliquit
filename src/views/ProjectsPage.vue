<template>
    <v-main class="projects-page">
        <v-container class="section-spacing">
            <SectionHeader title="Projects" label="03 — WORK" subtitle="What I've been building." />

            <!-- Warm pill filter -->
            <div class="filter-bar mb-8">
                <span class="filter-label">Filter:</span>
                <div class="filter-pills">
                    <button
                        class="filter-pill"
                        :class="{ active: selectedTechs.length === 0 }"
                        @click="selectedTechs = []"
                    >All</button>
                    <button
                        v-for="tech in allTechnologies"
                        :key="tech"
                        class="filter-pill"
                        :class="{ active: selectedTechs.includes(tech) }"
                        @click="toggleTech(tech)"
                    >{{ tech }}</button>
                </div>
            </div>

            <v-row>
                <v-col
                    v-for="(project, index) in filteredProjects"
                    :key="project.title"
                    cols="12"
                    md="6"
                    class="fade-in"
                    :style="{ animationDelay: `${index * 0.08}s` }"
                >
                    <ProjectCard :project="project" :index="index" />
                </v-col>
            </v-row>

            <div v-if="filteredProjects.length === 0" class="text-center py-12">
                <v-icon icon="mdi-filter-off" size="48" color="accent" class="mb-4" style="opacity:0.4"></v-icon>
                <p class="no-results">No projects match the selected filters.</p>
            </div>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'
import SectionHeader from '../components/common/SectionHeader.vue'
import ProjectCard from '../components/projects/ProjectCard.vue'

const store = usePortfolioStore()
const selectedTechs = ref([])

const allTechnologies = computed(() =>
    [...new Set(store.projects.flatMap(p => p.technologies))].sort()
)

const filteredProjects = computed(() => {
    if (selectedTechs.value.length === 0) return store.projects
    return store.projects.filter(p =>
        selectedTechs.value.every(t => p.technologies.includes(t))
    )
})

function toggleTech(tech) {
    const idx = selectedTechs.value.indexOf(tech)
    if (idx === -1) {
        selectedTechs.value = [...selectedTechs.value, tech]
    } else {
        selectedTechs.value = selectedTechs.value.filter(t => t !== tech)
    }
}

onMounted(() => {
    const cache = []
    store.projects.forEach(({ image }) => {
        if (!image || image.includes('onedrive.live.com/embed')) return
        const img = new Image()
        img.src = image
        cache.push(img)
    })
})
</script>

<style scoped>
.projects-page {
    background: rgb(var(--v-theme-background));
    min-height: calc(100vh - 72px);
}

.filter-bar {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    flex-wrap: wrap;
}

.filter-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgb(var(--v-theme-on-surface-variant));
    padding-top: 6px;
    flex-shrink: 0;
}

.filter-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.filter-pill {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    padding: 5px 16px;
    border-radius: 99px;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    color: rgb(var(--v-theme-on-surface));
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.filter-pill:hover {
    border-color: rgb(var(--v-theme-accent));
}

.filter-pill.active {
    background: rgb(var(--v-theme-accent));
    border-color: rgb(var(--v-theme-accent));
    color: rgb(var(--v-theme-on-accent));
}

.no-results {
    font-family: 'Lora', Georgia, serif;
    color: rgb(var(--v-theme-on-surface-variant));
    font-style: italic;
}
</style>
