import { Trophy, Medal, BookOpen, Users } from 'lucide-react'
import awardsData from '../content/awards.json'
import skillsData from '../content/skills.json'
import Card from '../components/Card'
import SimpleCard from '../components/SimpleCard'
import TagList from '../components/TagList'
import { getPositionBadgeColor, pageStyles, SECTION_TITLE_STYLE, CARD_TITLE_STYLE } from '../utils/theme'

const Awards = () => {
  const data = awardsData as any
  data.testScores = skillsData.testScores

  const getCategoryIcon = (categoryKey: string) => {
    switch (categoryKey) {
      case 'hackathons':
        return Trophy
      case 'academicExcellence':
        return BookOpen
      default:
        return Medal
    }
  }

  return (
    <div className={pageStyles.standardPage.container}>
      <div className={pageStyles.standardPage.wrapper}>
        <div className={pageStyles.standardPage.header}>
          <h1 className={pageStyles.standardPage.title}>
            {data.awards.title}
          </h1>
          <p className={pageStyles.standardPage.description}>
            {data.awards.description}
          </p>
        </div>

        <div className={pageStyles.standardPage.content}>
          {Object.entries(data.awards.categories).map(([categoryKey, category]: [string, any]) => {
            const CategoryIcon = getCategoryIcon(categoryKey)
            
            return (
              <section
                key={categoryKey}
                className="mb-16"
              >
                {/* Category Header */}
                <div className="flex items-center mb-8">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                    <CategoryIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className={SECTION_TITLE_STYLE}>
                    {category.title}
                  </h2>
                </div>

                {/* Category Items */}
                <div className="space-y-8">
                  {category.items.map((item: any, index: number) => (
                    <Card
                      key={index}
                      icon={CategoryIcon}
                      title={item.name}
                      period={item.year}
                      description={item.description}
                      customBadges={[
                        ...(item.position ? [{
                          label: item.position,
                          className: `px-3 py-1 rounded-full text-xs font-medium ${getPositionBadgeColor()}`
                        }] : []),
                        ...(item.score ? [{
                          label: item.score,
                          className: 'px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        }] : [])
                      ]}
                    >
                      <div className="space-y-4">
                        {item.details && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.details}
                          </p>
                        )}

                        {item.technologies && (
                          <TagList
                            title="Technologies"
                            tags={item.technologies}
                            defaultType="technology"
                          />
                        )}

                        {/* Achievement Highlights */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          {item.recognition && (
                            <div className="flex items-center text-green-600 dark:text-green-400">
                              <Medal className="h-4 w-4 mr-1" />
                              {item.recognition}
                            </div>
                          )}
                          {item.prize && (
                            <div className="flex items-center text-purple-600 dark:text-purple-400">
                              <Trophy className="h-4 w-4 mr-1" />
                              {item.prize}
                            </div>
                          )}
                          {item.teamSize && (
                            <div className="flex items-center text-blue-600 dark:text-blue-400">
                              <Users className="h-4 w-4 mr-1" />
                              Team of {item.teamSize}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )
          })}

          {/* Test Scores Section */}
          <section className="mt-16">
            <div className="flex items-center mb-8 justify-center">
              <h2 className={SECTION_TITLE_STYLE}>
                Standardized Test Scores
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {data.testScores && data.testScores.map((score: any) => (
                <SimpleCard
                  key={score.name}
                  title={score.name}
                  subtitle={score.date}
                  className="text-center"
                >
                  <div className="space-y-2 mt-3">
                    <div className={CARD_TITLE_STYLE + ' text-blue-600 dark:text-blue-400'}>
                      {score.score}
                    </div>
                    {score.detail && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {score.detail}
                      </p>
                    )}
                  </div>
                </SimpleCard>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Awards
