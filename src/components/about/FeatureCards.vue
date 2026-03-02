<template>
    <v-row class="mb-12">
        <v-col v-for="(feature, index) in store.features" :key="feature.title" cols="12" sm="6" md="3">
            <v-card
                class="text-center feature-card hover-lift fade-in"
                :style="{ animationDelay: `${index * 0.1}s` }"
                height="100%"
            >
                <v-card-text class="pa-6">
                    <div class="feature-icon-wrapper mb-4">
                        <v-icon :icon="feature.icon" size="64" :color="feature.color"></v-icon>
                    </div>
                    <h3 class="text-h6 font-weight-bold mb-3">{{ feature.title }}</h3>
                    <p class="text-body-2 text-medium-emphasis">{{ feature.description }}</p>
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
.feature-card {
    border-top: 4px solid;
    border-image: linear-gradient(135deg, #2C3E50, #00BCD4) 1;
}

.feature-icon-wrapper {
    display: inline-flex;
    padding: 16px;
    background: linear-gradient(135deg, rgba(44, 62, 80, 0.1), rgba(0, 188, 212, 0.1));
    border-radius: 50%;
}
</style>
