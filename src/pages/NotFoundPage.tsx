import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page">
      <h2>Page not found</h2>
      <p>
        Go to <Link to="/app">the app</Link> or <Link to="/login">sign in</Link>.
      </p>
    </div>
  )
}

