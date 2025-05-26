import { motion } from 'framer-motion'
import { Code, Database, Cloud, Cpu, Award, Target } from 'lucide-react'

const About = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      skills: [
        { name: 'Python', description: 'NumPy, SciPy, PyTorch, TensorFlow' },
        { name: 'JavaScript/TypeScript', description: 'React, Node.js, Modern web development' },
        { name: 'C++', description: 'High-performance computing applications' },
        { name: 'MATLAB', description: 'Scientific computing and analysis' }
      ]
    },
    {
      title: 'Machine Learning & AI',
      icon: Cpu,
      skills: [
        { name: 'PyTorch & TensorFlow', description: 'Deep learning frameworks' },
        { name: 'RAG Systems', description: 'Advanced retrieval-augmented generation' },
        { name: 'Computer Vision', description: 'CNNs, diffusion models' },
        { name: 'FastAPI', description: 'ML API development' }
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      skills: [
        { name: 'AWS', description: 'Lambda, cloud computing' },
        { name: 'Docker', description: 'Containerization' },
        { name: 'GitHub Actions', description: 'CI/CD workflows' },
        { name: 'High-Performance Computing', description: 'GPU clusters, parallel computing' }
      ]
    },
    {
      title: 'Engineering Software',
      icon: Database,
      skills: [
        { name: 'COMSOL', description: 'CFD and mechanics simulations' },
        { name: 'ANSYS Fluent', description: 'Computational fluid dynamics' },
        { name: 'Siemens NX', description: 'CAD and engineering design' }
      ]
    }
  ]

  const researchInterests = [
    {
      title: 'Retrieval-Augmented Generation (RAG)',
      description: 'Advanced AI frameworks for knowledge retrieval',
      icon: Target
    },
    {
      title: 'Computational Fluid Dynamics',
      description: 'Biomedical simulations and AI-driven physics modeling',
      icon: Database
    },
    {
      title: 'Machine Learning Applications', 
      description: 'Deep learning for biomedical analysis and turbulent flow',
      icon: Cpu
    },
    {
      title: 'High-Performance Computing',
      description: 'GPU-accelerated simulations and parallel computing',
      icon: Award
    }
  ]

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

        {/* Current Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">Current Role</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Currently at <strong>Amazon</strong> as a Software Development Engineer, where I focus on:
          </p>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
              <span>Migrating Prime Video UI elements from React to SolidJS to enhance performance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
              <span>Leveraging LLM-powered automation pipelines for efficient component refactoring</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
              <span>Developing features for Prime Video Client Software Development Kit (SDK)</span>
            </li>
          </ul>
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
            {researchInterests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <interest.icon className="text-blue-500" size={24} />
                  <h3 className="text-xl font-bold text-gray-950 dark:text-white">{interest.title}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{interest.description}</p>
              </motion.div>
            ))}
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
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="text-blue-500" size={28} />
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
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About