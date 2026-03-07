<template>
    <div class="project-card">
        <!-- Image -->
        <div class="project-image-wrap">
            <v-img :src="project.image" :alt="project.title" height="220" cover class="project-img">
                <template v-slot:default>
                    <div v-if="project.liveUrl" class="live-badge-wrapper">
                        <span class="live-badge">LIVE</span>
                    </div>
                    <div class="project-number-overlay">{{ String(index + 1).padStart(2, '0') }}</div>
                </template>
                <template v-slot:placeholder>
                    <div class="img-shimmer"></div>
                </template>
                <template v-slot:error>
                    <div class="fallback-image d-flex align-center justify-center">
                        <v-icon icon="mdi-image-broken" size="48" style="opacity:0.3"></v-icon>
                    </div>
                </template>
            </v-img>
        </div>

        <!-- Content -->
        <div class="project-content">
            <h3 class="project-title mb-2">{{ project.title }}</h3>
            <p class="project-desc mb-4">{{ project.description }}</p>

            <div class="project-tags mb-5">
                <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="project-tag"
                >{{ tech }}</span>
            </div>

            <div class="d-flex flex-wrap ga-2">
                <v-btn
                    v-if="project.liveUrl"
                    color="accent"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="flat"
                    size="small"
                    class="flex-grow-1"
                >
                    <v-icon icon="mdi-open-in-new" start></v-icon>
                    Live Demo
                </v-btn>
                <v-btn
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    color="accent"
                    size="small"
                    class="flex-grow-1"
                >
                    <v-icon icon="mdi-github" start></v-icon>
                    View Code
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    project: { type: Object, required: true },
    index: { type: Number, default: 0 },
})
</script>

<style scoped>
.project-card {
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    border-radius: 18px;
    overflow: hidden;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.project-card:hover {
    border-color: rgba(212, 137, 10, 0.4);
    box-shadow: 0 8px 32px rgba(212, 137, 10, 0.1);
    transform: translateY(-3px);
}

.project-image-wrap {
    position: relative;
    overflow: hidden;
}

.project-img {
    transition: transform 0.4s ease;
}

.project-card:hover .project-img {
    transform: scale(1.03);
}

.live-badge-wrapper {
    position: absolute;
    top: 12px;
    right: 12px;
}

.live-badge {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 2px;
    padding: 4px 10px;
    border-radius: 99px;
    background: rgb(var(--v-theme-success));
    color: white;
}

.project-number-overlay {
    position: absolute;
    bottom: 10px;
    left: 14px;
    font-family: 'Syne', sans-serif;
    font-size: 2.5rem;
    font-weight: 800;
    color: white;
    opacity: 0.12;
    line-height: 1;
    letter-spacing: -2px;
    user-select: none;
}

.fallback-image {
    height: 220px;
    background: rgb(var(--v-theme-surface-variant));
}

.project-content {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.project-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
    letter-spacing: -0.2px;
    line-height: 1.3;
}

.project-desc {
    font-family: 'Lora', Georgia, serif;
    font-size: 0.9rem;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.72;
    line-height: 1.75;
    flex: 1;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.project-tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 99px;
    background: rgba(212, 137, 10, 0.08);
    border: 1px solid rgba(212, 137, 10, 0.2);
    color: rgb(var(--v-theme-accent));
}
</style>
