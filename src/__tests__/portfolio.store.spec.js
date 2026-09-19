import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePortfolioStore } from '../stores/portfolio'

// Rows the fake backend will return; each test rewrites them before loadContent.
const rows = vi.hoisted(() => ({ profile: null, projects: null, skills: null, now_status: null }))

vi.mock('../lib/supabase', () => {
  // Every builder method returns the chain; it resolves either by being awaited
  // or via maybeSingle(), matching the two call shapes loadContent uses.
  const chain = (data) => {
    const settled = Promise.resolve({ data, error: null })
    const self = {
      select: () => self,
      order: () => self,
      limit: () => self,
      maybeSingle: () => settled,
      then: (ok, err) => settled.then(ok, err),
    }
    return self
  }
  return {
    supabase: {
      from: (table) => chain(rows[table]),
      channel: () => ({ on: () => ({ subscribe: () => {} }) }),
    },
  }
})

describe('portfolio store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders fallback defaults before Supabase hydration', () => {
    const store = usePortfolioStore()
    expect(store.personal.name).toContain('Paul Henry')
    expect(store.personal.tagline).toBeTruthy()
    expect(store.projects.length).toBe(5)
    expect(store.skills.frontend).toContain('Vue 3')
    expect(store.now.content).toBeTruthy()
  })

  it('splits projects into one production record and the foundations', () => {
    const store = usePortfolioStore()
    expect(store.production?.title).toBe('CompareIP.sg')
    expect(store.foundations.length).toBe(4)
    expect(store.foundations.every((p) => p.tier !== 'production')).toBe(true)
  })

  it('gives the production record the fields the case study renders', () => {
    const store = usePortfolioStore()
    const p = store.production
    expect(p.market).toBe('Singapore')
    expect(p.since).toBeTruthy()
    const missing = ['tagline', 'problem', 'build', 'runsOn', 'caveat'].filter((f) => !p[f])
    expect(missing).toEqual([])
  })

  it('exposes a loadContent action and starts unloaded', () => {
    const store = usePortfolioStore()
    expect(typeof store.loadContent).toBe('function')
    expect(store.loaded).toBe(false)
  })

  // The regression this guards: resuming a Supabase project whose
  // 001_rate_card.sql has never run returns rows with no tier and no
  // case-study columns. Replacing defaults wholesale erased the entire
  // production band; the CMS must fill gaps, never open them.
  describe('hydrating from a pre-migration database', () => {
    beforeEach(() => {
      rows.profile = {
        name: 'Name Set In The CMS',
        title: 'Full-Stack Developer',
        bio: 'Older bio from the CMS.',
        tagline: null, // column does not exist pre-migration
        avatar_url: null,
        email: 'paulpoliquit@gmail.com',
        phone: null,
        location: 'Philippines',
        available: true,
      }
      rows.projects = [
        {
          id: 1,
          title: 'CompareIP.sg',
          description: 'Production platform serving Singapore.',
          image_url: 'https://dead.example/compareip.png',
          technologies: ['Vue 3', 'Fastify'],
          live_url: 'https://compareip.sg/',
          github_url: null,
          sort_order: 1,
        },
      ]
      rows.skills = null
      rows.now_status = { content: 'Something from the CMS.', updated_at: '2026-06-13' }
    })

    it('keeps the production tier when the tier column is absent', async () => {
      const store = usePortfolioStore()
      await store.loadContent()
      expect(store.production?.title).toBe('CompareIP.sg')
    })

    it('keeps case-study copy the row does not carry', async () => {
      const store = usePortfolioStore()
      await store.loadContent()
      const p = store.production
      const missing = ['tagline', 'market', 'since', 'problem', 'build', 'runsOn', 'caveat']
        .filter((f) => !p[f])
      expect(missing).toEqual([])
    })

    it('takes CMS values that are present and keeps defaults for nulls', async () => {
      const store = usePortfolioStore()
      await store.loadContent()
      expect(store.personal.name).toBe('Name Set In The CMS')
      expect(store.personal.bio).toBe('Older bio from the CMS.')
      expect(store.personal.tagline).toContain('takes payments in Singapore')
      expect(store.skills.frontend).toContain('Vue 3')
    })

    it('prefers the bundled screenshot over a CMS image_url', async () => {
      const store = usePortfolioStore()
      await store.loadContent()
      expect(store.production.image).not.toContain('dead.example')
    })
  })
})
