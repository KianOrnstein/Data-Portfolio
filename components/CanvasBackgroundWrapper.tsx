'use client'

import dynamic from 'next/dynamic'

// Lazy load CanvasBackground to improve initial compilation
const CanvasBackground = dynamic(() => import('@/components/CanvasBackground'), {
  ssr: false,
  loading: () => null,
})

export default function CanvasBackgroundWrapper() {
  return <CanvasBackground />
}

