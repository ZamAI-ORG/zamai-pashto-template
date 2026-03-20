import './DataPipeline.css'

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

const codeExamples = [
  {
    title: 'Install dependencies',
    language: 'bash',
    code: `pip install scrapy requests beautifulsoup4 pypdf2 pdfplumber lxml datasets`,
  },
  {
    title: 'Scrapy spider for Pashto news sites',
    language: 'python',
    code: `import scrapy
from scrapy.linkextractors import LinkExtractor


class PashtoNewsSpider(scrapy.Spider):
    name = 'pashto_news'

    start_urls = [
        'https://www.bbc.com/ps',
        'https://www.voanews.com/ps',
        'https://pajhwok.com/',
    ]

    allowed_domains = [
        'bbc.com',
        'voanews.com',
        'pajhwok.com',
    ]

    def parse(self, response):
        for article_link in response.css('a::attr(href)').getall():
            if article_link and '/article/' in str(article_link):
                yield response.follow(article_link, self.parse_article)

        next_page = response.css('a.next::attr(href)').get()
        if next_page:
            yield response.follow(next_page, self.parse)

    def parse_article(self, response):
        yield {
            'title': response.css('h1::text').get(),
            'url': response.url,
            'content': ' '.join(response.css('article p::text').getall()),
            'date': response.css('time::attr(datetime)').get(),
        }`,
  },
  {
    title: 'Spider for PDF discovery and download',
    language: 'python',
    code: `import scrapy
from scrapy.pipelines.files import FilesPipeline


class PdfPipeline(FilesPipeline):
    def file_path(self, request, response=None, info=None):
        filename = request.url.split('/')[-1]
        return filename


class PashtoPDFSpider(scrapy.Spider):
    name = 'pashto_pdfs'

    start_urls = [
        'https://example-pashto-books-site.com/',
    ]

    custom_settings = {
        'ITEM_PIPELINES': {PdfPipeline: 100},
        'FILES_STORE': 'downloaded_pdfs',
    }

    def parse(self, response):
        pdf_links = response.css('a[href$=".pdf"]::attr(href)').getall()

        for pdf_url in pdf_links:
            yield {
                'file_urls': [response.urljoin(pdf_url)],
            }`,
  },
  {
    title: 'Extract text from downloaded PDFs',
    language: 'python',
    code: `import json
import os

import pdfplumber


def extract_text_from_pdfs(pdf_folder, output_file):
    extracted_data = []

    for filename in os.listdir(pdf_folder):
        if not filename.endswith('.pdf'):
            continue

        pdf_path = os.path.join(pdf_folder, filename)
        text_content = []

        try:
            with pdfplumber.open(pdf_path) as pdf:
                for page in pdf.pages:
                    text = page.extract_text()
                    if text:
                        text_content.append(text)

            extracted_data.append({
                'filename': filename,
                'text': '\n'.join(text_content),
                'word_count': len(' '.join(text_content).split()),
            })
            print(f'Extracted: {filename}')
        except Exception as error:
            print(f'Error extracting {filename}: {error}')

    with open(output_file, 'w', encoding='utf-8') as output_handle:
        json.dump(extracted_data, output_handle, ensure_ascii=False, indent=2)

    return extracted_data`,
  },
  {
    title: 'BeautifulSoup for simple book pages',
    language: 'python',
    code: `import json

import requests
from bs4 import BeautifulSoup


def scrape_pashto_books(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    }

    response = requests.get(url, headers=headers, timeout=30)
    response.raise_for_status()
    soup = BeautifulSoup(response.content, 'lxml')

    books = []

    for book in soup.select('.book-item'):
        title = book.select_one('.book-title').text.strip()
        author = book.select_one('.book-author').text.strip()
        content = book.select_one('.book-content').text.strip()

        books.append({
            'title': title,
            'author': author,
            'content': content,
            'url': book.select_one('a')['href'],
        })

    return books


books = scrape_pashto_books('https://example-pashto-site.com/books')

with open('pashto_books.json', 'w', encoding='utf-8') as output_handle:
    json.dump(books, output_handle, ensure_ascii=False, indent=2)`,
  },
  {
    title: 'Clean Pashto text and push to Hugging Face',
    language: 'python',
    code: `from datasets import Dataset
from nlpashto import Cleaner, Segmenter


def clean_pashto_text(text):
    cleaner = Cleaner()
    return cleaner.clean(
        text,
        remove_emojis=True,
        normalize_nums=True,
        remove_puncs=False,
        remove_special_chars=True,
    )


def segment_pashto_words(text):
    segmenter = Segmenter()
    return segmenter.segment(text)


dataset = Dataset.from_list([
    {
        'filename': 'sample.pdf',
        'text': clean_pashto_text('په ژوند کی علم او پوهه مهمه ده'),
    },
])

dataset.push_to_hub('your_username/pashto-dataset')`,
  },
]

function DataPipeline() {
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
            <h2>Reference Code</h2>
            <p className="pashto-text">نمونه کوډ</p>
            <p>Adapt selectors, domains, and storage paths for each target site before running a crawler at scale.</p>
          </div>

          <div className="code-example-list">
            {codeExamples.map((example) => (
              <article key={example.title} className="code-example card">
                <div className="code-example-header">
                  <h3>{example.title}</h3>
                  <span className="code-language">{example.language}</span>
                </div>
                <pre className="code-block">
                  <code>{example.code}</code>
                </pre>
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