import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Alphabet from './pages/Alphabet'
import Vocabulary from './pages/Vocabulary'
import Translator from './pages/Translator'
import Proverbs from './pages/Proverbs'
import About from './pages/About'
import DataPipeline from './pages/DataPipeline'
import Resources from './pages/Resources'
import ResourceCollectionPage from './pages/ResourceCollection'
import Moderation from './pages/Moderation'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="alphabet" element={<Alphabet />} />
        <Route path="vocabulary" element={<Vocabulary />} />
        <Route path="translator" element={<Translator />} />
        <Route path="proverbs" element={<Proverbs />} />
        <Route path="resources" element={<Resources />} />
        <Route path="resources/poetry" element={<ResourceCollectionPage collection="poetry" />} />
        <Route path="resources/books" element={<ResourceCollectionPage collection="books" />} />
        <Route path="resources/names" element={<ResourceCollectionPage collection="names" />} />
        <Route path="resources/media" element={<ResourceCollectionPage collection="media" />} />
        <Route path="resources/moderation" element={<Moderation />} />
        <Route path="pipeline" element={<DataPipeline />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
