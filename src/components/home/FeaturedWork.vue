<template>
    <section class="featured-section">
        <v-container class="py-8 py-sm-16">
            <div class="text-center mb-12">
                <p class="text-overline text-accent mb-2" style="letter-spacing: 4px;">SPOTLIGHT</p>
                <h2 class="text-h4 font-weight-bold text-white">Featured Work</h2>
            </div>

            <div class="featured-card">
                <v-row no-gutters align="stretch">
                    <!-- Image -->
                    <v-col cols="12" md="5" class="image-col">
                        <v-img
                            :src="featured.image"
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
                                    <v-icon icon="mdi-image-broken" size="64" color="white" style="opacity:0.25"></v-icon>
                                </div>
                            </template>
                            <div class="img-overlay"></div>
                        </v-img>
                    </v-col>

                    <!-- Content -->
                    <v-col cols="12" md="7">
                        <div class="content-side pa-8 pa-md-12 d-flex flex-column justify-center">
                            <div class="d-flex align-center ga-3 mb-5">
                                <v-chip color="accent" size="small" variant="flat" class="pulse-chip">
                                    <v-icon icon="mdi-circle" size="8" start></v-icon>
                                    Live Project
                                </v-chip>
                                <v-chip color="success" size="small" variant="tonal">Full-Stack</v-chip>
                            </div>

                            <h3 class="text-h4 text-sm-h3 font-weight-bold text-white mb-4">{{ featured.title }}</h3>

                            <p class="text-body-1 mb-6 featured-desc">{{ featured.description }}</p>

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
                                    size="large"
                                    class="px-6"
                                    elevation="4"
                                >
                                    <v-icon icon="mdi-open-in-new" start></v-icon>
                                    Visit Site
                                </v-btn>
                                <v-btn
                                    to="/projects"
                                    size="large"
                                    variant="outlined"
                                    color="white"
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
    background: linear-gradient(180deg, #1A252F 0%, #0F1419 100%);
}

.featured-card {
    background: rgba(44, 62, 80, 0.55);
    border: 1px solid rgba(0, 188, 212, 0.18);
    border-radius: 16px;
    overflow: hidden;
    backdrop-filter: blur(12px);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.featured-card:hover {
    border-color: rgba(0, 188, 212, 0.45);
    box-shadow: 0 0 40px rgba(0, 188, 212, 0.08);
}

.image-col {
    min-height: 220px;
}

@media (min-width: 960px) {
    .image-col { min-height: 340px; }
}

.featured-img {
    width: 100%;
    height: 100%;
}

.img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 188, 212, 0.08), rgba(44, 62, 80, 0.35));
}

.fallback-bg {
    background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
}

.content-side {
    min-height: auto;
}

@media (min-width: 960px) {
    .content-side { min-height: 340px; }
}

.featured-desc {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.8;
}

.pulse-chip {
    animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(0, 188, 212, 0.4); }
    50% { box-shadow: 0 0 0 6px rgba(0, 188, 212, 0); }
}
</style>
