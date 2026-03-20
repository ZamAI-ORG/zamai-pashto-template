import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCommunitySubmissions, updateSubmissionStatus, type CommunitySubmission } from '../lib/communityStorage'
import './Moderation.css'

function Moderation() {
  const [submissions, setSubmissions] = useState<CommunitySubmission[]>([])
  const [notes, setNotes] = useState<Record<string, string>>({})

  const refreshSubmissions = () => {
    setSubmissions(getCommunitySubmissions())
  }

  useEffect(() => {
    refreshSubmissions()
  }, [])

  const pendingSubmissions = useMemo(
    () => submissions.filter((submission) => submission.status === 'pending'),
    [submissions],
  )

  const reviewedSubmissions = useMemo(
    () => submissions.filter((submission) => submission.status !== 'pending'),
    [submissions],
  )

  const handleReview = (submission: CommunitySubmission, status: 'approved' | 'rejected') => {
    updateSubmissionStatus(submission.id, status, notes[submission.id]?.trim() || undefined)
    refreshSubmissions()
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
                  <button type="button" className="btn btn-primary" onClick={() => handleReview(submission, 'approved')}>
                    Approve for public view
                  </button>
                  <button type="button" className="btn btn-outline" onClick={() => handleReview(submission, 'rejected')}>
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