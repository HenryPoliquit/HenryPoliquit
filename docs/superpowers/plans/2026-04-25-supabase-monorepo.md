# Supabase Portfolio V2 + Monorepo Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Supabase-powered `portfolio-v2/` app alongside the existing static portfolio, with contact form → DB, projects CMS, and admin dashboard; update GitHub Actions so GH Pages and Vercel deployments are path-filtered and never cross-trigger.

**Architecture:** `portfolio-v2/` lives as a subdirectory of the repo root (`HenryPoliquit/`). Supabase provides PostgreSQL (contact_messages + projects tables), Row Level Security (public read, authenticated write), and Auth (admin login). The v2 frontend is Vue 3 + Vite deployed to Vercel via its GitHub integration pointed at `portfolio-v2/` as the root directory. Existing GitHub Actions workflows get `paths-ignore: portfolio-v2/**` so GH Pages only retriggers on static portfolio changes. A new `deploy-v2.yml` workflow uses the Vercel CLI to deploy on `portfolio-v2/**` changes.

**Tech Stack:** Vue 3 · Vite · Vuetify 3 · Pinia · Vue Router 4 · @supabase/supabase-js · Vercel CLI · GitHub Actions

---

## File Map

```
HenryPoliquit/                         ← repo root (existing)
├── .github/workflows/
│   ├── ci.yml                         MODIFY — add ci-v2 job
│   ├── deploy.yml                     MODIFY — add paths-ignore for portfolio-v2
│   └── deploy-v2.yml                  CREATE — Vercel deploy on portfolio-v2/** push
├── portfolio-v2/                      CREATE — new Supabase-powered app
│   ├── .env.local                     CREATE — Supabase URL + anon key (gitignored)
│   ├── .env.example                   CREATE — placeholder keys
│   ├── index.html                     CREATE
│   ├── vite.config.js                 CREATE
│   ├── package.json                   CREATE
│   └── src/
│       ├── main.js                    CREATE
│       ├── App.vue                    CREATE
│       ├── lib/
│       │   └── supabase.js            CREATE — singleton Supabase client
│       ├── plugins/
│       │   └── vuetify.js             CREATE — same warmLight/warmDark themes
│       ├── router/
│       │   └── index.js               CREATE — routes + auth guard
│       ├── stores/
│       │   ├── projects.js            CREATE — fetch/create/update/delete projects
│       │   └── admin.js               CREATE — auth session state
│       ├── composables/
│       │   └── useContactForm.js      CREATE — submit to Supabase
│       ├── views/
│       │   ├── HomePage.vue           CREATE — landing (links to projects + contact)
│       │   ├── ProjectsPage.vue       CREATE — public project grid from DB
│       │   ├── ContactPage.vue        CREATE — form → Supabase insert
│       │   ├── admin/
│       │   │   ├── LoginPage.vue      CREATE — email/password Supabase auth
│       │   │   └── DashboardPage.vue  CREATE — messages list + projects CRUD
│       │   └── NotFoundPage.vue       CREATE
│       └── components/
│           ├── Navbar.vue             CREATE
│           ├── admin/
│           │   ├── MessagesPanel.vue  CREATE — list + mark-read
│           │   └── ProjectsPanel.vue  CREATE — add/edit/delete rows
│           └── projects/
│               └── ProjectCard.vue   CREATE
```

---

## Prerequisites (Manual Steps Before Coding)

### Step A — Create Supabase project
1. Go to https://supabase.com → New project
2. Name: `portfolio-v2`, region closest to you, generate a strong password
3. After creation: Settings → API → copy **Project URL** and **anon public** key
4. Keep this tab open — you'll need these values in Task 3

### Step B — Create Vercel account + install CLI
1. Go to https://vercel.com → sign up with GitHub
2. Run `npm i -g vercel` locally (just for initial linking)
3. Run `vercel login` in a terminal — follow browser auth

---

## Task 1: Scaffold `portfolio-v2/` Vite project

**Files:**
- Create: `portfolio-v2/package.json`
- Create: `portfolio-v2/vite.config.js`
- Create: `portfolio-v2/index.html`
- Create: `portfolio-v2/.gitignore`
- Create: `portfolio-v2/.env.example`

- [ ] **Step 1.1: Scaffold with Vite**

Run from `HenryPoliquit/` (the repo root):
```bash
npm create vite@latest portfolio-v2 -- --template vue
cd portfolio-v2
```

- [ ] **Step 1.2: Install all dependencies**

```bash
npm install @supabase/supabase-js vuetify@^3.11 @mdi/font pinia vue-router@^4 @fontsource/lora @fontsource/plus-jakarta-sans
npm install -D @vitejs/plugin-vue vite-plugin-vuetify eslint eslint-plugin-vue prettier
```

- [ ] **Step 1.3: Replace `vite.config.js`**

```js
// portfolio-v2/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
```

