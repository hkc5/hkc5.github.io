import { GraduationCap, BookOpen } from 'lucide-react'
import educationData from '../content/education.json'
import Card from '../components/Card'
import SimpleCard from '../components/SimpleCard'
import TagList from '../components/TagList'
import BulletList from '../components/BulletList'
import { animations, pageStyles } from '../utils/theme'

const Education = () => {


  return (
    <div className={pageStyles.standardPage.container}>
      <div className={pageStyles.standardPage.wrapper}>
        {/* Header */}
        <div className={pageStyles.standardPage.header}>
          <h1 className={pageStyles.standardPage.title}>
            Education
          </h1>
          <p className={pageStyles.standardPage.description}>
            Academic journey focused on computational science, machine learning, and mechanical engineering with outstanding performance
          </p>
        </div>

        {/* Education Cards */}
        <div className={pageStyles.standardPage.content}>
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
        <div className="mt-16">
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
        </div>
      </div>
    </div>
  )
}

export default Education
