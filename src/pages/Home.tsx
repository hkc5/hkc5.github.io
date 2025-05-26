import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16"
          >
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="w-48 h-60 lg:w-56 lg:h-72 relative">
                <img
                  src="/profile.png"
                  alt="Hakancan Ozturk"
                  className="w-full h-full rounded-lg object-cover shadow-lg"
                />
                <div className="absolute inset-0 rounded-lg ring-4 ring-blue-500/20 ring-offset-4 ring-offset-white dark:ring-offset-gray-900"></div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hakancan Ozturk
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                Software Development Engineer at Amazon
              </p>
              
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl lg:max-w-none">
                Machine learning engineer with expertise in Retrieval-Augmented Generation (RAG), 
                computational fluid dynamics (CFD), and generative AI. Currently working on Prime Video 
                infrastructure and UI optimization at Amazon.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Get In Touch
              </motion.a>
              
              <motion.a
                href="/resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Download size={20} />
                Download CV
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-6">
              <motion.a
                href="https://github.com/hkc5"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/hakancan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:hakancan.ozturk23@gmail.com"
                whileHover={{ scale: 1.1 }}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Mail size={24} />
              </motion.a>
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex justify-center pb-8"
      >
        <ArrowDown className="text-gray-400 dark:text-gray-500" size={24} />
      </motion.div>
    </div>
  )
}

export default Home
