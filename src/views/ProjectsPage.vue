<template>
    <v-main class="projects-page">
        <v-container class="section-spacing">
            <SectionHeader title="PROJECTS" subtitle="What I've been building" :dark="true" />

            <!-- Tech filter -->
            <v-select
                v-model="selectedTechs"
                :items="allTechnologies"
                label="Filter by technology"
                multiple
                clearable
                chips
                closable-chips
                density="comfortable"
                variant="outlined"
                color="accent"
                class="mb-6 filter-select"
                hide-details
            ></v-select>

            <v-row>
                <v-col
                    v-for="(project, index) in filteredProjects"
                    :key="project.title"
                    cols="12"
                    md="6"
                    class="fade-in"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                >
                    <ProjectCard :project="project" />
                </v-col>
            </v-row>

            <div v-if="filteredProjects.length === 0" class="text-center py-12">
                <v-icon icon="mdi-filter-off" size="48" color="accent" class="mb-4" style="opacity:0.5"></v-icon>
                <p class="text-white" style="opacity:0.6">No projects match the selected filters.</p>
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

// Belt-and-suspenders preload: fire all image requests simultaneously on mount
// Browser deduplicates in-flight requests — this guarantees parallel loading
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
    background: linear-gradient(135deg, #34495E 0%, #2C3E50 100%);
    min-height: calc(100vh - 72px);
}

.filter-select :deep(.v-field) {
    background: rgba(255, 255, 255, 0.06);
}
</style>