- [ ] **Step 1.4: Replace `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#D4890A" />
    <title>Paul Henry Poliquit | Portfolio V2</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 1.5: Create `.env.example`**

```bash
# portfolio-v2/.env.example
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```

- [ ] **Step 1.6: Add `portfolio-v2/.env.local` to `.gitignore`**

Ensure `HenryPoliquit/.gitignore` contains:
```
portfolio-v2/.env.local
portfolio-v2/node_modules
portfolio-v2/dist
```

- [ ] **Step 1.7: Commit scaffold**

```bash
# from HenryPoliquit/
git add portfolio-v2/
git commit -m "feat: scaffold portfolio-v2 Vite project"
```

---

## Task 2: Supabase database setup

**Files:** None (SQL run in Supabase dashboard SQL editor)

- [ ] **Step 2.1: Open Supabase SQL editor**

Go to your Supabase project → SQL Editor → New query

- [ ] **Step 2.2: Create tables + RLS**

Paste and run this entire block:
```sql
-- ── Tables ──────────────────────────────────────────────────────────────
create table public.contact_messages (
  id          uuid        default gen_random_uuid() primary key,
  name        text        not null,
  email       text        not null,
  subject     text,
  message     text        not null,
  read        boolean     default false,
  created_at  timestamptz default now()
);

create table public.projects (
  id            uuid        default gen_random_uuid() primary key,
  title         text        not null,
  description   text        not null,
  technologies  text[]      default '{}',
  image_url     text,
  live_url      text,
  github_url    text,
  featured      boolean     default false,
  display_order integer     default 0,
  created_at    timestamptz default now()
);

-- ── Row Level Security ───────────────────────────────────────────────────
alter table public.contact_messages enable row level security;
alter table public.projects         enable row level security;

-- contact_messages: anyone can INSERT, only authenticated can SELECT/UPDATE
create policy "public insert contact_messages"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "admin select contact_messages"
  on public.contact_messages for select
  to authenticated using (true);

create policy "admin update contact_messages"
  on public.contact_messages for update
  to authenticated using (true);

-- projects: anyone can SELECT, only authenticated can do everything
create policy "public read projects"
  on public.projects for select
  to anon, authenticated using (true);

create policy "admin all projects"
  on public.projects for all
  to authenticated
  using (true) with check (true);
```

- [ ] **Step 2.3: Seed one sample project**

```sql
insert into public.projects (title, description, technologies, live_url, featured, display_order)
values (
  'CompareIP.sg',
  'IP address comparison tool for Singapore market. Built with Vue 3 and deployed on Cloud Run.',
  array['Vue 3', 'Fastify', 'Cloud Run', 'PostgreSQL'],
  'https://compareip.sg',
  true,
  1
);
```

- [ ] **Step 2.4: Create admin user**

Supabase dashboard → Authentication → Users → Add user
- Email: your email
- Password: strong password
- ✅ Auto-confirm user

- [ ] **Step 2.5: Copy credentials to `.env.local`**

```bash
# portfolio-v2/.env.local
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJh...
```

---

## Task 3: Core app wiring (client, plugins, router, stores)

**Files:**
- Create: `portfolio-v2/src/lib/supabase.js`
- Create: `portfolio-v2/src/plugins/vuetify.js`
- Create: `portfolio-v2/src/router/index.js`
- Create: `portfolio-v2/src/stores/projects.js`
- Create: `portfolio-v2/src/stores/admin.js`
- Create: `portfolio-v2/src/main.js`
- Create: `portfolio-v2/src/App.vue`

- [ ] **Step 3.1: Supabase client singleton**

```js
// portfolio-v2/src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)
```

- [ ] **Step 3.2: Vuetify plugin (same Editorial Warmth themes)**

```js
// portfolio-v2/src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/600.css'

const warmLight = {
  dark: false,
  colors: {
    primary: '#8B6914', accent: '#D4890A',
    background: '#FAF7F2', surface: '#F0EBE1',
    'surface-variant': '#E8E0D0', 'on-background': '#1C1A18',
    'on-surface': '#1C1A18', 'on-surface-variant': '#6B6560',
    'on-accent': '#1C1A18', success: '#4A7C59', error: '#C0392B',
  },
}

const warmDark = {
  dark: true,
  colors: {
    primary: '#D4890A', accent: '#F0A832',
    background: '#18140F', surface: '#221E17',
    'surface-variant': '#2D271E', 'on-background': '#F5F0E8',
    'on-surface': '#F5F0E8', 'on-surface-variant': '#9E9589',
    'on-accent': '#1C1A18', success: '#6AB07A', error: '#E57373',
  },
}

export default createVuetify({
  components, directives,
  theme: { defaultTheme: 'warmDark', themes: { warmLight, warmDark } },
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
  defaults: {
    VBtn: { variant: 'flat', color: 'accent', style: 'text-transform:none', rounded: 'lg' },
    VCard: { elevation: 2, rounded: 'xl' },
    VTextField: { variant: 'outlined', density: 'comfortable', color: 'accent', rounded: 'lg' },
    VTextarea: { variant: 'outlined', density: 'comfortable', color: 'accent', rounded: 'lg' },
  },
})
```

- [ ] **Step 3.3: Router with auth guard**

```js
// portfolio-v2/src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'

