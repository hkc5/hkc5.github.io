import { motion } from 'framer-motion'
import { Calendar, MapPin, Code, Building, Microscope, GraduationCap } from 'lucide-react'
import experienceData from '../content/experience.json'

const Experience = () => {
  // Icon mapping for JSON data
  const iconMap = {
    Code: Code,
    Building: Building,
    Microscope: Microscope,
    GraduationCap: GraduationCap
  }

  // Map experiences with proper icon components
  const experiences = (experienceData as any).experiences.map((exp: any) => ({
    ...exp,
    icon: iconMap[exp.icon as keyof typeof iconMap]
  }))

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
            Professional Experience
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Journey through software engineering, machine learning, research, and education with consistently outstanding performance
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp: any, index: number) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-gray-100 dark:bg-gray-700 p-6 border-b dark:border-gray-600">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <exp.icon size={32} className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-950 dark:text-white">{exp.title}</h3>
                      <p className="text-lg font-medium text-gray-800 dark:text-gray-300">{exp.company}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-700 dark:text-gray-400">
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
                      {exp.responsibilities.map((resp: string, idx: number) => (
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
                      <h4 className="text-lg font-semibold text-gray-950 dark:text-white mb-4">
                        Key Achievements
                      </h4>
                      <div className="space-y-2">
                        {exp.achievements.map((achievement: string, idx: number) => (
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
                      <h4 className="text-lg font-semibold text-gray-950 dark:text-white mb-4">
                        Technologies
                      </h4>
                      <div className="space-y-2">
                        {exp.technologies.map((tech: string, idx: number) => (
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
            </motion.div>
          ))}
        </div>

        {/* Research Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-950 dark:text-white mb-8 text-center">
            Research Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {(experienceData as any).researchHighlights.map((research: any) => (
              <div 
                key={research.title}
                className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 ${
                  research.borderColor === 'blue' ? 'border-blue-500' : 'border-green-500'
                }`}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-950 dark:text-white">{research.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{research.institution} | {research.year}</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {research.highlights.map((highlight: string, idx: number) => (
                    <li key={idx}>• {highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Experience