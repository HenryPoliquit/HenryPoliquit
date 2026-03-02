<template>
    <section class="tech-section">
        <v-container class="text-center pt-10 pt-sm-16 pb-6 pb-sm-10">
            <p class="text-overline text-accent mb-2" style="letter-spacing: 4px;">WHAT I USE</p>
            <h2 class="text-h5 text-sm-h4 font-weight-bold text-white">Technologies &amp; Tools</h2>
        </v-container>

        <!-- Visually hidden tech list for screen readers (marquees are aria-hidden) -->
        <ul class="sr-only">
            <li v-for="tech in row1" :key="tech">{{ tech }}</li>
            <li v-for="tech in row2" :key="tech">{{ tech }}</li>
        </ul>

        <!-- Row 1: scrolls left -->
        <div class="marquee-wrapper mb-3" aria-hidden="true">
            <div class="marquee-fade-left"></div>
            <div class="marquee-track">
                <span v-for="(tech, i) in row1Double" :key="`r1-${i}`" class="tech-chip">{{ tech }}</span>
            </div>
            <div class="marquee-fade-right"></div>
        </div>

        <!-- Row 2: scrolls right -->
        <div class="marquee-wrapper pb-16" aria-hidden="true">
            <div class="marquee-fade-left"></div>
            <div class="marquee-track marquee-reverse">
                <span v-for="(tech, i) in row2Double" :key="`r2-${i}`" class="tech-chip">{{ tech }}</span>
            </div>
            <div class="marquee-fade-right"></div>
        </div>
    </section>
</template>

<script setup>
const row1 = [
    'Vue.js', 'Vuetify 3', 'JavaScript', 'React', 'HTML5', 'CSS3',
    'Pinia', 'Firebase', 'REST APIs', 'Responsive Design', 'Vue Router',
]

const row2 = [
    'Fastify', 'Node.js', 'PostgreSQL', 'Cloud Run', 'Cloud SQL',
    'API Gateway', 'Firebase Auth', 'HitPay', 'Apps Script', 'Spring Boot', 'MySQL',
]

// Duplicate for seamless looping
const row1Double = [...row1, ...row1]
const row2Double = [...row2, ...row2]
</script>

<style scoped>
.tech-section {
    background: #1A252F;
    overflow: hidden;
}

.marquee-wrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    width: 100%;
}

.marquee-track {
    display: flex;
    gap: 12px;
    padding: 6px 0;
    animation: marquee 40s linear infinite;
    will-change: transform;
    flex-shrink: 0;
}

.marquee-track:hover {
    animation-play-state: paused;
}

.marquee-reverse {
    animation-direction: reverse;
}

@keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}

.tech-chip {
    display: inline-flex;
    align-items: center;
    padding: 8px 20px;
    border-radius: 999px;
    background: rgba(0, 188, 212, 0.07);
    border: 1px solid rgba(0, 188, 212, 0.22);
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    cursor: default;
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.tech-chip:hover {
    background: rgba(0, 188, 212, 0.18);
    border-color: rgba(0, 188, 212, 0.55);
    color: #fff;
}

.marquee-fade-left,
.marquee-fade-right {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 60px;
    z-index: 2;
    pointer-events: none;
}

@media (min-width: 600px) {
    .marquee-fade-left,
    .marquee-fade-right { width: 100px; }
}

@media (max-width: 600px) {
    .tech-chip { padding: 6px 14px; font-size: 0.8rem; }
}

.marquee-fade-left {
    left: 0;
    background: linear-gradient(to right, #1A252F 20%, transparent);
}

.marquee-fade-right {
    right: 0;
    background: linear-gradient(to left, #1A252F 20%, transparent);
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    list-style: none;
}
</style>
