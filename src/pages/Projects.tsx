import { ExternalLink, Github, Code, Award, Zap, Building, Rocket, Image, HeartPulse, Plane } from 'lucide-react'
import projectsData from '../content/projects.json'
import Card from '../components/Card'
import TagList from '../components/TagList'
import BulletList from '../components/BulletList'
import { animations, pageStyles } from '../utils/theme'

const Projects = () => {
  // Icon mapping for JSON data
  const iconMap = {
    Code: Code,
    Award: Award,
    Zap: Zap,
    Building: Building,
    Rocket: Rocket,
    Image: Image,
    HeartPulse: HeartPulse,
    Plane: Plane
  }

  // Map projects with proper icon components
  const projects = (projectsData as any).projects.map((project: any) => ({
    ...project,
    icon: iconMap[project.icon as keyof typeof iconMap]
  }))

  return (
    <div className={pageStyles.standardPage.container}>
      <div className={pageStyles.standardPage.wrapper}>
        {/* Header */}
        <div className={pageStyles.standardPage.header}>
          <h1 className={pageStyles.standardPage.title}>
            Projects
          </h1>
          <p className={pageStyles.standardPage.description}>
            A collection of research projects, production systems, and innovative solutions spanning AI, machine learning, and software engineering
          </p>
        </div>

        {/* Projects Grid */}
        <div className={pageStyles.standardPage.content}>
          {projects.map((project: any, index: number) => (
            <Card
              key={project.id}
              {...animations.fadeInWithDelay(index)}
              icon={project.icon}
              title={project.title}
              organization={project.organization}
              period={project.period}
              description={project.description}
              type={project.type}
              status={project.status}
            >
              <div className="grid lg:grid-cols-2 gap-6">
                <BulletList
                  title="Key Achievements"
                  items={project.achievements}
                  bulletColor="text-green-500"
                />
                
                <div className="space-y-6">
                  <TagList
                    title="Technologies"
                    tags={project.technologies}
                    defaultType="skill"
                  />
                  
                  {/* Links */}
                  {project.links && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-950 dark:text-white mb-4">
                        Links
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {project.links.map((link: any, idx: number) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                          >
                            {link.type === 'github' && <Github size={16} />}
                            {link.type === 'live' && <ExternalLink size={16} />}
                            {link.type === 'publication' && <ExternalLink size={16} />}
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects