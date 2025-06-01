import { motion } from 'framer-motion'
import { Play, Users, Target, Clock, Youtube, ExternalLink } from 'lucide-react'
import publicProfileData from '../content/publicProfile.json'

const PublicProfile = () => {
  const data = (publicProfileData as any).publicProfile

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
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* YouTube Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 p-6 border-b dark:border-gray-600">
              <div className="flex items-center gap-3">
                <Youtube className="text-red-600" size={32} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {data.youtubeVideo.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {data.youtubeVideo.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Video Embed Placeholder */}
                <div className="relative">
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="text-white mx-auto mb-4" size={64} />
                      <p className="text-white text-lg font-medium">Video Coming Soon</p>
                      <p className="text-gray-300 text-sm mt-2">
                        Subscribe to be notified when the video is published
                      </p>
                    </div>
                  </div>
                  {/* Video Stats */}
                  <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Duration: {data.youtubeVideo.duration}</span>
                    <span>Expected Views: {data.youtubeVideo.views}</span>
                  </div>
                </div>

                {/* Video Info */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    What You'll Learn
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        My transition from Mechanical Engineering to AI/ML
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Working at world-class institutions (Amazon, Max Planck)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Key lessons learned and career insights
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Tips for breaking into top tech companies
                      </span>
                    </li>
                  </ul>

                  <a
                    href={data.youtubeVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Youtube size={20} />
                    Watch on YouTube
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mentorship Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 p-6 border-b dark:border-gray-600">
              <div className="flex items-center gap-3">
                <Users className="text-blue-600 dark:text-blue-400" size={32} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {data.mentorship.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {data.mentorship.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {data.mentorship.stats.activeMentees}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Mentees</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {data.mentorship.stats.totalMentored}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Mentored</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 text-center">
                  <Clock className="text-purple-600 dark:text-purple-400 mx-auto mb-2" size={24} />
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Session</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {data.mentorship.stats.averageSessionLength}
                  </div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4 text-center">
                  <Target className="text-orange-600 dark:text-orange-400 mx-auto mb-2" size={24} />
                  <div className="text-sm text-gray-600 dark:text-gray-400">Focus Areas</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {data.mentorship.stats.focusAreas.length}
                  </div>
                </div>
              </div>

              {/* Focus Areas */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Focus Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.mentorship.stats.focusAreas.map((area: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mentees */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Current Mentees
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {data.mentorship.mentees.map((mentee: any, index: number) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{mentee.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{mentee.background}</p>
                        </div>
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                          {mentee.duration}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          <strong>Goal:</strong> {mentee.goal}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Progress:</strong> {mentee.progress}
                        </p>
                      </div>
                      <blockquote className="text-sm italic text-gray-600 dark:text-gray-400 border-l-4 border-blue-500 pl-4">
                        "{mentee.testimonial}"
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approach */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  My Mentorship Approach
                </h3>
                <ul className="space-y-3">
                  {data.mentorship.approach.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PublicProfile
