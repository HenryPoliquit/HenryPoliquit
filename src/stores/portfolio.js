import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'

// Bundled, not fetched. This is the only proof the site rests on, so it ships
// in the build and cannot 404 when the backend is paused, moved or deleted.
import compareipShot from '../assets/images/compareip.webp'

export const usePortfolioStore = defineStore('portfolio', () => {
    // ──────────────────────────────────────────────────────────────
    // Content is fetched from Supabase on init (see loadContent).
    // The hardcoded values below are FALLBACK DEFAULTS so the site
    // renders instantly and never goes blank if Supabase is slow/down.
    // ──────────────────────────────────────────────────────────────

    const personal = ref({
        name: 'Paul Henry Poliquit',
        title: 'Full-stack developer',
        // The thesis line under the name on the home page.
        tagline: 'I build web applications and run them. One of them takes payments in Singapore.',
        bio: "I'm a full-stack developer in Bacong, Negros Oriental. I build web applications and then run them. Right now that means CompareIP.sg — a premium-comparison tool for Singapore's Integrated Shield Plan market — which I keep alive on Cloud Run and Cloud SQL from about 2,400 km away. I learned Java and Spring in coursework at Lithan EduClaaS. I learned everything else by having something in production.",
        avatarUrl: '/profile.jpg',
        email: 'paulpoliquit@gmail.com',
        phone: '+639158171758',
        location: 'Bacong, Negros Oriental',
        available: true,
    })

    // Static UI config — not part of the CMS.
    // Links are rendered as text, so no icons are needed.
    const navItems = [
        { path: '/', title: 'Home' },
        { path: '/about', title: 'About' },
        { path: '/projects', title: 'Work' },
        { path: '/contact', title: 'Contact' },
    ]

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/HenryPoliquit' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/paul-henry-poliquit-7b5b60250' },
        { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100013486023337' },
    ]

    // Only what he'd defend in an interview — a long tag cloud reads as padding.
    const skills = ref({
        frontend: ['Vue 3', 'Vuetify', 'JavaScript', 'React'],
        backend: ['Fastify', 'Node.js', 'PostgreSQL', 'Spring Boot', 'Java'],
        cloud: ['Cloud Run', 'Cloud SQL', 'API Gateway', 'Firebase Auth', 'Cloud Storage'],
    })

    const COURSEWORK_CAVEAT = 'Coursework, built to a brief at Lithan EduClaaS.'
    const IMG = 'https://qufettbgvupjvbpzmafs.supabase.co/storage/v1/object/public/portfolio-assets/projects'

    const projects = ref([
        {
            id: 1,
            tier: 'production',
            title: 'CompareIP.sg',
            tagline: "Premium comparison for Singapore's Integrated Shield Plan market.",
            market: 'Singapore',
            since: '2025',
            problem:
                'Comparing Integrated Shield Plan premiums in Singapore means opening a PDF from every insurer and reading rate tables side by side. The numbers are public; putting them next to each other is the work. Financial agents do it by hand, for every client.',
            build:
                "A comparison tool that holds every insurer's premium table in one schema, so a plan becomes a query instead of a PDF. Consumers get plan comparison, premium mapping against their age band, and a saved profile. Financial agents get a subscription tier, billed through HitPay, that opens up the client-facing views.",
            runsOn:
                'Vue 3 and Vuetify on the front. Fastify on Cloud Run behind GCP API Gateway, with Cloud SQL Postgres holding the premium data and Firebase handling auth.',
            caveat:
                'Insurers revise their premium tables and nothing warns you. The hard part of this project was never the interface — it was keeping the data honest. That is still where most of the work goes.',
            description: "Premium comparison for Singapore's Integrated Shield Plan market.",
            image: compareipShot,
            // Order matters: the hero rate row shows the first three.
            technologies: ['Vue 3', 'Fastify', 'Cloud Run', 'Cloud SQL', 'PostgreSQL', 'API Gateway', 'Firebase', 'HitPay', 'Vuetify 3'],
            liveUrl: 'https://compareip.sg/',
            githubUrl: null,
        },
        {
            id: 2,
            tier: 'foundation',
            title: 'Meals on Wheels',
            tagline: 'Ordering system for a charity that delivers hot meals to people who cannot cook for themselves.',
            caveat: COURSEWORK_CAVEAT,
            description: 'Online ordering system for MerryMeal, a charity that prepares and delivers hot noon meals to adults who cannot cook for themselves.',
            image: `${IMG}/meals-on-wheels.png`,
            technologies: ['Spring Boot', 'MySQL', 'Java'],
            liveUrl: null,
            githubUrl: 'https://github.com/BDSE-0922-Group/DEA-SA',
        },
        {
            id: 3,
            tier: 'foundation',
            title: 'Know Your Neighborhood',
            tagline: 'Directory of neighbourhood stores. React front end over a custom REST API.',
            caveat: COURSEWORK_CAVEAT,
            description: 'Community site listing stores in your neighbourhood. React front end talking to a custom REST API over Axios.',
            image: `${IMG}/know-your-neighborhood.png`,
            technologies: ['React', 'REST API', 'Axios'],
            liveUrl: null,
            githubUrl: 'https://github.com/HenryPoliquit/KnowYourNeigborhood',
        },
        {
            id: 4,
            tier: 'foundation',
            title: 'ABC Job Portal',
            tagline: 'Job board with accounts, profiles, and admin user management.',
            caveat: COURSEWORK_CAVEAT,
            description: 'Job board. Users sign up, manage a profile and change their password; administrators manage the users.',
            image: `${IMG}/abc-job-portal.png`,
            technologies: ['Spring MVC', 'MySQL', 'Java'],
            liveUrl: null,
            githubUrl: 'https://github.com/HenryPoliquit/ABCJobPortal',
        },
        {
            id: 5,
            tier: 'foundation',
            title: 'ABC Car Portal',
            tagline: 'Used-car listings with test-drive bookings and a bid-approval flow.',
            caveat: COURSEWORK_CAVEAT,
            description: 'Used-car marketplace. Sellers post cars, buyers book test drives or bid, administrators approve bids and manage dates.',
            image: `${IMG}/abc-car-portal.png`,
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

    // The site is tiered: one thing in production, everything else is foundations.
    const production = computed(() => projects.value.find(p => p.tier === 'production') ?? null)
    const foundations = computed(() => projects.value.filter(p => p.tier !== 'production'))

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

        const [profileRes, projectsRes, skillsRes, nowRes] = await Promise.allSettled([
            supabase.from('profile').select('*').limit(1).maybeSingle(),
            supabase.from('projects').select('*').order('sort_order'),
            supabase.from('skills').select('*').order('sort_order'),
            supabase.from('now_status').select('*').order('updated_at', { ascending: false }).limit(1).maybeSingle(),
        ])

        const ok = (r) => r.status === 'fulfilled' && !r.value.error && r.value.data

        // The CMS fills gaps, it never empties them. A row that is missing a
        // column (migration not run) or has it null must not wipe the default —
        // otherwise a *successful* thin response degrades the site, which is the
        // one failure the fallbacks exist to prevent.
        const pick = (value, fallback) =>
            value === null || value === undefined || value === '' ? fallback : value

        if (ok(profileRes)) {
            const p = profileRes.value.data
            const d = personal.value
            personal.value = {
                name: pick(p.name, d.name),
                title: pick(p.title, d.title),
                tagline: pick(p.tagline, d.tagline),
                bio: pick(p.bio, d.bio),
                avatarUrl: pick(p.avatar_url, d.avatarUrl),
                email: pick(p.email, d.email),
                phone: pick(p.phone, d.phone),
                location: pick(p.location, d.location),
                available: p.available ?? d.available,
            }
        }

        if (ok(projectsRes) && projectsRes.value.data.length) {
            // Matched by title, the same key the migration uses, so a row keeps
            // its case-study copy even before 001_rate_card.sql has been run.
            const defaults = new Map(projects.value.map(p => [p.title, p]))

            projects.value = projectsRes.value.data.map(p => {
                const d = defaults.get(p.title) ?? {}
                return {
                    id: p.id,
                    tier: pick(p.tier, d.tier ?? 'foundation'),
                    title: p.title,
                    tagline: pick(p.tagline, d.tagline ?? p.description),
                    market: pick(p.market, d.market),
                    since: pick(p.since, d.since),
                    problem: pick(p.problem, d.problem),
                    build: pick(p.build, d.build),
                    runsOn: pick(p.runs_on, d.runsOn),
                    caveat: pick(p.caveat, d.caveat),
                    description: pick(p.description, d.description),
                    // Images invert the rule above: a bundled shot wins over the CMS.
                    // Screenshots are versioned with the build (hashed, cached, never
                    // 404), so `image_url` only supplies projects the build has none for.
                    image: d.image ?? pick(p.image_url, null),
                    technologies: p.technologies?.length ? p.technologies : (d.technologies ?? []),
                    liveUrl: pick(p.live_url, d.liveUrl),
                    githubUrl: pick(p.github_url, d.githubUrl),
                }
            })
            preloadImages(projects.value.map(p => p.image))
        }

        if (ok(skillsRes) && skillsRes.value.data.length) {
            const grouped = { frontend: [], backend: [], cloud: [] }
            skillsRes.value.data.forEach(s => {
                if (grouped[s.category]) grouped[s.category].push(s.name)
            })
            skills.value = grouped
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

    // `icon` holds an SVG path from @mdi/js, or null for a text-only message.
    const snackbar = reactive({
        show: false,
        message: '',
        color: 'success',
        icon: null,
    })

    function showSnackbar(message, color = 'success', icon = null) {
        snackbar.show = true
        snackbar.message = message
        snackbar.color = color
        snackbar.icon = icon
    }

    function hideSnackbar() {
        snackbar.show = false
    }

    return {
        personal,
        navItems,
        socialLinks,
        skills,
        projects,
        production,
        foundations,
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
