import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, Calendar, Users, TrendingUp, Award, Zap } from 'lucide-react'

const Publications = () => {
  const publications = [
    {
      id: 1,
      title: 'Learning-enhanced 3D fiber orientation mapping in thick cardiac tissues',
      authors: 'E. Saruhan, H. Ozturk, D. Kul, B. Sevgin, M.N. Coban, K. Pekkan',
      journal: 'Optica Open',
      year: '2025',
      type: 'Journal Article',
      status: 'Published',
      citations: 0,
      doi: 'https://opg.optica.org/opticaopen',
      tags: ['Machine Learning', 'Biomedical Imaging', '3D Mapping', 'Cardiac Tissue'],
      impact: 'High',
      description: 'Advanced computational methods for analyzing fiber orientation in cardiac tissues using machine learning techniques.'
    },
    {
      id: 2,
      title: 'Anisotropic Surface Microrollers for Endovascular Navigation: A Computational Analysis with a Case Study in Hepatic Perfusion',
      authors: 'B. Arslan, U. Bozuyuk, K. Gorgulu, E. Yildiz, H. Ozturk, L. Liotta, V. Heinemann, et al.',
      journal: 'Advanced Theory and Simulations',
      year: '2025',
      type: 'Journal Article',
      status: 'Published',
      citations: 0,
      doi: '10.1002/adts.202400387',
      tags: ['Microrobotics', 'CFD', 'Medical Devices', 'Drug Delivery'],
      impact: 'High',
      description: 'Computational analysis of surface microrollers for targeted endovascular navigation with hepatic perfusion case study.'
    },
    {
      id: 3,
      title: 'Microrobotic locomotion in blood vessels: a computational study on the performance of surface microrollers in the cardiovascular system',
      authors: 'U. Bozuyuk, H. Ozturk, M. Sitti',
      journal: 'Advanced Intelligent Systems',
      year: '2023',
      type: 'Journal Article',
      status: 'Published',
      citations: 13,
      doi: 'https://doi.org/10.1002/aisy.202300099',
      tags: ['Microrobotics', 'CFD', 'Biomedical Engineering', 'Drug Delivery'],
      impact: 'High',
      description: 'Comprehensive CFD analysis of magnetic surface microrollers navigation in various blood vessel types for biomedical applications.'
    },
    {
      id: 4,
      title: 'The mismatch between experimental and computational fluid dynamics analyses for magnetic surface microrollers',
      authors: 'U. Bozuyuk, H. Ozturk, M. Sitti',
      journal: 'Scientific Reports',
      year: '2023',
      type: 'Journal Article',
      status: 'Published',
      citations: 8,
      doi: 'https://doi.org/10.1038/s41598-023-37179-4',
      tags: ['Microrobotics', 'CFD', 'Experimental Validation', 'Surface Microrollers'],
      impact: 'Medium',
      description: 'Investigation of discrepancies between computational simulations and experimental results for magnetic microroller dynamics.'
    }
  ]

  const metrics = {
    totalCitations: 21,
    hIndex: 2,
    i10Index: 1,
    publications: 4
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Journal Article':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'Conference Paper':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'Thesis':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'text-red-600 dark:text-red-400'
      case 'Medium':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'Low':
        return 'text-green-600 dark:text-green-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Publications
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Research contributions in computational fluid dynamics, microrobotics, and machine learning applications in biomedical engineering
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Citations</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalCitations}</p>
              </div>
              <TrendingUp className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">h-index</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.hIndex}</p>
              </div>
              <Award className="text-green-500" size={24} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">i10-index</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.i10Index}</p>
              </div>
              <Zap className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Publications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.publications}</p>
              </div>
              <BookOpen className="text-purple-500" size={24} />
            </div>
          </div>
        </motion.div>

        {/* Publications Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8"
        >
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <BookOpen className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={24} />
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(pub.type)}`}>
                          {pub.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(pub.impact)} bg-gray-100 dark:bg-gray-700`}>
                          {pub.impact} Impact
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={16} />
                      {pub.year}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {pub.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                    <Users size={16} />
                    <span className="text-sm">{pub.authors}</span>
                  </div>
                  
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {pub.journal}
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {pub.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="lg:w-48 flex flex-col gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Citations</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{pub.citations}</p>
                  </div>
                  
                  <motion.a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink size={16} />
                    View Paper
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Current Research Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Current Research</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">PhD Thesis - Imperial College London</h3>
              <p className="text-blue-100 mb-4">Advanced Computational Methods for Biomedical Applications</p>
              <ul className="space-y-2 text-blue-100">
                <li>• Retrieval-Augmented Generation (RAG) systems for biomedical knowledge</li>
                <li>• Machine learning applications in computational fluid dynamics</li>
                <li>• AI-driven optimization of cardiovascular simulations</li>
                <li>• High-performance computing for biomedical modeling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Research Impact</h3>
              <p className="text-blue-100 mb-4">Collaborations with leading institutions worldwide</p>
              <ul className="space-y-2 text-blue-100">
                <li>• Max Planck Institute for Intelligent Systems</li>
                <li>• Koç University Biomedical Engineering</li>
                <li>• Imperial College London Applied Computational Science</li>
                <li>• Growing citation impact in microrobotics field</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Publications
