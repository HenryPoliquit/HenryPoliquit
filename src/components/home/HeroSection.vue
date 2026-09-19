<template>
    <section class="hero">
        <v-container class="hero-inner">
            <p class="hero-eyebrow fig print-in" style="animation-delay: 0s">
                {{ store.personal.title }} &mdash; {{ store.personal.location }}
            </p>

            <h1 class="hero-name print-in" style="animation-delay: 0.06s">
                {{ store.personal.name }}
            </h1>

            <p class="hero-thesis print-in" style="animation-delay: 0.14s">
                {{ store.personal.tagline }}
            </p>

            <!-- Signature: the rate row. One record, ruled like a premium
                 schedule. The only bold thing on the page. -->
            <div
                v-if="p"
                class="rate scroll-x print-in"
                style="animation-delay: 0.24s"
                role="group"
                aria-label="Production project summary"
            >
                <dl class="rate-grid">
                    <div class="rate-cell">
                        <dt class="col-head">Product</dt>
                        <dd>
                            <a
                                v-if="p.liveUrl"
                                :href="p.liveUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="rate-product"
                            >{{ host }}<span aria-hidden="true">&nbsp;&#8599;</span></a>
                            <span v-else class="rate-product">{{ p.title }}</span>
                        </dd>
                    </div>

                    <div class="rate-cell">
                        <dt class="col-head">Market</dt>
                        <dd class="fig">{{ p.market ?? EMPTY }}</dd>
                    </div>

                    <div class="rate-cell rate-cell--wide">
                        <dt class="col-head">Stack</dt>
                        <dd class="fig">{{ stack }}</dd>
                    </div>

                    <div class="rate-cell">
                        <dt class="col-head">Status</dt>
                        <dd class="fig rate-status" :class="{ 'is-resolved': resolved }">
                            <span class="dot" aria-hidden="true"></span>{{ resolved ? 'live' : EMPTY }}
                        </dd>
                    </div>

                    <div class="rate-cell">
                        <dt class="col-head">Since</dt>
                        <dd class="fig">{{ p.since ?? EMPTY }}</dd>
                    </div>
                </dl>
            </div>
        </v-container>
    </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'

// Em dash: the ledger convention for "no value here".
const EMPTY = '—'

const store = usePortfolioStore()
const p = computed(() => store.production)

// Bare host, no scheme or trailing slash. It reads as a figure, not a URL.
const host = computed(() => {
    if (!p.value?.liveUrl) return p.value?.title ?? ''
    try {
        return new URL(p.value.liveUrl).host.replace(/^www\./, '')
    } catch {
        return p.value.title
    }
})

// Three names, not nine. The full list lives in the case study.
const stack = computed(() => (p.value?.technologies ?? []).slice(0, 3).join(' · ') || EMPTY)

// The one orchestrated moment: status resolves from a dash to a live dot.
const resolved = ref(true)
onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    resolved.value = false
    setTimeout(() => { resolved.value = true }, 750)
})
</script>

<style scoped>
.hero {
    background: rgb(var(--v-theme-background));
}

.hero-inner {
    padding-top: clamp(56px, 12vh, 132px);
    padding-bottom: var(--band-y);
}

.hero-eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgb(var(--v-theme-on-surface-variant));
    margin-bottom: 20px;
}

/* Condensed uppercase grotesque: the language of schedules and timetables. */
.hero-name {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 9vw, 6.25rem);
    font-weight: 700;
    font-stretch: 76%;
    text-transform: uppercase;
    letter-spacing: -0.015em;
    line-height: 0.92;
    color: rgb(var(--v-theme-on-background));
    margin-bottom: 28px;
}

.hero-thesis {
    font-family: var(--font-body);
    font-size: clamp(1.05rem, 2.2vw, 1.45rem);
    line-height: 1.55;
    max-width: 30rem;
    color: rgb(var(--v-theme-on-background));
    margin-bottom: 52px;
}

/* -- The rate row ------------------------------------------------------- */
.rate {
    border-top: 2px solid rgb(var(--v-theme-on-background));
    border-bottom: 2px solid rgb(var(--v-theme-on-background));

    /* Scrolling shadows. The row is wider than a phone, and the cells that pay
       it off (STATUS, SINCE) sit at the far end — without a cue they read as
       the end of the record rather than the middle of it.
       The `local` layers scroll with the content and mask the `scroll` layers
       at each end, so the cue appears only while there is more row to reach,
       and never on desktop where nothing overflows. */
    background:
        linear-gradient(to right, rgb(var(--v-theme-background)) 40%, transparent)
            left center / 32px 100% no-repeat local,
        linear-gradient(to left, rgb(var(--v-theme-background)) 40%, transparent)
            right center / 32px 100% no-repeat local,
        linear-gradient(to right, rgba(var(--v-theme-on-background), 0.22), transparent)
            left center / 10px 100% no-repeat scroll,
        linear-gradient(to left, rgba(var(--v-theme-on-background), 0.22), transparent)
            right center / 10px 100% no-repeat scroll;
}

.rate-grid {
    display: grid;
    grid-template-columns: max-content max-content minmax(180px, 1fr) max-content max-content;
    gap: 0 32px;
    padding: 14px 0;
    min-width: max-content;
}

.rate-cell dt {
    margin-bottom: 6px;
}

.rate-cell dd {
    font-size: 0.95rem;
    color: rgb(var(--v-theme-on-background));
    white-space: nowrap;
}

.rate-cell--wide dd {
    white-space: normal;
}

.rate-product {
    font-family: var(--font-mono);
    font-weight: 500;
    color: rgb(var(--v-theme-accent));
    border-bottom: 1px solid rgba(var(--v-theme-accent), 0.4);
    transition: border-color 0.2s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .rate-product:hover {
        border-bottom-color: rgb(var(--v-theme-accent));
    }
}


.rate-status {
    display: flex;
    align-items: center;
    gap: 7px;
    color: rgb(var(--v-theme-on-surface-variant));
}

.rate-status.is-resolved {
    color: rgb(var(--v-theme-success));
}

.dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgb(var(--v-theme-on-surface-variant));
    opacity: 0.4;
    transition: background-color 0.3s var(--ease-out), opacity 0.3s var(--ease-out);
}

.is-resolved .dot {
    background: rgb(var(--v-theme-success));
    opacity: 1;
}

@media (max-width: 600px) {
    .rate-grid {
        gap: 0 24px;
        padding: 12px 0;
    }

    .rate-cell dd {
        font-size: 0.88rem;
    }
}
</style>
