// Theme configuration for consistent styling across the application
// Consolidated design system - single source of truth for all styling

// ============================================================================
// ULTRA-SIMPLE STYLE ABSTRACTIONS - USE THESE FOR CONSISTENCY
// ============================================================================

export const TITLE_STYLE = 'text-5xl font-bold text-gray-900 dark:text-white'
export const SECTION_TITLE_STYLE = 'text-3xl font-bold text-gray-900 dark:text-white'
export const SECTION_TITLE_ACCENT_STYLE = 'text-3xl font-bold text-blue-600 dark:text-blue-400'
export const CARD_TITLE_STYLE = 'text-2xl font-bold text-gray-900 dark:text-white'
export const SUBTITLE_STYLE = 'text-xl font-semibold text-gray-800 dark:text-gray-200'

export const DESCRIPTION_STYLE = 'text-lg text-gray-600 dark:text-gray-300'
export const BODY_STYLE = 'text-base text-gray-700 dark:text-gray-300'
export const SECONDARY_TEXT_STYLE = 'text-sm text-gray-600 dark:text-gray-400'
export const LABEL_STYLE = 'text-sm font-medium text-gray-700 dark:text-gray-300'

export const HERO_TITLE_STYLE = 'text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white'
export const HERO_SUBTITLE_STYLE = 'text-xl sm:text-2xl text-gray-600 dark:text-gray-300'
export const HERO_DESCRIPTION_STYLE = 'text-lg text-gray-500 dark:text-gray-400'

// ============================================================================
// TYPOGRAPHY SYSTEM (Legacy - prefer simple abstractions above)
// ============================================================================

export const typography = {
  // Font sizes with semantic naming
  fontSize: {
    xs: 'text-xs',      // 12px
    sm: 'text-sm',      // 14px
    base: 'text-base',  // 16px
    lg: 'text-lg',      // 18px
    xl: 'text-xl',      // 20px
    '2xl': 'text-2xl',  // 24px
    '3xl': 'text-3xl',  // 30px
    '4xl': 'text-4xl',  // 36px
    '5xl': 'text-5xl',  // 48px
    '6xl': 'text-6xl',  // 60px
  },

  // Font weights
  fontWeight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },

  // Semantic text sizes for consistent hierarchy
  text: {
    // Page titles - main headings
    pageTitle: 'text-5xl font-bold text-gray-900 dark:text-white',
    pageTitleMobile: 'text-4xl font-bold text-gray-900 dark:text-white',

    // Section titles - major sections within pages
    sectionTitle: 'text-3xl font-bold text-gray-900 dark:text-white',
    sectionTitleAccent: 'text-3xl font-bold text-blue-600 dark:text-blue-400',

    // Card titles - within cards and components
    cardTitle: 'text-2xl font-bold text-gray-900 dark:text-white',

    // Subtitles and secondary headings
    subtitle: 'text-xl font-semibold text-gray-800 dark:text-gray-200',

    // Body text variations
    description: 'text-lg text-gray-600 dark:text-gray-300',
    descriptionLarge: 'text-xl text-gray-600 dark:text-gray-300',
    body: 'text-base text-gray-700 dark:text-gray-300',
    bodySecondary: 'text-sm text-gray-600 dark:text-gray-400',

    // Special text styles
    label: 'text-sm font-medium text-gray-700 dark:text-gray-300',
    caption: 'text-xs text-gray-500 dark:text-gray-400',

    // Hero section specific
    heroTitle: 'text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white',
    heroSubtitle: 'text-xl sm:text-2xl text-gray-600 dark:text-gray-300',
    heroDescription: 'text-lg text-gray-500 dark:text-gray-400',
  }
}

// ============================================================================
// COLOR SYSTEM
// ============================================================================

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
  },

  // Text colors - semantic naming
  text: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-300',
    tertiary: 'text-gray-500 dark:text-gray-400',
    accent: 'text-blue-600 dark:text-blue-400',
    accentHover: 'hover:text-blue-800 dark:hover:text-blue-300',
    muted: 'text-gray-400 dark:text-gray-500',

    // Form and input text
    label: 'text-gray-700 dark:text-gray-300',
    placeholder: 'text-gray-400 dark:text-gray-500',
  },

  // Background colors
  background: {
    page: 'bg-gray-50 dark:bg-gray-900',
    card: 'bg-white dark:bg-gray-800',
    cardSecondary: 'bg-gray-100 dark:bg-gray-700',
    accent: 'bg-blue-50 dark:bg-blue-900/20',
    glass: 'bg-white/10 dark:bg-gray-900/10',
  },

  // Border colors
  border: {
    default: 'border-gray-200 dark:border-gray-700',
    secondary: 'border-gray-300 dark:border-gray-600',
    accent: 'border-blue-500',
    glass: 'border-white/30 dark:border-gray-500/20',
  },

  // Interactive colors
  interactive: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600',
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
    accent: 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300',
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

