# Hakancan Ozturk - Personal Portfolio Website

Modern personal portfolio website built with React, TypeScript, and Tailwind CSS. Features interactive particle background, optimized performance, and comprehensive SEO implementation.

🌐 **Live Site**: [hakancanozturk.com](https://hakancanozturk.com)

## ✨ **Key Features**

- 🎨 **Interactive Particle Background** - Custom TypeScript physics engine
- 🚀 **Optimized Performance** - 128KB gzipped bundle, 91% image size reduction
- 🔍 **Complete SEO** - Meta tags, structured data, social media optimization
- 🌙 **Dark Mode Support** - Theme-aware design and particle system
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ⚡ **Fast Development** - Vite with HMR and TypeScript
- 🛠️ **CI/CD Pipeline** - Automated GitHub Actions deployment

## 🚀 **Quick Start**

```bash
# Clone the repository
git clone https://github.com/hkc5/hkc5.github.io.git
cd hkc5.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📊 **Performance Metrics**

- **Bundle Size**: 128KB gzipped (91% optimized)
- **Image Optimization**: 2.7MB → 287KB (WebP with PNG fallback)
- **Build Time**: ~3.17s
- **Lighthouse Score**: Optimized for performance and SEO

## 🛠️ **Tech Stack**

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4.x
- **Build Tool**: Vite 6.x
- **Deployment**: GitHub Pages with GitHub Actions
- **Code Quality**: ESLint + TypeScript strict mode

## 📁 **Project Structure**

```
hkc5.github.io/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ParticleBackground.tsx
│   │   ├── SEO.tsx
│   │   └── ...
│   ├── pages/              # Main page components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── content/            # JSON data files
├── public/                 # Static assets
│   ├── profile.webp        # Optimized profile image
│   ├── sitemap.xml         # SEO sitemap
│   └── robots.txt          # Search engine directives
├── project-management/     # 📋 Project documentation
│   ├── DEVELOPMENT_BACKLOG.md  # Complete changelog & roadmap
│   ├── TODO.md             # Active tasks
│   └── README.md           # Documentation guide
├── .github/workflows/      # CI/CD automation
│   └── deploy.yml          # GitHub Actions deployment
└── vite.config.ts          # Build configuration
```

## 📋 **Project Documentation**

Comprehensive project management documentation is available in the [`project-management/`](./project-management/) folder:

- **[Development Backlog](./project-management/DEVELOPMENT_BACKLOG.md)** - Complete changelog, performance metrics, and technical achievements
- **[TODO](./project-management/TODO.md)** - Active tasks and future enhancements

## 🎯 **Recent Achievements**

- ✅ Built custom particle physics system with theme integration
- ✅ Achieved 91% image size reduction (2.7MB → 287KB)
- ✅ Optimized bundle size by 13KB through build improvements
- ✅ Implemented comprehensive SEO with structured data
- ✅ Migrated SEO from static HTML to React components
- ✅ Organized project documentation and tracking system

## 🚀 **Deployment**

The website uses GitHub Actions for automated deployment to GitHub Pages:

- **Trigger**: Push to `main` branch or manual workflow dispatch
- **Process**: TypeScript validation → Vite build → Deploy to GitHub Pages
- **Pipeline**: Defined in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
- **Result**: Optimized static site served via GitHub Pages CDN

## 🤝 **Contributing**

This is a personal portfolio project, but feedback and suggestions are welcome! Feel free to:

- Open an issue for bug reports or feature suggestions
- Submit a pull request for improvements
- Check the [TODO list](./project-management/TODO.md) for potential contributions

## 📄 **License**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.

---

**Hakancan Ozturk** - Software Development Engineer at Amazon  
🔗 [LinkedIn](https://linkedin.com/in/hakancan) • [GitHub](https://github.com/hkc5) • [Website](https://hakancanozturk.com)