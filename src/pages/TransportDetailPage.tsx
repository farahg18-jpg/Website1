import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTransport, statusLabel, vehicleLabel, updateTransportStatus } from '../data/transports'

export function TransportDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [transport, setTransport] = useState(() => getTransport(id ?? ''))

  if (!transport) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-icon">&#128531;</div>
          <div className="empty-state-title">Transport niet gevonden</div>
          <div className="empty-state-desc">
            Dit transport bestaat niet of is verwijderd.
          </div>
          <Link to="/app/transporten" className="btn btn-outline">
            Terug naar overzicht
          </Link>
        </div>
      </div>
    )
  }

  function handleStatusChange(newStatus: 'active' | 'completed' | 'cancelled') {
    if (id) {
      updateTransportStatus(id, newStatus)
      setTransport(getTransport(id))
    }
  }

  return (
    <div className="page">
      <div className="transport-detail-header">
        <div>
          <Link to="/app/transporten" style={{ fontSize: 14, color: '#666' }}>
            &larr; Terug naar overzicht
          </Link>
          <h2 className="page-title" style={{ marginTop: 8 }}>
            Transport {transport.id}
          </h2>
        </div>
        <span className={`status-badge ${transport.status}`} style={{ fontSize: 14, padding: '6px 14px' }}>
          <span className="status-dot" />
          {statusLabel(transport.status)}
        </span>
      </div>

      <div className="transport-detail-grid">
        <div>
          {/* Route info */}
          <div className="detail-card">
            <div className="detail-card-title">Route</div>
            <div className="detail-row">
              <span className="detail-label">Ophaallocatie</span>
              <span className="detail-value">{transport.pickup || '—'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Bezorglocatie</span>
              <span className="detail-value">{transport.delivery || '—'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Voertuig</span>
              <span className="detail-value">{vehicleLabel(transport.vehicle)}</span>
            </div>
          </div>

          {/* Items */}
          <div className="detail-card">
            <div className="detail-card-title">Items</div>
            {transport.items.length === 0 ? (
              <p style={{ color: '#999', fontSize: 14 }}>Geen items opgegeven.</p>
            ) : (
              transport.items.map((item, i) => (
                <div className="detail-row" key={i}>
                  <span className="detail-value">{item.name}</span>
                  <span className="detail-label">x{item.qty}</span>
                </div>
              ))
            )}
          </div>

          {/* Actions */}
          {transport.status === 'pending' && (
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="btn btn-blue"
                onClick={() => handleStatusChange('active')}
              >
                Markeer als onderweg
              </button>
              <button
                className="btn btn-outline"
                onClick={() => handleStatusChange('cancelled')}
              >
                Annuleren
              </button>
            </div>
          )}
          {transport.status === 'active' && (
            <button
              className="btn btn-blue"
              onClick={() => handleStatusChange('completed')}
            >
              Markeer als afgeleverd
            </button>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="detail-card">
            <div className="detail-card-title">Overzicht</div>
            <div className="detail-row">
              <span className="detail-label">Prijs</span>
              <span className="detail-value" style={{ fontSize: 20, fontWeight: 700 }}>
                &euro;{transport.price}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Datum</span>
              <span className="detail-value">
                {new Date(transport.date).toLocaleDateString('nl-NL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status</span>
              <span className="detail-value">{statusLabel(transport.status)}</span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-card-title">Tracking</div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot done" />
                <div className="timeline-time">
                  {new Date(transport.date).toLocaleTimeString('nl-NL', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="timeline-text">Transport aangemaakt</div>
              </div>
              {(transport.status === 'active' || transport.status === 'completed') && (
                <div className="timeline-item">
                  <div className={`timeline-dot ${transport.status === 'active' ? 'current' : 'done'}`} />
                  <div className="timeline-text">Chauffeur onderweg</div>
                </div>
              )}
              {transport.status === 'completed' && (
                <div className="timeline-item">
                  <div className="timeline-dot done" />
                  <div className="timeline-text">Afgeleverd</div>
                </div>
              )}
              {transport.status === 'cancelled' && (
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-text">Geannuleerd</div>
                </div>
              )}
              {transport.status === 'pending' && (
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-text">Wachten op chauffeur</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
