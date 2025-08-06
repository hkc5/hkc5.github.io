import React from 'react';
import { YouTubeEmbed } from './YouTubeEmbed';
import { TagList } from './TagList';

interface VideoCardProps {
  title: string;
  description: string;
  date: string;
  venue: string;
  videoId: string;
  tags: string[];
  typeColor: string;
  typeLabel: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  title,
  description,
  date,
  venue,
  videoId,
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
        {/* Video Embed */}
        <div className="order-2 lg:order-1">
          <YouTubeEmbed 
            videoId={videoId} 
            title={title}
            className="w-full"
          />
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

          {/* Tags */}
          <TagList title="Topics" tags={tags} defaultType="technology" />
        </div>
      </div>
    </div>
  );
};
