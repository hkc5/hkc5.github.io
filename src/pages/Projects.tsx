import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink, Github, Code, Award, Zap } from 'lucide-react'
import projectsData from '../content/projects.json'

const Projects = () => {
  // Icon mapping for JSON data
  const iconMap = {
    Code: Code,
    Award: Award,
    Zap: Zap
  }

  // Map projects with proper icon components
  const projects = (projectsData as any).projects.map((project: any) => ({
    ...project,
    icon: iconMap[project.icon as keyof typeof iconMap]
  }))

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
          <h1 className="text-5xl font-bold text-gray-950 dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of research projects, production systems, and innovative solutions spanning AI, machine learning, and software engineering
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8">
          {projects.map((project: any, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-gray-100 dark:bg-gray-700 p-6 border-b dark:border-gray-600">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <project.icon size={32} className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-950 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                        <MapPin size={16} />
                        <span>{project.organization}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
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
                    <h4 className="text-lg font-semibold text-gray-950 dark:text-white mb-4">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {project.achievements.map((achievement: string, idx: number) => (
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
                      <h4 className="text-lg font-semibold text-gray-950 dark:text-white mb-4">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, idx: number) => (
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
                        <h4 className="text-lg font-semibold text-gray-950 dark:text-white mb-4">
                          Links
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {project.links.map((link: any, idx: number) => (
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