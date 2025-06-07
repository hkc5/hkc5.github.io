import React from 'react';
import { Card } from '../components/Card';
import { VideoCard } from '../components/VideoCard';
import { ImageCard } from '../components/ImageCard';
import { TextCard } from '../components/TextCard';
import { getTypeColor, getMediaTypeLabel, buttonStyles, cardStyles, pageStyles } from '../utils/theme';
import mediaData from '../content/media.json';

interface MediaItem {
  id: string;
  cardType: 'video' | 'image' | 'text';
  type: 'talk' | 'interview' | 'collaboration' | 'article' | 'podcast' | 'video' | 'featured';
  title: string;
  description: string;
  date: string;
  venue: string;
  // Optional media content
  videoId?: string;          // YouTube video ID
  imageUrl?: string;         // Image URL for articles, photos, etc.
  externalUrl?: string;      // External link for articles, podcasts, etc.
  tags: string[];
}

// Sample media data - replace with actual content
const Media: React.FC = () => {
  const renderMediaCard = (item: MediaItem) => {
    const typeColor = getTypeColor(item.type);
    const typeLabel = getMediaTypeLabel(item.type);

    switch (item.cardType) {
      case 'video':
        return (
          <VideoCard
            key={item.id}
            title={item.title}
            description={item.description}
            date={item.date}
            venue={item.venue}
            videoId={item.videoId || ''}
            tags={item.tags}
            typeColor={typeColor}
            typeLabel={typeLabel}
          />
        );
      case 'image':
        return (
          <ImageCard
            key={item.id}
            title={item.title}
            description={item.description}
            date={item.date}
            venue={item.venue}
            imageUrl={item.imageUrl || ''}
            externalUrl={item.externalUrl}
            tags={item.tags}
            typeColor={typeColor}
            typeLabel={typeLabel}
          />
        );
      case 'text':
        return (
          <TextCard
            key={item.id}
            title={item.title}
            description={item.description}
            date={item.date}
            venue={item.venue}
            externalUrl={item.externalUrl}
            type={item.type}
            tags={item.tags}
            typeColor={typeColor}
            typeLabel={typeLabel}
          />
        );
      default:
        return null;
    }
  };

  const sortedMedia = (mediaData as MediaItem[]).sort((a: MediaItem, b: MediaItem) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.maxWidth}>
        {/* Header */}
        <div className={pageStyles.header}>
          <h1 className={pageStyles.title}>
            Media & Speaking
          </h1>
          <p className={pageStyles.description}>
            A collection of my public speaking engagements, video collaborations, talks, and interviews 
            covering topics in data science, healthcare technology, and AI ethics.
          </p>
        </div>

        {/* Media Grid */}
        <div className={pageStyles.grid}>
          {sortedMedia.map((item: MediaItem) => renderMediaCard(item))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card title="Speaking Opportunities" className={cardStyles.callToAction}>
            <div className="py-8">
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Interested in having me speak at your event or collaborate on a project? 
                I'd love to discuss opportunities to share insights on data science, healthcare technology, and AI ethics.
              </p>
              <a
                href="/contact"
                className={buttonStyles.primary}
              >
                Get in Touch
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Media;
