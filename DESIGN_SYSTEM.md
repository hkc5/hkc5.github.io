# Design System Documentation

This document outlines the centralized design system implemented to ensure consistency across the website.

## Overview

The design system is centralized in `/src/utils/theme.ts` and provides consistent styling tokens for:
- Typography (font sizes, weights, semantic text styles)
- Colors (text, background, interactive states)
- Spacing and layout
- Component styles
- Animations

## Key Benefits

✅ **Consistent Typography**: All text sizes and styles are now standardized
✅ **Color Consistency**: Unified color palette across all components
✅ **Maintainability**: Single source of truth for design tokens
✅ **Type Safety**: Full TypeScript support with intellisense
✅ **Scalability**: Easy to add new design tokens and update existing ones

## Typography System

### Semantic Text Styles
- `typography.text.pageTitle` - Main page headings (5xl, bold)
- `typography.text.sectionTitle` - Section headings (3xl, bold)
- `typography.text.sectionTitleAccent` - Accent section headings (3xl, bold, blue)
- `typography.text.cardTitle` - Card titles (2xl, bold)
- `typography.text.subtitle` - Subtitles (xl, semibold)
- `typography.text.description` - Main descriptions (lg)
- `typography.text.body` - Body text (base)
- `typography.text.bodySecondary` - Secondary text (sm)

### Hero Section Specific
- `typography.text.heroTitle` - Hero main title (4xl sm:6xl, bold)
- `typography.text.heroSubtitle` - Hero subtitle (xl sm:2xl)
- `typography.text.heroDescription` - Hero description (lg)

## Color System

### Text Colors
- `colors.text.primary` - Main text color
- `colors.text.secondary` - Secondary text color
- `colors.text.tertiary` - Tertiary text color
- `colors.text.accent` - Accent text color (blue)
- `colors.text.accentHover` - Accent hover state

### Interactive Colors
- `colors.interactive.primary` - Primary buttons
- `colors.interactive.secondary` - Secondary buttons
- `colors.interactive.outline` - Outline buttons
- `colors.interactive.accent` - Links and accent interactions

### Background Colors
- `colors.background.page` - Page background
- `colors.background.card` - Card background
- `colors.background.glass` - Glass morphism background

## Component Styles

### Buttons
- `components.button.primary` - Primary action buttons
- `components.button.secondary` - Secondary buttons
- `components.button.outline` - Outline buttons
- `components.button.ghost` - Ghost buttons

### Cards
- `components.card.base` - Standard card styling
- `components.card.glass` - Glass morphism card styling
- `components.card.content` - Card content padding

### Badges
- `components.badge.base` - Base badge styling
- `components.badge.tech` - Technology badges
- `components.badge.achievement` - Achievement badges

## Layout System

### Page Templates
- `pageTemplates.standard` - Standard page layout
- `pageTemplates.media` - Media page layout
- `pageTemplates.home` - Home page layout

### Grid Systems
- `layout.grid.single` - Single column
- `layout.grid.twoColumn` - Two column responsive
- `layout.grid.cards` - Card grid layout

## Animation System

### Motion Variants
- `animations.motion.fadeInUp` - Fade in from bottom
- `animations.motion.fadeInWithDelay(index)` - Staggered fade in
- `animations.motion.hover.scale` - Scale on hover
- `animations.motion.hover.lift` - Lift on hover

## Usage Examples

### Before (Inconsistent)
```tsx
<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
<h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">
<p className="text-lg text-gray-600 dark:text-gray-300">
```

### After (Consistent)
```tsx
<h1 className={typography.text.pageTitle}>
<h2 className={typography.text.sectionTitleAccent}>
<p className={typography.text.description}>
```

### Component Usage
```tsx
import { typography, colors, components, pageTemplates } from '../utils/theme'

// Page structure
<div className={pageTemplates.standard.container}>
  <div className={pageTemplates.standard.wrapper}>
    <h1 className={pageTemplates.standard.title}>
    <p className={pageTemplates.standard.description}>

    // Buttons
    <button className={components.button.primary}>
    <a className={colors.interactive.accent}>
  </div>
</div>
```

## Migration Strategy

The design system was implemented with backward compatibility:

1. **New components** should import and use design constants directly
2. **Existing components** can gradually migrate by importing design constants
3. **Legacy theme.ts** re-exports design constants for compatibility

## Files Updated

### Core Design System
- ✅ `/src/utils/theme.ts` - Consolidated design system with all constants

### All Pages Updated
- ✅ `/src/pages/Home.tsx` - Updated with typography, components, and animations
- ✅ `/src/pages/About.tsx` - Updated section titles and text styles
- ✅ `/src/pages/Publications.tsx` - Updated section titles and metrics
- ✅ `/src/pages/Experience.tsx` - Updated section titles
- ✅ `/src/pages/Projects.tsx` - Updated typography
- ✅ `/src/pages/Education.tsx` - Updated section titles
- ✅ `/src/pages/Awards.tsx` - Updated section and card titles
- ✅ `/src/pages/Media.tsx` - Updated description text
- ✅ `/src/pages/Contact.tsx` - Updated headings, labels, and text

## Next Steps

1. **Component Library**: Create reusable UI components using design system
2. **Documentation**: Add Storybook or similar for component documentation
3. **Design Tokens**: Consider JSON format for design tokens if needed for external tools
4. **Theme Variants**: Add support for multiple theme variants (e.g., different color schemes)
5. **Further Optimization**: Continue refining and expanding the design system as needed

## Verification

✅ Build passes without errors
✅ All 9 pages updated with consistent typography
✅ Single source of truth in `/src/utils/theme.ts`
✅ Design tokens are properly typed
✅ No redundant files (removed `/src/constants/design.ts`)
✅ All imports consolidated to theme.ts

## Summary

The design system consolidation is **complete**! All pages now use consistent:
- **Typography**: Semantic text styles (pageTitle, sectionTitle, etc.)
- **Colors**: Unified color palette for text, backgrounds, and interactions
- **Components**: Standardized button, card, and input styles
- **Layout**: Page templates and grid systems
- **Animations**: Motion variants and transitions

The website now has a single, maintainable source of truth for all design decisions, making it easy to maintain consistency and implement future design changes efficiently.