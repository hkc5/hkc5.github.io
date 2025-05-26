import { motion } from 'framer-motion'
import { Github, ExternalLink, Calendar } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'AI Surrogate Modeling',
      description: 'Machine learning models for accelerating computational fluid dynamics simulations in cardiovascular applications.',
      tech: ['Python', 'TensorFlow', 'CFD', 'Neural Networks'],
      github: 'https://github.com/hkc5/ai-surrogate',
      demo: 'https://example.com/demo',
      date: '2024'
    },
    {
      title: 'Collagen Fiber Analysis',
      description: 'Computer vision and image processing tools for analyzing collagen fiber structures in biomedical imaging.',
      tech: ['Python', 'OpenCV', 'Image Processing', 'Machine Learning'],
      github: 'https://github.com/hkc5/collagen-analysis',
      demo: 'https://example.com/demo',
      date: '2023'
    },
    {
      title: 'Cardiovascular Flow Simulator',
      description: 'Real-time cardiovascular flow simulation tool with interactive visualization and parameter adjustment.',
      tech: ['MATLAB', 'CFD', 'Visualization', 'Simulation'],
      github: 'https://github.com/hkc5/cv-simulator',
      demo: 'https://example.com/demo',
      date: '2023'
    },
    {
      title: 'Medical Data Dashboard',
      description: 'Interactive dashboard for visualizing and analyzing medical research data with modern web technologies.',
      tech: ['React', 'TypeScript', 'D3.js', 'Node.js'],
      github: 'https://github.com/hkc5/medical-dashboard',
      demo: 'https://example.com/demo',
      date: '2024'
    }
  ]

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Projects
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
            Here are some of my key research projects and developments in biomedical engineering, 
            computational fluid dynamics, and machine learning applications.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={16} />
                      {project.date}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </motion.a>
                    
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Demo</span>
                    </motion.a>
                  </div>
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
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Interested in collaborating or learning more about any of these projects?
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects
