<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-footer app color="surface" class="site-footer pa-0">
        <!-- Giant typographic watermark -->
        <div class="footer-wordmark" aria-hidden="true">POLIQUIT</div>

        <v-container class="footer-inner">
            <!-- Decorative amber rule -->
            <div class="footer-rule mb-10">
                <span class="rule-line"></span>
                <v-icon icon="mdi-asterisk" size="11" color="accent" class="mx-3" style="opacity:0.6"></v-icon>
                <span class="rule-line"></span>
            </div>

            <!-- Main grid: tagline + nav | contact + socials -->
            <div class="footer-grid mb-10">
                <!-- Left: brand identity -->
                <div class="footer-brand">
                    <p class="footer-tagline">
                        Building digital experiences<br />that actually matter.
                    </p>
                    <nav class="footer-nav mt-6" aria-label="Footer navigation">
                        <router-link
                            v-for="link in store.navItems"
                            :key="link.path"
                            :to="link.path"
                            class="footer-nav-link"
                        >{{ link.title }}</router-link>
                    </nav>
                </div>

                <!-- Right: contact info -->
                <div class="footer-contact">
                    <p class="section-label mb-4">Get in touch</p>
                    <a :href="`mailto:${store.personal.email}`" class="footer-email">
                        {{ store.personal.email }}
                    </a>
                    <p class="footer-location mt-2">
                        <v-icon icon="mdi-map-marker-outline" size="14" class="mr-1" style="opacity:0.6"></v-icon>
                        {{ store.personal.location }}
                    </p>
                    <div class="footer-socials mt-5">
                        <a
                            v-for="social in store.socialLinks"
                            :key="social.name"
                            :href="social.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            :aria-label="social.name"
                            class="social-icon"
                        >
                            <v-icon :icon="social.icon" size="18"></v-icon>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom bar -->
            <div class="footer-bottom">
                <span>© {{ currentYear }} {{ store.personal.name }}</span>
                <span v-if="store.discoveryCount > 0" class="footer-secret" title="Hidden easter eggs discovered by visitors">
                    🔓 {{ store.discoveryCount }} found the secret
                </span>
                <span class="footer-built">Vue.js · Vuetify · Vercel · Supabase</span>
            </div>
        </v-container>
    </v-footer>
</template>

<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'

const store = usePortfolioStore()
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.site-footer {
    position: relative;
    overflow: hidden;
    border-top: 1px solid rgb(var(--v-theme-surface-variant));
    min-height: unset !important;
}

.footer-inner {
    position: relative;
    z-index: 1;
    padding-top: 60px;
    padding-bottom: 36px;
}

/* Giant typographic watermark */
.footer-wordmark {
    position: absolute;
    bottom: -12px;
    right: -16px;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(72px, 16vw, 192px);
    line-height: 1;
    letter-spacing: -6px;
    color: rgb(var(--v-theme-accent));
    opacity: 0.045;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
}

/* Decorative amber rule */
.footer-rule {
    display: flex;
    align-items: center;
}

.rule-line {
    flex: 1;
    height: 1px;
    background: rgb(var(--v-theme-surface-variant));
}

/* Two-column grid */
.footer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
}

@media (max-width: 768px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 36px;
    }
}

/* Lora italic tagline */
.footer-tagline {
    font-family: 'Lora', Georgia, serif;
    font-style: italic;
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    line-height: 1.75;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.85;
    margin: 0;
}

/* Horizontal nav links */
.footer-nav {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.footer-nav-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: rgb(var(--v-theme-on-surface-variant));
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer-nav-link:hover,
.footer-nav-link.router-link-active {
    color: rgb(var(--v-theme-accent));
}

/* Contact side */
.footer-email {
    display: block;
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.875rem, 1.4vw, 1rem);
    font-weight: 500;
    color: rgb(var(--v-theme-on-surface));
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer-email:hover {
    color: rgb(var(--v-theme-accent));
}

.footer-location {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    color: rgb(var(--v-theme-on-surface-variant));
    margin: 0;
    display: flex;
    align-items: center;
}

/* Social icons */
.footer-socials {
    display: flex;
    gap: 10px;
}

.social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    border: 1px solid rgb(var(--v-theme-surface-variant));
    color: rgb(var(--v-theme-on-surface-variant));
    text-decoration: none;
    transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease, transform 0.25s ease;
}

.social-icon:hover {
    border-color: rgba(212, 137, 10, 0.5);
    color: rgb(var(--v-theme-accent));
    background: rgba(212, 137, 10, 0.08);
    transform: translateY(-2px);
}

/* Bottom copyright bar */
.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgb(var(--v-theme-surface-variant));
    padding-top: 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    color: rgb(var(--v-theme-on-surface-variant));
    flex-wrap: wrap;
    gap: 8px;
}

.footer-built {
    opacity: 0.7;
}

.footer-secret {
    color: rgb(var(--v-theme-accent));
    opacity: 0.85;
    font-variant-numeric: tabular-nums;
}

@media (max-width: 600px) {
    .footer-bottom {
        flex-wrap: wrap;
        gap: 6px 16px;
    }
}
</style>
