<template>
    <v-card class="contact-info-card fade-in" style="animation-delay: 0.2s" elevation="4">
        <v-card-title class="text-h5 font-weight-bold pa-6 bg-secondary text-white">
            <v-icon icon="mdi-information" start></v-icon>
            Contact Information
        </v-card-title>
        <v-card-text class="pa-6">
            <p class="text-body-1 mb-6">
                Feel free to reach out through any of these channels.
                I'm always open to discussing new projects and opportunities.
            </p>

            <v-list density="comfortable" class="bg-transparent">
                <!-- Email — click to copy -->
                <v-tooltip text="Click to copy email" location="left" theme="dark">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            class="contact-item px-0 mb-3"
                            style="cursor: pointer"
                            @click="copyToClipboard(store.personal.email, 'Email')"
                        >
                            <template v-slot:prepend>
                                <v-avatar color="accent" size="48" class="mr-4">
                                    <v-icon color="white" icon="mdi-email"></v-icon>
                                </v-avatar>
                            </template>
                            <v-list-item-title class="font-weight-medium">Email</v-list-item-title>
                            <v-list-item-subtitle>{{ store.personal.email }}</v-list-item-subtitle>
                        </v-list-item>
                    </template>
                </v-tooltip>

                <!-- Phone — click to copy -->
                <v-tooltip text="Click to copy number" location="left" theme="dark">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            class="contact-item px-0 mb-3"
                            style="cursor: pointer"
                            @click="copyToClipboard(store.personal.phone, 'Phone number')"
                        >
                            <template v-slot:prepend>
                                <v-avatar color="accent" size="48" class="mr-4">
                                    <v-icon color="white" icon="mdi-phone"></v-icon>
                                </v-avatar>
                            </template>
                            <v-list-item-title class="font-weight-medium">Phone</v-list-item-title>
                            <v-list-item-subtitle>{{ store.personal.phone }}</v-list-item-subtitle>
                        </v-list-item>
                    </template>
                </v-tooltip>

                <!-- Location -->
                <v-list-item class="contact-item px-0">
                    <template v-slot:prepend>
                        <v-avatar color="accent" size="48" class="mr-4">
                            <v-icon color="white" icon="mdi-map-marker"></v-icon>
                        </v-avatar>
                    </template>
                    <v-list-item-title class="font-weight-medium">Location</v-list-item-title>
                    <v-list-item-subtitle>{{ store.personal.location }}</v-list-item-subtitle>
                </v-list-item>
            </v-list>

            <v-divider class="my-6"></v-divider>

            <!-- Social links -->
            <div class="d-flex justify-center ga-3 mb-6">
                <v-tooltip
                    v-for="link in store.socialLinks"
                    :key="link.name"
                    :text="link.name"
                    location="top"
                    theme="dark"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                            :icon="link.icon"
                            :href="link.url"
                            target="_blank"
                            color="accent"
                            variant="tonal"
                            size="large"
                        ></v-btn>
                    </template>
                </v-tooltip>
            </div>

            <div class="text-center">
                <v-chip color="success" variant="tonal" size="large">
                    <v-icon icon="mdi-clock-fast" start></v-icon>
                    Usually responds within 24 hours
                </v-chip>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()

async function copyToClipboard(text, label) {
    try {
        await navigator.clipboard.writeText(text)
        store.showSnackbar(`${label} copied to clipboard! 📋`, 'success', 'mdi-content-copy')
    } catch {
        store.showSnackbar('Could not copy — try manually.', 'error')
    }
}
</script>

<style scoped>
.contact-info-card {
    height: 100%;
}

.contact-item {
    border-radius: 8px;
    padding: 8px 0;
}
</style>
