import { useState } from 'react'

type Timeframe = '7d' | '30d' | '90d'

interface MetricSnapshot {
  visitors: string
  conversion: string
  bounceRate: string
  avgSession: string
  channels: { name: string; share: number; visits: string }[]
}

const DATA_BY_TIMEFRAME: Record<Timeframe, MetricSnapshot> = {
  '7d': {
    visitors: '24,890',
    conversion: '4.8%',
    bounceRate: '28.4%',
    avgSession: '4m 12s',
    channels: [
      { name: 'Direct Navigation', share: 42, visits: '10,453' },
      { name: 'Organic Search', share: 31, visits: '7,715' },
      { name: 'Referral Links', share: 18, visits: '4,480' },
      { name: 'Social Campaigns', share: 9, visits: '2,242' },
    ],
  },
  '30d': {
    visitors: '108,420',
    conversion: '5.2%',
    bounceRate: '26.1%',
    avgSession: '4m 45s',
    channels: [
      { name: 'Direct Navigation', share: 39, visits: '42,283' },
      { name: 'Organic Search', share: 35, visits: '37,947' },
      { name: 'Referral Links', share: 16, visits: '17,347' },
      { name: 'Social Campaigns', share: 10, visits: '10,843' },
    ],
  },
  '90d': {
    visitors: '312,600',
    conversion: '5.5%',
    bounceRate: '24.9%',
    avgSession: '5m 08s',
    channels: [
      { name: 'Organic Search', share: 40, visits: '125,040' },
      { name: 'Direct Navigation', share: 36, visits: '112,536' },
      { name: 'Referral Links', share: 15, visits: '46,890' },
      { name: 'Social Campaigns', share: 9, visits: '28,134' },
    ],
  },
}

export function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>('30d')
  const current = DATA_BY_TIMEFRAME[timeframe]

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <span className="pill-badge">Real-Time Telemetry</span>
          <h1>Platform Analytics</h1>
          <p>Monitor page engagement, navigation flow, and conversion funnels.</p>
        </div>

        <div className="tab-group" role="group" aria-label="Select timeframe">
          {(['7d', '30d', '90d'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              type="button"
              className={`tab-btn ${timeframe === tf ? 'active' : ''}`}
              onClick={() => setTimeframe(tf)}
            >
              Last {tf.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card static-card">
          <span className="stat-label">Unique Visitors</span>
          <strong className="stat-value">{current.visitors}</strong>
          <span className="stat-trend">+14.2% vs previous period</span>
        </div>
        <div className="stat-card static-card">
          <span className="stat-label">Conversion Rate</span>
          <strong className="stat-value">{current.conversion}</strong>
          <span className="stat-trend">+0.6% improvement</span>
        </div>
        <div className="stat-card static-card">
          <span className="stat-label">Bounce Rate</span>
          <strong className="stat-value">{current.bounceRate}</strong>
          <span className="stat-trend">-2.1% lower drop-off</span>
        </div>
        <div className="stat-card static-card">
          <span className="stat-label">Avg. Session Duration</span>
          <strong className="stat-value">{current.avgSession}</strong>
          <span className="stat-trend">3.8 pages / session</span>
        </div>
      </div>

      <section className="section-block panel-card">
        <h2>Traffic Acquisition by Navigation Channel</h2>
        <div className="channel-list">
          {current.channels.map((channel) => (
            <div key={channel.name} className="channel-row">
              <div className="channel-info">
                <strong>{channel.name}</strong>
                <span>
                  {channel.visits} visits ({channel.share}%)
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${channel.share}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
