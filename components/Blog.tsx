'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import GlassCard from './GlassCard'
import { BlogPost } from '@/lib/blog'
import { useState } from 'react'
import BlogModal from './BlogModal'
import Link from 'next/link'

interface BlogProps {
  posts: BlogPost[]
}

const categoryColors: Record<string, string> = {
  'Market Analysis': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Python Tips': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Data Science': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Finance': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
}

function BlogCard({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  const categoryStyle = categoryColors[post.category] || 'bg-white/10 text-white/60 border-white/20'

  return (
    <div onClick={onClick} className="cursor-pointer">
      <GlassCard hover>
        <div className="mb-3">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border relative inline-block ${categoryStyle}`} style={{ backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }}>
            {post.category}
          </span>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {post.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60 border border-white/20">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-white/50 text-xs mb-3">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className="text-white/70 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
        <span className="text-sm font-medium text-white/80 hover:text-white transition-colors">
          Preview →
        </span>
      </GlassCard>
    </div>
  )
}

export default function Blog({ posts }: BlogProps) {
  const { t } = useLanguage()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  if (posts.length === 0) {
    return (
      <section id="blog" className="py-24 px-6 pt-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">{t('blog.title')}</h2>
          <div className="text-center text-white/60"><p>No blog posts available yet. Check back soon!</p></div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 pt-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {t('blog.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.slice(0, 6).map((post) => <BlogCard key={post.slug} post={post} onClick={() => setSelectedPost(post)} />)}
        </div>
        <div className="text-center mt-12">
          <Link href="/blog" className="inline-block glass rounded-xl px-8 py-3 text-white font-semibold hover:border-white/30 transition-colors" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
            View All Posts →
          </Link>
        </div>
      </div>
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  )
}
