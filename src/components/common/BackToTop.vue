<template>
    <Transition name="fab">
        <v-btn
            v-if="visible"
            :icon="mdiArrowUp"
            color="accent"
            size="small"
            elevation="0"
            class="back-to-top"
            aria-label="Back to top"
            @click="scrollToTop"
        ></v-btn>
    </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { mdiArrowUp } from '@mdi/js'

const visible = ref(false)
const SCROLL_THRESHOLD = 300

function onScroll() {
    visible.value = window.scrollY > SCROLL_THRESHOLD
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.back-to-top {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1000;
    border-radius: 0;
}

.fab-enter-active,
.fab-leave-active {
    transition: opacity 0.25s var(--ease-out), transform 0.25s var(--ease-out);
}
.fab-enter-from,
.fab-leave-to {
    opacity: 0;
    transform: translateY(12px);
}

@media (prefers-reduced-motion: reduce) {
    .fab-enter-active,
    .fab-leave-active { transition: none; }
}
</style>
