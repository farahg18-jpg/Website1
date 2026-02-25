import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

export function NotFoundPage() {
  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <h1 style={{ fontSize: 64, fontWeight: 800, marginBottom: 8 }}>404</h1>
        <p style={{ fontSize: 18, color: '#666', marginBottom: 32 }}>
          Deze pagina bestaat niet.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Terug naar home
        </Link>
      </div>
    </div>
  )
}