const routes = [
  { path: '/',         component: () => import('@/views/HomePage.vue') },
  { path: '/projects', component: () => import('@/views/ProjectsPage.vue') },
  { path: '/contact',  component: () => import('@/views/ContactPage.vue') },
  { path: '/admin/login', component: () => import('@/views/admin/LoginPage.vue') },
  { path: '/admin',    component: () => import('@/views/admin/DashboardPage.vue'), meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFoundPage.vue') },
]

const router = createRouter({ history: createWebHashHistory(), routes })

router.beforeEach(async (to) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (to.meta.requiresAuth && !session) return '/admin/login'
  if (to.path === '/admin/login' && session) return '/admin'
})

export default router
```

- [ ] **Step 3.4: Projects store**

```js
// portfolio-v2/src/stores/projects.js
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

export const useProjectsStore = defineStore('projects', {
  state: () => ({ items: [], loading: false, error: null }),

  actions: {
    async fetch() {
      this.loading = true
      this.error = null
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order')
      if (error) this.error = error.message
      else this.items = data
      this.loading = false
    },

    async create(project) {
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single()
      if (error) throw error
      this.items.push(data)
    },

    async update(id, changes) {
      const { data, error } = await supabase
        .from('projects')
        .update(changes)
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      const idx = this.items.findIndex(p => p.id === id)
      if (idx !== -1) this.items[idx] = data
    },

    async remove(id) {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) throw error
      this.items = this.items.filter(p => p.id !== id)
    },
  },
})
```

- [ ] **Step 3.5: Admin store (session)**

```js
// portfolio-v2/src/stores/admin.js
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

export const useAdminStore = defineStore('admin', {
  state: () => ({ session: null, messages: [], messagesLoading: false }),

  actions: {
    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      this.session = data.session
    },

    async logout() {
      await supabase.auth.signOut()
      this.session = null
    },

    async fetchMessages() {
      this.messagesLoading = true
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error) this.messages = data
      this.messagesLoading = false
    },

    async markRead(id) {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id)
      if (!error) {
        const msg = this.messages.find(m => m.id === id)
        if (msg) msg.read = true
      }
    },
  },
})
```

- [ ] **Step 3.6: `main.js`**

```js
// portfolio-v2/src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@fontsource/lora/400.css'
import '@fontsource/lora/400-italic.css'

const app = createApp(App)
app.use(createPinia())
app.use(vuetify)
app.use(router)
app.mount('#app')
```

- [ ] **Step 3.7: `App.vue`**

```vue
<!-- portfolio-v2/src/App.vue -->
<template>
  <v-app>
    <v-layout>
      <Navbar />
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </v-layout>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheme } from 'vuetify'
import Navbar from './components/Navbar.vue'

const theme = useTheme()
onMounted(() => {
  const saved = localStorage.getItem('v2-theme')
  if (saved === 'warmLight' || saved === 'warmDark') theme.global.name.value = saved
  else theme.global.name.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'warmDark' : 'warmLight'
})
</script>

<style>
body { font-family: 'Lora', Georgia, serif; -webkit-font-smoothing: antialiased; }
h1,h2,h3,h4 { font-family: 'Syne', sans-serif; }
a { text-decoration: none !important; }
.page-enter-active, .page-leave-active { transition: opacity 0.2s ease; }
.page-enter-from, .page-leave-to { opacity: 0; }
</style>
```

- [ ] **Step 3.8: Commit**

```bash
git add portfolio-v2/src/
git commit -m "feat(v2): wire supabase client, vuetify, router, and pinia stores"
```

---

## Task 4: Navbar component

**Files:**
- Create: `portfolio-v2/src/components/Navbar.vue`

- [ ] **Step 4.1: Write Navbar**

```vue
<!-- eslint-disable vue/multi-word-component-names -->
<!-- portfolio-v2/src/components/Navbar.vue -->
<template>
  <v-app-bar elevation="0" color="surface" :border="scrolled ? 'b' : false">
    <v-container class="d-flex align-center">
      <router-link to="/" class="brand">
        <span class="monogram">PH</span>
        <span class="d-none d-sm-inline brand-name ml-3">Paul Henry Poliquit</span>
      </router-link>

      <v-spacer />

      <nav class="d-flex align-center gap-1">
        <v-btn variant="text" to="/" color="on-surface" size="small">Home</v-btn>
        <v-btn variant="text" to="/projects" color="on-surface" size="small">Projects</v-btn>
        <v-btn variant="text" to="/contact" color="on-surface" size="small">Contact</v-btn>
      </nav>

      <v-btn
        :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        variant="text" color="accent" size="small" class="ml-2"
        :aria-label="isDark ? 'Light mode' : 'Dark mode'"
        @click="toggleTheme"
      />
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
const scrolled = ref(false)

function toggleTheme() {
  const next = isDark.value ? 'warmLight' : 'warmDark'
  theme.global.name.value = next
  localStorage.setItem('v2-theme', next)
}

