'use client'

import { trackExternalClick, getAffiliateUrl } from '@/lib/affiliate'

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  type: 'blog' | 'project'
  title: string
  className?: string
  style?: React.CSSProperties
}

export default function ExternalLink({ href, children, type, title, className, style }: ExternalLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    trackExternalClick(href, type, title)
    const affiliateUrl = getAffiliateUrl(href)
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <a href={href} onClick={handleClick} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {children}
    </a>
  )
}

