import { useState } from 'react'
import './DataPipeline.css'

const repoBaseUrl = import.meta.env.VITE_REPO_BASE_URL ?? 'https://github.com/tasal9/ZamAI_Pashto/blob/main'

type CopyState = {
  command: string
  status: 'success' | 'error'
  message: string
}

const pipelineSteps = [
  {
    title: 'Discover sources',
    titlePashto: 'سرچینې ومومئ',
    description: 'Start from reputable Pashto news and library pages, then narrow to article or PDF links that match the site structure.',
  },
  {
    title: 'Collect files',
    titlePashto: 'فایلونه راټول کړئ',
    description: 'Use Scrapy for repeatable crawling, pagination, and PDF downloads. Keep domain allow-lists tight to avoid noisy datasets.',
  },
  {
    title: 'Extract text',
    titlePashto: 'متن راوباسئ',
    description: 'Convert downloaded PDFs into UTF-8 text, then record metadata such as filename, URL, and word counts for downstream filtering.',
  },
  {
    title: 'Clean and publish',
    titlePashto: 'پاک او خپور یې کړئ',
    description: 'Normalize Pashto text, remove extraction noise, and package the final corpus for training or sharing through Hugging Face datasets.',
  },
]

const sourceCards = [
  { name: 'BBC Pashto', type: 'News', url: 'bbc.com/ps' },
  { name: 'VOA Pashto', type: 'News', url: 'voanews.com/ps' },
  { name: 'Pajhwok', type: 'News', url: 'pajhwok.com' },
  { name: 'Azadi Radio', type: 'Radio / News', url: 'azadiradio.com' },
  { name: 'Shamela Library', type: 'Books', url: 'shamela.ws' },
]

const runnableAssets = [
  {
    title: 'Pinned Python requirements',
    language: 'bash',
    description: 'Install the exact Python dependencies used by the scraping utilities.',
    path: 'scripts/requirements.txt',
    command: 'pip install -r scripts/requirements.txt',
  },
  {
    title: 'News spider',
    language: 'python',
    description: 'Crawl article pages from Pashto news sites and write the results to JSON.',
    path: 'scripts/pipeline/news_spider.py',
    command: 'python scripts/pipeline/news_spider.py --output data/pashto_news.json',
  },
  {
    title: 'PDF discovery spider',
    language: 'python',
    description: 'Discover PDF links from an archive page and download them into a target folder.',
    path: 'scripts/pipeline/pdf_spider.py',
    command: 'python scripts/pipeline/pdf_spider.py --start-url https://example-pashto-books-site.com/ --output-dir data/downloaded_pdfs',
  },
  {
    title: 'PDF text extractor',
    language: 'python',
    description: 'Convert a folder of downloaded PDFs into structured JSON with metadata.',
    path: 'scripts/pipeline/extract_pdf_text.py',
    command: 'python scripts/pipeline/extract_pdf_text.py data/downloaded_pdfs data/pashto_books.json',
  },
  {
    title: 'Book page scraper',
    language: 'python',
    description: 'Scrape simple Pashto book listing pages into JSON with configurable selectors.',
    path: 'scripts/pipeline/scrape_pashto_books.py',
    command: 'python scripts/pipeline/scrape_pashto_books.py https://example-pashto-site.com/books --output data/books.json',
  },
  {
    title: 'Script usage guide',
    language: 'docs',
    description: 'Reference the quick-start guide if you want the commands and file overview in one place.',
    path: 'scripts/README.md',
    command: 'open scripts/README.md',
  },
]

const projectInterfaces = [
  {
    id: 'api-surface',
    title: 'API Surface',
    label: 'runtime',
    description: 'The frontend talks to the local Express backend through auth, submissions, collection, and moderation endpoints exposed under /api.',
    detail: 'Use the Vite proxy for local development and keep the contract stable for editor review and public resource reads.',
  },
  {
    id: 'export-workflow',
    title: 'Data Export Workflow',
    label: 'versioned data',
    description: 'Approved entries are exported into data/community-library.json so public content can be reviewed in git and synced across environments.',
    detail: 'This separates runtime submissions from versioned library data and makes publishing reproducible.',
  },
  {
    id: 'contribution-intake',
    title: 'Contribution Intake',
    label: 'editorial flow',
    description: 'Contributors submit from the resources page, editors review in moderation, and only approved entries reach public collection pages.',
    detail: 'The flow keeps submission open while preserving editorial control over what becomes part of the library.',
  },
]

