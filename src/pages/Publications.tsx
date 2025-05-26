import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, Calendar, Users } from 'lucide-react'

const Publications = () => {
  const publications = [
    {
      title: 'Microrobotic Locomotion in Blood Vessels: A Computational Study on the Performance of Surface Microrollers in the Cardiovascular System',
      authors: 'Ugur Bozuyuk, Hakancan Ozturk, Metin Sitti',
      journal: 'Advanced Intelligent Systems',
      year: '2023',
      type: 'Journal Article',
      doi: 'https://doi.org/10.1002/aisy.202300099',
      abstract: 'Magnetic surface microrollers possess a significant potential for controlled navigation in blood vessels owing to their strong locomotion capability and minimized flow velocities at the vessel walls to revolutionize localized drug/gene delivery. However, the circulatory system consists of many vessels significantly different from each other in terms of dimensions and flow speeds. There are different flow regimes (i.e., laminar or turbulent), types (pulsatile or continuous), and dimensions (cell-sized or macroscopic), which render different fluidic effects in blood vessels. Overall, understanding the navigation capability of surface microrollers in various types of vessels is crucial for the practical implementation of the system for future biomedical applications. Here, we investigated the upstream locomotion potential of surface microrollers inside different blood vessels with computational fluid dynamics (CFD) analyses. We studied all vessel types in the systemic circulation except the aorta and vena cava. The microrollers demonstrate successful upstream locomotion ability in veins and partially in arteries but fail to perform in smaller blood vessels due to significant confinement and flow effects. Overall, the results presented here establish a preliminary result for the future in vivo use of surface microrollers.',
      tags: ['Microrobotics', 'CFD', 'Biomedical Engineering', 'Drug Delivery']
    },
    {
      title: 'The Mismatch Between Experimental and Computational Fluid Dynamics Analyses for Magnetic Surface Microrollers',
      authors: 'Ugur Bozuyuk, Hakancan Ozturk, Metin Sitti',
      journal: 'Scientific Reports',
      year: '2023',
      type: 'Journal Article',
      doi: 'https://doi.org/10.1038/s41598-023-37332-5',
      abstract: 'Magnetically actuated Janus surface microrollers show promise for biomedical applications, such as cargo delivery in blood flow. Theories about their locomotion are based on models of a "rotating sphere on a nearby wall." However, significant mismatches have been found between computational fluid dynamics (CFD) simulations and experimental results for microrollers of different sizes. This study highlights an unaccounted-for force in the direction of lift, particularly for smaller microrollers, which is not included in CFD simulations. Understanding these dynamics is crucial for improving practical applications in biomedical engineering.',
      tags: ['Microrobotics', 'CFD', 'Experimental Validation', 'Surface Microrollers']
    },
    {
      title: 'AI Surrogate Modeling for Turbulent Flow Simulations: A Grid-Invariant Approach',
      authors: 'Hakancan Ozturk',
      journal: 'Imperial College London - MSc Dissertation',
      year: '2024',
      type: 'Thesis',
      doi: 'In Preparation',
      abstract: 'This dissertation presents a novel Grid-Invariant AI architecture combining convolutional autoencoders and adversarial networks to simulate high-fidelity turbulent flows. The approach achieves unprecedented grid independence and scalability, with 35% improvement in long-term stability and 50% increase in prediction accuracy. Over 1000 GPU hours of High-Performance Computing were utilized for model optimization, leading to significant advances in AI-driven fluid dynamics modeling.',
      tags: ['AI', 'Turbulent Flow', 'Grid-Invariant Networks', 'High-Performance Computing']
    },
    {
      title: 'Advanced Collagen Fiber Orientation Analysis Using Machine Learning and Generative Models',
      authors: 'Hakancan Ozturk, Kerem Pekkan',
      journal: 'In Preparation',
      year: '2024',
      type: 'Conference Paper',
      doi: 'In Preparation',
      abstract: 'This study presents advanced bio-imaging analysis techniques using Fast Fourier Transform (FFT), Support Vector Regression (SVR), and Convolutional Neural Networks (CNNs) to achieve 95% accuracy in collagen fiber orientation prediction. The research introduces a novel method leveraging Generative Diffusion Models in PyTorch for biological data augmentation, increasing dataset size by 10x while preserving accuracy.',
      tags: ['Machine Learning', 'Biomedical Imaging', 'Generative Models', 'Data Augmentation']
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Journal Article':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'Conference Paper':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'Thesis':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
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
