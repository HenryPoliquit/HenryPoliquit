<template>
    <div class="hero-wrapper">
        <!-- Ambient glow blobs -->
        <div class="blob blob-1" aria-hidden="true"></div>
        <div class="blob blob-2" aria-hidden="true"></div>

        <v-container fluid class="hero-section">
            <v-row align="center" justify="center" class="text-center hero-content">
                <v-col cols="12" lg="10">
                    <!-- Availability Badge -->
                    <div v-if="store.personal.available" class="fade-in availability-badge mb-6">
                        <span class="status-dot"></span>
                        <span class="text-body-2 text-white">Available for opportunities</span>
                    </div>

                    <!-- Main Heading -->
                    <div class="fade-in">
                        <h1 class="text-h3 text-sm-h2 text-white mb-4 font-weight-bold">
                            Hello, I am
                            <span class="text-gradient-cyan">{{ store.personal.name }}</span>
                        </h1>
                    </div>

                    <!-- Typewriter Effect -->
                    <div class="fade-in" style="animation-delay: 0.2s">
                        <h2 class="text-h5 text-sm-h4 text-white mb-8">
                            A<span class="text-accent">{{ typewriterText }}</span><span class="cursor-blink">{{
                                showCursor ? '_' : '' }}</span>
                        </h2>
                    </div>

                    <!-- Intro Text -->
                    <div class="fade-in" style="animation-delay: 0.3s">
                        <p class="text-h6 text-white mb-12 hero-opacity mx-auto" style="max-width: 700px;">
                            Passionate about creating elegant solutions to complex problems.
                            Let's build something amazing together.
                        </p>
                    </div>

                    <!-- Action Buttons -->
                    <div class="fade-in" style="animation-delay: 0.4s">
                        <v-row justify="center" class="mb-12">
                            <v-col cols="12" sm="auto">
                                <v-btn color="accent" size="x-large" to="/projects"
                                    class="px-8 text-primary mb-4 mb-sm-0" elevation="4">
                                    <v-icon icon="mdi-briefcase" start></v-icon>
                                    View My Projects
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="auto">
                                <v-btn color="accent" size="x-large" variant="outlined" class="px-8" to="/contact">
                                    <v-icon icon="mdi-email" start></v-icon>
                                    Get In Touch
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>

                    <!-- Quick Stats -->
                    <div class="fade-in" style="animation-delay: 0.6s">
                        <StatsGrid :stats="store.stats" />
                    </div>

                    <!-- Scroll Indicator — hidden on mobile to avoid crowding -->
                    <div class="scroll-indicator fade-in d-none d-sm-block" style="animation-delay: 0.8s">
                        <v-icon icon="mdi-chevron-down" size="large" color="accent" class="bounce"></v-icon>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { useTypewriter } from '../../composables/useTypewriter'
import { usePortfolioStore } from '../../stores/portfolio'
import StatsGrid from './StatsGrid.vue'

const store = usePortfolioStore()
const { typewriterText, showCursor } = useTypewriter([
    ' Software Engineering Student',
    ' Full-stack Web Developer',
])
</script>

<style scoped>
/* ── Availability badge ── */
.availability-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(76, 175, 80, 0.12);
    border: 1px solid rgba(76, 175, 80, 0.3);
    padding: 6px 16px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4CAF50;
    flex-shrink: 0;
    animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
    0%   { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.6); }
    70%  { box-shadow: 0 0 0 8px rgba(76, 175, 80, 0); }
    100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
}

/* ── Outer wrapper ── */
.hero-wrapper {
    position: relative;
    min-height: calc(100vh - 72px);
    overflow: hidden;
    background: linear-gradient(135deg, #2C3E50 0%, #1A252F 100%);
    display: flex;
    align-items: center;
}

/* ── Ambient blobs ── */
.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    will-change: transform;
}

.blob-1 {
    width: 520px;
    height: 520px;
    background: rgba(0, 188, 212, 0.14);
    top: -160px;
    right: -80px;
    animation: blobFloat 22s ease-in-out infinite;
}

.blob-2 {
    width: 380px;
    height: 380px;
    background: rgba(0, 188, 212, 0.07);
    bottom: -100px;
    left: 8%;
    animation: blobFloat 28s ease-in-out infinite reverse;
}

@keyframes blobFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(25px, -18px) scale(1.04); }
    66%       { transform: translate(-18px, 22px) scale(0.97); }
}

@media (prefers-reduced-motion: reduce) {
    .blob { animation: none; }
}

@media (max-width: 600px) {
    .blob-1 { width: 280px; height: 280px; top: -80px; right: -60px; }
    .blob-2 { width: 200px; height: 200px; bottom: -60px; }
    .hero-section { padding: 32px 16px; }
}

/* ── Hero content ── */
.hero-section {
    position: relative;
    z-index: 1;
    padding: 60px 16px;
    width: 100%;
}

.hero-content {
    min-height: calc(100vh - 72px);
}

.text-gradient-cyan {
    background: linear-gradient(135deg, #00BCD4 0%, #4DD0E1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.cursor-blink {
    animation: blink 1s step-end infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
}

.hero-opacity {
    opacity: 0.9;
}

.scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
}

.bounce {
    animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    40%       { transform: translateY(-10px); }
    60%       { transform: translateY(-5px); }
}

@media (max-width: 600px) {
    .hero-section { padding: 40px 16px; }
}
</style>
