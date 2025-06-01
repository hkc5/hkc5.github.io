import { motion } from 'framer-motion'
import { ExternalLink, Github, Code, Award, Zap, Building, Rocket, Image, HeartPulse, Plane } from 'lucide-react'
import projectsData from '../content/projects.json'
import Card from '../components/Card'
import TagList from '../components/TagList'
import BulletList from '../components/BulletList'
import { animations } from '../utils/theme'

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-950 dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of research projects, production systems, and innovative solutions spanning AI, machine learning, and software engineering
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8">
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