<template>
    <div class="hero-wrapper">
        <v-container fluid class="hero-section">
            <v-row align="center" class="hero-content" no-gutters>
                <!-- Left: Text content -->
                <v-col cols="12" lg="7" class="hero-left pr-lg-12">
                    <!-- Availability badge -->
                    <div v-if="store.personal.available" class="fade-in availability-badge mb-6">
                        <span class="status-dot"></span>
                        <span class="badge-text">Available for opportunities</span>
                    </div>

                    <!-- Lora italic greeting -->
                    <div class="fade-in lora-greeting mb-2" style="animation-delay: 0.05s">
                        Hello, I'm
                    </div>

                    <!-- Name -->
                    <div class="fade-in">
                        <h1 class="hero-name mb-4">
                            {{ store.personal.name }}
                        </h1>
                    </div>

                    <!-- Typewriter Role -->
                    <div class="fade-in" style="animation-delay: 0.15s">
                        <p class="hero-role mb-6">
                            <span class="role-prefix">A </span>
                            <span class="role-accent">{{ typewriterText }}</span>
                            <span class="cursor-blink">{{ showCursor ? '_' : '' }}</span>
                        </p>
                    </div>

                    <!-- Bio in Lora -->
                    <div class="fade-in" style="animation-delay: 0.3s">
                        <p class="hero-bio mb-10">
                            Passionate about building scalable, cloud-native web applications.
                            Currently studying Software Engineering — open to internships and
                            junior roles.
                        </p>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="fade-in d-flex flex-wrap ga-3 mb-12" style="animation-delay: 0.4s">
                        <v-btn color="accent" size="large" to="/projects" class="px-7" elevation="3">
                            <v-icon icon="mdi-briefcase" start></v-icon>
                            View Projects
                        </v-btn>
                        <v-btn color="accent" size="large" variant="outlined" class="px-7" to="/contact">
                            <v-icon icon="mdi-email" start></v-icon>
                            Get In Touch
                        </v-btn>
                        <v-btn size="large" variant="outlined" class="px-7 resume-btn" disabled>
                            <v-icon icon="mdi-file-account" start></v-icon>
                            Resume
                        </v-btn>
                    </div>

                    <!-- Stats -->
                    <div class="fade-in" style="animation-delay: 0.55s">
                        <StatsGrid :stats="store.stats" />
                    </div>
                </v-col>

                <!-- Right: Profile photo (desktop only) -->
                <v-col cols="12" lg="5" class="d-none d-lg-flex align-center justify-center hero-right">
                    <div class="fade-in photo-frame-wrapper" style="animation-delay: 0.2s">
                        <div class="photo-glow"></div>
                        <div class="photo-frame">
                            <v-img
                                src="/profile.jpg"
                                alt="Paul Henry Poliquit"
                                width="380"
                                height="460"
                                cover
                                class="profile-photo"
                            >
                                <template v-slot:error>
                                    <div class="photo-fallback d-flex align-center justify-center">
                                        <span class="fallback-initials">PH</span>
                                    </div>
                                </template>
                            </v-img>
                        </div>

                        <!-- Floating tech badge -->
                        <div class="tech-badge">
                            <v-icon icon="mdi-code-braces" size="15" color="accent" class="mr-2"></v-icon>
                            <span class="tech-badge-text">Full-Stack Dev</span>
                        </div>
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
    'Software Engineering Student',
    'Full-Stack Web Developer',
    'Cloud Infrastructure Enthusiast',
])
</script>

<style scoped>
.hero-wrapper {
    position: relative;
    min-height: calc(100vh - 72px);
    background-color: rgb(var(--v-theme-background));
    display: flex;
    align-items: center;
    overflow: hidden;
}

/* Warm radial gradient atmosphere */
.hero-wrapper::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 60%;
    height: 80%;
    background: radial-gradient(ellipse at center, rgba(212, 137, 10, 0.07) 0%, transparent 65%);
    pointer-events: none;
}

.hero-section {
    position: relative;
    z-index: 1;
    padding: 80px 48px;
    width: 100%;
}

.hero-content {
    min-height: calc(100vh - 72px);
}

.hero-left {
    padding-top: 40px;
    padding-bottom: 40px;
}

/* ── Availability badge ── */
.availability-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(74, 124, 89, 0.12);
    border: 1px solid rgba(74, 124, 89, 0.3);
    padding: 6px 16px;
    border-radius: 99px;
}

.status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgb(var(--v-theme-success));
    flex-shrink: 0;
    animation: statusPulse 2s ease-in-out infinite;
}

.badge-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.8;
}

@keyframes statusPulse {
    0%   { box-shadow: 0 0 0 0 rgba(74, 124, 89, 0.5); }
    70%  { box-shadow: 0 0 0 7px rgba(74, 124, 89, 0); }
    100% { box-shadow: 0 0 0 0 rgba(74, 124, 89, 0); }
}

/* ── Lora greeting ── */
.lora-greeting {
    font-family: 'Lora', Georgia, serif;
    font-style: italic;
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    color: rgb(var(--v-theme-accent));
    font-weight: 400;
}

/* ── Typography ── */
.hero-name {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.6rem, 5.5vw, 4.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -1.5px;
    color: rgb(var(--v-theme-on-background));
}

.hero-role {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    color: rgb(var(--v-theme-on-surface-variant));
    font-weight: 400;
    line-height: 1.5;
}

.role-prefix {
    opacity: 0.6;
}

.role-accent {
    color: rgb(var(--v-theme-accent));
}

.hero-bio {
    font-family: 'Lora', Georgia, serif;
    font-size: 1.05rem;
    line-height: 1.85;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.78;
    max-width: 500px;
}

.cursor-blink {
    animation: blink 1s step-end infinite;
    color: rgb(var(--v-theme-accent));
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
}

.resume-btn {
    border-color: rgb(var(--v-theme-surface-variant));
    color: rgb(var(--v-theme-on-surface-variant));
    opacity: 0.5;
}

/* ── Photo ── */
.hero-right {
    padding-top: 40px;
    padding-bottom: 40px;
}

.photo-frame-wrapper {
    position: relative;
    display: inline-block;
}

.photo-glow {
    position: absolute;
    inset: -24px;
    background: radial-gradient(ellipse at center, rgba(212, 137, 10, 0.18) 0%, transparent 68%);
    pointer-events: none;
    border-radius: 20px;
}

.photo-frame {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(212, 137, 10, 0.25);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(212, 137, 10, 0.1);
}

.photo-fallback {
    width: 380px;
    height: 460px;
    background: rgb(var(--v-theme-surface));
}

.fallback-initials {
    font-family: 'Syne', sans-serif;
    font-size: 5rem;
    font-weight: 800;
    color: rgb(var(--v-theme-accent));
    opacity: 0.25;
    letter-spacing: 4px;
}

/* ── Floating tech badge ── */
.tech-badge {
    position: absolute;
    bottom: -16px;
    left: -20px;
    display: flex;
    align-items: center;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgba(212, 137, 10, 0.3);
    border-radius: 10px;
    padding: 10px 16px;
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.tech-badge-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
    letter-spacing: 0.3px;
}

/* ── Mobile ── */
@media (max-width: 1279px) {
    .hero-section { padding: 60px 24px; }
    .hero-content { min-height: auto; padding: 40px 0; }
    .hero-bio { max-width: 100%; }
}

@media (max-width: 600px) {
    .hero-section { padding: 40px 16px; }
}

@media (prefers-reduced-motion: reduce) {
    .status-dot { animation: none; }
    .cursor-blink { animation: none; }
}
</style>
