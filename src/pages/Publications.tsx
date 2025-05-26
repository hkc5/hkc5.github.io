import { motion } from 'framer-motion'
import { ExternalLink, Calendar, Users } from 'lucide-react'

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-950 dark:text-white mb-4">
            Publications
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Research contributions in computational fluid dynamics, microrobotics, and machine learning applications in biomedical engineering
          </p>
        </motion.div>

        {/* Metrics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-950 dark:text-white mb-1">{metrics.totalCitations}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Citations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-950 dark:text-white mb-1">{metrics.hIndex}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">h-index</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-950 dark:text-white mb-1">{metrics.i10Index}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">i10-index</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-950 dark:text-white mb-1">{metrics.publications}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Publications</p>
            </div>
          </div>
        </motion.div>

        {/* Publications List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(pub.type)}`}>
                        {pub.type}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Calendar size={14} />
                        {pub.year}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-950 dark:text-white mb-2">
                    {pub.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <Users size={14} />
                    <span className="text-sm">{pub.authors}</span>
                  </div>
                  
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {pub.journal}
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {pub.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="lg:w-32 flex flex-col gap-3">
                  {pub.citations > 0 && (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{pub.citations}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Citations</p>
                    </div>
                  )}
                  
                  <motion.a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={14} />
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
          className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8"
        >
          <h2 className="text-3xl font-bold text-gray-950 dark:text-white mb-6">Current Research</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-950 dark:text-white mb-3">PhD Thesis - Imperial College London</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Advanced Computational Methods for Biomedical Applications</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Retrieval-Augmented Generation (RAG) systems for biomedical knowledge</li>
                <li>• Machine learning applications in computational fluid dynamics</li>
                <li>• AI-driven optimization of cardiovascular simulations</li>
                <li>• High-performance computing for biomedical modeling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-950 dark:text-white mb-3">Research Impact</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Collaborations with leading institutions worldwide</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
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
