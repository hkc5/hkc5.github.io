import React from 'react'
import { cardStyles } from '../utils/theme'

interface Tag {
  label: string
  type?: 'technology' | 'achievement' | 'skill' | 'custom'
  className?: string
}

interface TagListProps {
  title: string
  tags: string[] | Tag[]
  defaultType?: 'technology' | 'achievement' | 'skill'
  className?: string
}

export const TagList: React.FC<TagListProps> = ({
  title,
  tags,
  defaultType = 'skill',
  className = ''
}) => {
  const getTagClassName = (tag: string | Tag, type: string) => {
    if (typeof tag === 'object' && tag.className) {
      return tag.className
    }
    
    switch (type) {
      case 'technology':
        return cardStyles.techTag
      case 'achievement':
        return cardStyles.achievementTag
      case 'skill':
      default:
        return cardStyles.skillTag + ' bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  const getTagLabel = (tag: string | Tag) => {
    return typeof tag === 'string' ? tag : tag.label
  }

  const getTagType = (tag: string | Tag) => {
    return typeof tag === 'object' ? tag.type || defaultType : defaultType
  }

  return (
    <div className={className}>
      <h4 className="text-lg font-semibold text-gray-950 dark:text-white mb-4">
        {title}
      </h4>
      <div className="space-y-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={getTagClassName(tag, getTagType(tag))}
          >
            {getTagLabel(tag)}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TagList
