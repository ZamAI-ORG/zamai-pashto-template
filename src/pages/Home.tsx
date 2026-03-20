import { Link } from 'react-router-dom'
import './Home.css'

const features = [
  {
    icon: '📝',
    title: 'Pashto Alphabet',
    titlePashto: 'پښتو الفبا',
    description: 'Learn the Pashto script, letter forms, and sound patterns with a clear starting point for new readers.',
    link: '/alphabet',
  },
  {
    icon: '📚',
    title: 'Vocabulary Builder',
    titlePashto: 'لغات جوړونه',
    description: 'Grow everyday vocabulary for family life, study, work, travel, and community conversation.',
    link: '/vocabulary',
  },
  {
    icon: '🔄',
    title: 'Translator',
    titlePashto: 'ژباړن',
    description: 'Move between Pashto and English quickly for learning, drafting, and daily communication.',
    link: '/translator',
  },
  {
    icon: '💬',
    title: 'Proverbs & Culture',
    titlePashto: 'متلونه او کلتور',
    description: 'Explore proverbs, meanings, and cultural wisdom that carry Pashto identity across generations.',
    link: '/proverbs',
  },
  {
    icon: '🏠',
    title: 'Resources & Community',
    titlePashto: 'سرچینې او ټولنه',
    description: 'Browse poetry, books, names, media, diaspora notes, and community contribution lanes.',
    link: '/resources',
  },
  {
    icon: '🗂️',
    title: 'Data Pipeline',
    titlePashto: 'د معلوماتو پایپ لاین',
    description: 'See how Pashto text, books, and digital sources can be gathered for open language technology.',
    link: '/pipeline',
  },
]

const communityPillars = [
  {
    title: 'For Speakers',
    titlePashto: 'د ویونکو لپاره',
    description: 'A place to keep Pashto visible online through language, stories, sayings, and useful daily tools.',
  },
  {
    title: 'For Learners',
    titlePashto: 'د زده کوونکو لپاره',
    description: 'A practical path from alphabet to phrases, vocabulary, culture, and real reading confidence.',
  },
  {
    title: 'For Writers & Teachers',
    titlePashto: 'د لیکوالانو او ښوونکو لپاره',
    description: 'A growing base for curated language material that can support lessons, writing, and community sharing.',
  },
  {
    title: 'For Builders',
    titlePashto: 'د جوړوونکو لپاره',
    description: 'Open resources, data workflows, and model direction for anyone building Pashto-first tools.',
  },
]

const resourceAreas = [
  {
    title: 'Language Learning',
    items: ['Alphabet and script basics', 'Useful vocabulary', 'Starter translation support'],
    link: '/alphabet',
    cta: 'Open learning tools',
  },
  {
    title: 'Culture & Identity',
    items: ['Proverbs and sayings', 'Context around Afghan culture', 'A place to preserve expressions and meaning'],
    link: '/proverbs',
    cta: 'Explore culture',
  },
  {
    title: 'Pashto Technology',
    items: ['Data collection workflows', 'AI translation direction', 'Open-source language infrastructure'],
    link: '/pipeline',
    cta: 'See the pipeline',
  },
  {
    title: 'Community Resources',
    items: ['Poetry and reading shelves', 'Names and meanings', 'Media and diaspora connections'],
    link: '/resources',
    cta: 'Open resources',
  },
]

const collectionPreviews = [
  {
    title: 'Poetry Shelf',
    titlePashto: 'د شاعرۍ زېرمتون',
    items: ['Rahman Baba poetry', 'Khushal Khan Khattak selections', 'Landay folk verse'],
    link: '/resources/poetry',
  },
  {
    title: 'Names & Meanings',
    titlePashto: 'نومونه او ماناوې',
    items: ['مینه - love', 'هیله - hope', 'ننګیالی - courageous'],
    link: '/resources/names',
  },
  {
    title: 'Media & Diaspora',
    titlePashto: 'رسنۍ او کډوالي',
    items: ['BBC Pashto', 'VOA Pashto', 'Diaspora learning circles'],
    link: '/resources/media',
  },
]

const contributionLanes = [
  {
    title: 'Words & Phrases',
    description: 'Share useful daily words, greetings, family expressions, or regional usage notes.',
  },
  {
    title: 'Idioms & Proverbs',
    description: 'Add idioms, mataluna, and short explanations that preserve local wisdom and context.',
  },
  {
    title: 'Readings & Excerpts',
    description: 'Contribute short reading passages, folktale summaries, or learner-friendly texts.',
  },
  {
    title: 'Cultural Notes',
    description: 'Document customs, names, oral history, media references, and diaspora experiences.',
  },
]