export const getPositionBadgeColor = (): string => {
  // Just use green for all positions - simple and consistent
  return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
}

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

// ============================================================================
// COMPONENT STYLES
// ============================================================================

export const components = {
  // Card styles
  card: {
    base: 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden',
    glass: 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-3xl shadow-lg border border-white/30 dark:border-gray-500/20',
    header: 'bg-gray-100 dark:bg-gray-700 p-6',
    content: 'p-6',
    contentLarge: 'p-8 lg:p-12',
  },

  // Button styles
  button: {
    primary: 'inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors',
    secondary: 'inline-flex items-center px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors',
    outline: 'inline-flex items-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
    ghost: 'inline-flex items-center px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors',
  },

  // Badge styles
  badge: {
    base: 'inline-block px-3 py-1 rounded-full text-xs font-medium',
    skill: 'inline-block px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2',
    tech: 'inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2',
    achievement: 'inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2',
  },

  // Input styles
  input: {
    base: 'w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
    textarea: 'w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none',
  },

  // Navigation styles
  nav: {
    glass: 'bg-white/5 dark:bg-gray-900/5 backdrop-blur-2xl rounded-full shadow-2xl border border-white/30 dark:border-gray-500/20',
    link: 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors',
    activeLink: 'text-blue-600 dark:text-blue-400',
  }
}

// Legacy styles for backward compatibility
export const cardStyles = {
  base: components.card.base,
  header: components.card.header,
  content: components.card.content,
  badge: components.badge.base,
  skillTag: components.badge.skill,
  techTag: components.badge.tech,
  achievementTag: components.badge.achievement,
  callToAction: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
}

export const buttonStyles = {
  primary: components.button.primary,
  secondary: components.button.secondary,
  outline: components.button.outline
}

// ============================================================================
// LAYOUT & PAGE TEMPLATES
// ============================================================================

export const pageTemplates = {
  // Standard page layout - ALL pages should use this for consistency
  standard: {
    container: 'min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300',
    wrapper: 'max-w-6xl mx-auto px-4 py-12',
    header: 'text-center mb-12',
    title: TITLE_STYLE + ' mb-4',
    description: DESCRIPTION_STYLE + ' max-w-3xl mx-auto',
    content: 'space-y-8',
  },

  // Home page layout
  home: {
    container: 'relative transition-colors duration-300 bg-transparent',
    hero: 'relative flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-40 pb-12 sm:pt-48 sm:pb-16',
    heroContent: 'max-w-6xl mx-auto',
    heroCard: components.card.glass + ' ' + components.card.contentLarge,
  }
}

export const pageStyles = {
  // Container backgrounds
  container: 'min-h-screen bg-gray-50 dark:bg-gray-900 py-8',
  containerWithTransition: 'min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300',

  // Width variations
  standardWidth: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',

  // Common header styles - ALL USE SAME TITLE STYLE
  header: 'text-center mb-12',
  headerTitle: TITLE_STYLE + ' mb-4',
  headerDescription: DESCRIPTION_STYLE + ' max-w-3xl mx-auto',

  // Grid layouts
  singleColumnGrid: 'space-y-8',
  standardGrid: 'grid gap-8 lg:gap-12 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1',
  wideGrid: 'grid gap-8 lg:gap-12',
  twoColumnGrid: 'grid md:grid-cols-2 gap-8',

  // Page templates - ALL PAGES USE STANDARD
  standardPage: pageTemplates.standard
}

// ============================================================================
// ANIMATIONS
// ============================================================================

export const animations = {
  // Transition classes
  transition: {
    default: 'transition-colors duration-300',
    fast: 'transition-all duration-200',
    slow: 'transition-all duration-500',
  },

  // Framer Motion variants
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
  }),

  hover: {
    scale: { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
    lift: { whileHover: { y: -2 }, transition: { duration: 0.2 } }
  }
}
