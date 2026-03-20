# Data Pipeline Scripts

Runnable reference scripts extracted from the pipeline page live in `scripts/pipeline/`.

## Files

- `news_spider.py`: Crawl Pashto news article pages with Scrapy.
- `pdf_spider.py`: Discover and download PDF files with Scrapy's `FilesPipeline`.
- `extract_pdf_text.py`: Convert a folder of PDFs into structured JSON with `pdfplumber`.
- `scrape_pashto_books.py`: Scrape simple book listing pages with `requests` and `BeautifulSoup`.

## Quick Start

Install the Python packages you need for the specific script you want to run:

```bash
pip install scrapy requests beautifulsoup4 pdfplumber lxml
```

Examples:

```bash
python scripts/pipeline/news_spider.py --output data/pashto_news.json
python scripts/pipeline/pdf_spider.py --start-url https://example-pashto-books-site.com/ --output-dir data/downloaded_pdfs
python scripts/pipeline/extract_pdf_text.py data/downloaded_pdfs data/pashto_books.json
python scripts/pipeline/scrape_pashto_books.py https://example-pashto-site.com/books --output data/books.json
```

Adapt domains, CSS selectors, and allowed URLs for each source before running against a real site.
