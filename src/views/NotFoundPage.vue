<template>
    <v-main class="not-found-page">
        <div class="not-found-wrapper d-flex align-center justify-center">
            <div class="text-center px-4">
                <div class="error-bg-text" aria-hidden="true">404</div>
                <div class="error-content">
                    <p class="not-found-label mb-2">Page not found</p>
                    <h1 class="not-found-heading mb-4">You've wandered off the map.</h1>
                    <p class="not-found-desc mb-10">
                        The page you're looking for doesn't exist, or has moved somewhere else.
                    </p>
                    <v-btn color="accent" size="large" to="/" class="px-10">
                        <v-icon icon="mdi-home" start></v-icon>
                        Back to Home
                    </v-btn>
                </div>
            </div>
        </div>
    </v-main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
    console.warn('[404]', route.fullPath)
})
</script>

<style scoped>
.not-found-page {
    background: rgb(var(--v-theme-background));
}

.not-found-wrapper {
    min-height: calc(100vh - 72px);
    position: relative;
    overflow: hidden;
}

.error-bg-text {
    position: absolute;
    font-family: 'Syne', sans-serif;
    font-size: clamp(12rem, 30vw, 22rem);
    font-weight: 800;
    color: rgb(var(--v-theme-accent));
    opacity: 0.04;
    line-height: 1;
    letter-spacing: -8px;
    user-select: none;
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
}

.error-content {
    position: relative;
    z-index: 1;
}

.not-found-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgb(var(--v-theme-accent));
}

.not-found-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: rgb(var(--v-theme-on-background));
    letter-spacing: -0.5px;
}

.not-found-desc {
    font-family: 'Lora', Georgia, serif;
    font-style: italic;
    font-size: 1.05rem;
    color: rgb(var(--v-theme-on-surface-variant));
    max-width: 380px;
    margin-inline: auto;
    line-height: 1.75;
}
</style>
