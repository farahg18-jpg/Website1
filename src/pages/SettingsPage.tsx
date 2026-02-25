import { useState } from 'react'
import { useAuth } from '../features/auth/authContext'

export function SettingsPage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.email?.split('@')[0] ?? '')
  const [email] = useState(user?.email ?? '')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Instellingen</h2>
        <p className="page-subtitle">Beheer je account en voorkeuren.</p>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Profiel</div>
        <div className="settings-row">
          <label className="field">
            <span>Naam</span>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="field">
            <span>E-mailadres</span>
            <input value={email} disabled style={{ opacity: 0.6 }} />
          </label>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
          <button className="btn btn-primary" onClick={handleSave}>
            Opslaan
          </button>
          {saved && <span style={{ fontSize: 14, color: '#16a34a' }}>Opgeslagen!</span>}
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Meldingen</div>
        <div className="settings-row">
          <label className="field">
            <span>E-mailmeldingen</span>
            <select style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: 15, fontFamily: 'inherit' }}>
              <option>Alle meldingen</option>
              <option>Alleen belangrijke</option>
              <option>Uitgeschakeld</option>
            </select>
          </label>
          <label className="field">
            <span>SMS-meldingen</span>
            <select style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: 15, fontFamily: 'inherit' }}>
              <option>Aan</option>
              <option>Uit</option>
            </select>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Facturatie</div>
        <p style={{ fontSize: 14, color: '#666' }}>
          Facturatie-instellingen en betaalmethoden worden binnenkort beschikbaar.
        </p>
      </div>
    </div>
  )
}
