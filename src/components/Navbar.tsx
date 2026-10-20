import { useState } from 'react'
import { NAV_ITEMS, type PageId } from '../types/navigation.ts'
import { NavIcon } from './NavIcon.tsx'

interface NavbarProps {
  activePage: PageId
  onNavigate: (page: PageId) => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Navbar({
  activePage,
  onNavigate,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  const currentIndex = NAV_ITEMS.findIndex((item) => item.id === activePage)
  const currentItem = NAV_ITEMS[currentIndex] ?? NAV_ITEMS[0]
  const prevItem = currentIndex > 0 ? NAV_ITEMS[currentIndex - 1] : null
  const nextItem =
    currentIndex < NAV_ITEMS.length - 1 ? NAV_ITEMS[currentIndex + 1] : null

  const filteredItems = searchQuery.trim()
    ? NAV_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  const selectPage = (pageId: PageId) => {
    onNavigate(pageId)
    setMobileMenuOpen(false)
    setSearchQuery('')
    setSearchFocused(false)
  }

  return (
    <header className="site-header">
      <div className="navbar-container">
        <a
          href="#home"
          className="brand-logo"
          onClick={(e) => {
            e.preventDefault()
            selectPage('home')
          }}
        >
          <span className="brand-mark" aria-hidden="true">N</span>
          <div className="brand-text">
            <span className="brand-name">NavFlow</span>
            <span className="brand-tag">Workspace</span>
          </div>
        </a>

        <nav className="desktop-nav" aria-label="Primary Navigation">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${item.id === activePage ? 'active' : ''}`}
                  aria-current={item.id === activePage ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    selectPage(item.id)
                  }}
                >
                  <NavIcon id={item.id} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`nav-badge ${item.badge === 'Live' ? 'badge-live' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions">
          <div className="nav-search-wrapper">
            <input
              type="search"
              className="nav-search-input"
              placeholder="Jump to page..."
              aria-label="Jump to page"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchFocused && searchQuery.trim() !== '' && (
              <div className="search-dropdown" role="listbox">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="search-result-item"
                      onMouseDown={() => selectPage(item.id)}
                    >
                      <NavIcon id={item.id} />
                      <div>
                        <div className="search-result-title">{item.label}</div>
                        <div className="search-result-desc">{item.description}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="search-empty">No matching pages</div>
                )}
              </div>
            )}
          </div>

          <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`mobile-nav-link ${item.id === activePage ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    selectPage(item.id)
                  }}
                >
                  <div className="mobile-nav-link-main">
                    <NavIcon id={item.id} />
                    <span>{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </div>
                  <span className="mobile-nav-desc">{item.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="subnav-bar">
        <div className="breadcrumbs" aria-label="Breadcrumb">
          <button type="button" className="breadcrumb-root" onClick={() => selectPage('home')}>
            Workspace
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{currentItem.label}</span>
          <span className="breadcrumb-description">— {currentItem.description}</span>
        </div>

        <div className="quick-pager">
          <button
            type="button"
            className="pager-btn"
            disabled={!prevItem}
            onClick={() => prevItem && selectPage(prevItem.id)}
          >
            ← {prevItem ? prevItem.label : 'Start'}
          </button>
          <span className="pager-indicator">
            {currentIndex + 1} / {NAV_ITEMS.length}
          </span>
          <button
            type="button"
            className="pager-btn"
            disabled={!nextItem}
            onClick={() => nextItem && selectPage(nextItem.id)}
          >
            {nextItem ? nextItem.label : 'End'} →
          </button>
        </div>
      </div>
    </header>
  )
}
