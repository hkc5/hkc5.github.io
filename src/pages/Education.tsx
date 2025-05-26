import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Calendar, MapPin } from 'lucide-react'

const Education = () => {
  const educationData = [
    {
      id: 1,
      degree: 'MSc in Applied Computational Science and Engineering',
      institution: 'Imperial College London',
      location: 'London, UK',
      period: '2023 - 2024',
      grade: 'Distinction (78.27%)',
      achievement: 'Highest overall grade in class',
      type: 'Masters',
      status: 'completed',
      highlights: [
        'Class representative',
        'Specialized in ML for computational problems',
        'Distinction with highest grade',
        'Advanced research in AI-CFD integration'
      ],
      modules: [
        'Machine Learning & Deep Learning',
        'Numerical Methods for PDEs',
        'Computational Mathematics',
        'Optimization Techniques',
        'High-Performance Computing'
      ],
      skills: ['Python', 'TensorFlow', 'MATLAB', 'C++', 'HPC', 'CFD'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      degree: 'BSc in Mechanical Engineering',
      institution: 'Koç University',
      location: 'Istanbul, Turkey',
      period: '2020 - 2023',
      grade: 'GPA: 3.99/4.00',
      achievement: 'Ranked 1st in class',
      type: 'Bachelors',
      status: 'completed',
      highlights: [
        'Graduated one year early',
        'Merit scholarship ($30,000 annually)',
        'Teaching Assistant for multiple courses',
        'Perfect academic standing'
      ],
      modules: [
        'Propulsion Systems',
        'Microsensors and Nanotechnology',
        'Makerspace and Design',
        'Finite Element Method',
        'Fluid Mechanics',
        'Numerical Methods'
      ],
      skills: ['SolidWorks', 'ANSYS', 'MATLAB', 'AutoCAD', 'FEA', 'CFD'],
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const teachingExperience = [
    {
      course: 'Introduction to Engineering',
      role: 'Teaching Assistant',
      description: 'Guided first-year students through fundamental engineering concepts'
    },
    {
      course: 'Fluid Mechanics',
      role: 'Teaching Assistant', 
      description: 'Assisted students with complex fluid dynamics problems'
    },
    {
      course: 'Numerical Methods',
      role: 'Teaching Assistant',
      description: 'Helped students understand computational approaches to engineering'
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
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Education
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Academic journey focused on computational science, machine learning, and mechanical engineering with outstanding performance
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid gap-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 p-6 border-b dark:border-gray-600">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <GraduationCap size={32} className="text-blue-600 dark:text-blue-400" />
                      <div>
                        <h2 className="text-xl lg:text-2xl font-bold mb-2 text-gray-950 dark:text-white">{edu.degree}</h2>
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <MapPin size={16} />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mt-1">
                          <Calendar size={16} />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-950 dark:text-white">{edu.grade}</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">{edu.achievement}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Highlights */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-950 dark:text-white mb-4">
                        Highlights
                      </h3>
                      <ul className="space-y-3">
                        {edu.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Modules */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-950 dark:text-white mb-4">
                        Key Modules
                      </h3>
                      <div className="space-y-2">
                        {edu.modules.map((module, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2"
                          >
                            {module}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skills Developed */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-950 dark:text-white mb-4">
                        Skills Developed
                      </h3>
                      <div className="space-y-2">
                        {edu.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2"
                          >
                            {skill}
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

        {/* Teaching Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-950 dark:text-white mb-8 text-center">
            Teaching Experience
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teachingExperience.map((exp, index) => (
              <motion.div
                key={exp.course}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="text-blue-500" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-950 dark:text-white">{exp.course}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{exp.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Education
