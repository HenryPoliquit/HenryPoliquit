<template>
    <button
        class="clap-btn"
        :class="{ 'just-clapped': pulse }"
        :aria-label="`Appreciate ${count} ${count === 1 ? 'time' : 'times'}`"
        @click="clap"
    >
        <v-icon :icon="count > 0 ? 'mdi-hand-clap' : 'mdi-hand-clap-outline'" size="18" />
        <span class="clap-count">{{ count }}</span>
    </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '../../lib/supabase'

const props = defineProps({
    projectId: { type: [Number, String], required: true },
})

const count = ref(0)
const pulse = ref(false)
let channel = null
let pulseTimer = null

async function fetchCount() {
    const { data, error } = await supabase
        .from('claps')
        .select('count')
        .eq('project_id', props.projectId)
        .maybeSingle()
    if (!error && data) count.value = data.count
}

async function clap() {
    // Optimistic; the RPC returns the authoritative total and Realtime keeps peers in sync.
    pulse.value = true
    clearTimeout(pulseTimer)
    pulseTimer = setTimeout(() => (pulse.value = false), 300)

    const { data, error } = await supabase.rpc('increment_clap', { p_project_id: props.projectId })
    if (!error && typeof data === 'number') count.value = data
}

onMounted(() => {
    fetchCount()
    channel = supabase
        .channel(`claps-${props.projectId}`)
        .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'claps', filter: `project_id=eq.${props.projectId}` },
            (payload) => {
                if (typeof payload.new?.count === 'number') count.value = payload.new.count
            },
        )
        .subscribe()
})

onUnmounted(() => {
    if (channel) supabase.removeChannel(channel)
    clearTimeout(pulseTimer)
})
</script>

<style scoped>
.clap-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 99px;
    border: 1px solid rgba(212, 137, 10, 0.25);
    background: rgba(212, 137, 10, 0.06);
    color: rgb(var(--v-theme-accent));
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease, border-color 0.2s ease;
    font-variant-numeric: tabular-nums;
}

.clap-btn:hover {
    background: rgba(212, 137, 10, 0.14);
    border-color: rgba(212, 137, 10, 0.5);
}

.clap-btn:active {
    transform: scale(0.94);
}

.clap-btn.just-clapped {
    animation: clap-pop 0.3s ease;
}

@keyframes clap-pop {
    0% { transform: scale(1); }
    45% { transform: scale(1.18); }
    100% { transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
    .clap-btn.just-clapped { animation: none; }
}
</style>
