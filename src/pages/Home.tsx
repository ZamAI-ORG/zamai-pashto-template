import { Link } from 'react-router-dom'
import './Home.css'

const features = [
  {
    icon: '📝',
    title: 'Pashto Alphabet',
    titlePashto: 'پښتو الفبا',
    description: 'Learn the Pashto alphabet with interactive lessons and audio pronunciation.',
    link: '/alphabet',
  },
  {
    icon: '📚',
    title: 'Vocabulary Builder',
    titlePashto: 'لغات جوړونه',
    description: 'Expand your Pashto vocabulary with daily words and practical phrases.',
    link: '/vocabulary',
  },
  {
    icon: '🔄',
    title: 'Translator',
    titlePashto: 'ژباړن',
    description: 'Translate between Pashto and English using our dictionary-based tool.',
    link: '/translator',
  },
  {
    icon: '💬',
    title: 'Proverbs & Culture',
    titlePashto: 'متلونه او کلتور',
    description: 'Discover traditional Pashto proverbs and Afghan cultural wisdom.',
    link: '/proverbs',
  },
  {
    icon: '🗂️',
    title: 'Data Pipeline',
    titlePashto: 'د معلوماتو پایپ لاین',
    description: 'Browse collection workflows for scraping Pashto sites, books, and PDFs.',
    link: '/pipeline',
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
            <h1>
              Learn <span className="highlight">Pashto</span> Language
              <span className="hero-pashto pashto-text">پښتو ژبه زده کړئ</span>
            </h1>
            <p className="hero-subtitle">
              Discover the beauty of Pashto language and Afghan culture through
              AI-powered learning tools, interactive lessons, and cultural resources.
            </p>
            <div className="hero-actions">
              <Link to="/alphabet" className="btn btn-primary btn-lg">
                Start Learning
                <span className="pashto-text">زده کړه پیل کړئ</span>
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg">
                Learn More
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
              <p>Pashto - The language of the Pashtun people</p>
            </div>
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
            <h2>Explore Our Tools</h2>
            <p className="pashto-text">زموږ وسایل وپلټئ</p>
            <p>Everything you need to learn Pashto and explore Afghan culture</p>
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
                Pashto opens doors to understanding Afghan culture, poetry, and history.
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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Pashto Journey?</h2>
            <p className="pashto-text">خپل پښتو سفر پیلولو ته تیار یاست؟</p>
            <p>Begin with the alphabet and build your way to fluency</p>
            <Link to="/alphabet" className="btn btn-primary btn-lg">
              Start with the Alphabet
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
