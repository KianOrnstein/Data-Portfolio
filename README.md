# Professional Portfolio - Finance & Data Professional

A high-performance personal portfolio website built with Next.js, featuring a modern glassmorphism design and a blog section for finance and data professionals.

## Features

- **Apple-Style Glassmorphism Design**: Premium, clean, futuristic interface with glass effects
- **Dynamic Canvas Background**: Animated candlestick charts (financial market data) in the background
- **Blog Section**: Markdown-based blog with category badges and excerpts
- **Internationalization**: English (EN) and Vietnamese (VN) language support
- **Performance Optimized**: Static Site Generation (SSG) for instant loading
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown files with gray-matter
- **Markdown Processing**: remark & remark-html

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── blog/[slug]/     # Individual blog post pages
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── Blog.tsx         # Blog section component
│   ├── CanvasBackground.tsx  # Animated candlestick background
│   ├── Contact.tsx      # Contact form
│   ├── Experience.tsx  # Experience timeline
│   ├── GlassCard.tsx   # Reusable glass card component
│   ├── Hero.tsx        # Hero section
│   ├── Navigation.tsx  # Navigation header
│   └── Projects.tsx    # Projects grid
├── content/
│   └── blog/           # Markdown blog posts
├── contexts/
│   └── LanguageContext.tsx  # i18n context
└── lib/
    └── blog.ts         # Blog utilities
```

## Adding Blog Posts

Create a new markdown file in `content/blog/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief excerpt of your post"
category: "Market Analysis" | "Python Tips" | "Data Science" | "Finance"
---

Your markdown content here...
```

## Customization

- **Colors**: Modify Tailwind classes in components
- **Content**: Update components with your own information
- **Blog Categories**: Add new categories in `components/Blog.tsx`
- **Translations**: Update `contexts/LanguageContext.tsx`

## Performance

- Static Site Generation (SSG) for all pages
- Optimized canvas animations
- Minimal JavaScript bundle
- Fast page loads

## License

MIT