const stats = [
  { value: '44', label: 'Alphabet Letters', labelPashto: 'الفبا توري' },
  { value: '60+', label: 'Vocabulary Words', labelPashto: 'لغات' },
  { value: '16', label: 'Proverbs', labelPashto: 'متلونه' },
  { value: '50M+', label: 'Native Speakers', labelPashto: 'مورنۍ ژبې ویونکي' },
]

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <p className="hero-kicker">A Digital Home for Pashto</p>
            <h1>
              A home for <span className="highlight">Pashto</span> speakers, learners, and builders
              <span className="hero-pashto pashto-text">د پښتو ویونکو، زده کوونکو او جوړوونکو لپاره کور</span>
            </h1>
            <p className="hero-subtitle">
              ZamAI Pashto is growing into a shared place for language learning, cultural memory,
              useful tools, and open digital infrastructure so Pashto can live strongly online.
            </p>
            <div className="hero-actions">
              <Link to="/about" className="btn btn-primary btn-lg">
                Explore the Hub
                <span className="pashto-text">مرکز وپلټئ</span>
              </Link>
              <Link to="/resources" className="btn btn-outline btn-lg">
                Browse Resources
              </Link>
              <Link to="/alphabet" className="btn btn-outline btn-lg">
                Start with Language Basics
              </Link>
            </div>
          </div>
          <div className="hero-visual fade-in">
            <div className="hero-card">
              <div className="hero-letters pashto-text">
                <span>پ</span>
                <span>ښ</span>
                <span>ت</span>
                <span>و</span>
              </div>
              <p>Language, culture, tools, and memory in one Pashto-first space</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pillars-section">
        <div className="container">
          <div className="section-header">
            <h2>Who This Space Is For</h2>
            <p className="pashto-text">دا ځای د چا لپاره دی</p>
            <p>ZamAI should serve people who speak Pashto today and people working to carry it forward.</p>
          </div>
          <div className="pillars-grid">
            {communityPillars.map((pillar) => (
              <article key={pillar.title} className="pillar-card card">
                <h3>{pillar.title}</h3>
                <p className="pashto-text">{pillar.titlePashto}</p>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-label-pashto pashto-text">{stat.labelPashto}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Core Pashto Tools</h2>
            <p className="pashto-text">د پښتو بنسټیز وسایل</p>
            <p>Use the current tools as the foundation for a larger Pashto knowledge and community platform.</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p className="feature-title-pashto pashto-text">{feature.titlePashto}</p>
                <p className="feature-description">{feature.description}</p>
                <span className="feature-link">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="resource-hub-section">
        <div className="container">
          <div className="section-header">
            <h2>What Belongs Here</h2>
            <p className="pashto-text">دلته څه باید وي</p>
            <p>The goal is not just lessons. It is a growing Pashto home for language, culture, and digital access.</p>
          </div>
          <div className="resource-hub-grid">
            {resourceAreas.map((area) => (
              <article key={area.title} className="resource-hub-card card">
                <h3>{area.title}</h3>
                <ul>
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link to={area.link} className="resource-hub-link">
                  {area.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="collections-preview-section">
        <div className="container">
          <div className="section-header">
            <h2>Living Pashto Collections</h2>
            <p className="pashto-text">ژوندي پښتو ټولګې</p>
            <p>These are the kinds of real collections the site can hold and keep growing.</p>
          </div>
          <div className="collections-preview-grid">
            {collectionPreviews.map((collection) => (
              <article key={collection.title} className="collection-preview-card card">
                <h3>{collection.title}</h3>
                <p className="pashto-text">{collection.titlePashto}</p>
                <div className="collection-preview-list">
                  {collection.items.map((item) => (
                    <div key={item} className="collection-preview-item">
                      <span>•</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
                <Link to={collection.link} className="resource-hub-link">
                  View the collection
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Pashto Section */}
      <section className="about-pashto-section">
        <div className="container">
          <div className="about-pashto-content">
            <div className="about-pashto-text">
              <h2>About Pashto Language</h2>
              <p className="pashto-text">د پښتو ژبې په اړه</p>
              <p>
                Pashto (پښتو) is an Eastern Iranian language spoken by over 50 million 
                people, primarily in Afghanistan and Pakistan. It is one of the two 
                official languages of Afghanistan and has a rich literary tradition 
                dating back centuries.
              </p>
              <p>
                The language features a unique alphabet derived from the Arabic script, 
                with additional letters to represent sounds specific to Pashto. Learning 
                Pashto opens doors to understanding Afghan culture, poetry, history, family life,
                and the living voice of Pashto communities across the world.
              </p>
              <Link to="/about" className="btn btn-primary">
                Learn More About ZamAI
              </Link>
            </div>
            <div className="about-pashto-visual">
              <div className="language-card">
                <h4>Quick Facts</h4>
                <ul>
                  <li><strong>Native Name:</strong> <span className="pashto-text">پښتو</span></li>
                  <li><strong>Language Family:</strong> Indo-Iranian</li>
                  <li><strong>Script:</strong> Pashto alphabet (Arabic-derived)</li>
                  <li><strong>Speakers:</strong> 50+ million</li>
                  <li><strong>Official in:</strong> Afghanistan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="future-topics-section">
        <div className="container">
          <div className="future-topics-card card">
            <div className="future-topics-copy">
              <h2>Community Contribution Lanes</h2>
              <p className="pashto-text">د ټولنې د مرستې لارې</p>
              <p>
                Pashto speakers should be able to help shape the site with material that reflects lived language,
                not just curated pages from one editor.
              </p>
            </div>
            <div className="future-topics-list">
              {contributionLanes.map((lane) => (
                <div key={lane.title} className="future-topic-item">
                  <span>•</span>
                  <div>
                    <h4>{lane.title}</h4>
                    <p>{lane.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Help Build a Stronger Pashto Home Online</h2>
            <p className="pashto-text">راځئ چې د پښتو لپاره آنلاین یو قوي کور جوړ کړو</p>
            <p>Learn, contribute, review, and help expand what this platform can hold for Pashto speakers.</p>
            <div className="cta-actions">
              <Link to="/alphabet" className="btn btn-primary btn-lg">
                Start with the Alphabet
              </Link>
              <Link to="/resources#contribute" className="btn btn-outline btn-lg cta-secondary-btn">
                Contribute Pashto Content
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg cta-secondary-btn">
                See the Mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
