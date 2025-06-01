import React from 'react'

interface BulletListProps {
  title: string
  items: string[]
  bulletColor?: string
  className?: string
}

export const BulletList: React.FC<BulletListProps> = ({
  title,
  items,
  bulletColor = 'text-blue-500',
  className = ''
}) => {
  return (
    <div className={className}>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className={`${bulletColor} flex-shrink-0 mt-1`}>•</span>
            <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BulletList
