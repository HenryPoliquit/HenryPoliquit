<template>
    <v-footer app color="surface" class="footer-enhanced">
        <v-container>
            <v-row class="py-6 py-md-8">
                <!-- Brand Section -->
                <v-col cols="12" md="4" class="text-center text-md-left">
                    <h3 class="text-h6 text-md-h5 font-weight-bold mb-3">{{ store.personal.name }}</h3>
                    <p class="text-body-2 mb-4">
                        Software Engineering Student<br>
                        Building digital experiences with passion
                    </p>
                    <!-- Social Links -->
                    <div class="social-links">
                        <v-btn
                            v-for="social in store.socialLinks"
                            :key="social.name"
                            :icon="social.icon"
                            :href="social.url"
                            target="_blank"
                            variant="text"
                            color="accent"
                            size="large"
                            class="social-btn"
                        ></v-btn>
                    </div>
                </v-col>

                <!-- Quick Links -->
                <v-col cols="12" md="4" class="text-center">
                    <h4 class="text-h6 font-weight-medium mb-3">Quick Links</h4>
                    <v-list density="compact" bg-color="transparent">
                        <v-list-item
                            v-for="link in store.navItems"
                            :key="link.path"
                            :to="link.path"
                            :title="link.title"
                            class="footer-link"
                        ></v-list-item>
                    </v-list>
                </v-col>

                <!-- Contact Info -->
                <v-col cols="12" md="4" class="text-center text-md-right">
                    <h4 class="text-h6 font-weight-medium mb-3">Get In Touch</h4>
                    <div class="contact-info">
                        <p class="text-body-2 mb-2">
                            <v-icon icon="mdi-email" size="small" class="mr-2"></v-icon>
                            {{ store.personal.email }}
                        </p>
                        <p class="text-body-2 mb-2">
                            <v-icon icon="mdi-phone" size="small" class="mr-2"></v-icon>
                            {{ store.personal.phone }}
                        </p>
                        <p class="text-body-2">
                            <v-icon icon="mdi-map-marker" size="small" class="mr-2"></v-icon>
                            {{ store.personal.location }}
                        </p>
                    </div>
                </v-col>
            </v-row>

            <v-divider class="my-4" color="surface-variant"></v-divider>

            <!-- Copyright -->
            <v-row>
                <v-col cols="12" class="text-center">
                    <p class="text-body-2 mb-0">
                        © {{ currentYear }} {{ store.personal.name }}. All rights reserved.
                        <span class="mx-2">|</span>
                        Built with Vue.js & Vuetify
                    </p>
                </v-col>
            </v-row>
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
.footer-enhanced {
    margin-top: auto;
    border-top: 1px solid rgb(var(--v-theme-surface-variant));
}

.social-btn {
    transition: transform 0.25s ease;
}

.social-btn:hover {
    transform: scale(1.12);
}

.footer-link :deep(.v-list-item-title) {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    color: rgb(var(--v-theme-on-surface-variant));
    transition: color 0.2s ease;
}

.footer-link:hover :deep(.v-list-item-title) {
    color: rgb(var(--v-theme-accent));
}

.contact-info {
    line-height: 2;
}
</style>
