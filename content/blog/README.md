# Blog Post Guide

## How to Create a New Blog Post

1. Copy `BLOG_TEMPLATE.md` and rename it to your desired slug (e.g., `my-new-post.md`)
2. Fill in the frontmatter with your post details:

### Required Fields:
- `title`: Your blog post title
- `date`: Publication date in format "YYYY-MM-DD"
- `excerpt`: A brief one-sentence summary (appears on blog cards)
- `category`: One of: "Market Analysis", "Python Tips", "Data Science", "Finance", or any custom category

### Optional Fields:
- `tags`: Array of tags (e.g., `["Python", "Data Science", "Finance"]`)
- `externalUrl`: URL to your Blogger/Substack post (if you want to redirect there)
- `preview`: Detailed preview content (2-3 paragraphs) that appears in the modal. Supports Markdown formatting.

### Example Frontmatter:

```yaml
---
title: "Your Blog Post Title"
date: "2024-12-20"
excerpt: "A brief one-sentence summary of your blog post."
category: "Python Tips"
tags: ["Python", "Data Science", "Finance"]
externalUrl: "https://your-blogger-or-substack-url.com/your-post-slug"
preview: "This is the preview content that will appear in the modal when users click on the blog card. You can write a detailed summary here (2-3 paragraphs recommended). This content will be displayed as HTML, so you can use markdown formatting."
---
```

## How It Works

1. **Blog Card**: Shows title, category, tags (first 3), date, and excerpt
2. **Click on Card**: Opens a modal with:
   - Full title and category
   - All tags
   - Publication date
   - Preview content (or excerpt if no preview)
   - "Read More" button
3. **Read More Button**:
   - If `externalUrl` is set: Redirects to your Blogger/Substack URL (with affiliate tracking)
   - If no `externalUrl`: Redirects to `/blog/[slug]` for full post

## Tips

- Use `preview` field to give readers a compelling summary that encourages them to click "Read More"
- Add relevant `tags` to help with categorization and search
- If you're publishing on Blogger/Substack, always set `externalUrl` to earn affiliate revenue
- The preview supports Markdown, so you can use formatting like **bold**, *italic*, lists, etc.

