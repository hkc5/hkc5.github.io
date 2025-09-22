import React from 'react';
import { Card } from '../components/Card';
import { MediaCard } from '../components/MediaCard';
import { getTypeColor, getMediaTypeLabel, buttonStyles, cardStyles, DESCRIPTION_STYLE, animations, pageStyles } from '../utils/theme';
import mediaData from '../content/media.json';
import { PageLayout } from '../components/PageLayout';

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
  const renderMediaCard = (item: MediaItem, index: number) => {
    const typeColor = getTypeColor(item.type);
    const typeLabel = getMediaTypeLabel(item.type);

    const baseProps = {
      key: item.id,
      title: item.title,
      description: item.description,
      date: item.date,
      venue: item.venue,
      tags: item.tags,
      typeColor: typeColor,
      typeLabel: typeLabel,
      type: item.type,
      ...animations.fadeInWithDelay(index)
    };

    switch (item.cardType) {
      case 'video':
        return (
          <MediaCard
            {...baseProps}
            mediaType="video"
            videoId={item.videoId || ''}
          />
        );
      case 'image':
        return (
          <MediaCard
            {...baseProps}
            mediaType="image"
            imageUrl={item.imageUrl || ''}
            externalUrl={item.externalUrl}
          />
        );
      case 'text':
        return (
          <MediaCard
            {...baseProps}
            mediaType="text"
            externalUrl={item.externalUrl}
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
    <PageLayout
      title="Media & Speaking"
      description="A collection of my public speaking engagements, video collaborations, talks, and interviews covering topics in data science, healthcare technology, and AI ethics."
    >
      {/* Media Grid */}
      <div>
          {sortedMedia.map((item: MediaItem, index) => (
            <div key={item.id} className={index > 0 ? pageStyles.cardSpacing : ""}>
              {renderMediaCard(item, index)}
            </div>
          ))}
      </div>

      {/* Call to Action */}
      <div className={pageStyles.callToActionSection}>
        <Card title="Speaking Opportunities" className={cardStyles.callToAction}>
          <div className="py-4">
            <p className={`${DESCRIPTION_STYLE} mb-4 max-w-2xl mx-auto`}>
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
    </PageLayout>
  );
};

export default Media;
