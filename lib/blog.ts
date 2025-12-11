import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// Cache remark processor for better performance
const remarkProcessor = remark().use(html)

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  content: string
  externalUrl?: string
  tags?: string[]
  preview?: string
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter((name: string) => name.endsWith('.md'))
      .map(async (fileName: string) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        // Process preview content if exists (optimized with cached processor)
        let preview: string | undefined = undefined
        if (data.preview) {
          try {
            const processedPreview = await remarkProcessor.process(data.preview)
            preview = processedPreview.toString()
          } catch {
            preview = data.preview
          }
        } else if (content) {
          // Extract first paragraph as preview if no preview specified
          const firstParagraph = content.split('\n\n').find(p => p.trim().length > 0)
          if (firstParagraph) {
            try {
              const processedPreview = await remarkProcessor.process(firstParagraph.trim())
              preview = processedPreview.toString()
            } catch {
              preview = firstParagraph.trim()
            }
          }
        }

        return {
          slug,
          title: data.title || '',
          date: data.date || '',
          excerpt: data.excerpt || '',
          category: data.category || 'General',
          content,
          externalUrl: data.externalUrl || undefined,
          tags: data.tags ? (Array.isArray(data.tags) ? data.tags : [data.tags]) : undefined,
          preview: preview,
        }
      })
  )

  return allPostsData.sort((a: BlogPost, b: BlogPost) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remarkProcessor.process(content)
    const contentHtml = processedContent.toString()

    // Process preview
    let preview: string | undefined = undefined
    if (data.preview) {
      const processedPreview = await remarkProcessor.process(data.preview)
      preview = processedPreview.toString()
    }

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      category: data.category || 'General',
      content: contentHtml,
      externalUrl: data.externalUrl || undefined,
      tags: data.tags ? (Array.isArray(data.tags) ? data.tags : [data.tags]) : undefined,
      preview,
    }
  } catch (error) {
    return null
  }
}
