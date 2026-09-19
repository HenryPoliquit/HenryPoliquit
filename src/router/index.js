import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import ContactPage from '../views/ContactPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

// Views are imported eagerly on purpose. Lazy chunks total ~39 kB against a
// ~330 kB main bundle, and the empty first frame they create lets the footer
// paint mid-viewport and then jump (measured CLS 0.36).

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
            meta: {
                title: 'Paul Henry Poliquit — Full-stack developer',
                description: 'I build web applications and run them. One of them, CompareIP.sg, compares Integrated Shield Plan premiums for Singapore.',
            },
        },
        {
            path: '/about',
            name: 'about',
            component: AboutPage,
            meta: {
                title: 'About — Paul Henry Poliquit',
                description: 'Where I work from, how I got here, and the stack I actually use: Vue, Fastify, Cloud Run, Cloud SQL.',
            },
        },
        {
            path: '/projects',
            name: 'projects',
            component: ProjectsPage,
            meta: {
                title: 'Work — Paul Henry Poliquit',
                description: 'CompareIP.sg in production for Singapore, plus the coursework that got me there.',
            },
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactPage,
            meta: {
                title: 'Contact — Paul Henry Poliquit',
                description: 'Work, questions, or a bug on one of my sites. Email usually gets a reply within a day.',
            },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage,
            meta: { title: 'No record under that reference — Paul Henry Poliquit' },
        },
    ],
})

const SITE_ORIGIN = 'https://henrypoliquit.vercel.app'

// index.html ships one canonical and one og:url, both pointing at `/`. Without
// this they stay wrong on every other route.
function setTag(selector, attr, value) {
    const tag = document.querySelector(selector)
    if (tag) tag.setAttribute(attr, value)
}

router.afterEach((to) => {
    const title = to.meta?.title
    if (title) document.title = title

    const desc = to.meta?.description
    if (desc) {
        setTag('meta[name="description"]', 'content', desc)
        setTag('meta[property="og:description"]', 'content', desc)
    }
    if (title) setTag('meta[property="og:title"]', 'content', title)

    const url = SITE_ORIGIN + (to.path === '/' ? '/' : to.path)
    setTag('link[rel="canonical"]', 'href', url)
    setTag('meta[property="og:url"]', 'content', url)
})

export default router
