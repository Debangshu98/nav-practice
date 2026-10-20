import { NAV_ITEMS, type PageId } from '../types/navigation.ts'

interface HomePageProps {
  onNavigate: (page: PageId) => void
}

const HIGHLIGHTS = [
  { label: 'Active Projects', value: '6', trend: '+2 this month', target: 'projects' as PageId },
  { label: 'Uptime Score', value: '99.98%', trend: 'Last 30 days', target: 'analytics' as PageId },
  { label: 'Team Members', value: '18', trend: '4 departments', target: 'about' as PageId },
  { label: 'Avg Response', value: '< 2 hrs', trend: '24/7 support', target: 'contact' as PageId },
]

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="page-container">
      <section className="hero-banner">
        <span className="pill-badge">Multi-Page Navigation Experience</span>
        <h1>Seamless navigation across your entire workspace</h1>
        <p className="hero-subtitle">
          Explore different views with URL hash synchronization, breadcrumb trails,
          instant page search, keyboard shortcuts (<code>Alt + 1-5</code>), and
          responsive layouts.
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate('projects')}
          >
            Explore Projects →
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onNavigate('analytics')}
          >
            View Live Analytics
          </button>
        </div>
      </section>

      <section className="stats-grid" aria-label="Workspace Highlights">
        {HIGHLIGHTS.map((stat) => (
          <button
            key={stat.label}
            type="button"
            className="stat-card"
            onClick={() => onNavigate(stat.target)}
          >
            <span className="stat-label">{stat.label}</span>
            <strong className="stat-value">{stat.value}</strong>
            <span className="stat-trend">{stat.trend} →</span>
          </button>
        ))}
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>Directory of Pages</h2>
          <p>Click any destination card below to jump directly to that view.</p>
        </div>
        <div className="cards-grid">
          {NAV_ITEMS.filter((item) => item.id !== 'home').map((item) => (
            <article key={item.id} className="feature-card">
              <div className="feature-card-top">
                <h3>{item.label}</h3>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
              <p>{item.description}</p>
              <button
                type="button"
                className="card-link-btn"
                onClick={() => onNavigate(item.id)}
              >
                Open {item.label} Page →
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
