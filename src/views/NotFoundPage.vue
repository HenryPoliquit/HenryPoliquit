<template>
    <v-main class="nf">
        <v-container class="nf-inner">
            <p class="col-head nf-code">Error 404</p>
            <h1 class="nf-heading">No record<br />under that reference</h1>
            <p class="prose nf-desc">
                Nothing is filed at <code class="fig">{{ route.fullPath }}</code>. It was either
                never issued, or it has been superseded.
            </p>
            <v-btn color="accent" to="/">Back to the front page</v-btn>
        </v-container>
    </v-main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
    console.warn('[404]', route.fullPath)
})
</script>

<style scoped>
.nf {
    background: rgb(var(--v-theme-background));
}

.nf-inner {
    padding-top: clamp(64px, 16vh, 160px);
    padding-bottom: var(--band-y);
}

.nf-code {
    color: rgb(var(--v-theme-accent));
    margin-bottom: 18px;
}

.nf-heading {
    font-size: clamp(2.2rem, 7vw, 4.5rem);
    font-weight: 700;
    font-stretch: 76%;
    text-transform: uppercase;
    letter-spacing: -0.015em;
    line-height: 0.94;
    color: rgb(var(--v-theme-on-background));
    padding-bottom: 24px;
    border-bottom: 2px solid rgb(var(--v-theme-on-background));
}

.nf-desc {
    margin: 24px 0 36px;
}

.nf-desc code {
    font-size: 0.9em;
    color: rgb(var(--v-theme-accent));
    word-break: break-all;
}
</style>
