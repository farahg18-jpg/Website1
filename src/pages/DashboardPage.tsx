import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/authContext'
import { getTransports, type Transport } from '../data/transports'

function statusLabel(s: string) {
  const map: Record<string, string> = {
    pending: 'In afwachting',
    active: 'Onderweg',
    completed: 'Afgeleverd',
    cancelled: 'Geannuleerd',
  }
  return map[s] ?? s
}

export function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const transports = useMemo(() => getTransports(), [])

  const stats = useMemo(() => {
    const total = transports.length
    const active = transports.filter((t) => t.status === 'active').length
    const completed = transports.filter((t) => t.status === 'completed').length
    const totalSpent = transports.reduce((sum, t) => sum + (t.price ?? 0), 0)
    return { total, active, completed, totalSpent }
  }, [transports])

  const recent = transports.slice(0, 5)

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Dashboard</h2>
        <p className="page-subtitle">
          Welkom terug, {user?.email?.split('@')[0] ?? 'gebruiker'}.
        </p>
      </div>

      <div className="dash-stats">
        <div className="dash-stat-card">
          <div className="dash-stat-label">Totaal transporten</div>
          <div className="dash-stat-value">{stats.total}</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-label">Actief</div>
          <div className="dash-stat-value">{stats.active}</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-label">Afgeleverd</div>
          <div className="dash-stat-value">{stats.completed}</div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-label">Totaal besteed</div>
          <div className="dash-stat-value">&euro;{stats.totalSpent}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Recente transporten</div>
          <Link to="/app/transporten" className="btn btn-outline" style={{ fontSize: 13 }}>
            Alles bekijken
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">&#128666;</div>
            <div className="empty-state-title">Geen transporten</div>
            <div className="empty-state-desc">
              Je hebt nog geen transporten geboekt.
            </div>
            <button className="btn btn-blue" onClick={() => navigate('/boeken')}>
              Eerste transport boeken
            </button>
          </div>
        ) : (
          <table className="transport-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Route</th>
                <th>Status</th>
                <th>Prijs</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((t: Transport) => (
                <tr
                  key={t.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/app/transporten/${t.id}`)}
                >
                  <td style={{ fontWeight: 500 }}>{t.id}</td>
                  <td>
                    {t.pickup} &rarr; {t.delivery}
                  </td>
                  <td>
                    <span className={`status-badge ${t.status}`}>
                      <span className="status-dot" />
                      {statusLabel(t.status)}
                    </span>
                  </td>
                  <td>&euro;{t.price}</td>
                  <td>{new Date(t.date).toLocaleDateString('nl-NL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
