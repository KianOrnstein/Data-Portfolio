'use client'

import { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadComplete = () => {
    setIsLoading(false)
    // Small delay before showing content for smooth fade-in
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      <div
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ visibility: showContent ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
    </>
  )
}

