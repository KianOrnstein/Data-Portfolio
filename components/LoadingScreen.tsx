'use client'

import { useEffect, useState } from 'react'
import { getAssetPath } from '@/lib/paths'
import CandlestickLoader from './CandlestickLoader'

export default function LoadingScreen({ onLoadComplete }: { onLoadComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Loading assets...')

  useEffect(() => {
    const loadAssets = async () => {
      // Wait for document to be ready (faster check)
      if (document.readyState !== 'complete') {
        await new Promise<void>((resolve) => {
          if (document.readyState === 'complete') {
            resolve()
          } else {
            window.addEventListener('load', () => resolve(), { once: true })
            // Timeout to prevent hanging
            setTimeout(() => resolve(), 2000)
          }
        })
      }

      setProgress(40)
      setStatus('Loading images...')

      // Preload critical assets
      const criticalAssets = [
        getAssetPath('profile.jpg'),
      ]

      // Load profile image
      const loadImage = (src: string): Promise<void> => {
        return new Promise((resolve) => {
          const img = new Image()
          // Set timeout for faster fallback
          const timeout = setTimeout(() => resolve(), 1000)
          img.onload = () => {
            clearTimeout(timeout)
            setProgress((prev) => Math.max(prev, 80))
            resolve()
          }
          img.onerror = () => {
            clearTimeout(timeout)
            resolve() // Continue even if image fails
          }
          img.src = src
        })
      }

      // Load all critical images
      await Promise.allSettled(criticalAssets.map(loadImage))
      
      setProgress(95)
      setStatus('Almost ready...')

      // Shorter wait for CSS and JS to be fully parsed
      await new Promise(resolve => setTimeout(resolve, 100))

      setProgress(100)

      // Faster transition delay
      setTimeout(() => {
        onLoadComplete()
      }, 200)
    }

    loadAssets()
  }, [onLoadComplete])

  // Faster progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev
        return prev + Math.random() * 15 // Faster increment
      })
    }, 80) // Faster interval

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(43, 77, 172, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(88, 28, 135, 0.15) 0%, transparent 50%),
          linear-gradient(180deg, #000000 0%, #0a0a0a 100%)
        `,
      }}
    >
      <div className="text-center px-3 sm:px-4 max-w-full">
        {/* Candlestick Loader - Mobile optimized spacing */}
        <div className="mb-6 sm:mb-8">
          <CandlestickLoader />
        </div>

        {/* Progress bar - Mobile optimized */}
        <div className="w-56 sm:w-72 md:w-80 mx-auto mb-3 sm:mb-4">
          <div className="w-full h-0.5 sm:h-1 bg-white/10 rounded-full overflow-hidden" 
               style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-200 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Status text - Mobile optimized */}
        <p className="text-white/60 text-xs sm:text-sm md:text-base px-2">
          {status}
        </p>

        {/* Animated dots - Mobile optimized */}
        <div className="flex justify-center gap-1 sm:gap-1.5 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '100ms' }} />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '200ms' }} />
        </div>
      </div>
    </div>
  )
}