function onScroll() { scrolled.value = window.scrollY > 8 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.brand { display: flex; align-items: center; color: inherit; }
.monogram {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 12px;
  letter-spacing: 1px; background: rgb(var(--v-theme-accent));
  color: rgb(var(--v-theme-on-accent)); padding: 5px 8px; border-radius: 6px;
}
.brand-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.95rem; }
.gap-1 { gap: 4px; }
</style>
```

- [ ] **Step 4.2: Commit**

```bash
git add portfolio-v2/src/components/Navbar.vue
git commit -m "feat(v2): add navbar with theme toggle"
```

---

## Task 5: Public views — Home, Projects, NotFound

**Files:**
- Create: `portfolio-v2/src/views/HomePage.vue`
- Create: `portfolio-v2/src/views/ProjectsPage.vue`
- Create: `portfolio-v2/src/components/projects/ProjectCard.vue`
- Create: `portfolio-v2/src/views/NotFoundPage.vue`

- [ ] **Step 5.1: `HomePage.vue`**

```vue
<!-- portfolio-v2/src/views/HomePage.vue -->
<template>
  <v-main>
    <v-container class="hero py-16 text-center">
      <p class="label mb-3">Available for opportunities</p>
      <h1 class="name mb-4">Paul Henry Poliquit</h1>
      <p class="role mb-8 text-accent">Full-Stack Developer · Software Engineering Student</p>
      <p class="bio mb-10">
        Building scalable, cloud-native web applications with Vue.js, Fastify, and Google Cloud Platform.
      </p>
      <div class="d-flex justify-center flex-wrap ga-3">
        <v-btn to="/projects" size="large" color="accent" class="px-7">
          <v-icon icon="mdi-briefcase" start /> View Projects
        </v-btn>
        <v-btn to="/contact" size="large" variant="outlined" color="accent" class="px-7">
          <v-icon icon="mdi-email" start /> Get In Touch
        </v-btn>
      </div>
    </v-container>
  </v-main>
</template>

<style scoped>
.hero { max-width: 680px; margin: 0 auto; min-height: calc(100vh - 72px); display: flex; flex-direction: column; justify-content: center; }
.label { font-family: 'Syne', sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: rgb(var(--v-theme-accent)); }
.name { font-family: 'Syne', sans-serif; font-size: clamp(2.4rem, 6vw, 4rem); font-weight: 800; letter-spacing: -1.5px; line-height: 1.05; }
.role { font-family: 'DM Sans', sans-serif; font-size: 1.1rem; }
.bio { font-family: 'Lora', Georgia, serif; font-style: italic; font-size: 1.05rem; line-height: 1.85; opacity: 0.8; }
</style>
```

- [ ] **Step 5.2: `ProjectCard.vue`**

```vue
<!-- portfolio-v2/src/components/projects/ProjectCard.vue -->
<template>
  <v-card class="project-card h-100">
    <v-img v-if="project.image_url" :src="project.image_url" height="200" cover>
      <template #placeholder><div class="shimmer h-100" /></template>
    </v-img>
    <div v-else class="img-placeholder d-flex align-center justify-center">
      <v-icon icon="mdi-code-braces" size="48" color="accent" style="opacity:0.2" />
    </div>

    <v-card-item>
      <v-card-title class="card-title">{{ project.title }}</v-card-title>
      <v-card-subtitle v-if="project.featured">
        <v-chip color="success" size="x-small" variant="tonal">Featured</v-chip>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <p class="desc mb-3">{{ project.description }}</p>
      <div class="d-flex flex-wrap ga-1">
        <v-chip v-for="tech in project.technologies" :key="tech" size="x-small" color="accent" variant="outlined">{{ tech }}</v-chip>
      </div>
    </v-card-text>

    <v-card-actions class="pa-4 pt-0">
      <v-btn v-if="project.live_url" :href="project.live_url" target="_blank" rel="noopener" color="accent" size="small">
        <v-icon icon="mdi-open-in-new" start /> Live
      </v-btn>
      <v-btn v-if="project.github_url" :href="project.github_url" target="_blank" rel="noopener" variant="outlined" color="accent" size="small">
        <v-icon icon="mdi-github" start /> Code
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({ project: { type: Object, required: true } })
</script>

<style scoped>
.project-card { border: 1px solid rgb(var(--v-theme-surface-variant)); transition: border-color 0.25s, transform 0.25s; }
.project-card:hover { border-color: rgba(212,137,10,0.4); transform: translateY(-4px); }
.img-placeholder { height: 200px; background: rgb(var(--v-theme-surface-variant)); }
.card-title { font-family: 'Syne', sans-serif; font-weight: 700; white-space: normal; }
.desc { font-family: 'Lora', Georgia, serif; font-size: 0.9rem; line-height: 1.7; opacity: 0.8; }
</style>
```

- [ ] **Step 5.3: `ProjectsPage.vue`**

```vue
<!-- portfolio-v2/src/views/ProjectsPage.vue -->
<template>
  <v-main>
    <v-container class="py-12">
      <p class="section-label mb-2">WORK</p>
      <h1 class="page-title mb-10">Projects</h1>

      <div v-if="store.loading" class="d-flex justify-center py-16">
        <v-progress-circular indeterminate color="accent" />
      </div>

      <v-alert v-else-if="store.error" type="error" :text="store.error" class="mb-6" />

      <v-row v-else>
        <v-col v-for="p in store.items" :key="p.id" cols="12" sm="6" lg="4">
          <ProjectCard :project="p" />
        </v-col>
        <v-col v-if="store.items.length === 0" cols="12" class="text-center py-16">
          <p class="text-medium-emphasis">No projects yet.</p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import ProjectCard from '@/components/projects/ProjectCard.vue'

