import { motion } from 'framer-motion'
import { GraduationCap, BookOpen } from 'lucide-react'
import educationData from '../content/education.json'
import Card from '../components/Card'
import SimpleCard from '../components/SimpleCard'
import TagList from '../components/TagList'
import BulletList from '../components/BulletList'
import { animations } from '../utils/theme'

const Education = () => {


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
          {(educationData as any).educationData.map((edu: any, index: number) => (
            <Card
              key={edu.id}
              {...animations.staggeredFadeIn(index)}
              icon={GraduationCap}
              title={edu.degree}
              organization={edu.institution}
              period={edu.period}
              customBadges={[
                {
                  label: edu.grade,
                  className: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                },
                {
                  label: edu.achievement,
                  className: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                }
              ]}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                <BulletList
                  title="Highlights"
                  items={edu.highlights}
                />
                
                <TagList
                  title="Key Modules"
                  tags={edu.modules}
                  defaultType="technology"
                />
                
                <TagList
                  title="Skills Developed"
                  tags={edu.skills}
                  defaultType="skill"
                />
              </div>
            </Card>
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
            {(educationData as any).teachingExperience.map((exp: any, index: number) => (
              <SimpleCard
                key={exp.course}
                {...animations.fadeInWithDelay(index)}
                icon={BookOpen}
                title={exp.course}
                subtitle={exp.role}
                description={exp.description}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Education
