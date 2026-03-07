<template>
    <div class="skills-section mb-8">
        <div class="section-label mb-3">TECHNICAL SKILLS</div>
        <h3 class="skills-heading mb-10">What I work with</h3>

        <v-row>
            <v-col cols="12" md="4" v-for="(group, key) in skillGroups" :key="key">
                <div class="skill-group">
                    <div class="skill-group-header mb-4">
                        <v-icon :icon="group.icon" color="accent" size="18" class="mr-2"></v-icon>
                        <span class="skill-group-label">{{ group.label }}</span>
                    </div>
                    <div class="skill-tags">
                        <span
                            v-for="skill in group.skills"
                            :key="skill"
                            class="skill-tag"
                        >{{ skill }}</span>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../../stores/portfolio'

const store = usePortfolioStore()

const skillGroups = computed(() => ({
    frontend: {
        label: 'Frontend',
        icon: 'mdi-vuejs',
        skills: store.skills.frontend,
    },
    backend: {
        label: 'Backend',
        icon: 'mdi-server',
        skills: store.skills.backend,
    },
    cloud: {
        label: 'Cloud (GCP)',
        icon: 'mdi-cloud',
        skills: store.skills.cloud,
    },
}))
</script>

<style scoped>
.skills-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 1.9rem);
    font-weight: 700;
    color: rgb(var(--v-theme-on-background));
    letter-spacing: -0.3px;
}

.skill-group {
    margin-bottom: 32px;
}

.skill-group-header {
    display: flex;
    align-items: center;
}

.skill-group-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgb(var(--v-theme-on-surface-variant));
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill-tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    padding: 5px 14px;
    border-radius: 99px;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    color: rgb(var(--v-theme-on-surface));
    transition: border-color 0.2s ease, background 0.2s ease;
    cursor: default;
}

.skill-tag:hover {
    border-color: rgb(var(--v-theme-accent));
    background: rgba(212, 137, 10, 0.07);
}
</style>
