import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  iconSize?: number;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  className = "inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors",
  showIcon = true,
  iconSize = 16
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {showIcon && <ExternalLinkIcon size={iconSize} />}
      {children}
    </a>
  );
};