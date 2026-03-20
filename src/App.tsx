import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Alphabet from './pages/Alphabet'
import Vocabulary from './pages/Vocabulary'
import Translator from './pages/Translator'
import Proverbs from './pages/Proverbs'
import About from './pages/About'
import DataPipeline from './pages/DataPipeline'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="alphabet" element={<Alphabet />} />
        <Route path="vocabulary" element={<Vocabulary />} />
        <Route path="translator" element={<Translator />} />
        <Route path="proverbs" element={<Proverbs />} />
        <Route path="pipeline" element={<DataPipeline />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
