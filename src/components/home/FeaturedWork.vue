<template>
    <section class="featured-section">
        <v-container class="py-8 py-sm-16">
            <!-- Editorial section label -->
            <div class="section-label mb-2">01 — SPOTLIGHT</div>
            <h2 class="section-title mb-10">Featured Work</h2>

            <div class="featured-card">
                <v-row no-gutters align="stretch">
                    <!-- Image -->
                    <v-col cols="12" md="5" class="image-col">
                        <v-img
                            :src="featured.image"
                            :alt="featured.title"
                            height="100%"
                            min-height="340"
                            cover
                            class="featured-img"
                        >
                            <template v-slot:placeholder>
                                <div class="img-shimmer"></div>
                            </template>
                            <template v-slot:error>
                                <div class="fallback-bg d-flex align-center justify-center" style="height:100%">
                                    <v-icon icon="mdi-image-broken" size="64" style="opacity:0.2"></v-icon>
                                </div>
                            </template>
                            <div class="img-overlay"></div>
                        </v-img>
                    </v-col>

                    <!-- Content -->
                    <v-col cols="12" md="7">
                        <div class="content-side pa-8 pa-md-12 d-flex flex-column justify-center">
                            <div class="d-flex align-center ga-3 mb-5">
                                <v-chip color="success" size="small" variant="tonal" class="pulse-chip">
                                    <v-icon icon="mdi-circle" size="8" start></v-icon>
                                    Live Project
                                </v-chip>
                                <v-chip color="accent" size="small" variant="tonal">Full-Stack</v-chip>
                            </div>

                            <h3 class="featured-project-title mb-4">{{ featured.title }}</h3>

                            <p class="featured-desc mb-6">{{ featured.description }}</p>

                            <div class="mb-8">
                                <v-chip
                                    v-for="tech in featured.technologies"
                                    :key="tech"
                                    size="small"
                                    class="mr-2 mb-2"
                                    color="accent"
                                    variant="outlined"
                                >
                                    {{ tech }}
                                </v-chip>
                            </div>

                            <div class="d-flex flex-wrap ga-3">
                                <v-btn
                                    v-if="featured.liveUrl"
                                    color="accent"
                                    :href="featured.liveUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="large"
                                    class="px-6"
                                    elevation="3"
                                >
                                    <v-icon icon="mdi-open-in-new" start></v-icon>
                                    Visit Site
                                </v-btn>
                                <v-btn
                                    to="/projects"
                                    size="large"
                                    variant="outlined"
                                    color="accent"
                                    class="px-6"
                                >
                                    All Projects
                                    <v-icon icon="mdi-arrow-right" end></v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()
const featured = computed(() => store.projects[0])
</script>

<style scoped>
.featured-section {
    background: rgb(var(--v-theme-background));
    border-top: 1px solid rgb(var(--v-theme-surface-variant));
}

.section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: rgb(var(--v-theme-on-background));
    letter-spacing: -0.5px;
}

.featured-card {
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    border-radius: 20px;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.featured-card:hover {
    border-color: rgba(212, 137, 10, 0.35);
    box-shadow: 0 0 40px rgba(212, 137, 10, 0.06);
}

.image-col { min-height: 220px; }

@media (min-width: 960px) {
    .image-col { min-height: 340px; }
}

.featured-img { width: 100%; height: 100%; }

.img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212, 137, 10, 0.06), rgba(0, 0, 0, 0.15));
}

.fallback-bg {
    background: rgb(var(--v-theme-surface-variant));
}

.content-side { min-height: auto; }

@media (min-width: 960px) {
    .content-side { min-height: 340px; }
}

.featured-project-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 800;
    color: rgb(var(--v-theme-on-surface));
    letter-spacing: -0.5px;
    line-height: 1.1;
}

.featured-desc {
    font-family: 'Lora', Georgia, serif;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.75;
    line-height: 1.85;
}

.pulse-chip {
    animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(74, 124, 89, 0.4); }
    50% { box-shadow: 0 0 0 6px rgba(74, 124, 89, 0); }
}
</style>
