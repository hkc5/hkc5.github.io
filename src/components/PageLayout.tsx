import React from 'react';
import { pageStyles } from '../utils/theme';

interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  children
}) => {
  return (
    <div className={pageStyles.standardPage.container}>
      <div className={pageStyles.standardPage.wrapper}>
        <div className={pageStyles.standardPage.header}>
          <h1 className={pageStyles.standardPage.title}>
            {title}
          </h1>
          {description && (
            <p className={pageStyles.standardPage.description}>
              {description}
            </p>
          )}
        </div>
        <div className={pageStyles.standardPage.content}>
          {children}
        </div>
      </div>
    </div>
  );
};