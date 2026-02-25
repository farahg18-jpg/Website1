import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { useAuth } from '../features/auth/authContext'

type Item = { id: number; name: string; qty: string }

const VEHICLES = [
  { id: 'bakfiets', emoji: '\u{1F6B2}', name: 'Bakfiets', cap: 'Tot 80 kg' },
  { id: 'bestelbus', emoji: '\u{1F690}', name: 'Bestelbus', cap: 'Tot 800 kg' },
  { id: 'vrachtwagen', emoji: '\u{1F69A}', name: 'Vrachtwagen', cap: 'Tot 3.500 kg' },
]

let nextId = 2

export function BookingPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [pickup, setPickup] = useState(params.get('van') ?? '')
  const [delivery, setDelivery] = useState(params.get('naar') ?? '')
  const [vehicle, setVehicle] = useState('bestelbus')
  const [items, setItems] = useState<Item[]>([{ id: 1, name: '', qty: '1' }])
  const [showQuote, setShowQuote] = useState(false)

  function addItem() {
    setItems((prev) => [...prev, { id: ++nextId, name: '', qty: '1' }])
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function updateItem(id: number, field: keyof Omit<Item, 'id'>, value: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)))
  }

  function calculatePrice() {
    const base = vehicle === 'bakfiets' ? 29 : vehicle === 'bestelbus' ? 79 : 149
    const itemCount = items.filter((i) => i.name.trim()).length
    return base + itemCount * 10
  }

  function handleQuote() {
    setShowQuote(true)
  }

  function handleBook() {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/boeken' } } })
      return
    }
    const id = `TR-${Date.now().toString(36).toUpperCase()}`
    const existing = JSON.parse(localStorage.getItem('haulr.transports') ?? '[]')
    existing.push({
      id,
      pickup,
      delivery,
      vehicle,
      items: items.filter((i) => i.name.trim()),
      price: calculatePrice(),
      status: 'pending',
      date: new Date().toISOString(),
    })
    localStorage.setItem('haulr.transports', JSON.stringify(existing))
    navigate(`/app/transporten/${id}`)
  }

  return (
    <div>
      <Header />
      <div className="booking-page">
        <h1 className="booking-page-title">Transport boeken</h1>
        <p className="booking-page-sub">Vul de details in en ontvang direct een prijs.</p>

        {/* Items */}
        <div className="booking-section">
          <div className="booking-section-title">Wat wil je vervoeren?</div>
          {items.map((item) => (
            <div key={item.id} className="item-row">
              <label className="field">
                <span>Omschrijving</span>
                <input
                  placeholder="Bijv. Bank, koelkast, tafel"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                />
              </label>
              <label className="field" style={{ maxWidth: 100 }}>
                <span>Aantal</span>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                />
              </label>
              {items.length > 1 && (
                <button className="item-remove" type="button" onClick={() => removeItem(item.id)}>
                  &times;
                </button>
              )}
            </div>
          ))}
          <button className="add-item-btn" type="button" onClick={addItem}>
            + Nog een item toevoegen
          </button>
        </div>

        {/* Route */}
        <div className="booking-section">
          <div className="booking-section-title">Route</div>
          <label className="field">
            <span>Ophaallocatie</span>
            <input
              placeholder="Adres, postcode of stad"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </label>
          <label className="field" style={{ marginTop: 16 }}>
            <span>Bezorglocatie</span>
            <input
              placeholder="Adres, postcode of stad"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
            />
          </label>
        </div>

        {/* Vehicle */}
        <div className="booking-section">
          <div className="booking-section-title">Kies een voertuig</div>
          <div className="vehicle-grid">
            {VEHICLES.map((v) => (
              <div
                key={v.id}
                className={`vehicle-option ${vehicle === v.id ? 'selected' : ''}`}
                onClick={() => setVehicle(v.id)}
              >
                <div className="vehicle-emoji">{v.emoji}</div>
                <div className="vehicle-name">{v.name}</div>
                <div className="vehicle-cap">{v.cap}</div>
              </div>
            ))}
          </div>
        </div>

        {!showQuote && (
          <button className="btn btn-blue btn-lg" style={{ width: '100%' }} onClick={handleQuote}>
            Bekijk de prijs
          </button>
        )}

        {showQuote && (
          <div className="quote-result">
            <div className="quote-price">&euro;{calculatePrice()}</div>
            <div className="quote-note">Vaste prijs &middot; inclusief BTW</div>
            <div className="quote-features">
              <span className="quote-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Verzekerd
              </span>
              <span className="quote-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Direct beschikbaar
              </span>
              <span className="quote-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Vaste prijs
              </span>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleBook}>
              Transport boeken
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
