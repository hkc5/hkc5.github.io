import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'

const FLUID_ROUTES = ['/fluid']

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Education = lazy(() => import('./pages/Education'))
const Experience = lazy(() => import('./pages/Experience'))
const Projects = lazy(() => import('./pages/Projects'))
const Publications = lazy(() => import('./pages/Publications'))
const Awards = lazy(() => import('./pages/Awards'))
const Media = lazy(() => import('./pages/Media'))
const Fluid = lazy(() => import('./pages/Fluid'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppContent() {
  const { pathname } = useLocation()
  const hideNavbar = FLUID_ROUTES.includes(pathname)

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20 bg-transparent"
      >
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/media" element={<Media />} />
            <Route path="/fluid" element={<Fluid />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
