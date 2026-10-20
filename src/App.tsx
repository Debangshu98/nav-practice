import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { AnalyticsPage } from './pages/AnalyticsPage.tsx'
import { ContactPage } from './pages/ContactPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { ProjectsPage } from './pages/ProjectsPage.tsx'
import { NAV_ITEMS, type PageId } from './types/navigation.ts'
import './App.css'

function resolvePageFromHash(): PageId {
  const raw = window.location.hash.replace('#', '').toLowerCase()
  const match = NAV_ITEMS.find((item) => item.id === raw)
  return match ? match.id : 'home'
}

function App() {
  const [activePage, setActivePage] = useState<PageId>(resolvePageFromHash)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(resolvePageFromHash())
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const handleNavigate = (page: PageId) => {
    setActivePage(page)
    window.history.pushState(null, '', `#${page}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const index = Number(e.key) - 1
        if (index >= 0 && index < NAV_ITEMS.length) {
          e.preventDefault()
          handleNavigate(NAV_ITEMS[index].id)
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="app-shell">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
        }
      />

      <main className="main-content" key={activePage}>
        {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {activePage === 'projects' && <ProjectsPage />}
        {activePage === 'analytics' && <AnalyticsPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>NavFlow Workspace</strong>
            <span>Multi-page navigation architecture built with React & Vite.</span>
          </div>
          <nav className="footer-links" aria-label="Footer Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activePage === item.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate(item.id)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App

