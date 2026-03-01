<template>
    <v-card class="project-card hover-lift" height="100%">
        <v-img :src="project.image" height="250" cover class="project-image">
            <template v-slot:default>
                <div v-if="project.liveUrl" class="live-badge-wrapper">
                    <v-chip
                        color="success"
                        size="small"
                        label
                        class="live-chip"
                        prepend-icon="mdi-circle-medium"
                    >
                        LIVE
                    </v-chip>
                </div>
            </template>
            <template v-slot:placeholder>
                <div class="img-shimmer"></div>
            </template>
            <template v-slot:error>
                <div class="fallback-image d-flex align-center justify-center">
                    <v-icon icon="mdi-image-broken" size="48" color="white" style="opacity: 0.5"></v-icon>
                </div>
            </template>
        </v-img>

        <v-card-title class="text-h5 font-weight-bold pt-4">
            {{ project.title }}
        </v-card-title>

        <v-card-text class="text-body-2 pb-4">
            {{ project.description }}
        </v-card-text>

        <v-card-text class="pt-0">
            <v-chip
                v-for="tech in project.technologies"
                :key="tech"
                size="small"
                class="mr-2 mb-2"
                color="accent"
                variant="outlined"
            >
                {{ tech }}
            </v-chip>
        </v-card-text>

        <v-card-actions class="px-4 pb-4">
            <v-btn
                v-if="project.liveUrl"
                color="accent"
                :href="project.liveUrl"
                target="_blank"
                variant="elevated"
                class="flex-grow-1"
            >
                <v-icon icon="mdi-open-in-new" start></v-icon>
                Live Demo
            </v-btn>
            <v-btn
                v-if="project.githubUrl"
                color="primary"
                :href="project.githubUrl"
                target="_blank"
                variant="outlined"
                class="flex-grow-1"
            >
                <v-icon icon="mdi-github" start></v-icon>
                View Code
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
defineProps({
    project: { type: Object, required: true },
})
</script>

<style scoped>
.project-card {
    transition: all 0.3s ease;
    border-top: 4px solid transparent;
    display: flex;
    flex-direction: column;
}

.project-card:hover {
    border-top-color: #00BCD4;
}

.project-image {
    transition: transform 0.3s ease;
}

.project-card:hover .project-image {
    transform: scale(1.05);
}

.fallback-image {
    height: 100%;
    background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
}

.live-badge-wrapper {
    position: absolute;
    top: 10px;
    right: 10px;
}

.live-chip {
    font-weight: 700;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.4);
}
</style>
