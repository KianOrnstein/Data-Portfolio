/**
 * Helper functions for affiliate link tracking and monetization
 * You can integrate with services like:
 * - Google Analytics
 * - Affiliate networks (Amazon Associates, etc.)
 * - Link shorteners with monetization (AdFly, etc.)
 */

export function trackExternalClick(url: string, type: 'blog' | 'project', title: string) {
  if (typeof window === 'undefined') return

  // Track click event (you can integrate with analytics)
  try {
    // Example: Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'external_link_click', {
        link_url: url,
        link_type: type,
        link_title: title,
      })
    }

    // Example: Custom analytics endpoint
    // fetch('/api/track-click', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ url, type, title, timestamp: Date.now() })
    // })

    // Log for debugging
    console.log(`External link clicked: ${title} -> ${url}`)
  } catch (error) {
    console.error('Error tracking click:', error)
  }
}

/**
 * Wrap URL with affiliate link if needed
 * Example: Convert to affiliate link or monetized short link
 */
export function getAffiliateUrl(originalUrl: string): string {
  // Option 1: Use affiliate link service
  // return `https://your-affiliate-service.com/redirect?url=${encodeURIComponent(originalUrl)}`
  
  // Option 2: Use link shortener with monetization
  // return `https://your-shortener.com/abc123`
  
  // Option 3: Add UTM parameters for tracking
  const url = new URL(originalUrl)
  url.searchParams.set('utm_source', 'portfolio')
  url.searchParams.set('utm_medium', 'referral')
  url.searchParams.set('utm_campaign', 'blog_project')
  return url.toString()
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

