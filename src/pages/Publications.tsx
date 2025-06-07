import { ExternalLink, Users, BookOpen, Award } from 'lucide-react'
import publicationsData from '../content/publications.json'
import experienceData from '../content/experience.json'
import Card from '../components/Card'
import SimpleCard from '../components/SimpleCard'
import BulletList from '../components/BulletList'
import { animations, getTypeColor, pageStyles } from '../utils/theme'

const Publications = () => {
  const publications = publicationsData.publications
  const metrics = publicationsData.metrics
  const currentResearch = publicationsData.currentResearch

  return (
    <div className={pageStyles.standardPage.container}>
      <div className={pageStyles.standardPage.wrapper}>
        {/* Header Section */}
        <div className={pageStyles.standardPage.header}>
          <h1 className={pageStyles.standardPage.title}>
            Publications
          </h1>
          <p className={pageStyles.standardPage.description}>
            Research contributions in computational fluid dynamics, microrobotics, and machine learning applications in biomedical engineering
          </p>
        </div>

        {/* Metrics Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-950 dark:text-white mb-1">{metrics.totalCitations}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Citations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-950 dark:text-white mb-1">{metrics.hIndex}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">h-index</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-950 dark:text-white mb-1">{metrics.i10Index}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">i10-index</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-950 dark:text-white mb-1">{metrics.publications}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Publications</p>
            </div>
          </div>
        </div>

        {/* Publications List */}
        <div className={pageStyles.standardPage.content}>
          {publications.map((pub, index) => (
            <Card
              key={pub.id}
              {...animations.fadeInWithDelay(index)}
              icon={BookOpen}
              title={pub.title}
              subtitle={pub.journal}
              customBadges={[
                {
                  label: pub.type,
                  className: getTypeColor(pub.type)
                },
                {
                  label: pub.year.toString(),
                  className: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }
              ]}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Users size={16} />
                  <span className="text-sm">{pub.authors}</span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300">
                  {pub.description}
                </p>
                
                <div className="flex items-center justify-between">
                  {pub.citations > 0 && (
                    <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded-lg px-3 py-2">
                      <span className="text-sm font-semibold text-orange-900 dark:text-orange-200">
                        {pub.citations} citations
                      </span>
                    </div>
                  )}
                  
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={16} />
                    View Paper
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Current Research Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-950 dark:text-white mb-8 text-center">Current Research</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <SimpleCard
              icon={BookOpen}
              title={currentResearch.thesis.title}
              subtitle={currentResearch.thesis.topic}
            >
              <BulletList
                title="Research Highlights"
                items={currentResearch.thesis.highlights}
              />
            </SimpleCard>
            
            <SimpleCard
              icon={Award}
              title={currentResearch.impact.title}
              description={currentResearch.impact.description}
            >
              <BulletList
                title="Collaborating Institutions"
                items={currentResearch.impact.institutions}
              />
            </SimpleCard>
          </div>
        </div>

        {/* Research Highlights */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-950 dark:text-white mb-8 text-center">
            Research Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {(experienceData as any).researchHighlights.map((research: any, index: number) => (
              <SimpleCard
                key={research.title}
                {...animations.fadeInWithDelay(index)}
                icon={BookOpen}
                title={research.title}
                subtitle={`${research.institution} | ${research.year}`}
                className={`border-l-4 ${research.borderColor === 'blue' ? 'border-l-blue-500' : 'border-l-green-500'}`}
              >
                <BulletList
                  title="Key Achievements"
                  items={research.highlights}
                />
              </SimpleCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Publications
