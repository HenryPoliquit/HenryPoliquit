<template>
    <div class="profile-section fade-in mb-14">
        <v-row align="center" class="ga-6">
            <!-- Photo -->
            <v-col cols="12" md="3" class="text-center">
                <div class="profile-photo-wrap">
                    <v-avatar size="160" class="profile-avatar">
                        <v-img :src="store.personal.avatarUrl" alt="Profile photo"></v-img>
                    </v-avatar>
                    <div class="profile-photo-ring"></div>
                </div>
                <p class="profile-name mt-4">{{ store.personal.name }}</p>
                <p class="profile-title mt-1">{{ store.personal.title }}</p>
            </v-col>

            <!-- Pull quote bio -->
            <v-col cols="12" md="9">
                <div class="profile-quote-wrapper">
                    <div class="quote-mark" aria-hidden="true">&ldquo;</div>
                    <p class="pull-quote">{{ store.personal.bio }}</p>
                </div>
            </v-col>
        </v-row>

        <div class="section-rule mt-12"></div>
    </div>
</template>

<script setup>
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()
</script>

<style scoped>
.profile-photo-wrap {
    position: relative;
    display: inline-block;
}

.profile-avatar {
    border: 2px solid rgb(var(--v-theme-accent));
    position: relative;
    z-index: 1;
}

.profile-photo-ring {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px solid rgba(212, 137, 10, 0.25);
    pointer-events: none;
}

.profile-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
}

.profile-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    color: rgb(var(--v-theme-accent));
    font-weight: 500;
}

.profile-quote-wrapper {
    position: relative;
    padding-left: 24px;
    border-left: 2px solid rgb(var(--v-theme-accent));
}

.quote-mark {
    font-family: 'Lora', Georgia, serif;
    font-size: 5rem;
    line-height: 0.8;
    color: rgb(var(--v-theme-accent));
    opacity: 0.2;
    position: absolute;
    top: -8px;
    left: -8px;
    user-select: none;
}
</style>
