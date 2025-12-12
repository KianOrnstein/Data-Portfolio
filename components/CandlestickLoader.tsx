'use client'

import { useEffect, useState } from 'react'

interface CandlestickProps {
  height: number
  color: 'green' | 'red'
  delay: number
}

function Candlestick({ height, color, delay }: CandlestickProps) {
  const [animatedHeight, setAnimatedHeight] = useState(0)

  useEffect(() => {
    // Start animation with delay - faster animation
    const timer = setTimeout(() => {
      setAnimatedHeight(height)
    }, delay)

    return () => clearTimeout(timer)
  }, [height, delay])

  const bodyColor = color === 'green' 
    ? 'bg-gradient-to-t from-green-500 via-green-400 to-green-300' 
    : 'bg-gradient-to-t from-red-500 via-red-400 to-red-300'
  
  const wickColor = color === 'green'
    ? 'bg-green-300'
    : 'bg-red-300'

  const glowColor = color === 'green'
    ? 'rgba(34, 197, 94, 0.5)'
    : 'rgba(239, 68, 68, 0.5)'

  // Mobile optimized sizes
  const bodyWidth = '16px' // Smaller on mobile
  const glowWidth = '20px'
  const minHeight = 10

  return (
    <div className="flex flex-col items-center justify-end h-24 sm:h-32 md:h-40 relative">
      {/* Glow effect - optimized for mobile */}
      <div
        className="absolute bottom-0 rounded-sm blur-sm transition-all ease-out"
        style={{
          width: glowWidth,
          height: `${Math.max(animatedHeight * 1.2, minHeight + 2)}px`,
          background: glowColor,
          opacity: 0.6,
          transitionDelay: `${delay}ms`,
          transitionDuration: '500ms',
          willChange: 'height', // Performance optimization
        }}
      />
      
      {/* Wick (bấc nến) */}
      <div 
        className={`${wickColor} w-0.5 transition-all ease-out relative z-10`}
        style={{ 
          height: `${Math.max(animatedHeight * 0.15, 6)}px`,
          transitionDelay: `${delay}ms`,
          transitionDuration: '500ms',
          willChange: 'height',
        }}
      />
      
      {/* Body (thân nến) - use transform for better performance */}
      <div
        className={`${bodyColor} rounded-sm transition-all ease-out shadow-lg relative z-10`}
        style={{
          width: bodyWidth,
          height: `${Math.max(animatedHeight, minHeight)}px`,
          transitionDelay: `${delay}ms`,
          transitionDuration: '500ms',
          boxShadow: `0 0 8px ${glowColor}, 0 1px 3px rgba(0, 0, 0, 0.3)`,
          willChange: 'height',
        }}
      />
    </div>
  )
}

export default function CandlestickLoader() {
  const [heights, setHeights] = useState([30, 50, 40])
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const animate = () => {
      // Generate random heights between 25-75% for variety
      // Make them look more realistic (not too extreme)
      const newHeights = [
        Math.random() * 50 + 25,
        Math.random() * 50 + 25,
        Math.random() * 50 + 25,
      ]
      
      // Reset to small heights and animate to new heights smoothly
      setHeights([6, 6, 6])
      setTimeout(() => {
        setHeights(newHeights)
      }, 30) // Faster reset
    }

    // Start animating immediately
    setIsAnimating(true)
    
    // Initial animation after a very short delay
    const initialTimer = setTimeout(() => {
      animate()
    }, 100) // Faster initial start

    // Loop animation every 1.2 seconds for faster continuous effect
    const interval = setInterval(() => {
      if (isAnimating) {
        animate()
      }
    }, 1200) // Faster loop (was 1800ms)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [isAnimating])

  // Mobile optimized spacing
  return (
    <div className="flex items-end justify-center gap-3 sm:gap-5 md:gap-7 h-24 sm:h-32 md:h-40">
      <Candlestick 
        height={heights[0]} 
        color="green" 
        delay={0}
      />
      <Candlestick 
        height={heights[1]} 
        color="red" 
        delay={50} // Faster delay
      />
      <Candlestick 
        height={heights[2]} 
        color="green" 
        delay={100} // Faster delay
      />
    </div>
  )
}

