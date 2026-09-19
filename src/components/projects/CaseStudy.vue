<template>
    <section v-if="p" class="band">
        <v-container>
            <p class="band-label">Production</p>

            <div class="cs-head">
                <h2 class="cs-title">{{ p.title }}</h2>
                <p class="cs-tagline">{{ p.tagline }}</p>
            </div>

            <div class="cs-shot">
                <img
                    v-if="p.image"
                    :src="p.image"
                    :alt="`Screenshot of ${p.title}`"
                    decoding="async"
                />
                <p v-else class="col-head cs-shot-empty">Screenshot unavailable</p>
            </div>

            <!-- Label rail / prose. Each row answers one question. -->
            <dl class="cs-rows">
                <template v-for="row in rows" :key="row.label">
                    <dt v-if="row.value" class="col-head cs-row-label">{{ row.label }}</dt>
                    <dd v-if="row.value" class="prose cs-row-body">{{ row.value }}</dd>
                </template>

                <dt class="col-head cs-row-label">Built with</dt>
                <dd class="cs-row-body">
                    <ul class="cs-stack fig">
                        <li v-for="tech in p.technologies" :key="tech">{{ tech }}</li>
                    </ul>
                </dd>
            </dl>

            <p v-if="p.caveat" class="small-print cs-caveat">
                <span class="mark" aria-hidden="true">&dagger;</span>{{ p.caveat }}
            </p>

            <div class="cs-actions">
                <v-btn
                    v-if="p.liveUrl"
                    :href="p.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="accent"
                >Visit the site</v-btn>
                <v-btn to="/projects" variant="outlined" color="accent">All work</v-btn>
                <ProjectClaps v-if="p.id != null" :project-id="p.id" />
            </div>
        </v-container>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'
import ProjectClaps from './ProjectClaps.vue'

const store = usePortfolioStore()
const p = computed(() => store.production)

const rows = computed(() => [
    { label: 'The problem', value: p.value?.problem },
    { label: 'What I built', value: p.value?.build },
    { label: 'What it runs on', value: p.value?.runsOn },
])
</script>

<style scoped>
.cs-head {
    margin-bottom: 36px;
}

.cs-title {
    font-size: clamp(1.9rem, 5vw, 3.1rem);
    font-weight: 700;
    font-stretch: 80%;
    line-height: 1;
    color: rgb(var(--v-theme-on-background));
    margin-bottom: 12px;
}

.cs-tagline {
    font-family: var(--font-body);
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    line-height: 1.5;
    max-width: 27rem;
    color: rgb(var(--v-theme-on-surface-variant));
}

/* Fixed 16:9 plate so the space is reserved before the image arrives: no
   layout shift, and no dependence on the file's real dimensions. */
.cs-shot {
    display: grid;
    place-items: center;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border: var(--rule);
    background: rgb(var(--v-theme-surface-variant));
    margin-bottom: 48px;
}

.cs-shot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
}

.cs-shot-empty {
    color: rgb(var(--v-theme-on-surface-variant));
}

/* Label rail left, prose right. The rail is the index of the record. */
.cs-rows {
    display: grid;
    grid-template-columns: 160px minmax(0, 1fr);
    column-gap: 32px;
}

.cs-row-label {
    padding: 20px 0;
    border-top: var(--rule);
}

.cs-row-body {
    padding: 20px 0;
    border-top: var(--rule);
}

.cs-stack {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 8px;
    font-size: 0.8rem;
}

.cs-stack li {
    padding: 3px 9px;
    border: var(--rule);
    color: rgb(var(--v-theme-on-surface-variant));
}

.cs-caveat {
    margin-top: 28px;
    padding-top: 20px;
    border-top: var(--rule);
}

.cs-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-top: 40px;
}

@media (max-width: 700px) {
    .cs-rows {
        grid-template-columns: minmax(0, 1fr);
        column-gap: 0;
    }

    .cs-row-label {
        padding-bottom: 0;
    }

    .cs-row-body {
        border-top: none;
        padding-top: 8px;
    }
}
</style>