const store = useProjectsStore()
onMounted(() => store.fetch())
</script>

<style scoped>
.section-label { font-family: 'Syne', sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: rgb(var(--v-theme-accent)); }
.page-title { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -1px; }
</style>
```

- [ ] **Step 5.4: `NotFoundPage.vue`**

```vue
<!-- portfolio-v2/src/views/NotFoundPage.vue -->
<template>
  <v-main>
    <v-container class="d-flex flex-column align-center justify-center" style="min-height:calc(100vh - 72px)">
      <h1 class="notfound-num mb-4">404</h1>
      <p class="mb-6 text-medium-emphasis">Page not found.</p>
      <v-btn to="/" color="accent">Go home</v-btn>
    </v-container>
  </v-main>
</template>
<style scoped>
.notfound-num { font-family: 'Syne', sans-serif; font-size: clamp(5rem, 15vw, 10rem); font-weight: 800; opacity: 0.15; }
</style>
```

- [ ] **Step 5.5: Commit**

```bash
git add portfolio-v2/src/views/ portfolio-v2/src/components/
git commit -m "feat(v2): add public views — home, projects, 404"
```

---

## Task 6: Contact form → Supabase

**Files:**
- Create: `portfolio-v2/src/composables/useContactForm.js`
- Create: `portfolio-v2/src/views/ContactPage.vue`

- [ ] **Step 6.1: `useContactForm.js`**

```js
// portfolio-v2/src/composables/useContactForm.js
import { reactive, ref } from 'vue'
import { supabase } from '@/lib/supabase'

export function useContactForm() {
  const form = reactive({ name: '', email: '', subject: '', message: '' })
  const loading = ref(false)
  const success = ref(false)
  const error = ref(null)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate() {
    if (!form.name.trim()) return 'Name is required.'
    if (!emailRegex.test(form.email)) return 'Valid email is required.'
    if (!form.message.trim()) return 'Message is required.'
    return null
  }

  async function submit() {
    error.value = validate()
    if (error.value) return

    loading.value = true
    const { error: sbError } = await supabase.from('contact_messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || null,
      message: form.message.trim(),
    })

    if (sbError) {
      error.value = 'Failed to send message. Please try again.'
    } else {
      success.value = true
      Object.assign(form, { name: '', email: '', subject: '', message: '' })
    }
    loading.value = false
  }

  return { form, loading, success, error, submit }
}
```

- [ ] **Step 6.2: `ContactPage.vue`**

```vue
<!-- portfolio-v2/src/views/ContactPage.vue -->
<template>
  <v-main>
    <v-container class="py-12" style="max-width:640px">
      <p class="section-label mb-2">CONTACT</p>
      <h1 class="page-title mb-2">Get In Touch</h1>
      <p class="mb-8 subtitle">Have a project in mind or want to connect? Send me a message.</p>

      <v-alert v-if="success" type="success" class="mb-6" icon="mdi-check-circle">
        Message sent! I'll get back to you soon.
      </v-alert>

      <v-alert v-if="error" type="error" class="mb-6" :text="error" />

      <v-form @submit.prevent="submit">
        <v-text-field v-model="form.name" label="Name" class="mb-3" required />
        <v-text-field v-model="form.email" label="Email" type="email" class="mb-3" required />
        <v-text-field v-model="form.subject" label="Subject (optional)" class="mb-3" />
        <v-textarea v-model="form.message" label="Message" rows="5" class="mb-5" required />
        <v-btn type="submit" color="accent" size="large" :loading="loading" block>
          <v-icon icon="mdi-send" start /> Send Message
        </v-btn>
      </v-form>
    </v-container>
  </v-main>
</template>

<script setup>
import { useContactForm } from '@/composables/useContactForm'
const { form, loading, success, error, submit } = useContactForm()
</script>

<style scoped>
.section-label { font-family: 'Syne', sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: rgb(var(--v-theme-accent)); }
.page-title { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -1px; }
.subtitle { font-family: 'Lora', Georgia, serif; font-style: italic; opacity: 0.8; }
</style>
```

- [ ] **Step 6.3: Test locally**

```bash
cd portfolio-v2
npm run dev
```

1. Go to `http://localhost:5173/#/contact`
2. Submit a test message
3. Verify in Supabase → Table Editor → contact_messages: new row appears

- [ ] **Step 6.4: Commit**

