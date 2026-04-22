import { useMemo, useState } from 'react'
import './App.css'
import { DriverMobileView, IntelligenceOverview, NotificationExamples } from './components/DriverAndNetwork'
import { Badge, Card, SectionHeader } from './components/Layout'
import { Sidebar, TopBar } from './components/Layout'
import { KpiGrid, ProviderBreakdown, TrendChart } from './components/Metrics'
import { DispatchTable, TimingList } from './components/Operations'
import { initialDeliveries, networkStats, notifications, providerBreakdown, trendData } from './data/mockData'

const pages = [
  { id: 'dashboard', label: 'Overview', description: 'Main metrics, trends, and alerts' },
  { id: 'dispatch', label: 'Planning', description: 'Today’s stops and suggested changes' },
  { id: 'driver', label: 'Driver app', description: 'Mobile route view and status updates' },
]

const routeRotation = {
  'MAD-08': 'MAD-11',
  'MAD-11': 'MAD-08',
  'BCN-08': 'BCN-12',
  'BCN-12': 'BCN-08',
  'VAL-03': 'VAL-06',
  'VAL-06': 'VAL-03',
  'SVQ-05': 'SVQ-07',
  'SVQ-07': 'SVQ-05',
  'BIO-02': 'BIO-04',
  'BIO-04': 'BIO-02',
  'ZAZ-04': 'ZAZ-09',
  'ZAZ-09': 'ZAZ-04',
}

