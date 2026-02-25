import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/authContext'

export function RegisterPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate('/app', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registratie mislukt.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">Haulr</div>
        <h1 className="auth-title">Account aanmaken</h1>
        <p className="auth-subtitle">Start direct met het boeken van transporten.</p>

        <form onSubmit={onSubmit} className="auth-form">
          <label className="field">
            <span>Volledige naam</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              autoComplete="name"
              placeholder="Jan de Vries"
              required
            />
          </label>

          <label className="field">
            <span>E-mailadres</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="naam@bedrijf.nl"
              required
            />
          </label>

          <label className="field">
            <span>Wachtwoord</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              placeholder="Minimaal 8 tekens"
              required
              minLength={8}
            />
          </label>

          {error ? <div className="error-banner">{error}</div> : null}

          <div className="auth-submit">
            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Account aanmaken…' : 'Registreren'}
            </button>
          </div>
        </form>

        <div className="auth-footer">
          Al een account? <Link to="/login">Inloggen</Link>
        </div>
      </div>
    </div>
  )
}
