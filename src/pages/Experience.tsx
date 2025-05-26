import { motion } from 'framer-motion'
import { Calendar, MapPin, Code, Building, Microscope, GraduationCap } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Software Development Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      period: 'January 2025 - Present',
      type: 'Full-time',
      status: 'current',
      description: 'Working on Prime Video infrastructure and user interface optimization.',
      responsibilities: [
        'Migrating Prime Video UI elements from React to SolidJS to enhance performance',
        'Leveraging LLM-powered automation pipelines for efficient component refactoring',
        'Developing features for Prime Video Client Software Development Kit (SDK)',
        'Collaborating with cross-functional teams on scalable video streaming solutions'
      ],
      technologies: ['SolidJS', 'React', 'TypeScript', 'AWS', 'LLM automation'],
      icon: Code,
      achievements: ['Leading UI migration project', 'Implementing LLM automation', 'SDK development']
    },
    {
      id: 2,
      title: 'Machine Learning Engineer',
      company: 'Albus Technologies',
      location: 'Remote',
      period: 'May 2024 - January 2025',
      type: 'Full-time',
      status: 'completed',
      description: 'Led development of advanced AI systems focusing on Retrieval-Augmented Generation and document processing pipelines.',
      responsibilities: [
        'Designed a Retrieval-Augmented Generation (RAG) framework with context-enriched vector search',
        'Developed scalable real-time Document Semantic Extraction pipelines using AWS',
        'Established automated CI/CD workflows for FastAPI and Lambda endpoints',
        'Built production-ready ML systems serving thousands of daily queries'
      ],
      technologies: ['Python', 'FastAPI', 'AWS Lambda', 'Vector Databases', 'PyTorch', 'Docker'],
      icon: Code,
      achievements: ['RAG framework design', 'Thousands of daily queries', 'Production ML systems']
    },
    {
      id: 3,
      title: 'Production Engineer',
      company: 'SU-TAS Mining Corporation',
      location: 'Turkey',
      period: 'February 2023 - August 2023',
      type: 'Full-time',
      status: 'completed',
      description: 'Optimized quarry operations through data-driven approaches and operational excellence.',
      responsibilities: [
        'Led quarry operations, reducing explosive costs by 20% through optimized placement algorithms',
        'Improved resource allocation and safety protocols in daily mining operations',
        'Implemented data analysis systems for operational efficiency tracking',
        'Coordinated cross-functional teams for project execution'
      ],
      technologies: ['MATLAB', 'Excel', 'Operations Research', 'Data Analysis'],
      icon: Building,
      achievements: ['20% cost reduction', 'Safety protocol improvements', 'Team coordination']
    },
    {
      id: 4,
      title: 'Computing Researcher',
      company: 'Max Planck Institute for Intelligent Systems',
      location: 'Stuttgart, Germany',
      period: 'June 2022 - December 2022',
      type: 'Research',
      status: 'completed',
      description: 'Conducted cutting-edge research in computational fluid dynamics for biomedical micro-robotics applications.',
      responsibilities: [
        'Conducted computational fluid dynamics (CFD) simulations for biomedical micro-robots',
        'Achieved 200x efficiency gains through optimized COMSOL simulations in HPC environments',
        'Deployed advanced data processing pipelines using curve fits and support vector machines',
        'Published research findings in top-tier scientific journals',
        'Collaborated with international research teams on microrobotics projects'
      ],
      technologies: ['COMSOL Multiphysics', 'MATLAB', 'Python', 'High-Performance Computing', 'CFD'],
      icon: Microscope,
      achievements: ['200x efficiency gains', 'Top-tier publications', 'International collaboration']
    },
    {
      id: 5,
      title: 'Teaching Assistant',
      company: 'Koç University',
      location: 'Istanbul, Turkey',
      period: '2020 - 2023',
      type: 'Part-time',
      status: 'completed',
      description: 'Supported undergraduate engineering education while completing bachelor\'s degree.',
      responsibilities: [
        'Conducted lab sessions and tutorials for 50+ students per semester',
        'Developed course materials and problem sets',
        'Provided academic support and mentoring to undergraduate students',
        'Assisted in curriculum development and assessment'
      ],
      technologies: ['MATLAB', 'Python', 'Excel', 'Educational Technology'],
      icon: GraduationCap,
      achievements: ['50+ students mentored', 'Curriculum development', 'Academic excellence']
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'Part-time':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'Research':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-500'
      case 'completed':
        return 'bg-gray-400'
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
            Professional Experience
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Journey through software engineering, machine learning, research, and education with consistently outstanding performance
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 w-4 h-4 ${getStatusColor(exp.status)} rounded-full border-4 border-white dark:border-gray-900 z-10`}></div>
                
                {/* Content card */}
                <div className="ml-20">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 border-b dark:border-gray-600">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <exp.icon size={32} className="text-blue-600 dark:text-blue-400" />
                          <div>
                            <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{exp.title}</h3>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{exp.company}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <MapPin size={14} />
                                {exp.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {exp.period}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(exp.type)}`}>
                            {exp.type}
                          </span>
                          {exp.status === 'current' && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                        {exp.description}
                      </p>

                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Responsibilities */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Key Responsibilities
                          </h4>
                          <ul className="space-y-2">
                            {exp.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Achievements & Technologies */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                              Key Achievements
                            </h4>
                            <div className="space-y-2">
                              {exp.achievements.map((achievement, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2"
                                >
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                              Technologies
                            </h4>
                            <div className="space-y-2">
                              {exp.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Research Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Research Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">MSc Dissertation - AI Surrogate Modeling</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Imperial College London | 2024</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Novel Grid-Invariant AI architecture</li>
                <li>• 1000+ GPU hours of optimization</li>
                <li>• 35% improvement in stability</li>
                <li>• 50% increase in accuracy</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Collagen Fiber Analysis Project</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Pekkan Biofluid Mechanics Laboratory | 2023-2024</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• 95% accuracy in fiber orientation prediction</li>
                <li>• Generative Diffusion Models implementation</li>
                <li>• 10x dataset size increase</li>
                <li>• Novel ML techniques for biological data</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Experience