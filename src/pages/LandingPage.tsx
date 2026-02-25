import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function LandingPage() {
  const navigate = useNavigate()
  const [pickup, setPickup] = useState('')
  const [delivery, setDelivery] = useState('')

  function handleBooking() {
    const params = new URLSearchParams()
    if (pickup) params.set('van', pickup)
    if (delivery) params.set('naar', delivery)
    navigate(`/boeken?${params.toString()}`)
  }

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Beschikbaar in heel Nederland
          </div>

          <h1>
            Grote spullen.
            <br />
            Direct geregeld.
          </h1>
          <p className="hero-subtitle">
            Voer je adressen in, kies een voertuig en wij regelen de rest.
          </p>

          <div className="booking-card">
            <div className="booking-timing">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Nu ophalen
            </div>

            <div className="booking-fields">
              <div className="booking-field">
                <span className="booking-dot" />
                <input
                  className="booking-input"
                  placeholder="Ophaallocatie"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </div>
              <div className="booking-field">
                <span className="booking-dot" />
                <input
                  className="booking-input"
                  placeholder="Bezorglocatie"
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                />
              </div>
            </div>

            <div className="booking-submit">
              <button className="btn btn-blue btn-lg" onClick={handleBooking}>
                Bekijk de prijs
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          <div className="trust-badges">
            <span className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Direct beschikbaar
            </span>
            <span className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Vaste prijs
            </span>
            <span className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Verzekerd
            </span>
          </div>

          <div className="hero-rating">
            <span className="star">&#9733;</span>
            4.8 uit 1.200 transporten
          </div>

          <Link to="/boeken" className="hero-assist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Hali helpt je kiezen &rarr;
          </Link>
        </div>

        <div className="hero-visual">
          <div className="hero-illustration">
            <div className="hero-illustration-inner">
              <div className="hero-illustration-van">&#128690;</div>
              <div className="hero-illustration-text">Haulr</div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* How it works */}
      <section className="section">
        <h2 className="section-title">Zo werkt Haulr</h2>
        <p className="section-subtitle">In drie stappen van ophalen tot afleveren.</p>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className="step-label">Stap 1</div>
            <div className="step-title">Voeg je spullen toe</div>
            <div className="step-desc">Maak een foto en beschrijf wat je wilt vervoeren.</div>
          </div>
          <div className="step-card">
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="step-label">Stap 2</div>
            <div className="step-title">Kies route & voertuig</div>
            <div className="step-desc">Voer ophaal- en bezorgadres in, selecteer het juiste voertuig.</div>
          </div>
          <div className="step-card">
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div className="step-label">Stap 3</div>
            <div className="step-title">Chauffeur onderweg</div>
            <div className="step-desc">Volg je transport live en ontvang updates.</div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Why Haulr */}
      <section className="section">
        <h2 className="section-title">Waarom Haulr?</h2>
        <p className="section-subtitle">&nbsp;</p>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="benefit-title">Vaste prijs vooraf</div>
            <div className="benefit-desc">Je weet direct wat het kost.</div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="benefit-title">Direct beschikbaar</div>
            <div className="benefit-desc">Chauffeurs in je buurt.</div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="benefit-title">Verzekerd vervoer</div>
            <div className="benefit-desc">Volledig gedekt tijdens transport.</div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="benefit-title">Betrouwbaar</div>
            <div className="benefit-desc">Geverifieerd en professioneel.</div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Popular transports */}
      <section className="section">
        <h2 className="section-title">Populaire transporten</h2>
        <p className="section-subtitle">&nbsp;</p>
        <div className="transports-grid">
          <div className="transport-card" onClick={() => navigate('/boeken')}>
            <div className="transport-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                <path d="M9 22V12h6v10" />
                <path d="M2 10.6L12 2l10 8.6" />
              </svg>
            </div>
            <div className="transport-title">Meubels verhuizen</div>
            <div className="transport-desc">Banken, kasten, tafels</div>
          </div>
          <div className="transport-card" onClick={() => navigate('/boeken')}>
            <div className="transport-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div className="transport-title">Grote pakketbezorging</div>
            <div className="transport-desc">Te groot voor PostNL</div>
          </div>
          <div className="transport-card" onClick={() => navigate('/boeken')}>
            <div className="transport-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="transport-title">Veilig transport</div>
            <div className="transport-desc">Breekbare spullen</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">1.200+</div>
          <div className="stat-label">Transporten</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-value">4.8&#9733;</div>
          <div className="stat-label">Beoordeling</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-value">2 min</div>
          <div className="stat-label">Geregeld</div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-banner">
        <Link to="/boeken" className="cta-inner">
          <div>
            <div className="cta-title">Klaar om te beginnen?</div>
            <div className="cta-desc">Regel je transport in minder dan 2 minuten.</div>
          </div>
          <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      <Footer />
    </div>
  )
}
