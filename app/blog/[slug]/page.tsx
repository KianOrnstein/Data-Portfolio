import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import GlassCard from '@/components/GlassCard'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import CanvasBackground from '@/components/CanvasBackground'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="relative min-h-screen">
      <CanvasBackground />
      <Navigation />
      <article className="max-w-4xl mx-auto px-6 py-24 pt-32">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white/80 mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        <GlassCard className="mb-6">
          <div className="mb-4">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-white/50 text-sm">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </GlassCard>

        <GlassCard>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </GlassCard>
      </article>
    </main>
  )
}
