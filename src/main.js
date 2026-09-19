import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { usePortfolioStore } from './stores/portfolio'
// Three variable families. `wdth` carries both the weight and width axes for
// Archivo; `opsz` carries weight plus optical size for Literata.
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/literata/opsz.css'
import '@fontsource-variable/literata/opsz-italic.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'

// ── Developer Easter Egg: Styled Console Banner ────────────────────────────
console.log(
    '%cPAUL HENRY POLIQUIT%c  full-stack developer',
    'background:#8C2F39;color:#E8EAE3;font-size:15px;font-weight:bold;padding:6px 12px;letter-spacing:2px;',
    'background:#101411;color:#E8EAE3;font-size:15px;padding:6px 12px;'
)
console.log(
    '%cTry: window.portfolio',
    'color:#8C2F39;font-size:12px;font-style:italic;'
)
// ──────────────────────────────────────────────────────────────────────────

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(vuetify)
app.use(router)

// The router's initial navigation is asynchronous even with eagerly imported
// views. Mounting before it resolves paints a frame with an empty router-view,
// which lands the footer mid-screen and then shifts the whole page.
router.isReady().then(() => app.mount('#app'))

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
    tip: 'Try the Konami Code on this page.',
})
