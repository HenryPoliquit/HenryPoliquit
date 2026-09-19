<template>
    <section class="band">
        <v-container>
            <p class="band-label">Foundations</p>

            <ul class="fl">
                <li v-for="project in store.foundations" :key="project.id" class="fl-row">
                    <div class="fl-main">
                        <h3 class="fl-title">
                            {{ project.title }}<span class="mark" aria-hidden="true">&nbsp;&Dagger;</span>
                        </h3>
                        <p class="fl-tagline">{{ project.tagline }}</p>
                    </div>

                    <p class="fl-stack fig">{{ project.technologies.join(' · ') }}</p>

                    <p class="fl-link">
                        <a
                            v-if="project.githubUrl"
                            :href="project.githubUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="fig"
                        >repo<span aria-hidden="true">&nbsp;&#8599;</span></a>
                        <a
                            v-else-if="project.liveUrl"
                            :href="project.liveUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="fig"
                        >site<span aria-hidden="true">&nbsp;&#8599;</span></a>
                        <span v-else class="fig fl-nolink">&mdash;</span>
                    </p>
                </li>
            </ul>

            <p v-if="caveat" class="small-print fl-caveat">
                <span class="mark" aria-hidden="true">&Dagger;</span>{{ caveat }}
            </p>
        </v-container>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()

// The caveat is the same line on every coursework row, so print it once.
const caveat = computed(() => store.foundations.find(p => p.caveat)?.caveat ?? null)
</script>

<style scoped>
.fl {
    list-style: none;
    border-top: var(--rule);
}

.fl-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content 4.5rem;
    align-items: baseline;
    column-gap: 32px;
    padding: 20px 0;
    border-bottom: var(--rule);
}

.fl-title {
    font-size: 1.05rem;
    font-weight: 600;
    font-stretch: 90%;
    color: rgb(var(--v-theme-on-background));
    margin-bottom: 4px;
}

.mark {
    color: rgb(var(--v-theme-accent));
}

.fl-tagline {
    font-family: var(--font-body);
    font-size: 0.9rem;
    line-height: 1.6;
    max-width: 31rem;
    color: rgb(var(--v-theme-on-surface-variant));
}

.fl-stack {
    font-size: 0.78rem;
    color: rgb(var(--v-theme-on-surface-variant));
    white-space: nowrap;
}

.fl-link {
    text-align: right;
    font-size: 0.8rem;
}

.fl-link a {
    color: rgb(var(--v-theme-accent));
    border-bottom: 1px solid rgba(var(--v-theme-accent), 0.35);
    transition: border-color 0.2s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .fl-link a:hover {
        border-bottom-color: rgb(var(--v-theme-accent));
    }
}


.fl-nolink {
    color: rgb(var(--v-theme-on-surface-variant));
    opacity: 0.5;
}

.fl-caveat {
    margin-top: 24px;
}

@media (max-width: 800px) {
    .fl-row {
        grid-template-columns: minmax(0, 1fr) 4.5rem;
        row-gap: 10px;
    }

    .fl-main { grid-column: 1 / -1; }
    .fl-stack { white-space: normal; }
}
</style>
