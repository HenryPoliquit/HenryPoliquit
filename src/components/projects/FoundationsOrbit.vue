<template>
    <section class="band">
        <v-container>
            <p class="band-label">Foundations</p>

            <!-- Reduced motion, or no JS yet: the same cards, standing still.
                 The orbit is the presentation, never the content. -->
            <div
                v-if="still"
                class="orbit-static"
            >
                <article v-for="p in items" :key="p.id" class="card">
                    <h3 class="card-title">
                        {{ p.title }}<span class="mark" aria-hidden="true">&nbsp;&Dagger;</span>
                    </h3>
                    <p class="card-tagline">{{ p.tagline }}</p>
                    <p class="card-stack fig">{{ p.technologies.join(' · ') }}</p>
                    <p class="card-link fig">
                        <a
                            v-if="linkOf(p)"
                            :href="linkOf(p).href"
                            target="_blank"
                            rel="noopener noreferrer"
                        >{{ linkOf(p).label }}<span aria-hidden="true">&nbsp;&#8599;</span></a>
                        <span v-else class="card-nolink">&mdash;</span>
                    </p>
                </article>
            </div>

            <template v-else>
                <div
                    ref="stage"
                    class="orbit-stage"
                    role="group"
                    :aria-label="`${items.length} coursework projects, on a rotating carousel. Drag to spin, or tab through the cards.`"
                    @pointerdown="onDown"
                    @pointermove="onMove"
                    @pointerup="onUp"
                    @pointercancel="onUp"
                    @pointerenter="hovering = true"
                    @pointerleave="hovering = false"
                    @focusin="onFocusIn"
                    @focusout="hovering = false"
                >
                    <div class="orbit-ring" :style="ringStyle">
                        <article
                            v-for="(p, i) in items"
                            :key="p.id"
                            class="card card--3d"
                            :style="cardStyle(i)"
                        >
                            <h3 class="card-title">
                                {{ p.title }}<span class="mark" aria-hidden="true">&nbsp;&Dagger;</span>
                            </h3>
                            <p class="card-tagline">{{ p.tagline }}</p>
                            <p class="card-stack fig">{{ p.technologies.join(' · ') }}</p>
                            <p class="card-link fig">
                                <a
                                    v-if="linkOf(p)"
                                    :href="linkOf(p).href"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    :data-index="i"
                                    @click="onLinkClick"
                                    @focus="faceCard(i)"
                                >{{ linkOf(p).label }}<span aria-hidden="true">&nbsp;&#8599;</span></a>
                                <span v-else class="card-nolink">&mdash;</span>
                            </p>
                        </article>
                    </div>
                </div>

                <p class="small-print orbit-hint fig" aria-hidden="true">Drag to spin</p>
            </template>

            <p v-if="caveat" class="small-print orbit-caveat">
                <span class="mark" aria-hidden="true">&Dagger;</span>{{ caveat }}
            </p>
        </v-container>
    </section>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()
const items = computed(() => store.foundations)

// The caveat is the same line on every coursework row, so print it once.
const caveat = computed(() => items.value.find(p => p.caveat)?.caveat ?? null)

function linkOf(p) {
    if (p.githubUrl) return { href: p.githubUrl, label: 'repo' }
    if (p.liveUrl) return { href: p.liveUrl, label: 'site' }
    return null
}

// ── Geometry ──────────────────────────────────────────────────────────────
// Cards sit on a vertical-axis ring, evenly spaced, each turned to face out.
// Radius is derived from the count so four cards and six cards both breathe:
// r = (card + gap) / 2 / tan(pi / n).
// Card width is a breakpoint away from the CSS, so the radius has to follow
// it - deriving from 250 on a phone whose cards are 210 puts the neighbours
// further out than the stage can show.
const narrow = ref(false)
const cardW = computed(() => (narrow.value ? 210 : 250))
const gap = computed(() => (narrow.value ? 55 : 90))

const step = computed(() => 360 / Math.max(items.value.length, 1))
const radius = computed(() => {
    const n = Math.max(items.value.length, 2)
    return Math.round((cardW.value + gap.value) / 2 / Math.tan(Math.PI / n))
})

const angle = ref(0)
const ringStyle = computed(() => ({
    transform: `translateZ(-${radius.value}px) rotateY(${angle.value}deg)`,
}))

function cardStyle(i) {
    // How far this card is turned away from the viewer, 0 = facing us.
    const facing = ((angle.value + i * step.value) % 360 + 360) % 360
    const depth = (Math.cos((facing * Math.PI) / 180) + 1) / 2 // 1 front, 0 back
    return {
        transform: `rotateY(${i * step.value}deg) translateZ(${radius.value}px)`,
        opacity: (0.22 + 0.78 * depth).toFixed(3),
        // Cards turned away must not swallow clicks meant for the front one.
        pointerEvents: depth > 0.55 ? 'auto' : 'none',
    }
}

// ── Motion ────────────────────────────────────────────────────────────────
// Resolved during setup, not in onMounted. Deciding after the first paint
// would render the static grid and then swap it for a shorter stage - a
// layout shift on a site that spent real effort getting CLS to 0.
const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

const still = ref(prefersReduced())
const hovering = ref(false)
const dragging = ref(false)

const stage = ref(null)
let raf = null
let velocity = 0
let lastX = 0
let dragDistance = 0
let reduceQuery = null
let narrowQuery = null

const IDLE_SPEED = 0.07 // deg per frame, ~4 deg/s - a drift, not a spin

function tick() {
    if (!dragging.value) {
        if (Math.abs(velocity) > 0.01) {
            angle.value += velocity
            velocity *= 0.94 // momentum bleed after a flick
        } else if (!hovering.value) {
            angle.value += IDLE_SPEED
        }
    }
    raf = requestAnimationFrame(tick)
}

function onDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragging.value = true
    dragDistance = 0
    lastX = e.clientX
    velocity = 0
    stage.value?.setPointerCapture?.(e.pointerId)
}

function onMove(e) {
    if (!dragging.value) return
    const dx = e.clientX - lastX
    lastX = e.clientX
    dragDistance += Math.abs(dx)
    const delta = dx * 0.32
    angle.value += delta
    velocity = delta
}

function onUp(e) {
    if (!dragging.value) return
    dragging.value = false
    stage.value?.releasePointerCapture?.(e.pointerId)
}

// A drag that ends on a link should spin the ring, not open the repo.
function onLinkClick(e) {
    if (dragDistance > 6) {
        e.preventDefault()
        dragDistance = 0
    }
}

// Tabbing to a card brings it to the front rather than leaving focus on
// something facing away from the reader.
function faceCard(i) {
    const target = -i * step.value
    const current = angle.value
    // Nearest equivalent rotation, so it never unwinds the long way round.
    angle.value = current + ((((target - current) % 360) + 540) % 360) - 180
    velocity = 0
}

function onFocusIn(e) {
    hovering.value = true
    const i = Number(e.target?.dataset?.index)
    if (!Number.isNaN(i)) faceCard(i)
}

function applyMotionPreference() {
    still.value = reduceQuery.matches
    if (still.value) {
        if (raf) cancelAnimationFrame(raf)
        raf = null
    } else if (!raf) {
        raf = requestAnimationFrame(tick)
    }
}

function applyWidth() {
    narrow.value = narrowQuery.matches
}

onMounted(() => {
    reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    applyMotionPreference()
    reduceQuery.addEventListener('change', applyMotionPreference)

    // Matches the 600px breakpoint the card styles use below.
    narrowQuery = window.matchMedia('(max-width: 600px)')
    applyWidth()
    narrowQuery.addEventListener('change', applyWidth)
})

onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf)
    reduceQuery?.removeEventListener('change', applyMotionPreference)
    narrowQuery?.removeEventListener('change', applyWidth)
})
</script>

<style scoped>
/* -- The card, shared by both presentations ----------------------------- */
.card {
    width: 250px;
    box-sizing: border-box;
    padding: 18px 20px 16px;
    background: rgb(var(--v-theme-surface));
    border: var(--rule);
    border-radius: var(--radius-card);
}

.card-title {
    font-size: 1rem;
    font-weight: 600;
    font-stretch: 90%;
    line-height: 1.2;
    color: rgb(var(--v-theme-on-background));
    margin-bottom: 8px;
}

.mark {
    color: rgb(var(--v-theme-accent));
}

.card-tagline {
    font-family: var(--font-body);
    font-size: 0.84rem;
    line-height: 1.5;
    color: rgb(var(--v-theme-on-surface-variant));
    margin-bottom: 14px;
}

.card-stack {
    font-size: 0.7rem;
    line-height: 1.5;
    color: rgb(var(--v-theme-on-surface-variant));
    padding-top: 10px;
    border-top: var(--rule);
}

.card-link {
    font-size: 0.75rem;
    margin-top: 10px;
}

.card-link a {
    color: rgb(var(--v-theme-accent));
    border-bottom: 1px solid rgba(var(--v-theme-accent), 0.35);
    transition: border-color 0.2s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .card-link a:hover {
        border-bottom-color: rgb(var(--v-theme-accent));
    }
}

.card-nolink {
    color: rgb(var(--v-theme-on-surface-variant));
    opacity: 0.5;
}

/* -- Static presentation ------------------------------------------------ */
.orbit-static {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

/* -- The orbit ---------------------------------------------------------- */
.orbit-stage {
    position: relative;
    /* Sized to the ring it holds (card + 2r + air), not to the container -
       a full-width stage puts the mask far outside the cards, where it has
       nothing to fade. */
    width: 100%;
    /* The swing is card + 2r wide (250 + 340), so anything past ~620px is
       dead space the mask never reaches. */
    max-width: 620px;
    /* Left, not centred: every other element in a band hangs off the same
       left rule, and a centred island under a left-aligned label reads as
       detached from the document. */
    margin-inline: 0;
    height: 315px;
    perspective: 1150px;
    /* Horizontal drag is ours; vertical scroll stays the page's. */
    touch-action: pan-y;
    cursor: grab;
    /* Cards rotate out through the edges rather than hitting a hard border. */
    -webkit-mask-image: linear-gradient(to right, transparent, #000 18%, #000 82%, transparent);
    mask-image: linear-gradient(to right, transparent, #000 18%, #000 82%, transparent);
}

.orbit-stage:active {
    cursor: grabbing;
}

.orbit-ring {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 250px;
    height: 235px;
    transform-style: preserve-3d;
}

.card--3d {
    position: absolute;
    inset: 0;
    /* Without this the far side of the ring shows through as mirror-image
       text, which reads as a rendering fault rather than as depth. */
    backface-visibility: hidden;
    /* No transition on opacity: the frame loop already writes it every frame,
       so a transition would only ever be retargeting and never settling. */
}

/* The ring box is fixed, so a long tagline has to be bounded or it spills
   past the card's rule. Only in the orbit - the static list has room. */
.card--3d .card-tagline {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.orbit-hint {
    margin-top: 14px;
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgb(var(--v-theme-on-surface-variant));
    opacity: 0.6;
}

.orbit-caveat {
    margin-top: 24px;
}

@media (max-width: 600px) {
    .card { width: 210px; }
    .orbit-ring { width: 210px; height: 250px; }
    /* Swing is 210 + 2r (r = 135), so the stage is sized to match. */
    .orbit-stage { height: 330px; max-width: 480px; }
}
</style>
