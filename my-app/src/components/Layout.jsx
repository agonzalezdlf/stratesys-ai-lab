export function Sidebar({ pages, activePage, onChange }) {
  return (
    <aside className="sidebar">
      <div>
        <p className="eyebrow">AI Delivery Success & Timing Platform</p>
        <h1>Operational intelligence for first-attempt delivery success</h1>
        <p className="sidebar-copy">
          AI-guided planning for Spanish logistics networks using anonymized delivery behavior.
        </p>
      </div>

      <nav className="nav-list" aria-label="Primary">
        {pages.map((page) => (
          <button
            key={page.id}
            type="button"
            className={page.id === activePage ? 'nav-item active' : 'nav-item'}
            onClick={() => onChange(page.id)}
          >
            <span>{page.label}</span>
            <small>{page.description}</small>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot live" />
        Shared model active across anonymized provider network
      </div>
    </aside>
  )
}

export function TopBar({ failedCount, dispatchCount, driverCount }) {
  return (
    <div className="topbar">
      <div>
        <p className="eyebrow">Today in focus</p>
        <h2>Operational control center</h2>
      </div>
      <div className="topbar-stats">
        <StatPill label="At-risk stops" value={failedCount} tone="danger" />
        <StatPill label="Dispatch changes" value={dispatchCount} tone="warning" />
        <StatPill label="Driver updates" value={driverCount} tone="success" />
      </div>
    </div>
  )
}

function StatPill({ label, value, tone }) {
  return (
    <div className={`stat-pill ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export function SectionHeader({ title, description, action }) {
  return (
    <div className="section-header">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {action}
    </div>
  )
}

export function Card({ className = '', children }) {
  return <section className={`card ${className}`.trim()}>{children}</section>
}

export function Badge({ children, tone = 'neutral' }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

export function ProgressBar({ value, tone = 'blue' }) {
  return (
    <div className="progress-shell" aria-label={`${value}%`}>
      <div className={`progress-bar ${tone}`} style={{ width: `${value}%` }} />
    </div>
  )
}
