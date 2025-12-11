import { getBlogPosts } from '@/lib/blog'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import CanvasBackground from '@/components/CanvasBackground'
import BlogList from '@/components/BlogList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - All Posts',
  description: 'Browse all blog posts about data science, finance, and Python tips',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="relative min-h-screen">
      <CanvasBackground />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 pt-32">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white/80 mb-6 sm:mb-8 transition-colors text-sm sm:text-base"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 text-center">All Blog Posts</h1>

        <BlogList posts={posts} />
      </div>
    </main>
  )
}