function DataPipeline() {
  const [copyState, setCopyState] = useState<CopyState | null>(null)

  const handleCopyCommand = async (command: string) => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable')
      }

      await navigator.clipboard.writeText(command)
      setCopyState({
        command,
        status: 'success',
        message: 'Copied',
      })
    } catch {
      setCopyState({
        command,
        status: 'error',
        message: 'Copy failed',
      })
    }

    window.setTimeout(() => {
      setCopyState((currentState) => (currentState?.command === command ? null : currentState))
    }, 1800)
  }

  return (
    <div className="pipeline-page">
      <section className="pipeline-hero">
        <div className="container pipeline-hero-content fade-in">
          <div>
            <p className="pipeline-kicker">Pashto Data Collection</p>
            <h1>Scraping and Book Extraction Workflow</h1>
            <p className="pashto-text pipeline-title-pashto">د پښتو متنونو د راټولولو او استخراج کاري بهیر</p>
            <p className="pipeline-subtitle">
              A reference page for collecting Pashto news articles, discovering PDF book archives,
              extracting text, cleaning noisy content, and publishing reusable datasets.
            </p>
          </div>

          <div className="pipeline-hero-card">
            <h3>Recommended workflow</h3>
            <ol>
              <li>Map stable sources and selectors.</li>
              <li>Scrape articles or download PDFs.</li>
              <li>Extract UTF-8 text with metadata.</li>
              <li>Normalize, review, and publish the corpus.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="pipeline-overview">
        <div className="container">
          <div className="section-header">
            <h2>Pipeline Stages</h2>
            <p className="pashto-text">د پایپ لاین پړاوونه</p>
            <p>Use the same flow whether you are harvesting news text, library PDFs, or mixed-format archives.</p>
          </div>

          <div className="pipeline-steps-grid">
            {pipelineSteps.map((step) => (
              <article key={step.title} className="pipeline-step card">
                <h3>{step.title}</h3>
                <p className="pashto-text">{step.titlePashto}</p>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pipeline-sources">
        <div className="container">
          <div className="section-header">
            <h2>Useful Pashto Sources</h2>
            <p className="pashto-text">ګټورې پښتو سرچینې</p>
            <p>Selector details vary by site, but these domains are strong starting points for corpus building.</p>
          </div>

          <div className="source-grid">
            {sourceCards.map((source) => (
              <div key={source.name} className="source-card">
                <span className="source-type">{source.type}</span>
                <h3>{source.name}</h3>
                <p>{source.url}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pipeline-code-section">
        <div className="container">
          <div className="section-header">
            <h2>Runnable Assets</h2>
            <p className="pashto-text">چلېدونکي فایلونه او قوماندې</p>
            <p>Use the actual repository files below instead of copying snippets out of the page.</p>
          </div>

          <div className="asset-grid">
            {runnableAssets.map((asset) => (
              <article key={asset.title} className="asset-card card">
                <div className="asset-card-header">
                  <div>
                    <h3>{asset.title}</h3>
                    <p>{asset.description}</p>
                  </div>
                  <span className="code-language">{asset.language}</span>
                </div>
                <p className="asset-path">{asset.path}</p>
                <a
                  className="asset-link"
                  href={`${repoBaseUrl}/${asset.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open file on GitHub
                </a>
                <div className="asset-command-header">
                  <span>Command</span>
                  <button
                    type="button"
                    className="asset-copy-button"
                    onClick={() => {
                      void handleCopyCommand(asset.command)
                    }}
                  >
                    {copyState?.command === asset.command ? copyState.message : 'Copy command'}
                  </button>
                </div>
                {copyState?.command === asset.command && copyState.status === 'error' ? (
                  <p className="asset-copy-feedback" role="status">
                    Clipboard access is unavailable here. Copy the command manually.
                  </p>
                ) : null}
                <pre className="code-block asset-command-block">
                  <code>{asset.command}</code>
                </pre>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pipeline-code-section" id="project-interfaces">
        <div className="container">
          <div className="section-header">
            <h2>Project Interfaces</h2>
            <p className="pashto-text">د پروژې د کارونې لارې</p>
            <p>Use these entry points to understand how the application exposes data, review workflow, and contribution flow.</p>
          </div>

          <div className="asset-grid">
            {projectInterfaces.map((item) => (
              <article key={item.id} id={item.id} className="asset-card card">
                <div className="asset-card-header">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className="code-language">{item.label}</span>
                </div>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pipeline-guidance">
        <div className="container">
          <div className="guidance-card card">
            <h2>Responsible Collection Checklist</h2>
            <p className="pashto-text">د مسؤل راټولولو لړلیک</p>
            <ul>
              <li>Review each source for robots.txt, terms of use, and redistribution limits before scraping.</li>
              <li>Store URL, title, and retrieval date with each item so you can audit or remove records later.</li>
              <li>Expect OCR and PDF extraction noise, especially on scanned books, and budget time for cleanup.</li>
              <li>Prefer incremental crawls and deduplication to avoid repeatedly reprocessing the same content.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DataPipeline