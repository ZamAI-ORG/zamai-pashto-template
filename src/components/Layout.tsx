import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { clearEditorToken, getEditorSession, getStoredEditorToken, type EditorSession } from '../lib/communityStorage'
import './Layout.css'

const navItems = [
  { path: '/', label: 'Home', labelPashto: 'کور' },
  { path: '/alphabet', label: 'Alphabet', labelPashto: 'الفبا' },
  { path: '/vocabulary', label: 'Vocabulary', labelPashto: 'لغات' },
  { path: '/translator', label: 'Translator', labelPashto: 'ژباړن' },
  { path: '/proverbs', label: 'Proverbs', labelPashto: 'متلونه' },
  { path: '/resources', label: 'Resources', labelPashto: 'سرچینې' },
  { path: '/pipeline', label: 'Pipeline', labelPashto: 'پایپ لاین' },
  { path: '/about', label: 'About', labelPashto: 'په هکله' },
]

const footerExploreLinks = [
  { path: '/', label: 'Home' },
  { path: '/alphabet', label: 'Alphabet' },
  { path: '/vocabulary', label: 'Vocabulary' },
  { path: '/translator', label: 'Translator' },
]

const footerLibraryLinks = [
  { path: '/proverbs', label: 'Proverbs & Culture' },
  { path: '/resources', label: 'Resources' },
  { path: '/pipeline', label: 'Data Pipeline' },
]

const footerProjectLinks = [
  { path: '/resources/moderation', label: 'Editor Moderation' },
  { path: '/about', label: 'About ZamAI' },
]

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [editorSession, setEditorSession] = useState<EditorSession | null>(null)

  useEffect(() => {
    let isActive = true

    const syncEditorSession = async () => {
      const storedToken = getStoredEditorToken()

      if (!storedToken) {
        if (isActive) {
          setEditorSession(null)
        }
        return
      }

      try {
        const session = await getEditorSession(storedToken)

        if (isActive) {
          setEditorSession(session)
        }
      } catch {
        clearEditorToken()

        if (isActive) {
          setEditorSession(null)
        }
      }
    }

    const handleAuthChange = () => {
      void syncEditorSession()
    }

    void syncEditorSession()
    window.addEventListener('storage', handleAuthChange)
    window.addEventListener('zamai-editor-auth-changed', handleAuthChange)

    return () => {
      isActive = false
      window.removeEventListener('storage', handleAuthChange)
      window.removeEventListener('zamai-editor-auth-changed', handleAuthChange)
    }
  }, [location.pathname])

  const handleSignOut = () => {
    clearEditorToken()
    setMobileMenuOpen(false)

    if (location.pathname.startsWith('/resources/moderation')) {
      navigate('/resources/moderation')
    }
  }

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

          <div className="header-auth">
            <Link
              to="/resources/moderation"
              className={`btn ${editorSession ? 'btn-secondary' : 'btn-outline'} header-auth-link`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {editorSession ? 'Editor Panel' : 'Editor Login'}
            </Link>
            {editorSession ? (
              <>
                <span className="header-auth-session">{editorSession.email}</span>
                <button type="button" className="btn btn-outline header-auth-button" onClick={handleSignOut}>
                  Sign out
                </button>
              </>
            ) : null}
          </div>

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
        <div className="container footer-shell">
          <div className="footer-brand-panel">
            <p className="footer-eyebrow">Open Pashto Platform</p>
            <h3>ZamAI Pashto</h3>
            <p className="pashto-text footer-brand-pashto">د پښتو ژبې د وسایلو، سرچینو او ډیجیټلي بنسټ لپاره پرانیستی پلیټفارم</p>
            <p className="footer-brand-copy">
              An open platform for Pashto language tools, reviewed reference collections, and maintainable
              data workflows that support long-term digital use.
            </p>
            <div className="footer-pill-row">
              <span className="footer-pill">Learning Tools</span>
              <span className="footer-pill">Reviewed Resources</span>
              <span className="footer-pill">Open Source Stack</span>
            </div>
          </div>

          <div className="footer-nav-grid">
            <div className="footer-column">
              <h4>Explore</h4>
              <nav>
                {footerExploreLinks.map((item) => (
                  <Link key={item.path} to={item.path}>{item.label}</Link>
                ))}
              </nav>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <nav>
                {footerLibraryLinks.map((item) => (
                  <Link key={item.path} to={item.path}>{item.label}</Link>
                ))}
              </nav>
            </div>

            <div className="footer-column footer-column-wide">
              <h4>Project</h4>
              <nav>
                {footerProjectLinks.map((item) => (
                  <Link key={item.path} to={item.path}>{item.label}</Link>
                ))}
              </nav>
              <p className="footer-note">
                Versioned content, editor review, and reproducible pipelines for building durable Pashto language infrastructure.
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container footer-bottom-content">
            <p>&copy; 2024 ZamAI Pashto</p>
            <p>Open-source platform for Pashto tools, curated resources, and long-term digital infrastructure.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
