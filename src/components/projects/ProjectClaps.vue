<template>
    <!-- No aria-label: the visible text already names the control, and an
         override that doesn't start with the visible string breaks voice
         control ("click applause"). The live region announces the new total. -->
    <button
        class="clap-btn fig"
        :class="{ 'just-clapped': pulse }"
        @click="clap"
    >
        <span>Applause</span>
        <span class="clap-count" aria-hidden="true">{{ count }}</span>
        <span class="sr-only" aria-live="polite">{{ count }}</span>
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
    gap: 12px;
    padding: 0 14px;
    height: 36px;
    border: var(--rule);
    background: transparent;
    color: rgb(var(--v-theme-on-surface-variant));
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.2s var(--ease-out), color 0.2s var(--ease-out), transform 0.15s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .clap-btn:hover {
        border-color: rgb(var(--v-theme-accent));
        color: rgb(var(--v-theme-accent));
    }
}


.clap-count {
    color: rgb(var(--v-theme-on-background));
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
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
