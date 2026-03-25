# ZamAI Pashto Template

A starter template for Pashto language projects under ZamAI Labs.

- Website: https://zamai.dev
- Labs: https://github.com/ZamAI-ORG


# ZamAI Pashto Template

A starter template for Pashto language projects under ZamAI Labs.

- Website: https://zamai.dev
- Labs: https://github.com/ZamAI-ORG


# ZamAI Pashto Template

A starter template for Pashto language projects under ZamAI Labs.

- Website: https://zamai.dev
- Labs: https://github.com/ZamAI-ORG


# ZamAI Pashto 🇦🇫

## Learn Pashto Language & Explore Afghan Culture

پښتو ژبه زده کړئ او افغان کلتور وپلټئ

[![Open Source](https://img.shields.io/badge/Open%20Source-Yes-green)](https://github.com/ZamAI-Pashto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

---

## 🌟 About

ZamAI Pashto is a comprehensive language learning and cultural preservation platform for the Pashto language. Our mission is to make Pashto accessible to learners worldwide while preserving Afghan cultural heritage through technology.

## ✨ Features

### 📝 Pashto Alphabet (الفبا)

- Complete 44-letter Pashto alphabet
- Interactive letter cards with pronunciation guides
- Example words for each letter
- Searchable alphabet reference

### 📚 Vocabulary Builder (لغات جوړونه)

- 60+ essential Pashto words
- Categorized vocabulary (Family, Numbers, Colors, Body, Food, Nature, Verbs, Places)
- Daily word feature
- Progress tracking
- Search and filter functionality

### 🔄 AI Translator (ژباړن)

- Pashto-English and English-Pashto translation
- Common phrases reference
- Dictionary-based translation for learning
- Easy-to-use interface

### 💬 Proverbs & Culture (متلونه)

- Traditional Pashto proverbs with meanings
- Transliteration for pronunciation
- Cultural context explanations
- Category-based browsing
- Information about Landay poetry

### 🗂️ Data Pipeline (د معلوماتو پایپ لاین)

- Reference workflows for scraping Pashto news sites
- PDF discovery and download patterns for book collections
- Text extraction, cleaning, and Hugging Face dataset publishing examples
- Source guidance for BBC Pashto, VOA Pashto, Pajhwok, and similar corpora

### 🏛️ Community Library & Moderation

- Backend-backed community submissions stored outside the browser
- Editor-only moderation with JWT authentication
- Dedicated searchable collection pages for poetry, books, names, and diaspora media
- Import and export of approved entries into a versionable JSON file inside the repository

### 📖 About ZamAI (درباره)

- Project mission and goals
- Technical projects overview
- Information about Pashto language
- Contribution guidelines

## 🚀 Getting Started

Maintainer onboarding:

- Repository-level maintainer guide: [MAINTAINER_README.md](./MAINTAINER_README.md)
- In-app operational documentation: `/docs`

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tasal9/ZamAI_Pashto.git

# Navigate to the project directory
cd ZamAI_Pashto

# Install dependencies
npm install

# Create backend environment settings
cp .env.example .env

# Generate a password hash for the editor account
npm run hash:editor -- "replace-with-a-strong-password"

# Start the backend API in one terminal
npm run dev:api

# Start the frontend in a second terminal
npm run dev
```

The application will be available at `http://localhost:3000`

Paste the generated hash into `EDITOR_PASSWORD_HASH` inside `.env`, then clear any `EDITOR_PASSWORD` value.

### Build for Production

```bash
npm run build
```

### Maintainer Reference

If you are operating the moderation flow, export pipeline, or backend API locally, start with [MAINTAINER_README.md](./MAINTAINER_README.md). It mirrors the in-app docs page and includes endpoint examples, versioned export flow, and the main maintainer file map.

### Testing Follow-up

This project does not yet include a frontend test runner. When one is added, start with a small interaction test for the pipeline page that verifies asset metadata renders and that the copy-command button transitions between its default and copied or failed states.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Backend API:** Node.js + Express
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v7
- **Authentication:** JWT-based editor login
- **Persistence:** JSON-backed API storage with import/export
- **Styling:** CSS with CSS Variables
- **Fonts:** Noto Naskh Arabic (Pashto), Inter (English)

## 📁 Project Structure

```text
ZamAI_Pashto/
├── data/
│   ├── community-library.json
│   └── community-submissions.json
├── public/
│   └── favicon.svg
├── server/
│   ├── auth.js
│   ├── dataStore.js
│   └── index.js
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── Layout.css
│   ├── pages/
│   │   ├── Home.tsx / Home.css
│   │   ├── Alphabet.tsx / Alphabet.css
│   │   ├── Vocabulary.tsx / Vocabulary.css
│   │   ├── Translator.tsx / Translator.css
│   │   ├── Proverbs.tsx / Proverbs.css
│   │   ├── DataPipeline.tsx / DataPipeline.css
│   │   └── About.tsx / About.css
│   ├── styles/
│   │   └── global.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🤝 Contributing

We welcome contributions from everyone! Here are ways you can help:

- **Code:** Improve existing features or add new ones
- **Content:** Add more vocabulary, proverbs, or translations
- **Review:** Verify accuracy of Pashto content
- **Documentation:** Improve documentation and guides
- **Spread:** Share ZamAI with others interested in Pashto

## 🔗 Related Projects

- [ZamAI-LLama3-Pashto](https://huggingface.co/tasal9/ZamAI-LIama3-Pashto) - Pashto language model
- [ZamAI-Translator](https://huggingface.co/tasal9/ZamAI-Pashto-Translator-FacebookNLB-ps-en) - Translation model
- [ZamAI-Pashto-Data-Pipeline](https://github.com/ZamAI-Pashto/ZamAI-Pashto-Data-Processing-Pipeline) - Data processing

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Pashto-speaking community for cultural guidance
- Contributors and supporters of the ZamAI project
- Open-source NLP community

---

## ژبه د ولس هویت دی

Language is the identity of a nation.

Made with ❤️ for the Pashto language
