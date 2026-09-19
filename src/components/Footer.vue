<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <!-- Deliberately not `app`: registering with Vuetify's layout system makes
         the footer paint in normal flow for one frame and then get repositioned,
         which is a large layout shift on every cold load. It only needs to sit
         at the end of the document. -->
    <v-footer color="background" class="site-footer pa-0">
        <v-container class="footer-inner">
            <div class="footer-grid">
                <div>
                    <p class="col-head footer-head">Contact</p>
                    <a :href="`mailto:${store.personal.email}`" class="footer-email fig">
                        {{ store.personal.email }}
                    </a>
                    <p class="footer-loc fig">{{ store.personal.location }}</p>
                </div>

                <div>
                    <p class="col-head footer-head">Elsewhere</p>
                    <ul class="footer-links">
                        <li v-for="social in store.socialLinks" :key="social.name">
                            <a
                                :href="social.url"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="fig"
                            >{{ social.name }}<span aria-hidden="true"> ↗</span></a>
                        </li>
                    </ul>
                </div>

                <nav aria-label="Footer">
                    <p class="col-head footer-head">Contents</p>
                    <ul class="footer-links">
                        <li v-for="link in store.navItems" :key="link.path">
                            <router-link :to="link.path" class="fig">{{ link.title }}</router-link>
                        </li>
                    </ul>
                </nav>
            </div>

            <!-- The issue line. A document says when it was issued and by whom. -->
            <p class="footer-issue fig">
                <span>issued {{ issued }}</span>
                <span aria-hidden="true">·</span>
                <span>{{ store.personal.location.toLowerCase() }}</span>
                <span aria-hidden="true">·</span>
                <span>2,400 km from the servers</span>
            </p>

            <p class="footer-colophon fig">
                <span>© {{ currentYear }} {{ store.personal.name }}</span>
                <span v-if="store.discoveryCount > 0">{{ store.discoveryCount }} found the secret</span>
                <span>Vue · Vuetify · Vercel · Supabase</span>
            </p>
        </v-container>
    </v-footer>
</template>

<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'

const store = usePortfolioStore()
const currentYear = computed(() => new Date().getFullYear())
const issued = computed(() => new Date().toISOString().slice(0, 7))
</script>

<style scoped>
.site-footer {
    border-top: 2px solid rgb(var(--v-theme-on-background));
    min-height: unset !important;
}

.footer-inner {
    padding-top: 40px;
    padding-bottom: 32px;
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px;
    padding-bottom: 32px;
    border-bottom: var(--rule);
}

.footer-head {
    margin-bottom: 12px;
}

.footer-email,
.footer-links a {
    font-size: 0.85rem;
    color: rgb(var(--v-theme-on-background));
    border-bottom: 1px solid transparent;
    transition: color 0.2s var(--ease-out), border-color 0.2s var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .footer-email:hover,
    .footer-links a:hover {
        color: rgb(var(--v-theme-accent));
        border-bottom-color: rgb(var(--v-theme-accent));
    }
}


.footer-loc {
    margin-top: 6px;
    font-size: 0.85rem;
    color: rgb(var(--v-theme-on-surface-variant));
}

.footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
}

.footer-issue {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 28px;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    color: rgb(var(--v-theme-accent));
}

.footer-colophon {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px 24px;
    margin-top: 10px;
    font-size: 0.72rem;
    color: rgb(var(--v-theme-on-surface-variant));
}

@media (max-width: 700px) {
    .footer-grid {
        grid-template-columns: minmax(0, 1fr);
        gap: 24px;
    }

    .footer-colophon { justify-content: flex-start; }
}
</style>
