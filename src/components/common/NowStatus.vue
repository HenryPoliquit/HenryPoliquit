<template>
    <section v-if="store.now?.content" class="band now" aria-label="What I'm working on now">
        <v-container>
            <div class="now-inner">
                <p class="col-head now-label">Now</p>
                <p class="now-text prose">{{ store.now.content }}</p>
                <p v-if="relativeUpdated" class="now-updated fig">updated {{ relativeUpdated }}</p>
            </div>
        </v-container>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()

const relativeUpdated = computed(() => {
    const ts = store.now?.updatedAt
    if (!ts) return null
    const diffMs = Date.now() - new Date(ts).getTime()
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    const mins = Math.round(diffMs / 60000)
    if (Math.abs(mins) < 60) return rtf.format(-mins, 'minute')
    const hours = Math.round(mins / 60)
    if (Math.abs(hours) < 24) return rtf.format(-hours, 'hour')
    const days = Math.round(hours / 24)
    return rtf.format(-days, 'day')
})
</script>

<style scoped>
.now {
    padding: 32px 0;
}

.now-inner {
    display: grid;
    grid-template-columns: 160px minmax(0, 1fr) max-content;
    align-items: baseline;
    column-gap: 32px;
}

.now-text {
    font-size: 0.98rem;
}

.now-updated {
    font-size: 0.72rem;
    color: rgb(var(--v-theme-on-surface-variant));
}

@media (max-width: 800px) {
    .now-inner {
        grid-template-columns: minmax(0, 1fr);
        row-gap: 8px;
    }
}
</style>
