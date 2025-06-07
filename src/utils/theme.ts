// Theme configuration for consistent styling across the application

export const colors = {
  // Type colors for badges
  type: {
    'Full-time': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    'Part-time': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'Research': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    'MSc Dissertation': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    'Research Project': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'Production System': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    'Personal Project': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    'Journal Article': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    'Conference Paper': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'Thesis': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    // Media types
    'talk': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'interview': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    'collaboration': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    'article': 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
    'podcast': 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200',
    'video': 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
    'featured': 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200',
    default: 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
  },
  
  // Status colors
  status: {
    current: 'bg-green-500',
    completed: 'bg-blue-500',
    default: 'bg-gray-400'
  },
  
  // Position colors for awards
  position: {
    '1st Place': 'text-yellow-600 dark:text-yellow-400',
    '2nd Place': 'text-gray-500 dark:text-gray-400',
    '3rd Place': 'text-orange-600 dark:text-orange-400',
    'Winner': 'text-green-600 dark:text-green-400',
    'Finalist': 'text-blue-600 dark:text-blue-400',
    default: 'text-gray-600 dark:text-gray-400'
  }
}

export const getTypeColor = (type: string): string => {
  return colors.type[type as keyof typeof colors.type] || colors.type.default
}

export const getStatusColor = (status: string): string => {
  return colors.status[status as keyof typeof colors.status] || colors.status.default
}

export const getPositionColor = (position: string): string => {
  return colors.position[position as keyof typeof colors.position] || colors.position.default
}

// Media type labels
export const getMediaTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'talk': 'Talk',
    'interview': 'Interview',
    'collaboration': 'Collaboration',
    'article': 'Article',
    'podcast': 'Podcast',
    'video': 'Video',
    'featured': 'Featured'
  }
  return labels[type] || type
}

// Common styles
export const cardStyles = {
  base: 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden',
  header: 'bg-gray-100 dark:bg-gray-700 p-6',
  content: 'p-6',
  badge: 'px-3 py-1 rounded-full text-xs font-medium',
  skillTag: 'inline-block px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2',
  techTag: 'inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2',
  achievementTag: 'inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2',
  callToAction: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
}

export const buttonStyles = {
  primary: 'inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  secondary: 'inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors',
  outline: 'inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
}

export const pageStyles = {
  container: 'min-h-screen bg-gray-50 dark:bg-gray-900 py-8',
  maxWidth: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center mb-12',
  title: 'text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto',
  grid: 'grid gap-8 lg:gap-12 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1'
}

// Animation variants
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  
  fadeInWithDelay: (index: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: index * 0.1 }
  }),
  
  staggeredFadeIn: (index: number) => ({
    initial: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: index * 0.2 }
  })
}
