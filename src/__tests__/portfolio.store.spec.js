import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePortfolioStore } from '../stores/portfolio'

describe('portfolio store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders fallback defaults before Supabase hydration', () => {
    const store = usePortfolioStore()
    expect(store.personal.name).toContain('Paul Henry')
    expect(store.projects.length).toBe(5)
    expect(store.skills.frontend).toContain('Vue.js')
    expect(store.now.content).toBeTruthy()
  })

  it('derives stats from the reactive projects list', () => {
    const store = usePortfolioStore()
    const labels = store.stats.map((s) => s.label)
    expect(labels).toEqual(['Projects', 'Technologies', 'Years Learning', 'Production App'])
    expect(store.stats[0].number).toBe('5+')
  })

  it('exposes a loadContent action and starts unloaded', () => {
    const store = usePortfolioStore()
    expect(typeof store.loadContent).toBe('function')
    expect(store.loaded).toBe(false)
  })
})
