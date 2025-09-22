import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import WanderingDuck from './WanderingDuck'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for saved preference or use system preference
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark' || 
           (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })
  const location = useLocation()

  // Apply dark class to HTML element on component mount and when isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    // Save to localStorage
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
  }

  const navigation = [
    { name: 'About', path: '/about' },
    { name: 'Education', path: '/education' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Publications', path: '/publications' },
    { name: 'Awards', path: '/awards' },
    { name: 'Media', path: '/media' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/5 dark:bg-gray-900/5 backdrop-blur-2xl rounded-full shadow-2xl border border-white/30 dark:border-gray-500/20 px-8 py-3 relative before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:pointer-events-none after:absolute after:inset-[1px] after:rounded-full after:bg-gradient-to-t after:from-transparent after:to-white/10 after:pointer-events-none">
        <div className="flex items-center justify-between gap-12 min-w-max">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
              Hakancan Ozturk
            </Link>
          </div>          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    location.pathname === item.path
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ml-4 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Medium screens navigation (simplified) */}
          <div className="hidden md:flex lg:hidden items-center">
            <div className="flex items-center space-x-2">
              {navigation.slice(0, 3).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    location.pathname === item.path
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu size={16} />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (small screens) */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl border border-white/30 dark:border-gray-500/20 shadow-2xl"
        >
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Medium Navigation Dropdown (tablet screens) */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="hidden md:block lg:hidden overflow-hidden absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl border border-white/30 dark:border-gray-500/20 shadow-2xl"
        >
          <div className="px-4 py-3 space-y-1">
            {navigation.slice(4).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
        
        {/* Wandering Duck */}
        <WanderingDuck 
          containerBounds={{ width: 500, height: 64 }}
          speed={25}
        />
      </div>
    </nav>
  )
}

export default Navbar
