<template>
    <section class="tl">
        <h2 class="col-head tl-label">Sequence</h2>

        <ol class="tl-list">
            <li v-for="item in milestones" :key="item.date" class="tl-row">
                <p class="tl-date fig">{{ item.date }}</p>
                <div>
                    <h3 class="tl-title">{{ item.title }}</h3>
                    <p class="tl-desc">{{ item.description }}</p>
                </div>
            </li>
        </ol>
    </section>
</template>

<script setup>
// A real sequence, so the dates earn their place as the left rail.
const milestones = [
    {
        date: 'Sep 2022',
        title: 'Started at Lithan EduClaaS',
        description: 'Java, the Spring framework, and the basics of the web.',
    },
    {
        date: '2023',
        title: 'First full-stack builds',
        description:
            'Three coursework projects: ABC Car Portal, ABC Job Portal, Meals on Wheels. Spring Boot, MySQL, REST endpoints.',
    },
    {
        date: '2024',
        title: 'Moved to Vue and GCP',
        description:
            'Picked up Vue, Fastify, Cloud Run, Cloud SQL and Firebase. The first time I deployed something I then had to keep running.',
    },
    {
        date: '2025',
        title: 'Shipped CompareIP.sg',
        description:
            "Took a product from schema to production for Singapore's insurance market, and started operating it.",
    },
]
</script>

<style scoped>
.tl-label {
    margin-bottom: 24px;
}

.tl-list {
    list-style: none;
    border-top: var(--rule);
}

.tl-row {
    display: grid;
    grid-template-columns: 160px minmax(0, 1fr);
    column-gap: 32px;
    padding: 20px 0;
    border-bottom: var(--rule);
}

.tl-date {
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgb(var(--v-theme-accent));
}

.tl-title {
    font-size: 1.02rem;
    font-weight: 600;
    font-stretch: 90%;
    color: rgb(var(--v-theme-on-background));
    margin-bottom: 4px;
}

.tl-desc {
    font-family: var(--font-body);
    font-size: 0.92rem;
    line-height: 1.7;
    max-width: 34rem;
    color: rgb(var(--v-theme-on-surface-variant));
}

@media (max-width: 700px) {
    .tl-row {
        grid-template-columns: minmax(0, 1fr);
        row-gap: 8px;
    }
}
</style>
