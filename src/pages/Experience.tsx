import { motion } from 'framer-motion'
import { Code, Building, Microscope, GraduationCap } from 'lucide-react'
import experienceData from '../content/experience.json'
import skillsData from '../content/skills.json'
import Card from '../components/Card'
import SimpleCard from '../components/SimpleCard'
import TagList from '../components/TagList'
import BulletList from '../components/BulletList'
import { animations, pageStyles } from '../utils/theme'

const Experience = () => {
  // Icon mapping for JSON data
  const iconMap = {
    Code: Code,
    Building: Building,
    Microscope: Microscope,
    GraduationCap: GraduationCap
  }
  
  const volunteering = skillsData.volunteering

  // Map experiences with proper icon components
  const experiences = (experienceData as any).experiences.map((exp: any) => ({
    ...exp,
    icon: iconMap[exp.icon as keyof typeof iconMap]
  }))



  return (
    <div className={pageStyles.standardPage.container}>
      <div className={pageStyles.standardPage.wrapper}>
        {/* Header */}
        <div className={pageStyles.standardPage.header}>
          <h1 className={pageStyles.standardPage.title}>
            Professional Experience
          </h1>
          <p className={pageStyles.standardPage.description}>
            Journey through software engineering, machine learning, research, and education with consistently outstanding performance
          </p>
        </div>

        {/* Experience Cards */}
        <div className={pageStyles.standardPage.content}>
          {experiences.map((exp: any, index: number) => (
            <Card
              key={exp.id}
              {...animations.fadeInWithDelay(index)}
              icon={exp.icon}
              title={exp.title}
              subtitle={exp.company}
              location={exp.location}
              period={exp.period}
              description={exp.description}
              type={exp.type}
              status={exp.status}
            >
              <div className="grid lg:grid-cols-2 gap-6">
                <BulletList
                  title="Key Responsibilities"
                  items={exp.responsibilities}
                />
                
                <div className="space-y-6">
                  <TagList
                    title="Key Achievements"
                    tags={exp.achievements}
                    defaultType="achievement"
                  />
                  
                  <TagList
                    title="Technologies"
                    tags={exp.technologies}
                    defaultType="technology"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mentoring & Volunteering */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-950 dark:text-white mb-8 text-center">
            Mentoring & Volunteering
          </h2>
          <div className="grid md:grid-cols-1 gap-6">
            {volunteering.map((item, index) => (
              <SimpleCard
                key={item.role + index}
                {...animations.fadeInWithDelay(index)}
                icon={GraduationCap}
                title={item.role}
                subtitle={item.organization}
                period={item.period}
                description={item.description}
              >
                <BulletList
                  title="Activities"
                  items={item.activities}
                />
              </SimpleCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Experience