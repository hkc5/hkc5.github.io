import { motion } from 'framer-motion'
import { BookOpen, Award, MapPin } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            About Me
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                I'm a PhD candidate in Biomedical Engineering with a passion for computational 
                fluid dynamics and machine learning applications in healthcare. My research 
                focuses on developing innovative solutions for cardiovascular simulations and 
                AI-powered medical diagnostics.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                With a strong background in both engineering and computer science, I bridge 
                the gap between theoretical research and practical applications, always 
                seeking to make technology more accessible and impactful in the medical field.
              </p>
              
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <MapPin size={20} />
                <span>Based in Turkey</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="text-blue-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Education
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      PhD in Biomedical Engineering
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">University Name</p>
                    <p className="text-sm text-gray-500">2020 - Present</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Master's in Engineering
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">University Name</p>
                    <p className="text-sm text-gray-500">2018 - 2020</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-purple-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Skills
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'MATLAB', 'CFD', 'Machine Learning', 'React', 'TypeScript', 'Docker'].map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Research Interests */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Research Interests
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Computational Fluid Dynamics',
                  description: 'Modeling blood flow and cardiovascular systems using advanced CFD techniques.'
                },
                {
                  title: 'Machine Learning',
                  description: 'Applying AI and ML to medical data analysis and diagnostic tools.'
                },
                {
                  title: 'Biomedical Engineering',
                  description: 'Developing innovative solutions for healthcare challenges.'
                },
              ].map((interest, index) => (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {interest.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {interest.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}

export default About
