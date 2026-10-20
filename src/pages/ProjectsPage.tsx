import { useState } from 'react'

type Category = 'All' | 'Web App' | 'Design System' | 'API'

interface Project {
  id: number
  title: string
  category: Exclude<Category, 'All'>
  status: 'In Progress' | 'Completed' | 'Planning'
  progress: number
  summary: string
  owner: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Unified Customer Portal',
    category: 'Web App',
    status: 'In Progress',
    progress: 78,
    summary: 'Self-service dashboard with role-based navigation and real-time billing insights.',
    owner: 'Aria Chen',
  },
  {
    id: 2,
    title: 'Aurora UI Token Library',
    category: 'Design System',
    status: 'Completed',
    progress: 100,
    summary: 'Cross-platform design tokens, accessible components, and dark mode primitives.',
    owner: 'Marcus Vance',
  },
  {
    id: 3,
    title: 'Edge GraphQL Gateway',
    category: 'API',
    status: 'In Progress',
    progress: 64,
    summary: 'Low-latency federated API layer caching global queries at the edge.',
    owner: 'Priya Nair',
  },
  {
    id: 4,
    title: 'Workflow Automation Studio',
    category: 'Web App',
    status: 'Planning',
    progress: 25,
    summary: 'Visual drag-and-drop builder for multi-step webhook and notification pipelines.',
    owner: 'Devon Brooks',
  },
  {
    id: 5,
    title: 'Iconography & Motion Kit',
    category: 'Design System',
    status: 'In Progress',
    progress: 85,
    summary: ' interactive micro-interactions and SVG icon set optimized for modern web apps.',
    owner: 'Elena Rostova',
  },
  {
    id: 6,
    title: 'Realtime Telemetry Ingestion',
    category: 'API',
    status: 'Completed',
    progress: 100,
    summary: 'High-throughput event ingestion service processing 50k events per second.',
    owner: 'Liam O’Connor',
  },
]

const CATEGORIES: Category[] = ['All', 'Web App', 'Design System', 'API']

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [filterText, setFilterText] = useState('')

  const visibleProjects = PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory
    const matchesText =
      project.title.toLowerCase().includes(filterText.toLowerCase()) ||
      project.summary.toLowerCase().includes(filterText.toLowerCase())
    return matchesCategory && matchesText
  })

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <span className="pill-badge">Portfolio & Roadmap</span>
          <h1>Active Projects</h1>
          <p>Filter by track or search specific deliverables across teams.</p>
        </div>
      </div>

      <div className="toolbar">
        <div className="tab-group" role="tablist" aria-label="Project categories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              className={`tab-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <input
          type="search"
          className="filter-input"
          placeholder="Search projects..."
          aria-label="Search projects"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <div className="cards-grid">
        {visibleProjects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-card-header">
              <span className="category-tag">{project.category}</span>
              <span
                className={`status-pill status-${project.status.toLowerCase().replace(' ', '-')}`}
              >
                {project.status}
              </span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="progress-section">
              <div className="progress-labels">
                <span>Completion</span>
                <strong>{project.progress}%</strong>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
            <div className="project-footer">
              <span>Lead: {project.owner}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
