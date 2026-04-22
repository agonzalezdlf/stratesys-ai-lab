import { Badge, Card, ProgressBar } from './Layout'

export function DispatchTable({ deliveries, onAcceptSuggestion, onMoveLater, onReassignRoute, onTogglePriority }) {
  return (
    <Card className="table-card">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Delivery ID</th>
              <th>User ID</th>
              <th>Address</th>
              <th>Success probability</th>
              <th>Suggested slot</th>
              <th>Assigned route</th>
              <th>Risk reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>
                  <strong>{delivery.id}</strong>
                  <span>{delivery.city}</span>
                </td>
                <td>{delivery.userId}</td>
                <td>{delivery.address}</td>
                <td>
                  <div className="score-cell">
                    <span>{Math.round(delivery.predictedSuccess * 100)}%</span>
                    <ProgressBar value={Math.round(delivery.predictedSuccess * 100)} tone={delivery.predictedSuccess > 0.8 ? 'green' : delivery.predictedSuccess > 0.65 ? 'amber' : 'red'} />
                  </div>
                </td>
                <td>
                  <strong>{delivery.bestTimeSlot}</strong>
                  <span>{delivery.currentWindow}</span>
                </td>
                <td>{delivery.route}</td>
                <td>
                  <div className="risk-cell">
                    <Badge tone={delivery.predictedFailure ? 'danger' : 'success'}>
                      {delivery.predictedFailure ? 'At risk' : 'Stable'}
                    </Badge>
                    <span>{delivery.riskReason}</span>
                  </div>
                </td>
                <td>
                  <div className="action-grid">
                    <button type="button" onClick={() => onAcceptSuggestion(delivery.id)}>
                      Accept AI suggestion
                    </button>
                    <button type="button" onClick={() => onMoveLater(delivery.id)}>
                      Move to later block
                    </button>
                    <button type="button" onClick={() => onReassignRoute(delivery.id)}>
                      Assign another route
                    </button>
                    <button type="button" onClick={() => onTogglePriority(delivery.id)}>
                      {delivery.priority ? 'Unmark priority' : 'Mark high priority'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export function TimingList({ deliveries }) {
  return (
    <div className="timing-grid">
      {deliveries.map((delivery) => (
        <Card key={delivery.id} className="timing-card">
          <div className="timing-head">
            <div>
              <h3>{delivery.id}</h3>
              <p>{delivery.address}</p>
            </div>
            <Badge tone={delivery.windowChanged ? 'warning' : 'neutral'}>
              {delivery.windowChanged ? 'Updated live' : 'Stable window'}
            </Badge>
          </div>
          <div className="timing-window">
            <span>Predicted 2h window</span>
            <strong>{delivery.bestTimeSlot}</strong>
          </div>
          <div className="timing-meta">
            <div>
              <span>Confidence score</span>
              <strong>{Math.round(delivery.confidence * 100)}%</strong>
            </div>
            <div>
              <span>Route progression</span>
              <strong>{Math.round(delivery.routeProgress * 100)}%</strong>
            </div>
          </div>
          <ProgressBar value={Math.round(delivery.routeProgress * 100)} tone="blue" />
          <p className="timing-footnote">
            Current window {delivery.currentWindow} {delivery.windowChanged ? `(was ${delivery.originalWindow})` : ''}
          </p>
        </Card>
      ))}
    </div>
  )
}
