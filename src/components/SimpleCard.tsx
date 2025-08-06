import React, { ReactNode } from 'react'
import { motion, TargetAndTransition, VariantLabels, Transition } from 'framer-motion'

interface SimpleCardProps {
  // Animation
  initial?: boolean | TargetAndTransition | VariantLabels
  animate?: boolean | TargetAndTransition | VariantLabels
  transition?: Transition
  
  // Content
  icon?: React.ComponentType<{ size: number; className: string }>
  title: string
  subtitle?: string
  period?: string
  description?: string
  
  // Content sections
  children?: ReactNode
  
  // Styling
  className?: string
}

export const SimpleCard: React.FC<SimpleCardProps> = ({
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.6 },
  icon: IconComponent,
  title,
  subtitle,
  period,
  description,
  children,
  className = ''
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}
    >
      <div className={`flex flex-col md:flex-row md:items-center md:justify-between mb-4 ${!IconComponent && className.includes('text-center') ? 'text-center' : ''}`}>
        <div className={`flex items-center gap-3 ${!IconComponent && className.includes('text-center') ? 'justify-center w-full' : ''}`}>
          {IconComponent && (
            <IconComponent className="text-blue-600 dark:text-blue-400" size={24} />
          )}
          <div className={!IconComponent && className.includes('text-center') ? 'text-center' : ''}>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h4>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
        </div>
        {period && (
          <div className="mt-2 md:mt-0">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-3 py-1 rounded-full">
              {period}
            </span>
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
      )}
      
      {children}
    </motion.div>
  )
}

export default SimpleCard
