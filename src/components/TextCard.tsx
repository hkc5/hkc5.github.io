import React from 'react';
import { TagList } from './TagList';
import { ExternalLink, FileText, Mic, Video, Image as ImageIcon } from 'lucide-react';

interface TextCardProps {
  title: string;
  description: string;
  date: string;
  venue: string;
  externalUrl?: string;
  type: string;
  tags: string[];
  typeColor: string;
  typeLabel: string;
}

export const TextCard: React.FC<TextCardProps> = ({
  title,
  description,
  date,
  venue,
  externalUrl,
  type,
  tags,
  typeColor,
  typeLabel
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'talk':
      case 'interview':
      case 'video':
        return Video;
      case 'article':
        return FileText;
      case 'podcast':
        return Mic;
      case 'featured':
        return ImageIcon;
      default:
        return ExternalLink;
    }
  };

  const IconComponent = getTypeIcon(type);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 p-6">
        {/* Icon/Visual Section */}
        <div className="order-2 lg:order-1">
          <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <IconComponent size={64} className="text-gray-600 dark:text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{typeLabel}</h3>
              {externalUrl ? (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Click to view external content</p>
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={16} />
                    View {typeLabel}
                  </a>
                </>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">Content available on request</p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2 space-y-4">
          {/* Type Badge */}
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${typeColor}`}>
              {typeLabel}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>

          {/* Venue and Date */}
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p className="font-medium">{venue}</p>
            <p>{formatDate(date)}</p>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>

          {/* External Link Button */}
          {externalUrl && (
            <div className="pt-2">
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ExternalLink size={16} />
                Access {typeLabel}
              </a>
            </div>
          )}

          {/* Tags */}
          <TagList title="Topics" tags={tags} defaultType="technology" />
        </div>
      </div>
    </div>
  );
};
