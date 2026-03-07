<template>
    <v-row>
        <v-col cols="12" class="mb-10">
            <div v-if="label" class="section-label mb-3">{{ label }}</div>
            <h2 class="section-header-title mb-4">{{ title }}</h2>
            <div class="section-header-rule"></div>
            <p v-if="subtitle" class="section-header-subtitle mt-4">{{ subtitle }}</p>
        </v-col>
    </v-row>
</template>

<script setup>
defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    label: { type: String, default: '' },
    dark: { type: Boolean, default: false }, // kept for backwards compatibility, unused
})
</script>

<style scoped>
.section-header-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.5px;
    color: rgb(var(--v-theme-on-background));
    line-height: 1.1;
}

.section-header-rule {
    width: 48px;
    height: 2px;
    background: rgb(var(--v-theme-accent));
    border-radius: 2px;
}

.section-header-subtitle {
    font-family: 'Lora', Georgia, serif;
    font-style: italic;
    font-size: 1.05rem;
    color: rgb(var(--v-theme-on-surface-variant));
    line-height: 1.7;
}
</style>
