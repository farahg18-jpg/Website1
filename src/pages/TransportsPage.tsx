import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTransports, statusLabel, type Transport } from '../data/transports'

export function TransportsPage() {
  const navigate = useNavigate()
  const transports = useMemo(() => getTransports(), [])

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="page-title">Transporten</h2>
          <p className="page-subtitle">Overzicht van al je transporten.</p>
        </div>
        <button className="btn btn-blue" onClick={() => navigate('/boeken')}>
          + Nieuw transport
        </button>
      </div>

      <div className="card">
        {transports.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">&#128230;</div>
            <div className="empty-state-title">Geen transporten gevonden</div>
            <div className="empty-state-desc">
              Boek je eerste transport om hier een overzicht te zien.
            </div>
            <button className="btn btn-blue" onClick={() => navigate('/boeken')}>
              Transport boeken
            </button>
          </div>
        ) : (
          <table className="transport-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Van</th>
                <th>Naar</th>
                <th>Status</th>
                <th>Prijs</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {transports.map((t: Transport) => (
                <tr
                  key={t.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/app/transporten/${t.id}`)}
                >
                  <td style={{ fontWeight: 500 }}>{t.id}</td>
                  <td>{t.pickup || '—'}</td>
                  <td>{t.delivery || '—'}</td>
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
