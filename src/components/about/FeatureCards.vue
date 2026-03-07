<template>
    <div class="features-section mb-14">
        <div class="section-label mb-3">WHAT I BRING</div>
        <h3 class="features-heading mb-10">Core strengths</h3>

        <v-row>
            <v-col
                v-for="(feature, index) in store.features"
                :key="feature.title"
                cols="12"
                sm="6"
            >
                <div
                    class="feature-card fade-in"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                >
                    <div class="feature-number">{{ String(index + 1).padStart(2, '0') }}</div>
                    <h4 class="feature-title mt-4 mb-2">{{ feature.title }}</h4>
                    <p class="feature-desc">{{ feature.description }}</p>
                </div>
            </v-col>
        </v-row>

        <div class="section-rule mt-12"></div>
    </div>
</template>

<script setup>
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()
</script>

<style scoped>
.features-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 1.9rem);
    font-weight: 700;
    color: rgb(var(--v-theme-on-background));
    letter-spacing: -0.3px;
}

.feature-card {
    padding: 28px 28px 32px;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    border-radius: 16px;
    height: 100%;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.feature-card:hover {
    border-color: rgba(212, 137, 10, 0.35);
    box-shadow: 0 8px 28px rgba(212, 137, 10, 0.07);
    transform: translateY(-3px);
}

.feature-number {
    font-family: 'Syne', sans-serif;
    font-size: 2.8rem;
    font-weight: 800;
    color: rgb(var(--v-theme-accent));
    opacity: 0.3;
    line-height: 1;
    letter-spacing: -2px;
}

.feature-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
}

.feature-desc {
    font-family: 'Lora', Georgia, serif;
    font-size: 0.92rem;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.72;
    line-height: 1.75;
}
</style>
