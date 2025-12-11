'use client'

import Link from 'next/link'
import GlassCard from './GlassCard'
import BlogModal from './BlogModal'
import { useState } from 'react'
import { BlogPost } from '@/lib/blog'

const categoryColors: Record<string, string> = {
  'Market Analysis': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Python Tips': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Data Science': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Finance': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
}

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post) => {
          const categoryStyle = categoryColors[post.category] || 'bg-white/10 text-white/60 border-white/20'
          return (
            <div key={post.slug} onClick={() => setSelectedPost(post)} className="cursor-pointer">
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
        })}
      </div>
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </>
  )
}

