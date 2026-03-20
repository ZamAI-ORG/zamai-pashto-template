import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { createCommunitySubmission, getPendingSubmissionCount } from '../lib/communityStorage'
import { resourceCollections, getResourceCollectionMeta, type ResourceCollectionKey } from '../data/resourceLibrary'
import './Resources.css'

const contributionTypes = [
  { value: 'poetry', label: 'Poetry or oral tradition' },
  { value: 'books', label: 'Book or reading contribution' },
  { value: 'names', label: 'Name and meaning' },
  { value: 'media', label: 'Media or diaspora note' },
] as const

type SaveStatus = {
  status: 'success' | 'error'
  message: string
}

function Resources() {
  const [contributionType, setContributionType] = useState<ResourceCollectionKey>('poetry')
  const [title, setTitle] = useState('')
  const [pashtoTitle, setPashtoTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [context, setContext] = useState('')
  const [contributor, setContributor] = useState('')
  const [region, setRegion] = useState('')
  const [tags, setTags] = useState('')
  const [pendingCount, setPendingCount] = useState(0)
  const [saveStatus, setSaveStatus] = useState<SaveStatus | null>(null)

  useEffect(() => {
    setPendingCount(getPendingSubmissionCount())
  }, [])

  const selectedCollection = useMemo(
    () => getResourceCollectionMeta(contributionType),
    [contributionType],
  )

  const submissionPreview = useMemo(
    () => [
      `Collection: ${selectedCollection.title}`,
      `Title: ${title || '[add a short title]'}`,
      `Pashto title or text: ${pashtoTitle || '[optional Pashto title or key line]'}`,
      `Summary: ${summary || '[add summary]'}`,
      `Detailed context: ${context || '[add explanation, source, or notes]'}`,
      `Contributor: ${contributor || '[optional name]'}`,
      `Region or diaspora note: ${region || '[optional region or diaspora context]'}`,
      `Tags: ${tags || '[comma-separated tags]'}`,
    ].join('\n'),
    [contributor, context, pashtoTitle, region, selectedCollection.title, summary, tags, title],
  )

  const handleSaveSubmission = () => {
    if (!title.trim() || !summary.trim() || !context.trim()) {
      setSaveStatus({
        status: 'error',
        message: 'Add a title, summary, and detailed context before saving.',
      })
      return
    }

    createCommunitySubmission({
      collection: contributionType as ResourceCollectionKey,
      title: title.trim(),
      titlePashto: pashtoTitle.trim() || undefined,
      summary: summary.trim(),
      body: context.trim(),
      contributor: contributor.trim() || undefined,
      region: region.trim() || undefined,
      tags: tags.split(',').map((item) => item.trim()).filter(Boolean),
    })

    setTitle('')
    setPashtoTitle('')
    setSummary('')
    setContext('')
    setContributor('')
    setRegion('')
    setTags('')
    setPendingCount(getPendingSubmissionCount())
    setSaveStatus({
      status: 'success',
      message: 'Submission saved locally and moved into the moderation queue.',
    })

    window.setTimeout(() => {
      setSaveStatus(null)
    }, 2200)
  }

  const handleCopyPreview = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable')
      }

      await navigator.clipboard.writeText(submissionPreview)
      setSaveStatus({ status: 'success', message: 'Submission preview copied' })
    } catch {
      setSaveStatus({ status: 'error', message: 'Copy failed. Use the preview below manually.' })
    }

    window.setTimeout(() => {
      setSaveStatus(null)
    }, 1800)
  }

  return (
    <div className="resources-page">
      <section className="resources-hero">
        <div className="container resources-hero-content fade-in">
          <div>
            <p className="resources-kicker">Pashto Resources & Community</p>
            <h1>A living Pashto shelf for language, memory, media, and community</h1>
            <p className="pashto-text resources-title-pashto">د ژبې، حافظې، رسنیو او ټولنې لپاره ژوندۍ پښتو سرچینې</p>
            <p className="resources-subtitle">
              This page gathers the kinds of materials Pashto speakers and learners look for beyond tools alone:
              poetry, reading paths, names, media, diaspora references, and ways to contribute new content directly.
            </p>
          </div>
          <div className="resources-hero-card card">
            <h3>Browse the library</h3>
            <ul>
              {resourceCollections.map((collection) => (
                <li key={collection.key}>
                  <Link to={`/resources/${collection.key}`}>{collection.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="resources-section">
        <div className="container">
          <div className="section-header">
            <h2>Resource Library</h2>
            <p className="pashto-text">د سرچینو کتابتون</p>
            <p>Each collection now has its own searchable page and can display approved community contributions.</p>
          </div>
          <div className="resources-grid three-up">
            {resourceCollections.map((collection) => (
              <article key={collection.key} className="resource-card card">
                <h3>{collection.title}</h3>
                <p className="pashto-text">{collection.titlePashto}</p>
                <p>{collection.description}</p>
                <Link to={`/resources/${collection.key}`} className="resource-link">
                  Open searchable collection
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="resources-section alt-surface">
        <div className="container">
          <div className="section-header">
            <h2>Editorial Review Workflow</h2>
            <p className="pashto-text">د سمون او تایید کاري بهیر</p>
            <p>Community content is saved immediately, but it remains pending until an editor approves it for public display.</p>
          </div>
          <div className="resources-grid two-up">
            <article className="resource-card card">
              <h3>Editorial rules</h3>
              <ul className="rule-list">
                <li>Submissions must include enough context to verify meaning and usage.</li>
                <li>Regional or diaspora notes should be labeled clearly when they are not universal.</li>
                <li>Editors should reject unclear, abusive, unsourced, or duplicate material.</li>
                <li>Only approved entries should appear on public collection pages.</li>
              </ul>
            </article>
            <article className="resource-card card moderation-card">
              <h3>Moderation workspace</h3>
              <p>Pending submissions in this browser: <strong>{pendingCount}</strong></p>
              <p>Use the moderation page to add editorial notes, approve entries, or reject them before publication.</p>
              <Link to="/resources/moderation" className="btn btn-primary moderation-link">
                Open moderation queue
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="resources-section" id="contribute">
        <div className="container">
          <div className="section-header">
            <h2>Contribute to the Pashto Hub</h2>
            <p className="pashto-text">د پښتو مرکز ته مرسته واستوئ</p>
            <p>Save submissions directly in the app, then review them in the moderation queue before publishing them to the public collection pages.</p>
          </div>

          <div className="contribution-layout">
            <div className="contribution-guide card">
              <h3>Contribution Lanes</h3>
              <div className="contribution-lanes">
                {contributionTypes.map((item) => (
                  <div key={item.value} className="contribution-lane">
                    <h4>{item.label}</h4>
                    <p>
                      {item.value === 'poetry' && 'Poems, oral verse notes, literary context, or short poetic excerpts with explanation.'}
                      {item.value === 'books' && 'Reading passages, story summaries, family reading notes, or public-domain book references.'}
                      {item.value === 'names' && 'Names, meanings, pronunciation hints, and notes about identity or usage.'}
                      {item.value === 'media' && 'Media references, diaspora learning spaces, and public language-use notes.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="contribution-form card">
              <h3>Save a Community Submission</h3>
              <div className="form-grid">
                <label>
                  <span>Collection</span>
                  <select value={contributionType} onChange={(event) => setContributionType(event.target.value as ResourceCollectionKey)}>
                    {contributionTypes.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Title</span>
                  <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Short title for your contribution" />
                </label>

                <label className="form-span-2">
                  <span>Pashto title or key line</span>
                  <input value={pashtoTitle} onChange={(event) => setPashtoTitle(event.target.value)} placeholder="Optional Pashto title, name, or key line" />
                </label>

                <label>
                  <span>Short summary</span>
                  <input value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="A short public summary" />
                </label>

                <label>
                  <span>Region or diaspora context</span>
                  <input value={region} onChange={(event) => setRegion(event.target.value)} placeholder="Optional: Kandahar, Peshawar, UK diaspora, etc." />
                </label>

                <label className="form-span-2">
                  <span>Detailed context or notes</span>
                  <textarea value={context} onChange={(event) => setContext(event.target.value)} placeholder="Explain usage, source, why it matters, and how an editor should understand it" rows={5} />
                </label>

                <label className="form-span-2">
                  <span>Contributor name</span>
                  <input value={contributor} onChange={(event) => setContributor(event.target.value)} placeholder="Optional name or handle" />
                </label>

                <label className="form-span-2">
                  <span>Tags</span>
                  <input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="Comma-separated tags like poetry, family, diaspora, names" />
                </label>
              </div>

              <div className="contribution-actions">
                <button type="button" className="btn btn-primary" onClick={handleSaveSubmission}>
                  Save Submission
                </button>
                <button type="button" className="btn btn-outline" onClick={() => { void handleCopyPreview() }}>
                  Copy Preview
                </button>
              </div>

              {saveStatus ? (
                <p className={`copy-feedback ${saveStatus.status === 'error' ? 'copy-feedback-error' : ''}`} role="status">
                  {saveStatus.message}
                </p>
              ) : null}

              <div className="draft-preview">
                <h4>Moderation Preview</h4>
                <pre>{submissionPreview}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Resources