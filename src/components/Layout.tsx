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
        <div className="container footer-content">
          <div className="footer-brand">
            <h3>ZamAI Pashto</h3>
            <p className="pashto-text">د پښتو ویونکو، زده کوونکو او جوړوونکو لپاره یو ګډ کور</p>
            <p>A shared digital home for Pashto speakers, learners, and builders.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <nav>
              {navItems.slice(0, 6).map((item) => (
                <Link key={item.path} to={item.path}>{item.label}</Link>
              ))}
              <Link to="/resources/moderation">Editor Moderation</Link>
            </nav>
          </div>
          <div className="footer-about">
            <h4>About ZamAI</h4>
            <p>Open-source tools, cultural resources, and language infrastructure designed to strengthen Pashto online.</p>
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
