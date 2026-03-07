import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { usePortfolioStore } from './stores/portfolio'
import emailjs from '@emailjs/browser'
import '@fontsource/lora/400.css'
import '@fontsource/lora/400-italic.css'
import '@fontsource/lora/700.css'

emailjs.init('g-_jWuDvabBx7rRAh')

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
