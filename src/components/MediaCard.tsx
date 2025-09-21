import React from 'react';
import { TagList } from './TagList';
import { YouTubeEmbed } from './YouTubeEmbed';
import { ExternalLink } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import { getTypeIcon } from '../utils/icons';


interface BaseMediaCardProps {
  title: string;
  description: string;
  date: string;
  venue: string;
  tags: string[];
  typeColor: string;
  typeLabel: string;
  type?: string;
}

interface ImageMediaCardProps extends BaseMediaCardProps {
  mediaType: 'image';
  imageUrl: string;
  externalUrl?: string;
}

interface VideoMediaCardProps extends BaseMediaCardProps {
  mediaType: 'video';
  videoId: string;
}

interface TextMediaCardProps extends BaseMediaCardProps {
  mediaType: 'text';
  externalUrl?: string;
}

type MediaCardProps = ImageMediaCardProps | VideoMediaCardProps | TextMediaCardProps;

export const MediaCard: React.FC<MediaCardProps> = (props) => {
  const {
    title,
    description,
    date,
    venue,
    tags,
    typeColor,
    typeLabel,
    mediaType,
    type
  } = props;

  const renderMedia = () => {
    switch (mediaType) {
      case 'image':
        const imageProps = props as ImageMediaCardProps;
        return (
          <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
            <img
              src={imageProps.imageUrl}
              alt={title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            {imageProps.externalUrl && (
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center group">
                <a
                  href={imageProps.externalUrl}
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
        );

      case 'video':
        const videoProps = props as VideoMediaCardProps;
        return (
          <YouTubeEmbed
            videoId={videoProps.videoId}
            title={title}
            className="w-full"
          />
        );

      case 'text':
        const textProps = props as TextMediaCardProps;
        const IconComponent = getTypeIcon(type || 'default');
        return (
          <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <IconComponent size={64} className="text-gray-600 dark:text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{typeLabel}</h3>
              {textProps.externalUrl ? (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Click to view external content</p>
                  <a
                    href={textProps.externalUrl}
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
        );

      default:
        return null;
    }
  };

  const getExternalUrl = () => {
    if (mediaType === 'image') {
      return (props as ImageMediaCardProps).externalUrl;
    }
    if (mediaType === 'text') {
      return (props as TextMediaCardProps).externalUrl;
    }
    return undefined;
  };

  const externalUrl = getExternalUrl();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 p-6">
        <div className="order-2 lg:order-1">
          {renderMedia()}
        </div>

        <div className="order-1 lg:order-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${typeColor}`}>
              {typeLabel}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>

          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p className="font-medium">{venue}</p>
            <p>{formatDate(date)}</p>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>

          {externalUrl && (
            <div className="pt-2">
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ExternalLink size={16} />
                {mediaType === 'image' ? `Read Full ${typeLabel}` :
                 mediaType === 'text' ? `Access ${typeLabel}` :
                 `View ${typeLabel}`}
              </a>
            </div>
          )}

          <TagList title="Topics" tags={tags} defaultType="technology" />
        </div>
      </div>
    </div>
  );
};