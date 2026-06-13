<template>
    <section v-if="store.now?.content" class="now-status" aria-label="What I'm working on now">
        <v-container>
            <div class="now-inner">
                <span class="now-pulse" aria-hidden="true"></span>
                <span class="now-label">Now</span>
                <p class="now-text">{{ store.now.content }}</p>
                <span v-if="relativeUpdated" class="now-updated">updated {{ relativeUpdated }}</span>
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
.now-status {
    background: rgb(var(--v-theme-background));
    padding: 8px 0 24px;
}

.now-inner {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 6px 14px;
    padding: 18px 22px;
    border: 1px solid rgb(var(--v-theme-surface-variant));
    border-radius: 14px;
    background: rgba(212, 137, 10, 0.04);
}

.now-pulse {
    align-self: center;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgb(var(--v-theme-accent));
    box-shadow: 0 0 0 0 rgba(212, 137, 10, 0.5);
    animation: now-pulse 2s infinite;
}

@keyframes now-pulse {
    0% { box-shadow: 0 0 0 0 rgba(212, 137, 10, 0.5); }
    70% { box-shadow: 0 0 0 8px rgba(212, 137, 10, 0); }
    100% { box-shadow: 0 0 0 0 rgba(212, 137, 10, 0); }
}

@media (prefers-reduced-motion: reduce) {
    .now-pulse { animation: none; }
}

.now-label {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 0.72rem;
    color: rgb(var(--v-theme-accent));
}

.now-text {
    flex: 1;
    min-width: 200px;
    margin: 0;
    font-family: 'Lora', Georgia, serif;
    font-style: italic;
    font-size: 0.98rem;
    line-height: 1.6;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.85;
}

.now-updated {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    color: rgb(var(--v-theme-on-surface-variant));
    opacity: 0.7;
    font-variant-numeric: tabular-nums;
}
</style>
