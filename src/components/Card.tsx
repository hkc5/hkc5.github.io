import React, { ReactNode } from 'react'
import { motion, TargetAndTransition, VariantLabels, Transition } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { cardStyles, getTypeColor, getStatusColor } from '../utils/theme'

interface CardProps {
  // Animation
  initial?: boolean | TargetAndTransition | VariantLabels
  animate?: boolean | TargetAndTransition | VariantLabels
  transition?: Transition
  
  // Content
  icon?: React.ComponentType<{ size: number; className: string }>
  title: string
  subtitle?: string
  organization?: string
  location?: string
  period?: string
  description?: string
  
  // Badges
  type?: string
  status?: string
  customBadges?: Array<{
    label: string
    className: string
  }>
  
  // Content sections
  children?: ReactNode
  
  // Styling
  className?: string
}

export const Card: React.FC<CardProps> = ({
  initial = { opacity: 0, y: 30 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.6 },
  icon: IconComponent,
  title,
  subtitle,
  organization,
  location,
  period,
  description,
  type,
  status,
  customBadges = [],
  children,
  className = ''
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={`${cardStyles.base} ${className}`}
    >
      {/* Header */}
      <div className={cardStyles.header}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {IconComponent && (
              <IconComponent size={32} className="text-blue-600 dark:text-blue-400" />
            )}
            <div>
              <h3 className="text-xl font-bold mb-1 text-gray-950 dark:text-white">
                {title}
              </h3>
              {subtitle && (
                <p className="text-lg font-medium text-gray-800 dark:text-gray-300">
                  {subtitle}
                </p>
              )}
              {organization && (
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                  <MapPin size={16} />
                  <span>{organization}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                  <MapPin size={16} />
                  <span>{location}</span>
                </div>
              )}
              {period && (
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Calendar size={16} />
                  <span>{period}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Badges */}
          {(type || status || customBadges.length > 0) && (
            <div className="flex gap-2 items-center">
              {type && (
                <span className={`${cardStyles.badge} ${getTypeColor(type)}`}>
                  {type}
                </span>
              )}
              {status === 'current' && (
                <span className={`${cardStyles.badge} bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200`}>
                  Current
                </span>
              )}
              {status && status !== 'current' && (
                <div className={`w-3 h-3 ${getStatusColor(status)} rounded-full`}></div>
              )}
              {customBadges.map((badge, index) => (
                <span key={index} className={`${cardStyles.badge} ${badge.className}`}>
                  {badge.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={cardStyles.content}>
        {description && (
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </motion.div>
  )
}

export default Card
