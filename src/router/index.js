import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomePage.vue'),
            meta: {
                title: 'Paul Henry Poliquit | Full-Stack Developer',
                description: 'Portfolio of Paul Henry Poliquit — Full-Stack Developer specialising in Vue.js and Google Cloud Platform.',
            },
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutPage.vue'),
            meta: {
                title: 'About | Paul Henry Poliquit',
                description: 'Learn about Paul Henry Poliquit — his background, skills, and experience in full-stack web development.',
            },
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('../views/ProjectsPage.vue'),
            meta: {
                title: 'Projects | Paul Henry Poliquit',
                description: 'A showcase of full-stack projects built by Paul Henry Poliquit using Vue.js, Fastify, and Google Cloud.',
            },
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/ContactPage.vue'),
            meta: {
                title: 'Contact | Paul Henry Poliquit',
                description: "Get in touch with Paul Henry Poliquit to discuss projects, opportunities, or collaborations.",
            },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/NotFoundPage.vue'),
            meta: { title: 'Page Not Found | Paul Henry Poliquit' },
        },
    ],
})

router.afterEach((to) => {
    const title = to.meta?.title
    if (title) document.title = title

    const desc = to.meta?.description
    if (desc) {
        let tag = document.querySelector('meta[name="description"]')
        if (!tag) {
            tag = document.createElement('meta')
            tag.setAttribute('name', 'description')
            document.head.appendChild(tag)
        }
        tag.setAttribute('content', desc)
    }
})

export default router
