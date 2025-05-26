import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, Calendar, Users } from 'lucide-react'

const Publications = () => {
  const publications = [
    {
      title: 'Machine Learning Approaches for Cardiovascular Flow Prediction',
      authors: 'H.C. Ozturk, J. Smith, M. Johnson',
      journal: 'Journal of Biomedical Engineering',
      year: '2024',
      type: 'Journal Article',
      doi: '10.1234/jbe.2024.001',
      abstract: 'This study presents novel machine learning approaches for predicting cardiovascular flow patterns using computational fluid dynamics data.',
      tags: ['Machine Learning', 'CFD', 'Cardiovascular']
    },
    {
      title: 'AI-Powered Surrogate Models for Real-time Medical Simulations',
      authors: 'H.C. Ozturk, A. Brown, K. Davis',
      journal: 'International Conference on Biomedical Engineering',
      year: '2023',
      type: 'Conference Paper',
      doi: '10.1234/icbe.2023.045',
      abstract: 'We develop AI-powered surrogate models that enable real-time medical simulations with high accuracy and reduced computational cost.',
      tags: ['AI', 'Surrogate Modeling', 'Real-time Simulation']
    },
    {
      title: 'Computational Analysis of Blood Flow in Stenotic Arteries',
      authors: 'H.C. Ozturk, L. Wilson, R. Taylor',
      journal: 'Computational Biology and Medicine',
      year: '2023',
      type: 'Journal Article',
      doi: '10.1234/cbm.2023.078',
      abstract: 'Comprehensive computational analysis of blood flow patterns in stenotic arteries using advanced CFD techniques.',
      tags: ['CFD', 'Blood Flow', 'Stenosis']
    },
    {
      title: 'Deep Learning for Medical Image Segmentation in Cardiovascular Applications',
      authors: 'H.C. Ozturk, S. Garcia, T. Lee',
      journal: 'IEEE Transactions on Medical Imaging',
      year: '2022',
      type: 'Journal Article',
      doi: '10.1234/tmi.2022.156',
      abstract: 'Novel deep learning architectures for accurate medical image segmentation in cardiovascular diagnostic applications.',
      tags: ['Deep Learning', 'Medical Imaging', 'Segmentation']
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Journal Article':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'Conference Paper':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'Preprint':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Publications
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            My research contributions in biomedical engineering, computational fluid dynamics, 
            and machine learning applications in healthcare.
          </p>
          
          <div className="space-y-8">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-blue-600 flex-shrink-0" size={24} />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(pub.type)}`}>
                      {pub.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={16} />
                    {pub.year}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {pub.title}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                  <Users size={16} />
                  <span className="text-sm">{pub.authors}</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 italic mb-3">
                  {pub.journal}
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {pub.abstract}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <motion.a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm font-medium">DOI: {pub.doi}</span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Research Collaboration
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Interested in collaborating on research or discussing any of these publications?
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Publications
