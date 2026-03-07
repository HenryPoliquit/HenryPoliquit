<template>
    <div ref="wrapperRef">
        <v-row justify="center" class="stats-section">
            <v-col cols="6" sm="3" v-for="stat in stats" :key="stat.label">
                <div class="stat-card">
                    <div class="stat-number text-h4 font-weight-bold">
                        {{ displayValues[stat.label] }}
                    </div>
                    <div class="stat-label text-body-2">{{ stat.label }}</div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const props = defineProps({
    stats: { type: Array, required: true },
})

const wrapperRef = ref(null)

// Pre-fill with final values (accessible before animation runs)
const displayValues = reactive(
    Object.fromEntries(props.stats.map(s => [s.label, s.number]))
)

function animateStat(stat) {
    const match = stat.number.match(/^(\d+)(.*)$/)
    if (!match) return

    const target = parseInt(match[1])
    const suffix = match[2] ?? ''
    const duration = 1200
    const startTime = performance.now()

    function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        displayValues[stat.label] = Math.round(eased * target) + suffix
        if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
}

onMounted(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                props.stats.forEach(animateStat)
                observer.disconnect()
            }
        },
        { threshold: 0.4 }
    )
    if (wrapperRef.value) observer.observe(wrapperRef.value)
})
</script>

<style scoped>
.stats-section {
    margin-top: 40px;
    padding: 20px 0;
}

.stat-card {
    padding: 20px 16px;
    border-radius: 14px;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}

.stat-card:hover {
    background: rgb(var(--v-theme-surface-variant));
    border-color: rgb(var(--v-theme-accent));
    transform: translateY(-4px);
}

.stat-number {
    color: rgb(var(--v-theme-accent)) !important;
    font-family: 'Syne', sans-serif;
}

.stat-label {
    color: rgb(var(--v-theme-on-surface-variant)) !important;
    font-family: 'DM Sans', sans-serif;
}
</style>