```bash
git add portfolio-v2/src/composables/ portfolio-v2/src/views/ContactPage.vue
git commit -m "feat(v2): contact form submits to supabase contact_messages table"
```

---

## Task 7: Admin — Login page

**Files:**
- Create: `portfolio-v2/src/views/admin/LoginPage.vue`

- [ ] **Step 7.1: `LoginPage.vue`**

```vue
<!-- portfolio-v2/src/views/admin/LoginPage.vue -->
<template>
  <v-main>
    <v-container class="d-flex align-center justify-center" style="min-height:calc(100vh - 72px)">
      <v-card width="380" class="pa-6">
        <h2 class="admin-title mb-1">Admin</h2>
        <p class="mb-6 text-medium-emphasis" style="font-size:0.85rem">Sign in to manage content.</p>

        <v-alert v-if="error" type="error" :text="error" class="mb-4" />

        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" type="email" class="mb-3" required autofocus />
          <v-text-field v-model="password" label="Password" :type="showPw ? 'text' : 'password'"
            :append-inner-icon="showPw ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPw = !showPw" class="mb-5" required />
          <v-btn type="submit" color="accent" block size="large" :loading="loading">Sign In</v-btn>
        </v-form>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const router = useRouter()
const adminStore = useAdminStore()

const email = ref('')
const password = ref('')
const showPw = ref(false)
const loading = ref(false)
const error = ref(null)

async function login() {
  error.value = null
  loading.value = true
  try {
    await adminStore.login(email.value, password.value)
    router.push('/admin')
  } catch (e) {
    error.value = e.message || 'Login failed.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.5rem; }
</style>
```

- [ ] **Step 7.2: Test login locally**

1. Go to `http://localhost:5173/#/admin`
2. Should redirect to `#/admin/login`
3. Sign in with the admin user created in Task 2, Step 2.4
4. Should redirect to `#/admin` (blank page for now)

- [ ] **Step 7.3: Commit**

```bash
git add portfolio-v2/src/views/admin/LoginPage.vue
git commit -m "feat(v2): admin login page with supabase auth"
```

---

## Task 8: Admin — Dashboard (messages + projects CRUD)

**Files:**
- Create: `portfolio-v2/src/components/admin/MessagesPanel.vue`
- Create: `portfolio-v2/src/components/admin/ProjectsPanel.vue`
- Create: `portfolio-v2/src/views/admin/DashboardPage.vue`

- [ ] **Step 8.1: `MessagesPanel.vue`**

```vue
<!-- portfolio-v2/src/components/admin/MessagesPanel.vue -->
<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h3 class="panel-title">Contact Messages</h3>
      <v-btn size="small" variant="outlined" color="accent" :loading="store.messagesLoading" @click="store.fetchMessages()">
        <v-icon icon="mdi-refresh" start /> Refresh
      </v-btn>
    </div>

    <v-progress-linear v-if="store.messagesLoading" indeterminate color="accent" class="mb-4" />

    <div v-if="store.messages.length === 0 && !store.messagesLoading" class="text-center py-8 text-medium-emphasis">
      No messages yet.
    </div>

    <v-card
      v-for="msg in store.messages" :key="msg.id"
      class="mb-3 message-card" :class="{ unread: !msg.read }"
    >
      <v-card-item>
        <v-card-title>{{ msg.name }}
          <v-chip v-if="!msg.read" color="accent" size="x-small" class="ml-2">New</v-chip>
        </v-card-title>
        <v-card-subtitle>{{ msg.email }} · {{ formatDate(msg.created_at) }}</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <p v-if="msg.subject" class="font-weight-medium mb-1">{{ msg.subject }}</p>
        <p style="white-space:pre-wrap">{{ msg.message }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="!msg.read" size="small" variant="text" color="accent" @click="store.markRead(msg.id)">
          Mark as read
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'

const store = useAdminStore()
onMounted(() => store.fetchMessages())

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })
}
</script>

<style scoped>
.panel-title { font-family: 'Syne', sans-serif; font-weight: 700; }
.message-card { border: 1px solid rgb(var(--v-theme-surface-variant)); }
.message-card.unread { border-color: rgba(212,137,10,0.4); }
</style>
```

- [ ] **Step 8.2: `ProjectsPanel.vue`**

