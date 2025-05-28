import { motion } from 'framer-motion'
import { Code, Database, Cloud, Cpu, Award, Target } from 'lucide-react'
import skillsData from '../content/skills.json'

const About = () => {
  const skillCategories = skillsData.skillCategories
  const researchInterests = skillsData.researchInterests

  // Icon mapping for JSON data
  const iconMap = {
    Code, Database, Cloud, Cpu, Award, Target
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
          <h1 className="text-5xl font-bold text-gray-950 dark:text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Hi! I'm <strong>Hakancan Ozturk</strong>, a Software Development Engineer at Amazon with a background in machine learning and computational science. I specialize in Retrieval-Augmented Generation (RAG), computational fluid dynamics (CFD), and generative AI.
          </p>
        </motion.div>

        {/* Background Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">Background</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            I am a machine learning engineer with a background in applied computational science and mechanical engineering. My expertise spans AI, computational modeling, and data-driven solutions, with a focus on fluid dynamics and information retrieval. I have extensive hands-on experience with both research and production environments, working on projects involving Retrieval-Augmented Generation (RAG) frameworks, AI-driven flow simulations, and innovative engineering designs.
          </p>
          <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 dark:text-gray-400">
            "My work is guided by a passion for leveraging AI to solve complex, real-world problems and a commitment to continuous learning."
          </blockquote>
        </motion.div>

        {/* Research Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center">Research Interests</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {researchInterests.map((interest, index) => {
              const IconComponent = iconMap[interest.icon as keyof typeof iconMap]
              return (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="text-blue-500" size={24} />
                    <h3 className="text-xl font-bold text-gray-950 dark:text-white">{interest.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{interest.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center">Technical Skills</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <IconComponent className="text-blue-600 dark:text-blue-400" size={28} />
                    <h3 className="text-xl font-bold text-gray-950 dark:text-white">{category.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="border-l-2 border-blue-100 dark:border-blue-800 pl-4">
                        <h4 className="font-semibold text-gray-950 dark:text-white">{skill.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About