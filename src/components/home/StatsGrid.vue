<template>
    <div ref="wrapperRef">
        <v-row justify="center" class="stats-section">
            <v-col cols="6" sm="3" v-for="stat in stats" :key="stat.label">
                <div class="stat-card">
                    <div class="stat-number text-accent text-h4 font-weight-bold">
                        {{ displayValues[stat.label] }}
                    </div>
                    <div class="stat-label text-white text-body-2 stat-opacity">{{ stat.label }}</div>
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
    padding: 20px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 188, 212, 0.1);
    transition: background 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
}

.stat-card:hover {
    background: rgba(0, 188, 212, 0.1);
    border-color: rgba(0, 188, 212, 0.35);
    transform: translateY(-5px);
}

.stat-opacity {
    opacity: 0.8;
}
</style>