```vue
<!-- portfolio-v2/src/components/admin/ProjectsPanel.vue -->
<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h3 class="panel-title">Projects</h3>
      <v-btn color="accent" size="small" @click="openDialog()">
        <v-icon icon="mdi-plus" start /> Add Project
      </v-btn>
    </div>

    <v-progress-linear v-if="store.loading" indeterminate color="accent" class="mb-4" />

    <v-card v-for="p in store.items" :key="p.id" class="mb-3 project-row">
      <v-card-item>
        <v-card-title>{{ p.title }}
          <v-chip v-if="p.featured" color="success" size="x-small" class="ml-2">Featured</v-chip>
        </v-card-title>
        <v-card-subtitle>{{ (p.technologies || []).join(' · ') }}</v-card-subtitle>
      </v-card-item>
      <v-card-actions>
        <v-btn size="small" variant="text" @click="openDialog(p)">Edit</v-btn>
        <v-btn size="small" variant="text" color="error" @click="deleteProject(p.id)">Delete</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Add / Edit dialog -->
    <v-dialog v-model="dialog" max-width="560">
      <v-card class="pa-4">
        <v-card-title class="panel-title mb-4">{{ editing ? 'Edit Project' : 'Add Project' }}</v-card-title>
        <v-text-field v-model="draft.title" label="Title" class="mb-3" />
        <v-textarea v-model="draft.description" label="Description" rows="3" class="mb-3" />
        <v-text-field v-model="techInput" label="Technologies (comma-separated)" class="mb-3" />
        <v-text-field v-model="draft.image_url" label="Image URL" class="mb-3" />
        <v-text-field v-model="draft.live_url" label="Live URL" class="mb-3" />
        <v-text-field v-model="draft.github_url" label="GitHub URL" class="mb-3" />
        <v-checkbox v-model="draft.featured" label="Featured project" color="accent" class="mb-2" />
        <v-text-field v-model.number="draft.display_order" label="Display order" type="number" class="mb-4" />
        <div class="d-flex ga-3">
          <v-btn color="accent" :loading="saving" @click="save">Save</v-btn>
          <v-btn variant="outlined" @click="dialog = false">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
onMounted(() => store.fetch())

const dialog = ref(false)
const editing = ref(null)
const saving = ref(false)
const draft = ref({})
const techInput = ref('')

function openDialog(project = null) {
  editing.value = project?.id ?? null
  draft.value = project
    ? { ...project }
    : { title: '', description: '', image_url: '', live_url: '', github_url: '', featured: false, display_order: 0 }
  techInput.value = (project?.technologies ?? []).join(', ')
  dialog.value = true
}

async function save() {
  saving.value = true
  const payload = {
    ...draft.value,
    technologies: techInput.value.split(',').map(t => t.trim()).filter(Boolean),
  }
  try {
    if (editing.value) await store.update(editing.value, payload)
    else await store.create(payload)
    dialog.value = false
  } catch (e) {
    alert(e.message)
  } finally {
    saving.value = false
  }
}

async function deleteProject(id) {
  if (!confirm('Delete this project?')) return
  await store.remove(id)
}
</script>

<style scoped>
.panel-title { font-family: 'Syne', sans-serif; font-weight: 700; }
.project-row { border: 1px solid rgb(var(--v-theme-surface-variant)); }
</style>
```

- [ ] **Step 8.3: `DashboardPage.vue`**

```vue
<!-- portfolio-v2/src/views/admin/DashboardPage.vue -->
<template>
  <v-main>
    <v-container class="py-10">
      <div class="d-flex align-center justify-space-between mb-8">
        <div>
          <h1 class="dash-title">Admin Dashboard</h1>
          <p class="text-medium-emphasis" style="font-size:0.85rem">{{ session?.user?.email }}</p>
        </div>
        <v-btn variant="outlined" color="error" size="small" @click="logout">
          <v-icon icon="mdi-logout" start /> Sign out
        </v-btn>
      </div>

      <v-tabs v-model="tab" color="accent" class="mb-6">
        <v-tab value="messages">
          <v-icon icon="mdi-email" start /> Messages
          <v-badge v-if="unread > 0" :content="unread" color="accent" inline class="ml-2" />
        </v-tab>
        <v-tab value="projects">
          <v-icon icon="mdi-briefcase" start /> Projects
        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="messages"><MessagesPanel /></v-tabs-window-item>
        <v-tabs-window-item value="projects"><ProjectsPanel /></v-tabs-window-item>
      </v-tabs-window>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { useAdminStore } from '@/stores/admin'
import MessagesPanel from '@/components/admin/MessagesPanel.vue'
import ProjectsPanel from '@/components/admin/ProjectsPanel.vue'

const router = useRouter()
const adminStore = useAdminStore()
const tab = ref('messages')
const session = ref(null)

const unread = computed(() => adminStore.messages.filter(m => !m.read).length)

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  session.value = data.session
})

async function logout() {
  await adminStore.logout()
  router.push('/admin/login')
}
</script>

<style scoped>
.dash-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.8rem; }
</style>
```

- [ ] **Step 8.4: Test full admin flow locally**

1. `npm run dev` from `portfolio-v2/`
2. Login at `#/admin/login`
3. Add a project via Projects tab
4. Verify project appears on `#/projects` without login
5. Submit a contact form at `#/contact`
6. Verify message appears in Messages tab

- [ ] **Step 8.5: Commit**

```bash
git add portfolio-v2/src/components/admin/ portfolio-v2/src/views/admin/DashboardPage.vue
git commit -m "feat(v2): admin dashboard with messages viewer and projects CRUD"
```

---

## Task 9: Update GitHub Actions workflows

**Files:**
- Modify: `.github/workflows/deploy.yml` — add `paths-ignore`
- Modify: `.github/workflows/ci.yml` — add `ci-v2` job
- Create: `.github/workflows/deploy-v2.yml` — Vercel deploy

