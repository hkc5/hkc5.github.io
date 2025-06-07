import React from 'react';
import { Card } from '../components/Card';
import { VideoCard } from '../components/VideoCard';
import { ImageCard } from '../components/ImageCard';
import { TextCard } from '../components/TextCard';
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
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'talk':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-green-100 text-green-800';
      case 'collaboration':
        return 'bg-purple-100 text-purple-800';
      case 'article':
        return 'bg-amber-100 text-amber-800';
      case 'podcast':
        return 'bg-rose-100 text-rose-800';
      case 'video':
        return 'bg-indigo-100 text-indigo-800';
      case 'featured':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'talk':
        return 'Talk';
      case 'interview':
        return 'Interview';
      case 'collaboration':
        return 'Collaboration';
      case 'article':
        return 'Article';
      case 'podcast':
        return 'Podcast';
      case 'video':
        return 'Video';
      case 'featured':
        return 'Featured';
      default:
        return type;
    }
  };

  const renderMediaCard = (item: MediaItem) => {
    const typeColor = getTypeColor(item.type);
    const typeLabel = getTypeLabel(item.type);

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Media & Speaking
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of my public speaking engagements, video collaborations, talks, and interviews 
            covering topics in data science, healthcare technology, and AI ethics.
          </p>
        </div>

        {/* Media Grid */}
        <div className="grid gap-8 lg:gap-12 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
          {sortedMedia.map((item: MediaItem) => renderMediaCard(item))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card title="Speaking Opportunities" className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="py-8">
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Interested in having me speak at your event or collaborate on a project? 
                I'd love to discuss opportunities to share insights on data science, healthcare technology, and AI ethics.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
