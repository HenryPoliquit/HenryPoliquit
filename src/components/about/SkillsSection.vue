<template>
    <section class="stack">
        <h2 class="col-head stack-label">Stack</h2>

        <dl class="stack-list">
            <div v-for="group in groups" :key="group.label" class="stack-row">
                <dt class="stack-layer fig">{{ group.label }}</dt>
                <dd class="stack-items fig">{{ group.items.join(' · ') }}</dd>
            </div>
        </dl>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()

const groups = computed(() => [
    { label: 'Frontend', items: store.skills.frontend },
    { label: 'Backend', items: store.skills.backend },
    { label: 'Cloud', items: store.skills.cloud },
])
</script>

<style scoped>
.stack-label {
    margin-bottom: 24px;
}

.stack-list {
    border-top: var(--rule);
}

.stack-row {
    display: grid;
    grid-template-columns: 160px minmax(0, 1fr);
    column-gap: 32px;
    padding: 18px 0;
    border-bottom: var(--rule);
}

.stack-layer {
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgb(var(--v-theme-on-surface-variant));
}

.stack-items {
    font-size: 0.92rem;
    line-height: 1.7;
    color: rgb(var(--v-theme-on-background));
}

@media (max-width: 700px) {
    .stack-row {
        grid-template-columns: minmax(0, 1fr);
        row-gap: 8px;
    }
}
</style>
