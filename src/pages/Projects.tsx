import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink, Github, Code, Award, Zap } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'AI Surrogate Modeling for Turbulent Flow Simulations',
      type: 'MSc Dissertation',
      organization: 'Imperial College London',
      period: '2024',
      description: 'Discovered a novel Grid-Invariant AI architecture combining convolutional autoencoders and adversarial networks to simulate high-fidelity turbulent flows, achieving unprecedented grid independence and scalability.',
      achievements: [
        'Novel Grid-Invariant AI architecture',
        '35% enhanced long-term stability',
        '50% improved prediction accuracy',
        '1000+ GPU hours of HPC optimization'
      ],
      technologies: ['Python', 'PyTorch', 'COMSOL Multiphysics', 'High-Performance Computing', 'Neural Networks'],
      icon: Zap,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Advanced Collagen Fiber Orientation Analysis',
      type: 'Research Project',
      organization: 'Pekkan Biofluid Mechanics Laboratory',
      period: '2023-2024',
      description: 'Led advanced bio-imaging analysis using sophisticated machine learning techniques to predict collagen fiber orientation with high precision and innovative data augmentation methods.',
      achievements: [
        '95% accuracy in fiber orientation prediction',
        'Implemented Generative Diffusion Models',
        '10x dataset size increase',
        'Advanced bio-imaging analysis with FFT and SVR'
      ],
      technologies: ['Python', 'PyTorch', 'Computer Vision', 'FFT', 'SVR', 'CNNs', 'Generative Diffusion Models'],
      icon: Award,
      status: 'completed'
    },
    {
      id: 3,
      title: 'RAG Framework Development',
      type: 'Production System',
      organization: 'Albus Technologies',
      period: '2024-2025',
      description: 'Designed and implemented a production-ready Retrieval-Augmented Generation framework with context-enriched vector search capabilities for enterprise document processing.',
      achievements: [
        'Context-enriched vector search',
        'Real-time Document Semantic Extraction',
        'Automated CI/CD workflows',
        'Thousands of daily queries served'
      ],
      technologies: ['Python', 'FastAPI', 'AWS Lambda', 'Vector Databases', 'Docker', 'CI/CD'],
      icon: Code,
      status: 'completed'
    },
    {
      id: 4,
      title: 'Microrobotic Locomotion in Blood Vessels',
      type: 'Research Project',
      organization: 'Max Planck Institute for Intelligent Systems',
      period: '2022',
      description: 'Conducted computational fluid dynamics simulations for biomedical micro-robots, focusing on magnetic surface microrollers in cardiovascular applications.',
      achievements: [
        '200x efficiency gains in CFD simulations',
        'Published in Advanced Intelligent Systems',
        'Published in Scientific Reports',
        'HPC-optimized COMSOL simulations'
      ],
      technologies: ['COMSOL Multiphysics', 'MATLAB', 'High-Performance Computing', 'CFD Analysis'],
      icon: Award,
      status: 'completed',
      links: [
        { type: 'publication', url: 'https://doi.org/10.1002/aisy.202300099', label: 'Advanced Intelligent Systems' },
        { type: 'publication', url: 'https://doi.org/10.1038/s41598-023-37332-5', label: 'Scientific Reports' }
      ]
    },
    {
      id: 5,
      title: 'Modern React Portfolio Website',
      type: 'Personal Project',
      organization: 'Personal Project',
      period: '2024',
      description: 'This website! Transformed from a Hugo-based static site to a modern React application with TypeScript, featuring responsive design, dark mode, and markdown-based content management.',
      achievements: [
        'Modern tech stack implementation',
        'Responsive design with mobile-first approach',
        'Dark/light mode toggle',
        'Automated GitHub Pages deployment'
      ],
      technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router'],
      icon: Code,
      status: 'completed',
      links: [
        { type: 'github', url: 'https://github.com/hkc5/hkc5.github.io', label: 'View on GitHub' },
        { type: 'live', url: 'https://hkc5.github.io', label: 'Live Site' }
      ]
    },
    {
      id: 6,
      title: 'Prime Video UI Migration',
      type: 'Production System',
      organization: 'Amazon',
      period: '2025',
      description: 'Leading the migration of Prime Video UI elements from React to SolidJS to enhance performance, utilizing LLM-powered automation for efficient component refactoring.',
      achievements: [
        'Performance optimization through SolidJS',
        'LLM-powered automation pipelines',
        'SDK development for Prime Video',
        'Cross-platform compatibility'
      ],
      technologies: ['SolidJS', 'React', 'TypeScript', 'LLM Automation', 'AWS Infrastructure'],
      icon: Zap,
      status: 'current'
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'MSc Dissertation':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
      case 'Research Project':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'Production System':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'Personal Project':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-500'
      case 'completed':
        return 'bg-blue-500'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of research projects, production systems, and innovative solutions spanning AI, machine learning, and software engineering
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-gray-50 dark:bg-gray-700 p-6 border-b dark:border-gray-600">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <project.icon size={32} className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                        <MapPin size={16} />
                        <span>{project.organization}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Calendar size={16} />
                        <span>{project.period}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(project.type)}`}>
                      {project.type}
                    </span>
                    <div className={`w-3 h-3 ${getStatusColor(project.status)} rounded-full`}></div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {project.description}
                </p>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Achievements */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {project.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-500 flex-shrink-0 mt-1">✓</span>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies & Links */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    {project.links && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Links
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {project.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                            >
                              {link.type === 'github' && <Github size={16} />}
                              {link.type === 'live' && <ExternalLink size={16} />}
                              {link.type === 'publication' && <ExternalLink size={16} />}
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects