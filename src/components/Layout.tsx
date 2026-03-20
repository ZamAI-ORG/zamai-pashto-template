import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './Layout.css'

const navItems = [
  { path: '/', label: 'Home', labelPashto: 'کور' },
  { path: '/alphabet', label: 'Alphabet', labelPashto: 'الفبا' },
  { path: '/vocabulary', label: 'Vocabulary', labelPashto: 'لغات' },
  { path: '/translator', label: 'Translator', labelPashto: 'ژباړن' },
  { path: '/proverbs', label: 'Proverbs', labelPashto: 'متلونه' },
  { path: '/pipeline', label: 'Pipeline', labelPashto: 'پایپ لاین' },
  { path: '/about', label: 'About', labelPashto: 'درباره' },
]

function Layout() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="layout">
      <header className="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span className="logo-text-main">ZamAI</span>
              <span className="logo-text-sub pashto-text">پښتو</span>
            </div>
          </Link>

          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                <span className="nav-link-pashto pashto-text">{item.labelPashto}</span>
              </Link>
            ))}
          </nav>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <h3>ZamAI Pashto</h3>
            <p className="pashto-text">پښتو ژبه زده کول او افغان کلتور ساتل</p>
            <p>Learn Pashto & Preserve Afghan Culture</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <nav>
              {navItems.slice(0, 5).map((item) => (
                <Link key={item.path} to={item.path}>{item.label}</Link>
              ))}
            </nav>
          </div>
          <div className="footer-about">
            <h4>About ZamAI</h4>
            <p>Open-source tools for Pashto language learning, AI translation, and cultural preservation.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>&copy; 2024 ZamAI Pashto. Open Source Project.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
