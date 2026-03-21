import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  clearEditorToken,
  exportApprovedEntries,
  getCommunitySubmissions,
  getEditorSession,
  getStoredEditorToken,
  importApprovedEntries,
  loginEditor,
  saveEditorToken,
  updateSubmissionStatus,
  type CommunitySubmission,
  type EditorSession,
} from '../lib/communityStorage'
import './Moderation.css'

function Moderation() {
  const [submissions, setSubmissions] = useState<CommunitySubmission[]>([])
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [authState, setAuthState] = useState<'loading' | 'unauthenticated' | 'authenticated'>('loading')
  const [session, setSession] = useState<EditorSession | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  const refreshSubmissions = async (authToken: string) => {
    setSubmissions(await getCommunitySubmissions(authToken))
  }

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = getStoredEditorToken()

      if (!storedToken) {
        setAuthState('unauthenticated')
        return
      }

      try {
        const editorSession = await getEditorSession(storedToken)
        setToken(storedToken)
        setSession(editorSession)
        await refreshSubmissions(storedToken)
        setAuthState('authenticated')
      } catch {
        clearEditorToken()
        setAuthState('unauthenticated')
      }
    }

    void restoreSession()
  }, [])

  const pendingSubmissions = useMemo(
    () => submissions.filter((submission) => submission.status === 'pending'),
    [submissions],
  )

  const reviewedSubmissions = useMemo(
    () => submissions.filter((submission) => submission.status !== 'pending'),
    [submissions],
  )

  const handleReview = async (submission: CommunitySubmission, status: 'approved' | 'rejected') => {
    if (!token) {
      return
    }

    await updateSubmissionStatus(submission.id, status, notes[submission.id]?.trim() || undefined, token)
    await refreshSubmissions(token)
    setActionMessage(`Submission ${status}.`)
  }

  const handleLogin = async () => {
    setAuthError(null)

    try {
      const authResult = await loginEditor(email.trim(), password)
      saveEditorToken(authResult.token)
      setToken(authResult.token)
      setSession(authResult.editor)
      await refreshSubmissions(authResult.token)
      setPassword('')
      setAuthState('authenticated')
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to sign in.')
      setAuthState('unauthenticated')
    }
  }

  const handleLogout = () => {
    clearEditorToken()
    setToken(null)
    setSession(null)
    setSubmissions([])
    setNotes({})
    setAuthError(null)
    setActionMessage(null)
    setAuthState('unauthenticated')
  }

  const handleExport = async () => {
    if (!token) {
      return
    }

    const result = await exportApprovedEntries(token)
    setActionMessage(`Exported ${result.count} approved entries to ${result.path}.`)
  }

  const handleImport = async () => {
    if (!token) {
      return
    }

    const result = await importApprovedEntries(token)
    await refreshSubmissions(token)
    setActionMessage(`Imported ${result.importedCount} approved entries from ${result.path}.`)
  }

  if (authState !== 'authenticated' || !session || !token) {
    return (
      <div className="moderation-page">
        <div className="container">
          <div className="page-header fade-in">
            <h1>Editor Moderation</h1>
            <p className="pashto-text page-title-pashto">د مدیر د سمون برخه</p>
            <p className="page-subtitle">
              This area is protected. Only signed-in editors can review submissions or manage import and export operations.
            </p>
          </div>

          <div className="moderation-login card">
            <h2>Editor Sign In</h2>
            <p>Use the editor account configured in your backend environment.</p>
            <div className="moderation-login-grid">
              <label>
                <span>Email</span>
                <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="editor@example.com" />
              </label>
              <label>
                <span>Password</span>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Editor password" />
              </label>
            </div>
            <div className="moderation-actions">
              <button type="button" className="btn btn-primary" onClick={() => { void handleLogin() }}>
                Sign in
              </button>
              <Link to="/resources" className="btn btn-outline">
                Back to resources
              </Link>
            </div>
            {authError ? <p className="copy-feedback copy-feedback-error">{authError}</p> : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="moderation-page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Moderation Queue</h1>
          <p className="pashto-text page-title-pashto">د تایید او سمون کتار</p>
          <p className="page-subtitle">
            Review saved community submissions before they become visible on the public resource collection pages.
          </p>
          <p className="moderation-session">Signed in as {session.email}</p>
        </div>

        <div className="moderation-rules card">
          <h2>Editorial Review Rules</h2>
          <p className="pashto-text">د سمون اصول</p>
          <ul>
            <li>Approve only entries with enough context to verify meaning, usage, or source value.</li>
            <li>Mark regional or diaspora context clearly when material is not universal across Pashto communities.</li>
            <li>Reject duplicate, abusive, misleading, or low-context submissions.</li>
            <li>Use editorial notes to explain what needs fixing before a contributor resubmits similar material.</li>
          </ul>
        </div>

        <div className="moderation-summary">
          <div className="moderation-stat card">
            <strong>{pendingSubmissions.length}</strong>
            <span>Pending</span>
          </div>
          <div className="moderation-stat card">
            <strong>{reviewedSubmissions.filter((submission) => submission.status === 'approved').length}</strong>
            <span>Approved</span>
          </div>
          <div className="moderation-stat card">
            <strong>{reviewedSubmissions.filter((submission) => submission.status === 'rejected').length}</strong>
            <span>Rejected</span>
          </div>
        </div>

        <div className="moderation-sync card" id="versioned-export">
          <div>
            <h2>Versioned Import / Export</h2>
            <p className="pashto-text">نسخه لرونکی واردول او صادرول</p>
            <p>Export approved entries into data/community-library.json so they can be committed, reviewed, and synced across environments.</p>
          </div>
          <div className="moderation-actions">
            <button type="button" className="btn btn-primary" onClick={() => { void handleExport() }}>
              Export approved entries
            </button>
            <button type="button" className="btn btn-outline" onClick={() => { void handleImport() }}>
              Import versioned entries
            </button>
            <button type="button" className="btn btn-outline" onClick={handleLogout}>
              Sign out
            </button>
          </div>
          {actionMessage ? <p className="copy-feedback">{actionMessage}</p> : null}
        </div>

        <section className="moderation-section">
          <div className="section-header">
            <h2>Pending Review</h2>
            <p className="pashto-text">د بیاکتنې په تمه</p>
          </div>
          <div className="moderation-list">
            {pendingSubmissions.map((submission) => (
              <article key={submission.id} className="moderation-card card">
                <div className="moderation-card-header">
                  <div>
                    <h3>{submission.title}</h3>
                    {submission.titlePashto ? <p className="pashto-text">{submission.titlePashto}</p> : null}
                  </div>
                  <span className="moderation-badge">{submission.collection}</span>
                </div>
                <p className="moderation-summary-text">{submission.summary}</p>
                <p className="moderation-body-text">{submission.body}</p>
                <div className="moderation-meta">
                  {submission.contributor ? <span>Contributor: {submission.contributor}</span> : null}
                  {submission.region ? <span>Region: {submission.region}</span> : null}
                  <span>Created: {new Date(submission.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="moderation-tags">
                  {submission.tags.map((tag) => (
                    <span key={tag} className="moderation-tag">{tag}</span>
                  ))}
                </div>
                <label className="moderation-notes">
                  <span>Editorial notes</span>
                  <textarea
                    rows={3}
                    value={notes[submission.id] ?? submission.editorialNotes ?? ''}
                    onChange={(event) => setNotes((currentNotes) => ({
                      ...currentNotes,
                      [submission.id]: event.target.value,
                    }))}
                    placeholder="Explain approval context or why the entry needs revision"
                  />
                </label>
                <div className="moderation-actions">
                  <button type="button" className="btn btn-primary" onClick={() => { void handleReview(submission, 'approved') }}>
                    Approve for public view
                  </button>
                  <button type="button" className="btn btn-outline" onClick={() => { void handleReview(submission, 'rejected') }}>
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>

          {pendingSubmissions.length === 0 ? (
            <div className="empty-moderation card">
              <h3>No pending submissions</h3>
              <p>Saved community entries will appear here until an editor approves or rejects them.</p>
              <Link to="/resources#contribute" className="btn btn-primary">
                Add a new submission
              </Link>
            </div>
          ) : null}
        </section>

        <section className="moderation-section reviewed-section">
          <div className="section-header">
            <h2>Reviewed Submissions</h2>
            <p className="pashto-text">ارزول شوې سپارښتنې</p>
          </div>
          <div className="reviewed-list">
            {reviewedSubmissions.map((submission) => (
              <article key={submission.id} className="reviewed-card card">
                <div className="moderation-card-header">
                  <h3>{submission.title}</h3>
                  <span className={`reviewed-badge ${submission.status}`}>{submission.status}</span>
                </div>
                <p>{submission.summary}</p>
                {submission.editorialNotes ? <p className="reviewed-note">Note: {submission.editorialNotes}</p> : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Moderation