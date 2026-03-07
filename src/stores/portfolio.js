import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolio', () => {
    const personal = {
        name: 'Paul Henry V. Poliquit',
        title: 'Full-Stack Developer | Cloud Enthusiast',
        bio: 'Software Engineering student at Lithan EduClaaS specializing in modern web development and cloud technologies. Experienced in building scalable full-stack applications using Vue.js ecosystem and Google Cloud Platform, with emphasis on clean architecture and performance optimization.',
        avatarUrl: '/HenryPoliquit/profile.jpg',
        email: 'paulpoliquit@gmail.com',
        phone: '+639158171758',
        location: 'Philippines',
        available: true,
    }

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

    const features = [
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
    ]

    const skills = {
        frontend: ['Vue.js', 'Vuetify', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
        backend: ['Fastify', 'Node.js', 'PostgreSQL', 'REST APIs', 'Database Design'],
        cloud: [
            'Cloud Run', 'Cloud SQL', 'Firebase', 'Firebase Hosting',
            'Firebase Auth', 'Firebase Storage', 'Cloud Storage',
            'Remote Config', 'API Gateway', 'Apps Script',
        ],
    }

    const projects = [
        {
            title: 'CompareIP.sg',
            description: 'Production platform serving Singapore\'s insurance market — a full-stack app for comparing Integrated Shield Plan (IP) premiums. Features plan comparison, premium mapping, and personalised profiles for consumers, with a HitPay-powered subscription tier for Financial Agents. Backend runs on Cloud Run with Fastify, backed by Cloud SQL PostgreSQL and exposed via GCP API Gateway.',
            image: 'https://1drv.ms/i/c/d84592b03776f086/IQR6rE8dp2fCTY3Nk45a51-WATlBMFWNC3kNiCxbI8hW5GI?width=660',
            technologies: ['Vue 3', 'Vuetify 3', 'Fastify', 'Cloud Run', 'Cloud SQL', 'PostgreSQL', 'Firebase', 'API Gateway', 'HitPay'],
            liveUrl: 'https://compareip.sg/',
            githubUrl: null,
        },
        {
            title: 'Meals on Wheels',
            description: 'Online ordering system for MerryMeal, a charitable organization that prepares and delivers hot noon meals to adults living at home who are unable to cook for themselves, maintain their nutritional status due to age, disease, or disability.',
            image: 'https://onedrive.live.com/embed?resid=D84592B03776F086%21116&authkey=%21AMujULr6IiGrPLc&width=480&height=270',
            technologies: ['Spring Boot', 'MySQL', 'Java'],
            liveUrl: null,
            githubUrl: 'https://github.com/BDSE-0922-Group/DEA-SA',
        },
        {
            title: 'Know Your Neighborhood',
            description: 'Community website that provides users with information about stores in their neighborhood. The frontend is developed using React JS and connected to the back-end using Axios with a custom REST API.',
            image: 'https://onedrive.live.com/embed?resid=D84592B03776F086%21115&authkey=%21AFmVP_KRtFtTJa4&width=480&height=270',
            technologies: ['React', 'REST API', 'Axios'],
            liveUrl: null,
            githubUrl: 'https://github.com/HenryPoliquit/KnowYourNeigborhood',
        },
        {
            title: 'ABC Job Portal',
            description: 'Job-hunting platform similar to LinkedIn. Users can sign up, login, change their password, and edit their profiles. Administrators can also manage users and their information.',
            image: 'https://onedrive.live.com/embed?resid=D84592B03776F086%21114&authkey=%21AEb8JQ-kOu13jmU&width=480&height=270',
            technologies: ['Spring MVC', 'MySQL', 'Java'],
            liveUrl: null,
            githubUrl: 'https://github.com/HenryPoliquit/ABCJobPortal',
        },
        {
            title: 'ABC Car Portal',
            description: 'Used-car sales website where users can create accounts and post their cars for sale. Other users can book cars for test drives or place bids. Administrators approve bids and manage booking dates.',
            image: 'https://onedrive.live.com/embed?resid=D84592B03776F086%21113&authkey=%21ALp5zvHKHrKzXyQ&width=480&height=270',
            technologies: ['Spring Framework', 'MySQL', 'Java'],
            liveUrl: null,
            githubUrl: 'https://github.com/HenryPoliquit/ABCCarPortal',
        },
    ]

    const techCount = new Set(projects.flatMap(p => p.technologies)).size

    const stats = [
        { number: `${projects.length}+`, label: 'Projects' },
        { number: `${techCount}+`, label: 'Technologies' },
        { number: `${yearsLearning.value}+`, label: 'Years Learning' },
        { number: '1', label: 'Production App' },
    ]

    // Preload all project images as soon as the store is initialised.
    // Keeping the Image objects in this array prevents garbage collection
    // so the browser actually writes the responses to its cache.
    const _imageCache = []
    if (typeof window !== 'undefined') {
        projects.forEach(({ image }) => {
            if (!image) return
            const img = new Image()
            img.src = image
            _imageCache.push(img)
        })
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
        snackbar,
        showSnackbar,
        hideSnackbar,
    }
})
