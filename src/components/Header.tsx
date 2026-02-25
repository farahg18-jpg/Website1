import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/authContext'

export function Header() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="site-header">
      <Link to="/" className="site-logo">
        Haulr
      </Link>
      <div className="site-header-actions">
        {isAuthenticated ? (
          <Link to="/app" className="btn btn-primary">
            Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">
              Inloggen
            </Link>
            <Link to="/registreren" className="btn btn-primary">
              Registreren
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
