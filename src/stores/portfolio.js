import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'

export const usePortfolioStore = defineStore('portfolio', () => {
    // ──────────────────────────────────────────────────────────────
    // Content is fetched from Supabase on init (see loadContent).
    // The hardcoded values below are FALLBACK DEFAULTS so the site
    // renders instantly and never goes blank if Supabase is slow/down.
    // ──────────────────────────────────────────────────────────────

    const personal = ref({
        name: 'Paul Henry V. Poliquit',
        title: 'Full-Stack Developer | Cloud Enthusiast',
        bio: 'Software Engineering student at Lithan EduClaaS specializing in modern web development and cloud technologies. Experienced in building scalable full-stack applications using Vue.js ecosystem and Google Cloud Platform, with emphasis on clean architecture and performance optimization.',
        avatarUrl: '/profile.jpg',
        email: 'paulpoliquit@gmail.com',
        phone: '+639158171758',
        location: 'Philippines',
        available: true,
    })

    // Static UI config — not part of the CMS.
    const navItems = [
        { path: '/', title: 'Home', icon: 'mdi-home' },
        { path: '/about', title: 'About', icon: 'mdi-account' },
        { path: '/projects', title: 'Projects', icon: 'mdi-briefcase' },
        { path: '/contact', title: 'Contact', icon: 'mdi-email' },
    ]

    const socialLinks = [
        { name: 'Facebook', icon: 'mdi-facebook', url: 'https://www.facebook.com/profile.php?id=100013486023337' },
        { name: 'LinkedIn', icon: 'mdi-linkedin', url: 'https://www.linkedin.com/in/paul-henry-poliquit-7b5b60250' },
        { name: 'GitHub', icon: 'mdi-github', url: 'https://github.com/HenryPoliquit' },
    ]

    // Reactive computed — stays accurate if the page is open across a year boundary
    const yearsLearning = computed(() =>
        Math.floor((Date.now() - new Date('2022-09-01').getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    )

    const features = ref([
        {
            title: 'Responsive',
            description: 'Building applications that work seamlessly across all devices and screen sizes.',
            icon: 'mdi-responsive',
            color: 'primary',
        },
        {
            title: 'Scalable',
            description: 'Architecting solutions designed to grow with your business needs.',
            icon: 'mdi-chart-line',
            color: 'success',
        },
        {
            title: 'Modern',
            description: 'Leveraging cutting-edge technologies and best practices.',
            icon: 'mdi-rocket-launch',
            color: 'warning',
        },
        {
            title: 'Cloud-Native',
            description: 'Deploying applications on robust cloud infrastructure for reliability.',
            icon: 'mdi-cloud-check',
            color: 'accent',
        },
    ])

    const skills = ref({
        frontend: ['Vue.js', 'Vuetify', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
        backend: ['Fastify', 'Node.js', 'PostgreSQL', 'REST APIs', 'Database Design'],
        cloud: [
            'Cloud Run', 'Cloud SQL', 'Firebase', 'Firebase Hosting',
            'Firebase Auth', 'Firebase Storage', 'Cloud Storage',
            'Remote Config', 'API Gateway', 'Apps Script',
        ],
    })

    const projects = ref([
        {
            id: 1,
            title: 'CompareIP.sg',
            description: 'Production platform serving Singapore\'s insurance market — a full-stack app for comparing Integrated Shield Plan (IP) premiums. Features plan comparison, premium mapping, and personalised profiles for consumers, with a HitPay-powered subscription tier for Financial Agents. Backend runs on Cloud Run with Fastify, backed by Cloud SQL PostgreSQL and exposed via GCP API Gateway.',
            image: 'https://1drv.ms/i/c/d84592b03776f086/IQR6rE8dp2fCTY3Nk45a51-WATlBMFWNC3kNiCxbI8hW5GI?width=660',
            technologies: ['Vue 3', 'Vuetify 3', 'Fastify', 'Cloud Run', 'Cloud SQL', 'PostgreSQL', 'Firebase', 'API Gateway', 'HitPay'],
            liveUrl: 'https://compareip.sg/',
            githubUrl: null,
        },
        {
            id: 2,
            title: 'Meals on Wheels',
            description: 'Online ordering system for MerryMeal, a charitable organization that prepares and delivers hot noon meals to adults living at home who are unable to cook for themselves, maintain their nutritional status due to age, disease, or disability.',
            image: 'https://onedrive.live.com/embed?resid=D84592B03776F086%21116&authkey=%21AMujULr6IiGrPLc&width=480&height=270',
            technologies: ['Spring Boot', 'MySQL', 'Java'],
            liveUrl: null,
            githubUrl: 'https://github.com/BDSE-0922-Group/DEA-SA',
        },
        {
            id: 3,
            title: 'Know Your Neighborhood',
            description: 'Community website that provides users with information about stores in their neighborhood. The frontend is developed using React JS and connected to the back-end using Axios with a custom REST API.',
            image: 'https://onedrive.live.com/embed?resid=D84592B03776F086%21115&authkey=%21AFmVP_KRtFtTJa4&width=480&height=270',
            technologies: ['React', 'REST API', 'Axios'],
            liveUrl: null,
            githubUrl: 'https://github.com/HenryPoliquit/KnowYourNeigborhood',
        },
        {
            id: 4,
            title: 'ABC Job Portal',
            description: 'Job-hunting platform similar to LinkedIn. Users can sign up, login, change their password, and edit their profiles. Administrators can also manage users and their information.',
            image: 'https://onedrive.live.com/embed?resid=D84592B03776F086%21114&authkey=%21AEb8JQ-kOu13jmU&width=480&height=270',
            technologies: ['Spring MVC', 'MySQL', 'Java'],
            liveUrl: null,
            githubUrl: 'https://github.com/HenryPoliquit/ABCJobPortal',
        },
        {
            id: 5,
            title: 'ABC Car Portal',
            description: 'Used-car sales website where users can create accounts and post their cars for sale. Other users can book cars for test drives or place bids. Administrators approve bids and manage booking dates.',
            image: 'https://onedrive.live.com/embed?resid=D84592B03776F086%21113&authkey=%21ALp5zvHKHrKzXyQ&width=480&height=270',
            technologies: ['Spring Framework', 'MySQL', 'Java'],
            liveUrl: null,
            githubUrl: 'https://github.com/HenryPoliquit/ABCCarPortal',
        },
    ])

    // "What I'm working on now" — editable in the Supabase dashboard.
    const now = ref({
        content: 'Migrating my portfolio to Vercel + Supabase and adding live, dynamic features.',
        updatedAt: null,
    })

    const techCount = computed(() => new Set(projects.value.flatMap(p => p.technologies)).size)

    const stats = computed(() => [
        { number: `${projects.value.length}+`, label: 'Projects' },
        { number: `${techCount.value}+`, label: 'Technologies' },
        { number: `${yearsLearning.value}+`, label: 'Years Learning' },
        { number: '1', label: 'Production App' },
    ])

    // ──────────────────────────────────────────────────────────────
    // Image preload — keeping the Image objects alive prevents GC so
    // the browser actually writes the responses to its cache.
    // ──────────────────────────────────────────────────────────────
    const _imageCache = []
    function preloadImages(list) {
        if (typeof window === 'undefined') return
        list.forEach((src) => {
            if (!src) return
            const img = new Image()
            img.src = src
            _imageCache.push(img)
        })
    }
    preloadImages(projects.value.map(p => p.image))

    // ──────────────────────────────────────────────────────────────
    // Hydrate from Supabase. On any failure, keep the fallback defaults.
    // ──────────────────────────────────────────────────────────────
    const loaded = ref(false)
    const loading = ref(false)

    async function loadContent() {
        if (loading.value) return
        loading.value = true

        const [profileRes, projectsRes, skillsRes, featuresRes, nowRes] = await Promise.allSettled([
            supabase.from('profile').select('*').limit(1).maybeSingle(),
            supabase.from('projects').select('*').order('sort_order'),
            supabase.from('skills').select('*').order('sort_order'),
            supabase.from('features').select('*').order('sort_order'),
            supabase.from('now_status').select('*').order('updated_at', { ascending: false }).limit(1).maybeSingle(),
        ])

        const ok = (r) => r.status === 'fulfilled' && !r.value.error && r.value.data

        if (ok(profileRes)) {
            const p = profileRes.value.data
            personal.value = {
                name: p.name,
                title: p.title,
                bio: p.bio,
                avatarUrl: p.avatar_url ?? personal.value.avatarUrl,
                email: p.email,
                phone: p.phone,
                location: p.location,
                available: p.available,
            }
        }

        if (ok(projectsRes) && projectsRes.value.data.length) {
            projects.value = projectsRes.value.data.map(p => ({
                id: p.id,
                title: p.title,
                description: p.description,
                image: p.image_url,
                technologies: p.technologies ?? [],
                liveUrl: p.live_url,
                githubUrl: p.github_url,
            }))
            preloadImages(projects.value.map(p => p.image))
        }

        if (ok(skillsRes) && skillsRes.value.data.length) {
            const grouped = { frontend: [], backend: [], cloud: [] }
            skillsRes.value.data.forEach(s => {
                if (grouped[s.category]) grouped[s.category].push(s.name)
            })
            skills.value = grouped
        }

        if (ok(featuresRes) && featuresRes.value.data.length) {
            features.value = featuresRes.value.data.map(f => ({
                title: f.title,
                description: f.description,
                icon: f.icon,
                color: f.color,
            }))
        }

        if (ok(nowRes)) {
            now.value = { content: nowRes.value.data.content, updatedAt: nowRes.value.data.updated_at }
        }

        loaded.value = true
        loading.value = false
    }

    // ──────────────────────────────────────────────────────────────
    // Easter-egg discoveries — a live "secret finders" counter.
    // ──────────────────────────────────────────────────────────────
    const discoveryCount = ref(0)
    let discoveryChannel = null

    async function fetchDiscoveryCount() {
        const { count, error } = await supabase
            .from('discoveries')
            .select('*', { count: 'exact', head: true })
        if (!error && typeof count === 'number') discoveryCount.value = count
    }

    async function recordDiscovery(eggType, name = null) {
        // No optimistic bump — the Realtime INSERT echo below increments the
        // count for everyone (including this visitor), avoiding a double count.
        await supabase.from('discoveries').insert({ egg_type: eggType, name })
    }

    function subscribeDiscoveries() {
        if (discoveryChannel) return
        discoveryChannel = supabase
            .channel('discoveries-count')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'discoveries' }, () => {
                discoveryCount.value++
            })
            .subscribe()
    }

    const snackbar = reactive({
        show: false,
        message: '',
        color: 'success',
        icon: 'mdi-check-circle',
    })

    function showSnackbar(message, color = 'success', icon = null) {
        snackbar.show = true
        snackbar.message = message
        snackbar.color = color
        snackbar.icon = icon ?? (color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle')
    }

    function hideSnackbar() {
        snackbar.show = false
    }

    return {
        personal,
        navItems,
        socialLinks,
        stats,
        features,
        skills,
        projects,
        now,
        loaded,
        loading,
        loadContent,
        discoveryCount,
        fetchDiscoveryCount,
        recordDiscovery,
        subscribeDiscoveries,
        snackbar,
        showSnackbar,
        hideSnackbar,
    }
})
