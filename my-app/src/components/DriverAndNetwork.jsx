import { Badge, Card, ProgressBar } from './Layout'

export function DriverMobileView({ deliveries, onUpdateStatus }) {
  const actions = [
    { key: 'delivered', label: 'Delivered' },
    { key: 'customer_not_home', label: 'Customer not home' },
    { key: 'access_issue', label: 'Access issue' },
    { key: 'delayed', label: 'Delayed' },
  ]

  return (
    <div className="driver-phone-shell">
      <div className="driver-phone-header">
        <div>
          <span className="eyebrow">Driver mobile</span>
          <h3>Route stops</h3>
        </div>
        <Badge tone="success">Live sync</Badge>
      </div>

      {deliveries.map((delivery) => (
        <Card key={delivery.id} className="driver-stop-card">
          <div className="driver-stop-header">
            <div>
              <strong>{delivery.address}</strong>
              <p>{delivery.id}</p>
            </div>
            <Badge tone={delivery.status === 'delivered' ? 'success' : delivery.predictedFailure ? 'danger' : 'warning'}>
              {delivery.status.replaceAll('_', ' ')}
            </Badge>
          </div>

          <div className="driver-stop-details">
            <div>
              <span>Best window</span>
              <strong>{delivery.bestTimeSlot}</strong>
            </div>
            <div>
              <span>Success probability</span>
              <strong>{Math.round(delivery.predictedSuccess * 100)}%</strong>
            </div>
          </div>

          <ProgressBar value={Math.round(delivery.predictedSuccess * 100)} tone={delivery.predictedSuccess > 0.8 ? 'green' : delivery.predictedSuccess > 0.65 ? 'amber' : 'red'} />
          <p className="driver-note">{delivery.driverNote}</p>

          <div className="driver-actions">
            {actions.map((action) => (
              <button key={action.key} type="button" onClick={() => onUpdateStatus(delivery.id, action.key)}>
                {action.label}
              </button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

export function NotificationExamples({ notifications }) {
  return (
    <Card>
      <h3>Notification examples</h3>
      <p className="section-copy">Illustrative outbound communications generated after timing optimization.</p>
      <div className="notification-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-card">
            <div className="notification-head">
              <strong>{notification.audience}</strong>
              <Badge tone={notification.status === 'sent' ? 'success' : 'warning'}>{notification.status}</Badge>
            </div>
            <p>{notification.message}</p>
            <span>{notification.channel}</span>
            <small>{notification.outcome}</small>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function IntelligenceOverview({ stats, trendLabels, confidenceValues }) {
  return (
    <div className="intelligence-grid">
      <Card>
        <h3>Aggregated anonymized intelligence</h3>
        <p className="section-copy">
          Providers contribute delivery outcomes, not raw customer data. The shared model only exposes aggregated patterns.
        </p>
        <div className="intelligence-stats">
          <div>
            <span>Total deliveries learned from</span>
            <strong>{stats.totalDeliveriesLearned.toLocaleString('en-US')}</strong>
          </div>
          <div>
            <span>Participating providers</span>
            <strong>{stats.participatingProviders}</strong>
          </div>
          <div>
            <span>Anonymized user profiles</span>
            <strong>{stats.anonymizedProfiles.toLocaleString('en-US')}</strong>
          </div>
          <div>
            <span>Cross-provider prediction lift</span>
            <strong>{stats.crossProviderLift}%</strong>
          </div>
        </div>
      </Card>
      <Card>
        <h3>Model confidence trend</h3>
        <p className="section-copy">Illustrative uplift as more providers and outcomes join the intelligence network.</p>
        <div className="confidence-list">
          {confidenceValues.map((value, index) => (
            <div key={`${trendLabels[index]}-${value}`} className="confidence-row">
              <span>{trendLabels[index]}</span>
              <ProgressBar value={value} tone="purple" />
              <strong>{value}%</strong>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
