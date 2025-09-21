import { Code, Database, Cloud, Cpu, Award, Target } from 'lucide-react'
import skillsData from '../content/skills.json'
import SimpleCard from '../components/SimpleCard'
import { PageLayout } from '../components/PageLayout'
import { animations } from '../utils/theme'
import { SECTION_TITLE_ACCENT_STYLE, BODY_STYLE, SECONDARY_TEXT_STYLE, colors, typography } from '../utils/theme'

const About = () => {
  const skillCategories = skillsData.skillCategories
  const researchInterests = skillsData.researchInterests

  // Icon mapping for JSON data
  const iconMap = {
    Code, Database, Cloud, Cpu, Award, Target
  }

  return (
    <PageLayout
      title="About Me"
      description="Hi! I'm Hakancan Ozturk, a Software Development Engineer at Amazon with a background in machine learning and computational science. I specialize in Retrieval-Augmented Generation (RAG), computational fluid dynamics (CFD), and generative AI."
    >

      {/* Background Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-12">
        <h2 className={`${SECTION_TITLE_ACCENT_STYLE} mb-6`}>Background</h2>
        <p className={`${BODY_STYLE} leading-relaxed mb-6`}>
          I am a machine learning engineer with a background in applied computational science and mechanical engineering. My expertise spans AI, computational modeling, and data-driven solutions, with a focus on fluid dynamics and information retrieval. I have extensive hands-on experience with both research and production environments, working on projects involving Retrieval-Augmented Generation (RAG) frameworks, AI-driven flow simulations, and innovative engineering designs.
        </p>
        <blockquote className={`border-l-4 border-blue-500 pl-6 italic ${SECONDARY_TEXT_STYLE}`}>
          "My work is guided by a passion for leveraging AI to solve complex, real-world problems and a commitment to continuous learning."
        </blockquote>
      </div>

      {/* Research Interests */}
      <div className="mb-12">
        <h2 className={`${SECTION_TITLE_ACCENT_STYLE} mb-8 text-center`}>Research Interests</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {researchInterests.map((interest, index) => {
            const IconComponent = iconMap[interest.icon as keyof typeof iconMap]
            return (
              <SimpleCard
                key={interest.title}
                {...animations.fadeInWithDelay(index)}
                icon={IconComponent}
                title={interest.title}
                description={interest.description}
              />
            )
          })}
        </div>
      </div>

      {/* Technical Skills */}
      <div>
        <h2 className={`${SECTION_TITLE_ACCENT_STYLE} mb-8 text-center`}>Technical Skills</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap]
            return (
              <SimpleCard
                key={category.title}
                {...animations.fadeInWithDelay(categoryIndex)}
                icon={IconComponent}
                title={category.title}
              >
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="border-l-2 border-blue-100 dark:border-blue-800 pl-4">
                      <h4 className={`${typography.fontWeight.semibold} ${colors.text.primary}`}>{skill.name}</h4>
                      <p className={SECONDARY_TEXT_STYLE}>{skill.description}</p>
                    </div>
                  ))}
                </div>
              </SimpleCard>
            )
          })}
        </div>
      </div>
    </PageLayout>
  )
}

export default About