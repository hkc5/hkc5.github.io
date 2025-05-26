import { motion } from 'framer-motion'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Company Inc.",
      location: "San Francisco, CA",
      duration: "2022 - Present",
      description: "Led development of scalable web applications using React, TypeScript, and Node.js. Mentored junior developers and collaborated with cross-functional teams to deliver high-quality products.",
      technologies: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
      website: "https://techcompany.com"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      duration: "2020 - 2022",
      description: "Built and maintained full-stack applications from scratch. Implemented CI/CD pipelines and optimized application performance. Worked closely with product team to translate requirements into technical solutions.",
      technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "GCP"],
      website: "https://startupxyz.com"
    },
    {
      id: 3,
      title: "Software Developer Intern",
      company: "Big Tech Corp",
      location: "Seattle, WA",
      duration: "Summer 2019",
      description: "Developed internal tools for data analysis and visualization. Collaborated with senior engineers on improving system reliability and performance monitoring.",
      technologies: ["JavaScript", "Python", "D3.js", "MongoDB", "Jenkins"],
      website: "https://bigtechcorp.com"
    }
  ]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My journey through various roles and companies that have shaped my career in software development.
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {experience.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-2">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {experience.company}
                    </span>
                    {experience.website && (
                      <a
                        href={experience.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{experience.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {experience.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Interested in working together? Let's connect!
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}

export default Experience
