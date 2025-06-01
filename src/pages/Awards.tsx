import { motion } from 'framer-motion'
import { Trophy, Medal, BookOpen, Users } from 'lucide-react'
import awardsData from '../content/awards.json'
import skillsData from '../content/skills.json'
import Card from '../components/Card'
import SimpleCard from '../components/SimpleCard'
import TagList from '../components/TagList'
import { animations, getPositionColor } from '../utils/theme'

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
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {data.awards.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {data.awards.description}
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-16">
          {Object.entries(data.awards.categories).map(([categoryKey, category]: [string, any], categoryIndex) => {
            const CategoryIcon = getCategoryIcon(categoryKey)
            
            return (
              <motion.section
                key={categoryKey}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center mb-8">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                    <CategoryIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h2>
                </div>

                {/* Category Items */}
                <div className="space-y-8">
                  {category.items.map((item: any, index: number) => (
                    <Card
                      key={index}
                      {...animations.fadeInWithDelay(index)}
                      icon={CategoryIcon}
                      title={item.name}
                      period={item.year}
                      description={item.description}
                      customBadges={[
                        ...(item.position ? [{
                          label: item.position,
                          className: `text-sm font-semibold ${getPositionColor(item.position)}`
                        }] : []),
                        ...(item.score ? [{
                          label: item.score,
                          className: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
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
              </motion.section>
            )
          })}
        </div>

        {/* Test Scores Section (Moved from About page) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="flex items-center mb-8 justify-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Standardized Test Scores
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.testScores && data.testScores.map((score: any, index: number) => (
              <SimpleCard
                key={score.name}
                {...animations.fadeInWithDelay(index)}
                title={score.name}
                subtitle={score.date}
                className="text-center"
              >
                <div className="space-y-2 mt-3">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
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
        </motion.div>
      </div>
    </div>
  )
}

export default Awards
