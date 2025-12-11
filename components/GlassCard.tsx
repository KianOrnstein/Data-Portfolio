'use client'

import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export default function GlassCard({ children, className = '', hover = true, onClick }: GlassCardProps) {
  // Check if className contains overflow override
  const hasOverflowOverride = className.includes('overflow-visible') || className.includes('overflow-auto') || className.includes('overflow-y-auto')
  const overflowClass = hasOverflowOverride ? '' : 'overflow-hidden'
  
  return (
    <div
      onClick={onClick}
      className={`
        glass rounded-2xl p-6
        ${overflowClass}
        ${hover ? 'hover:border-white/35 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(255,255,255,0.08),0_12px_48px_0_rgba(0,0,0,0.5),0_0_30px_rgba(255,255,255,0.08)]' : ''}
        ${className}
      `}
      style={{
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      }}
    >
      {children}
    </div>
  )
}

