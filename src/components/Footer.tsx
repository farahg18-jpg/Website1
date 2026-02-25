import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand">Haulr</div>
          <div className="footer-tagline">Grote spullen. Direct geregeld.</div>
        </div>
        <div className="footer-columns">
          <div className="footer-col">
            <div className="footer-col-title">Bedrijf</div>
            <Link to="/over">Over Haulr</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Juridisch</div>
            <Link to="/privacy">Privacy</Link>
            <Link to="/voorwaarden">Voorwaarden</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Haulr. Alle rechten voorbehouden.
      </div>
    </footer>
  )
}
