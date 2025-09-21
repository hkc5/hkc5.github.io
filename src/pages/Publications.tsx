import { ExternalLink, Users, BookOpen, Award } from 'lucide-react'
import scholarData from '../content/scholar-publications.json'
import publicationsExtra from '../content/publications-extra.json'
import experienceData from '../content/experience.json'
import Card from '../components/Card'
import SimpleCard from '../components/SimpleCard'
import BulletList from '../components/BulletList'
import { PageLayout } from '../components/PageLayout'
import { animations, getTypeColor } from '../utils/theme'
import { SECTION_TITLE_STYLE, CARD_TITLE_STYLE, SECONDARY_TEXT_STYLE } from '../utils/theme'

const Publications = () => {
  const publications = scholarData.publications
  const metrics = scholarData.metrics
  const currentResearch = publicationsExtra.currentResearch

  return (
    <PageLayout
      title="Publications"
      description="Research contributions in computational fluid dynamics, microrobotics, and machine learning applications in biomedical engineering"
    >

        {/* Metrics Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            <div>
              <p className={`${CARD_TITLE_STYLE} mb-1`}>{metrics.totalCitations}</p>
              <p className={SECONDARY_TEXT_STYLE}>Total Citations</p>
            </div>
            <div>
              <p className={`${CARD_TITLE_STYLE} mb-1`}>{metrics.hIndex}</p>
              <p className={SECONDARY_TEXT_STYLE}>h-index</p>
            </div>
            <div>
              <p className={`${CARD_TITLE_STYLE} mb-1`}>{metrics.i10Index}</p>
              <p className={SECONDARY_TEXT_STYLE}>i10-index</p>
            </div>
            <div>
              <p className={`${CARD_TITLE_STYLE} mb-1`}>{metrics.publications}</p>
              <p className={SECONDARY_TEXT_STYLE}>Publications</p>
            </div>
            <div>
              <a
                href="https://scholar.google.com/citations?user=FPx_wTQAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <div className="text-3xl mb-1">🎓</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Scholar Profile</p>
              </a>
            </div>
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-8">
          {publications.map((pub, index) => (
            <Card
              key={pub.id}
              {...animations.fadeInWithDelay(index)}
              icon={BookOpen}
              title={pub.title}
              subtitle={pub.journal}
              subtitleBadge={{
                label: pub.type,
                className: getTypeColor(pub.type)
              }}
              customBadges={[
                {
                  label: pub.year.toString(),
                  className: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 !font-bold'
                },
                ...(pub.citations > 0 ? [{
                  label: `${pub.citations} citations`,
                  className: 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200 whitespace-nowrap'
                }] : [])
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
                
                <div className="flex justify-end">
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
          <h2 className={`${SECTION_TITLE_STYLE} mb-8 text-center`}>Current Research</h2>
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
          <h2 className={`${SECTION_TITLE_STYLE} mb-8 text-center`}>
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
    </PageLayout>
  )
}

export default Publications
