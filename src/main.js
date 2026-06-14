import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { usePortfolioStore } from './stores/portfolio'
import '@fontsource/lora/400.css'
import '@fontsource/lora/400-italic.css'
import '@fontsource/lora/700.css'
import '@fontsource/syne/600.css'
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/400-italic.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'

// ── Developer Easter Egg: Styled Console Banner ────────────────────────────
console.log(
    '%cPaul Henry Poliquit%c  Full-Stack Developer',
    'background:#D4890A;color:#1C1A18;font-size:16px;font-weight:bold;padding:6px 12px;border-radius:6px 0 0 6px;',
    'background:#1C1A18;color:#F5F0E8;font-size:16px;padding:6px 12px;border-radius:0 6px 6px 0;'
)
console.log(
    '%c👋 Hey there, curious dev! Try: window.portfolio',
    'color:#D4890A;font-size:12px;font-style:italic;'
)
// ──────────────────────────────────────────────────────────────────────────

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(vuetify)
app.use(router)

// Scroll-reveal directive — fades elements in as they enter the viewport.
// Usage: v-reveal or v-reveal="{ delay: 150 }"
app.directive('reveal', {
    mounted(el, binding) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const delay = binding.value?.delay ?? 0
        el.style.opacity = '0'
        el.style.transform = 'translateY(24px)'
        el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = '1'
                    el.style.transform = 'translateY(0)'
                    obs.disconnect()
                }
            },
            { threshold: 0.1 },
        )
        obs.observe(el)
    },
})

app.mount('#app')

// Expose a frozen snapshot of portfolio data after Pinia is ready
const store = usePortfolioStore()
window.portfolio = Object.freeze({
    developer: store.personal.name,
    title: store.personal.title,
    email: store.personal.email,
    github: 'https://github.com/HenryPoliquit',
    linkedin: 'https://www.linkedin.com/in/paul-henry-poliquit-7b5b60250',
    projectCount: store.projects.length,
    skills: Object.values(store.skills).flat(),
    tip: '🎮 Try the Konami Code on this page!',
})