const laterSlots = {
  '09:00-11:00': '11:00-13:00',
  '10:00-12:00': '12:00-14:00',
  '11:00-15:00': '13:00-15:00',
  '13:00-15:00': '15:00-17:00',
  '14:00-18:00': '18:00-20:00',
  '15:00-17:00': '17:00-19:00',
  '16:00-18:00': '18:00-20:00',
  '18:00-20:00': '19:00-21:00',
  '19:00-21:00': '19:00-21:00',
}

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [deliveries, setDeliveries] = useState(initialDeliveries)
  const [dispatchAdjustments, setDispatchAdjustments] = useState(7)
  const [driverUpdates, setDriverUpdates] = useState(12)

  // Derived metrics keep the prototype interactive without needing a backend.
  const summary = useMemo(() => {
    const delivered = deliveries.filter((delivery) => delivery.status === 'delivered').length
    const failedToday = deliveries.filter((delivery) => delivery.status === 'customer_not_home').length
    const predictedFailed = deliveries.filter((delivery) => delivery.predictedFailure).length
    const averageSuccess = deliveries.reduce((acc, delivery) => acc + delivery.predictedSuccess, 0) / deliveries.length
    const averageWindowWidth = deliveries.reduce((acc, delivery) => acc + getWindowWidth(delivery.bestTimeSlot), 0) / deliveries.length
    const onTimeRate = deliveries.reduce((acc, delivery) => acc + delivery.confidence, 0) / deliveries.length

    return {
      firstAttemptSuccessRate: ((delivered + averageSuccess * 10) / (deliveries.length + 10)) * 100,
      failedToday,
      predictedFailed,
      averageWindowWidth,
      onTimeRate: onTimeRate * 100,
      atRisk: deliveries.filter((delivery) => delivery.predictedSuccess < 0.7 || delivery.predictedFailure).length,
    }
  }, [deliveries])

  const kpiItems = [
    {
      label: 'First-attempt success rate',
      value: `${summary.firstAttemptSuccessRate.toFixed(1)}%`,
      delta: '+1.8 pts',
      detail: 'Estimated share of deliveries completed on the first visit.',
    },
    {
      label: 'Failed deliveries today',
      value: summary.failedToday.toString(),
      delta: '-3 vs last week',
      detail: 'Stops marked as not delivered today.',
    },
    {
      label: 'Predicted failed deliveries today',
      value: summary.predictedFailed.toString(),
      delta: `${summary.atRisk} active risks`,
      detail: 'Stops likely to fail unless the plan is adjusted.',
    },
    {
      label: 'Average delivery window width',
      value: `${summary.averageWindowWidth.toFixed(1)}h`,
      delta: '-1.4h',
      detail: 'Average promised time range shown to recipients.',
    },
    {
      label: 'On-time delivery rate',
      value: `${summary.onTimeRate.toFixed(1)}%`,
      delta: '+2.3 pts',
      detail: 'Estimated share of stops arriving within the promised window.',
    },
  ]

  const acceptSuggestion = (deliveryId) => {
    setDeliveries((current) =>
      current.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              aiSuggestionAccepted: true,
              currentWindow: delivery.bestTimeSlot,
              predictedFailure: false,
              predictedSuccess: Math.min(delivery.predictedSuccess + 0.12, 0.99),
              windowChanged: true,
              status: delivery.status === 'at_risk' ? 'scheduled' : delivery.status,
            }
          : delivery,
      ),
    )
    setDispatchAdjustments((value) => value + 1)
  }

  const moveLater = (deliveryId) => {
    setDeliveries((current) =>
      current.map((delivery) => {
        if (delivery.id !== deliveryId) return delivery

        const nextSlot = laterSlots[delivery.bestTimeSlot] || delivery.bestTimeSlot
        return {
          ...delivery,
          bestTimeSlot: nextSlot,
          currentWindow: nextSlot,
          predictedSuccess: Math.min(delivery.predictedSuccess + 0.08, 0.99),
          predictedFailure: false,
          windowChanged: true,
          riskReason: 'Timing shifted to learned high-success attendance block',
        }
      }),
    )
    setDispatchAdjustments((value) => value + 1)
  }

  const reassignRoute = (deliveryId) => {
    setDeliveries((current) =>
      current.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              route: routeRotation[delivery.route] || `${delivery.route}-ALT`,
              confidence: Math.min(delivery.confidence + 0.05, 0.98),
              riskReason: 'Reassigned to route with stronger timing alignment',
            }
          : delivery,
      ),
    )
    setDispatchAdjustments((value) => value + 1)
  }

  const togglePriority = (deliveryId) => {
    setDeliveries((current) =>
      current.map((delivery) =>
        delivery.id === deliveryId ? { ...delivery, priority: !delivery.priority } : delivery,
      ),
    )
    setDispatchAdjustments((value) => value + 1)
  }

  const updateDriverStatus = (deliveryId, status) => {
    setDeliveries((current) =>
      current.map((delivery) => {
        if (delivery.id !== deliveryId) return delivery

        if (status === 'delivered') {
          return { ...delivery, status, predictedFailure: false, predictedSuccess: 0.99, routeProgress: 1 }
        }

        if (status === 'customer_not_home') {
          return {
            ...delivery,
            status,
            predictedFailure: true,
            predictedSuccess: Math.max(delivery.predictedSuccess - 0.25, 0.2),
            riskReason: 'Latest driver update confirms customer absence pattern',
          }
        }

        if (status === 'access_issue') {
          return {
            ...delivery,
            status,
            confidence: Math.max(delivery.confidence - 0.12, 0.4),
            riskReason: 'Access issue requires route replanning or support intervention',
          }
        }

        return {
          ...delivery,
          status,
          confidence: Math.max(delivery.confidence - 0.05, 0.45),
          currentWindow: laterSlots[delivery.currentWindow] || delivery.currentWindow,
          windowChanged: true,
        }
      }),
    )
    setDriverUpdates((value) => value + 1)
  }

  const dashboardPage = (
    <div className="page-grid">
      <SectionHeader
        title="Executive dashboard"
        description="A simple view of delivery performance, timing accuracy, and today’s alerts."
        action={<Badge tone="success">Clickable prototype</Badge>}
      />
      <KpiGrid items={kpiItems} />
      <div className="chart-grid">
        <TrendChart
          title="Failed deliveries over time"
          subtitle="How unsuccessful first attempts changed this week"
          labels={trendData.labels}
          values={trendData.failedDeliveries}
          tone="red"
        />
        <TrendChart
          title="First-attempt success rate"
          subtitle="How often deliveries succeed on the first visit"
          labels={trendData.labels}
          values={trendData.firstAttemptSuccess}
          format="percent"
          tone="green"
        />
        <TrendChart
          title="Average window accuracy"
          subtitle="How often deliveries land inside the promised time window"
          labels={trendData.labels}
          values={trendData.windowAccuracy}
          format="percent"
          tone="blue"
        />
      </div>
      <div className="two-column-grid">
        <NotificationExamples notifications={notifications} />
        <ProviderBreakdown items={providerBreakdown} />
      </div>
      <IntelligenceOverview
        stats={networkStats}
        trendLabels={trendData.labels}
        confidenceValues={trendData.modelConfidence}
      />
    </div>
  )

  const dispatchPage = (
    <div className="page-grid">
      <SectionHeader
        title="Route planning and dispatch"
        description="Review today’s stops, see the suggested best time, and make simple route changes."
        action={<Badge tone="warning">{summary.atRisk} stops need action</Badge>}
      />
      <DispatchTable
        deliveries={deliveries}
        onAcceptSuggestion={acceptSuggestion}
        onMoveLater={moveLater}
        onReassignRoute={reassignRoute}
        onTogglePriority={togglePriority}
      />
      <SectionHeader
        title="Delivery timing view"
        description="See each stop’s expected delivery time, confidence level, and live updates."
      />
      <TimingList deliveries={deliveries} />
    </div>
  )

  const driverPage = (
    <div className="driver-layout">
      <div className="page-grid">
        <SectionHeader
        title="Driver mobile workflow"
        description="A simple mobile view for drivers to follow the route and report what happened."
        action={<Badge tone="neutral">Mobile layout</Badge>}
      />
        <div className="driver-summary-grid">
          <Card>
            <h3>Route status</h3>
            <p className="section-copy">Live route progress shared between drivers and planners.</p>
            <div className="driver-summary-values">
              <div>
                <span>Stops assigned</span>
                <strong>{deliveries.length}</strong>
              </div>
              <div>
                <span>Delivered</span>
                <strong>{deliveries.filter((delivery) => delivery.status === 'delivered').length}</strong>
              </div>
              <div>
                <span>Exceptions</span>
                <strong>{deliveries.filter((delivery) => ['customer_not_home', 'access_issue', 'delayed'].includes(delivery.status)).length}</strong>
              </div>
            </div>
          </Card>
          <Card>
            <h3>Driver feedback loop</h3>
            <p className="section-copy">
              Driver updates improve future timing suggestions using anonymized delivery history.
            </p>
            <ul className="feedback-list">
              <li>Delivered confirms this time slot works well</li>
              <li>Customer not home increases risk for that time block</li>
              <li>Access issue shows the problem is building entry, not timing</li>
              <li>Delayed refreshes the expected arrival window</li>
            </ul>
          </Card>
        </div>
      </div>
      <DriverMobileView deliveries={deliveries} onUpdateStatus={updateDriverStatus} />
    </div>
  )

  return (
    <div className="app-shell">
      <Sidebar pages={pages} activePage={activePage} onChange={setActivePage} />
      <main className="main-content">
        <TopBar failedCount={summary.atRisk} dispatchCount={dispatchAdjustments} driverCount={driverUpdates} />
        {activePage === 'dashboard' ? dashboardPage : null}
        {activePage === 'dispatch' ? dispatchPage : null}
        {activePage === 'driver' ? driverPage : null}
      </main>
    </div>
  )
}

function getWindowWidth(windowText) {
  const [start, end] = windowText.split('-').map((value) => Number(value.split(':')[0]))
  return end - start
}

export default App
