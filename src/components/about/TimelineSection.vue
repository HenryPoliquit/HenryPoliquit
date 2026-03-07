<template>
    <section class="timeline-section my-12">
        <div class="section-label mb-3">MY JOURNEY</div>
        <h3 class="timeline-heading mb-10">The story so far</h3>

        <div class="timeline">
            <div
                v-for="(item, i) in milestones"
                :key="i"
                class="timeline-item"
                :style="{ animationDelay: `${i * 0.12}s` }"
            >
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-date">{{ item.date }}</span>
                    <h4 class="timeline-title mt-1">{{ item.title }}</h4>
                    <p class="timeline-desc mt-2">{{ item.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const milestones = [
    {
        date: 'Sep 2022',
        title: 'Started Software Engineering at Lithan EduClaaS',
        description: 'Began the journey into software engineering, diving into Java, Spring Framework, and foundational web technologies.',
    },
    {
        date: '2023',
        title: 'Built First Full-Stack Applications',
        description: 'Shipped three school projects — ABC Car Portal, ABC Job Portal, and Meals on Wheels — gaining hands-on experience with Spring Boot, MySQL, and REST APIs.',
    },
    {
        date: '2024',
        title: 'Expanded into Cloud & Modern Frontend',
        description: 'Levelled up to Vue.js, Fastify, and the GCP ecosystem (Cloud Run, Cloud SQL, Firebase). Began architecting cloud-native, production-grade applications.',
    },
    {
        date: '2025',
        title: 'Shipped CompareIP.sg to Production',
        description: "Launched a live, real-user platform serving Singapore's insurance market — end-to-end ownership from architecture to deployment.",
    },
]
</script>

<style scoped>
.timeline-section {
    max-width: 700px;
}

.timeline-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    color: rgb(var(--v-theme-on-background));
    letter-spacing: -0.3px;
}

.timeline {
    position: relative;
    padding-left: 36px;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 6px;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
        180deg,
        rgb(var(--v-theme-accent)) 0%,
        rgba(212, 137, 10, 0.1) 100%
    );
}

.timeline-item {
    position: relative;
    margin-bottom: 40px;
    animation: fadeSlideIn 0.5s ease both;
}

.timeline-item:last-child {
    margin-bottom: 0;
}

.timeline-dot {
    position: absolute;
    left: -30px;
    top: 6px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgb(var(--v-theme-accent));
    border: 2px solid rgb(var(--v-theme-background));
    box-shadow: 0 0 0 2px rgb(var(--v-theme-accent));
}

.timeline-content {
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgb(var(--v-theme-surface-variant));
    border-radius: 12px;
    padding: 18px 22px;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.timeline-content:hover {
    border-color: rgba(212, 137, 10, 0.35);
    box-shadow: 0 4px 16px rgba(212, 137, 10, 0.08);
}

.timeline-date {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgb(var(--v-theme-accent));
}

.timeline-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
    line-height: 1.4;
}

.timeline-desc {
    font-family: 'Lora', Georgia, serif;
    font-size: 0.92rem;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.72;
    line-height: 1.75;
}

@keyframes fadeSlideIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
    .timeline-item { animation: none; }
}
</style>
