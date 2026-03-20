import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getResourceCollectionMeta, type ResourceCollectionKey, type ResourceEntry } from '../data/resourceLibrary'
import { getVisibleEntries } from '../lib/communityStorage'
import './ResourceCollection.css'

interface ResourceCollectionPageProps {
  collection: ResourceCollectionKey
}

function ResourceCollectionPage({ collection }: ResourceCollectionPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [entries, setEntries] = useState<ResourceEntry[]>([])

  useEffect(() => {
    const loadEntries = () => {
      setEntries(getVisibleEntries(collection))
    }

    loadEntries()
    window.addEventListener('storage', loadEntries)
    return () => {
      window.removeEventListener('storage', loadEntries)
    }
  }, [collection])

  const collectionMeta = getResourceCollectionMeta(collection)

  const filteredEntries = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    if (!normalizedSearch) {
      return entries
    }

    return entries.filter((entry) => {
      const haystack = [
        entry.title,
        entry.titlePashto,
        entry.subtitle,
        entry.summary,
        entry.body,
        entry.region,
        entry.contributor,
        entry.tags.join(' '),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedSearch)
    })
  }, [entries, searchTerm])

  const approvedCount = entries.filter((entry) => entry.verificationStatus === 'community-approved').length

  return (
    <div className="resource-collection-page">
      <section className="resource-collection-hero">
        <div className="container fade-in">
          <div className="section-header collection-header">
            <h1>{collectionMeta.title}</h1>
            <p className="pashto-text">{collectionMeta.titlePashto}</p>
            <p>{collectionMeta.description}</p>
          </div>
          <div className="collection-toolbar card">
            <input
              type="text"
              className="search-input"
              placeholder={`Search ${collectionMeta.title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <div className="collection-toolbar-stats">
              <span>{filteredEntries.length} visible entries</span>
              <span>{approvedCount} community-approved</span>
              <Link to="/resources/moderation">Moderation queue</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="collection-results">
        <div className="container">
          <div className="collection-grid">
            {filteredEntries.map((entry) => (
              <article key={entry.id} className="collection-entry card">
                <div className="collection-entry-header">
                  <div>
                    <h3>{entry.title}</h3>
                    {entry.titlePashto ? <p className="pashto-text">{entry.titlePashto}</p> : null}
                  </div>
                  <span className={`verification-badge ${entry.verificationStatus}`}>
                    {entry.verificationStatus === 'curated' ? 'Curated' : 'Community approved'}
                  </span>
                </div>
                {entry.subtitle ? <p className="entry-subtitle">{entry.subtitle}</p> : null}
                <p className="entry-summary">{entry.summary}</p>
                {entry.body ? <p className="entry-body">{entry.body}</p> : null}
                <div className="entry-tags">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="entry-tag">{tag}</span>
                  ))}
                </div>
                {(entry.region || entry.contributor) ? (
                  <div className="entry-meta">
                    {entry.region ? <span>Region: {entry.region}</span> : null}
                    {entry.contributor ? <span>Contributor: {entry.contributor}</span> : null}
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          {filteredEntries.length === 0 ? (
            <div className="collection-empty card">
              <h3>No entries matched your search</h3>
              <p>Try a different keyword or add a new submission through the resources page.</p>
              <Link to="/resources#contribute" className="btn btn-primary">
                Add a submission
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}

export default ResourceCollectionPage