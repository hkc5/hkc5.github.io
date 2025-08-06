import React from 'react';
import { TagList } from './TagList';
import { ExternalLink } from 'lucide-react';

interface ImageCardProps {
  title: string;
  description: string;
  date: string;
  venue: string;
  imageUrl: string;
  externalUrl?: string;
  tags: string[];
  typeColor: string;
  typeLabel: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  title,
  description,
  date,
  venue,
  imageUrl,
  externalUrl,
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 p-6">
        {/* Image */}
        <div className="order-2 lg:order-1">
          <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
            <img
              src={imageUrl}
              alt={title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            {externalUrl && (
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center group">
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-50"
                >
                  <ExternalLink size={16} />
                  View {typeLabel}
                </a>
              </div>
            )}
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
                Read Full {typeLabel}
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
