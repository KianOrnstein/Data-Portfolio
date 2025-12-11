'use client'

import { useEffect } from 'react'
import GlassCard from './GlassCard'
import ExternalLink from './ExternalLink'
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'

interface BlogModalProps {
  post: BlogPost | null
  onClose: () => void
}

const categoryColors: Record<string, string> = {
  'Market Analysis': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Python Tips': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Data Science': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Finance': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden'
    }
    return () => { 
      document.body.style.overflow = 'unset'
    }
  }, [post])

  if (!post) return null

  const categoryStyle = categoryColors[post.category] || 'bg-white/10 text-white/60 border-white/20'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
      <GlassCard className="relative z-10 max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white text-2xl sm:text-3xl z-20 w-10 h-10 flex items-center justify-center">×</button>
        
        <div className="mb-4">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border relative inline-block ${categoryStyle}`} style={{ backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)' }}>
            {post.category}
          </span>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-lg bg-white/10 text-white/70 border border-white/20">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 pr-8">{post.title}</h2>
        <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6">
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">Preview</h3>
          <div className="glass-subtle rounded-xl p-3 sm:p-4 text-white/80 leading-relaxed text-sm sm:text-base" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
            {post.preview ? (
              <div className="prose prose-invert max-w-none prose-sm sm:prose-base" dangerouslySetInnerHTML={{ __html: post.preview }} />
            ) : (
              <p className="text-white/70">{post.excerpt}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {post.externalUrl ? (
            <ExternalLink href={post.externalUrl} type="blog" title={post.title} className="flex-1 glass rounded-xl px-6 py-3 text-white font-semibold text-center hover:border-white/30 transition-colors" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
              Read More ↗
            </ExternalLink>
          ) : (
            <Link href={`/blog/${post.slug}`} className="flex-1 glass rounded-xl px-6 py-3 text-white font-semibold text-center hover:border-white/30 transition-colors" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
              Read More →
            </Link>
          )}
        </div>
      </GlassCard>
    </div>
  )
}