- [ ] **Step 9.1: Update `deploy.yml` (GH Pages) — add paths-ignore**

Replace the `on:` block:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
    paths-ignore:
      - 'portfolio-v2/**'
      - 'docs/**'
  workflow_dispatch:
```

- [ ] **Step 9.2: Update `ci.yml` — add v2 CI job**

Replace entire file:
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci-static:
    name: CI — Static Portfolio
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Run unit tests
        run: npm run test:unit

      - name: Build
        run: npm run build

  ci-v2:
    name: CI — Portfolio V2
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: portfolio-v2
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: portfolio-v2/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

- [ ] **Step 9.3: Create `deploy-v2.yml`**

```yaml
# .github/workflows/deploy-v2.yml
name: Deploy V2 to Vercel

on:
  push:
    branches: [main]
    paths:
      - 'portfolio-v2/**'
  workflow_dispatch:

jobs:
  deploy:
    name: Deploy portfolio-v2 to Vercel
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: portfolio-v2

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: portfolio-v2/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Deploy to Vercel
        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }} --yes
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

- [ ] **Step 9.4: Commit workflow changes**

```bash
git add .github/workflows/
git commit -m "ci: path-filtered workflows — gh-pages ignores portfolio-v2, new deploy-v2 triggers on portfolio-v2 changes"
```

---

## Task 10: Vercel setup + secrets

**Manual steps — no code to write.**

- [ ] **Step 10.1: Link project to Vercel**

From `portfolio-v2/` locally:
```bash
vercel link
```
- Select your Vercel scope (personal)
- When asked "Link to existing project?" → No → create new
- Project name: `portfolio-v2`
- This creates `portfolio-v2/.vercel/project.json` with `orgId` and `projectId`

- [ ] **Step 10.2: Get Vercel IDs**

```bash
cat portfolio-v2/.vercel/project.json
```
Copy `orgId` and `projectId` values.

- [ ] **Step 10.3: Get Vercel token**

Vercel dashboard → Settings → Tokens → Create token → name: `github-actions` → copy it

- [ ] **Step 10.4: Add GitHub Secrets**

Go to your GitHub repo → Settings → Secrets and variables → Actions → New repository secret:

| Secret name | Value |
|---|---|
| `VERCEL_TOKEN` | token from step 10.3 |
| `VERCEL_ORG_ID` | orgId from project.json |
| `VERCEL_PROJECT_ID` | projectId from project.json |
| `VITE_SUPABASE_URL` | your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | your Supabase anon key |

- [ ] **Step 10.5: Add Vercel env vars in Vercel dashboard**

Vercel dashboard → your `portfolio-v2` project → Settings → Environment Variables:
- `VITE_SUPABASE_URL` → your Supabase URL → all environments
- `VITE_SUPABASE_ANON_KEY` → your anon key → all environments

- [ ] **Step 10.6: Gitignore the Vercel project file**

Add to `HenryPoliquit/.gitignore`:
```
portfolio-v2/.vercel
```

- [ ] **Step 10.7: Push and verify both pipelines**

```bash
git add .gitignore
git commit -m "chore: gitignore portfolio-v2/.vercel"
git push origin main
```

Then check GitHub → Actions:
- `CI` workflow runs both `ci-static` and `ci-v2` jobs ✅
- `Deploy to GitHub Pages` triggers (static portfolio changed) ✅
- `Deploy V2 to Vercel` does NOT trigger (no portfolio-v2/** change) ✅

- [ ] **Step 10.8: Make a portfolio-v2 change to test Vercel deploy**

```bash
# Add a comment to any portfolio-v2 file
echo "# v2" >> portfolio-v2/README.md
git add portfolio-v2/README.md
git commit -m "test: trigger vercel deploy"
git push origin main
```

Check GitHub → Actions → `Deploy V2 to Vercel` → should succeed and log a Vercel URL.

---

## Summary: Deployment Matrix

| What changed | GH Pages deploys? | Vercel deploys? |
|---|---|---|
| `src/**` (static portfolio) | ✅ Yes | ❌ No |
| `portfolio-v2/**` | ❌ No | ✅ Yes |
| Both changed in one push | ✅ Yes | ✅ Yes |
| `.github/workflows/**` only | ❌ No (paths-ignore) | ❌ No (no portfolio-v2/** match) |

---

## Spec Coverage Check

- [x] New app folder (`portfolio-v2/`) — Task 1
- [x] Supabase tables + RLS — Task 2
- [x] Supabase client — Task 3
- [x] Contact form → DB — Task 6
- [x] Projects CMS (public read from DB) — Tasks 3, 5
- [x] Admin auth (Supabase Auth) — Tasks 3, 7
- [x] Admin dashboard (messages + project CRUD) — Task 8
- [x] GH Pages deploy unchanged — Task 9
- [x] Vercel deploy for v2 — Tasks 9, 10
- [x] Path-filtered workflows (no cross-triggering) — Task 9
