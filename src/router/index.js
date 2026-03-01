import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomePage.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutPage.vue'),
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('../views/ProjectsPage.vue'),
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/ContactPage.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/NotFoundPage.vue'),
        },
    ],
})

export default router
