import { ExternalLink, Users, BookOpen, Award } from 'lucide-react'
import scholarData from '../content/scholar-publications.json'
import publicationsExtra from '../content/publications-extra.json'
import experienceData from '../content/experience.json'
import Card from '../components/Card'
import SimpleCard from '../components/SimpleCard'
import BulletList from '../components/BulletList'
import { PageLayout } from '../components/PageLayout'
import { animations, getTypeColor, pageStyles } from '../utils/theme'
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
          <div className={pageStyles.metricsGrid}>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Scholar Profile <ExternalLink size={12} className="inline ml-1" />
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Publications List */}
        <div className={pageStyles.cardContainer}>
          {publications.map((pub, index) => (
            <Card
              key={pub.id}
              {...animations.staggeredFadeIn(index)}
              icon={BookOpen}
              title={pub.title}
              subtitle={pub.journal}
              subtitleBadge={{
                label: (
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:underline"
                  >
                    {pub.type}
                    <ExternalLink size={12} />
                  </a>
                ),
                className: `${getTypeColor(pub.type)} hover:opacity-80 transition-opacity cursor-pointer`
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
              </div>
            </Card>
          ))}
        </div>

        {/* Current Research Section */}
        <div className={pageStyles.sectionSpacing}>
          <h2 className={`${SECTION_TITLE_STYLE} ${pageStyles.sectionHeaderCentered}`}>Current Research</h2>
          <div className={pageStyles.gridTwoCol}>
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
        <div className={pageStyles.sectionSpacing}>
          <h2 className={`${SECTION_TITLE_STYLE} ${pageStyles.sectionHeaderCentered}`}>
            Research Highlights
          </h2>
          <div className={pageStyles.gridTwoCol}>
            {(experienceData as any).researchHighlights.map((research: any, index: number) => (
              <SimpleCard
                key={research.title}
                {...animations.staggeredFadeIn(index)}
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
