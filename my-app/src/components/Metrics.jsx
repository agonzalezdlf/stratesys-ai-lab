import { Card, ProgressBar } from './Layout'

export function KpiGrid({ items }) {
  return (
    <div className="kpi-grid">
      {items.map((item) => (
        <Card key={item.label} className="kpi-card">
          <div className="kpi-header">
            <span>{item.label}</span>
            <strong>{item.delta}</strong>
          </div>
          <h3>{item.value}</h3>
          <p>{item.detail}</p>
        </Card>
      ))}
    </div>
  )
}

export function TrendChart({ title, subtitle, labels, values, format = 'number', tone = 'blue' }) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1 || 1)) * 100
      const y = max === min ? 50 : 100 - ((value - min) / (max - min)) * 100
      return `${x},${y}`
    })
    .join(' ')

  return (
    <Card className="chart-card">
      <div className="chart-header">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <strong>{formatValue(values.at(-1), format)}</strong>
      </div>
      <div className="chart-body">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline className={`chart-line ${tone}`} points={points} />
          {values.map((value, index) => {
            const x = (index / (values.length - 1 || 1)) * 100
            const y = max === min ? 50 : 100 - ((value - min) / (max - min)) * 100
            return <circle key={`${title}-${labels[index]}`} className={`chart-point ${tone}`} cx={x} cy={y} r="2.4" />
          })}
        </svg>
        <div className="chart-labels">
          {labels.map((label) => (
            <span key={`${title}-${label}`}>{label}</span>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function ProviderBreakdown({ items }) {
  return (
    <Card>
      <h3>Network participation</h3>
      <p className="section-copy">Example of how providers contribute anonymized learning to the shared model.</p>
      <div className="provider-list">
        {items.map((item, index) => (
          <div key={item.label} className="provider-row">
            <div>
              <strong>{item.label}</strong>
              <span>{item.value}% of modeled events</span>
            </div>
            <ProgressBar value={item.value} tone={['blue', 'green', 'amber', 'purple'][index] || 'blue'} />
          </div>
        ))}
      </div>
    </Card>
  )
}

function formatValue(value, format) {
  if (format === 'percent') {
    return `${value.toFixed(1)}%`
  }

  if (format === 'hours') {
    return `${value.toFixed(1)}h`
  }

  return value.toLocaleString('en-US')
}
