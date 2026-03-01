<template>
    <v-row>
        <v-col cols="12">
            <v-card class="fade-in" style="animation-delay: 0.4s">
                <v-card-title class="text-h5 font-weight-bold pa-6 bg-primary text-white">
                    <v-icon icon="mdi-code-braces" start></v-icon>
                    Technical Expertise
                </v-card-title>
                <v-card-text class="pa-6">
                    <v-row>
                        <v-col cols="12" md="4">
                            <div class="skill-category">
                                <h3 class="text-h6 font-weight-medium mb-4 d-flex align-center">
                                    <v-icon icon="mdi-vuejs" color="accent" size="28" class="mr-2"></v-icon>
                                    Frontend
                                </h3>
                                <v-chip
                                    v-for="skill in store.skills.frontend"
                                    :key="skill"
                                    class="ma-1"
                                    color="accent"
                                    variant="tonal"
                                    size="default"
                                >
                                    {{ skill }}
                                </v-chip>
                            </div>
                        </v-col>

                        <v-col cols="12" md="4">
                            <div class="skill-category">
                                <h3 class="text-h6 font-weight-medium mb-4 d-flex align-center">
                                    <v-icon icon="mdi-server" color="primary" size="28" class="mr-2"></v-icon>
                                    Backend
                                </h3>
                                <v-chip
                                    v-for="skill in store.skills.backend"
                                    :key="skill"
                                    class="ma-1"
                                    color="primary"
                                    variant="tonal"
                                    size="default"
                                >
                                    {{ skill }}
                                </v-chip>
                            </div>
                        </v-col>

                        <v-col cols="12" md="4">
                            <div class="skill-category">
                                <h3 class="text-h6 font-weight-medium mb-4 d-flex align-center">
                                    <v-icon icon="mdi-cloud" color="success" size="28" class="mr-2"></v-icon>
                                    Cloud (GCP)
                                </h3>
                                <v-chip
                                    v-for="skill in store.skills.cloud"
                                    :key="skill"
                                    class="ma-1"
                                    color="success"
                                    variant="tonal"
                                    size="default"
                                >
                                    {{ skill }}
                                </v-chip>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()
</script>

<style scoped>
.skill-category {
    padding-bottom: 8px;
}

@media (min-width: 960px) {
    .skill-category { min-height: 200px; }
}
</style>
