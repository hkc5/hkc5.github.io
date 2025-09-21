import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import ParticleBackground from '../components/ParticleBackground'
import SEO from '../components/SEO'
import { HERO_TITLE_STYLE, HERO_SUBTITLE_STYLE, HERO_DESCRIPTION_STYLE, colors, pageTemplates, components, animations } from '../utils/theme'

const Home = () => {
  return (
    <>
      <SEO />
      <div className={pageTemplates.home.container}>
      {/* Particle Background */}
      <ParticleBackground />

      {/* Hero Section */}
      <section className={pageTemplates.home.hero}>
        <div className={pageTemplates.home.heroContent}>
          <motion.div
            {...animations.fadeInUp}
            transition={{ duration: 0.8 }}
            className={pageTemplates.home.heroCard}
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 relative z-10"
            >
            {/* Profile Picture */}
            <motion.div
              {...animations.fadeInWithDelay(1)}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="w-48 h-60 lg:w-56 lg:h-72 relative mt-4 sm:mt-0">
                <picture>
                  <source srcSet="/profile.webp" type="image/webp" />
                  <img
                    src="/profile.png"
                    alt="Hakancan Ozturk"
                    className="w-full h-full rounded-lg object-cover shadow-lg"
                    loading="eager"
                  />
                </picture>
                <div className="absolute inset-0 rounded-lg ring-4 ring-blue-500/20 ring-offset-4 ring-offset-white dark:ring-offset-gray-900"></div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className={`${HERO_TITLE_STYLE} mb-6`}>
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hakancan Ozturk
                </span>
              </h1>

              <p className={`${HERO_SUBTITLE_STYLE} mb-8`}>
                Software Development Engineer at Amazon
              </p>

              <p className={`${HERO_DESCRIPTION_STYLE} mb-8 max-w-2xl lg:max-w-none`}>
                Machine learning engineer with expertise in Retrieval-Augmented Generation (RAG),
                computational fluid dynamics (CFD), and generative AI. Currently working on Prime Video
                infrastructure and UI optimization at Amazon.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
              <motion.a
                href="/contact"
                {...animations.hover.scale}
                className={components.button.primary}
              >
                Get In Touch
              </motion.a>

              <motion.a
                href="/resume.pdf"
                {...animations.hover.scale}
                className={`${components.button.outline} flex items-center gap-2`}
              >
                <Download size={20} />
                Download CV
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-6">
              <motion.a
                href="https://github.com/hkc5"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className={colors.interactive.accent}
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/hakancan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className={colors.interactive.accent}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:hakancan.ozturk23@gmail.com"
                whileHover={{ scale: 1.1 }}
                className={colors.interactive.accent}
              >
                <Mail size={24} />
              </motion.a>
            </div>
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </>
  )
}

export default Home
