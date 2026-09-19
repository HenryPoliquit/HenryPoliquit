<template>
    <header class="page-head">
        <p v-if="label" class="col-head page-head-label">{{ label }}</p>
        <component :is="tag" class="page-head-title">{{ title }}</component>
        <p v-if="subtitle" class="page-head-subtitle">{{ subtitle }}</p>
    </header>
</template>

<script setup>
defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    label: { type: String, default: '' },
    tag: { type: String, default: 'h2' }, // 'h1' when this is the page title
})
</script>

<style scoped>
.page-head {
    padding-bottom: 28px;
    border-bottom: 2px solid rgb(var(--v-theme-on-background));
    margin-bottom: 8px;
}

.page-head-label {
    margin-bottom: 14px;
}

.page-head-title {
    font-size: clamp(2.1rem, 6vw, 3.75rem);
    font-weight: 700;
    font-stretch: 78%;
    text-transform: uppercase;
    letter-spacing: -0.015em;
    line-height: 0.95;
    color: rgb(var(--v-theme-on-background));
}

.page-head-subtitle {
    font-family: var(--font-body);
    font-size: 1.02rem;
    line-height: 1.6;
    max-width: 30rem;
    margin-top: 14px;
    color: rgb(var(--v-theme-on-surface-variant));
}
</style>
