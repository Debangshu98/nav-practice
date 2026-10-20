const TEAM = [
  {
    name: 'Aria Chen',
    role: 'Principal Product Architect',
    bio: 'Designs scalable multi-page frontend architectures and design systems.',
  },
  {
    name: 'Marcus Vance',
    role: 'Staff UI/UX Engineer',
    bio: 'Focuses on accessible navigation patterns, motion design, and keyboard workflows.',
  },
  {
    name: 'Priya Nair',
    role: 'Distributed Systems Lead',
    bio: 'Builds edge-cached routing layers and real-time analytics pipelines.',
  },
  {
    name: 'Devon Brooks',
    role: 'Developer Experience Lead',
    bio: 'Crafts fast build tooling, linting standards, and automated release workflows.',
  },
]

const MILESTONES = [
  {
    year: '2024',
    title: 'Concept & Core Prototype',
    detail: 'Launched the initial modular workspace shell for rapid multi-page prototyping.',
  },
  {
    year: '2025',
    title: 'Design System 2.0',
    detail: 'Introduced adaptive light/dark themes, keyboard navigation, and instant page search.',
  },
  {
    year: '2026',
    title: 'Global Edge Rollout',
    detail: 'Expanded to 18 team members supporting thousands of daily workspace sessions.',
  },
]

export function AboutPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <span className="pill-badge">Mission & Team</span>
          <h1>About NavFlow</h1>
          <p>
            We build intuitive, high-speed web interfaces that make complex multi-page
            applications feel effortless.
          </p>
        </div>
      </div>

      <section className="section-block">
        <h2>Leadership & Engineering Team</h2>
        <div className="cards-grid">
          {TEAM.map((member) => (
            <article key={member.name} className="feature-card">
              <div className="avatar-circle" aria-hidden="true">
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <h3>{member.name}</h3>
              <span className="role-subtitle">{member.role}</span>
              <p>{member.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block panel-card">
        <h2>Our Journey</h2>
        <div className="timeline">
          {MILESTONES.map((item) => (
            <div key={item.year} className="timeline-item">
              <span className="timeline-year">{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
