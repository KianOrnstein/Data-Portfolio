'use client'

import { useEffect } from 'react'
import { getAssetPath } from '@/lib/paths'

export default function PreloadAssets() {
  useEffect(() => {
    // Preload critical images
    const profileImageSrc = getAssetPath('profile.jpg')
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = profileImageSrc
    document.head.appendChild(link)

    return () => {
      // Cleanup
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  return null
}

