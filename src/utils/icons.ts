import { ExternalLink, FileText, Mic, Video, Image as ImageIcon, LucideIcon } from 'lucide-react';

export const getTypeIcon = (type: string): LucideIcon => {
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