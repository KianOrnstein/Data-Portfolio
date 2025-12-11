'use client'

import { useEffect, useRef, useState } from 'react'

interface TabIndicatorProps {
  activeIndex: number
  tabs: Array<{ id: string; label: string }>
  onTabChange: (index: number) => void
  isClickTriggered?: boolean
}

export default function TabIndicator({ activeIndex, tabs, onTabChange, isClickTriggered = false }: TabIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tabPositions, setTabPositions] = useState<number[]>([])
  const [tabWidths, setTabWidths] = useState<number[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [currentWidth, setCurrentWidth] = useState(90)
  const [opacity, setOpacity] = useState(1)
  const [animationMode, setAnimationMode] = useState<'fade' | 'smooth'>('smooth')

  const findClosestTab = (relativeX: number) => {
    let closestIndex = 0
    let minDistance = Infinity
    tabPositions.forEach((pos, index) => {
      const distance = Math.abs(pos - relativeX)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })
    return closestIndex
  }

  useEffect(() => {
    if (!containerRef.current) return
    const updatePositions = () => {
      requestAnimationFrame(() => {
        const positions: number[] = []
        const widths: number[] = []
        const container = containerRef.current
        if (!container) return
        tabs.forEach((_, index) => {
          const button = container.querySelector(`[data-tab-index="${index}"]`) as HTMLElement
          if (button) {
            const rect = button.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()
            positions.push(rect.left - containerRect.left + rect.width / 2)
            widths.push(rect.width + 10)
          }
        })
        setTabPositions(positions)
        setTabWidths(widths)
      })
    }
    updatePositions()
    const timeoutId = setTimeout(updatePositions, 50)
    window.addEventListener('resize', updatePositions)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updatePositions)
    }
  }, [tabs])

  useEffect(() => {
    if (tabPositions.length > 0 && activeIndex < tabPositions.length && !isDragging) {
      if (isClickTriggered) {
        setAnimationMode('fade')
        setOpacity(0)
        setTimeout(() => {
          setCurrentPosition(tabPositions[activeIndex])
          if (tabWidths.length > 0 && activeIndex < tabWidths.length) setCurrentWidth(tabWidths[activeIndex])
          setTimeout(() => setOpacity(1), 50)
        }, 200)
      } else {
        setAnimationMode('smooth')
        setOpacity(1)
        requestAnimationFrame(() => {
          setCurrentPosition(tabPositions[activeIndex])
          if (tabWidths.length > 0 && activeIndex < tabWidths.length) setCurrentWidth(tabWidths[activeIndex])
        })
      }
    }
  }, [activeIndex, tabPositions, tabWidths, isDragging, isClickTriggered])

  const getRelativeX = (clientX: number) => {
    if (!containerRef.current) return 0
    return clientX - containerRef.current.getBoundingClientRect().left
  }

  const handleStart = (clientX: number) => {
    setIsDragging(true)
    setDragStart(clientX)
  }

  const handleMove = (clientX: number) => {
    if (!isDragging) return
    setCurrentPosition(getRelativeX(clientX))
  }

  const handleEnd = (clientX: number) => {
    if (!isDragging) return
    setIsDragging(false)
    const closestIndex = findClosestTab(getRelativeX(clientX))
    if (closestIndex !== activeIndex) {
      onTabChange(closestIndex)
    } else {
      setCurrentPosition(tabPositions[activeIndex])
    }
  }

  useEffect(() => {
    if (!isDragging) return
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleMouseUp = (e: MouseEvent) => handleEnd(e.clientX)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, tabPositions, activeIndex, onTabChange])

  useEffect(() => {
    if (!isDragging) return
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      handleMove(e.touches[0].clientX)
    }
    const handleTouchEnd = (e: TouchEvent) => handleEnd(e.changedTouches[0].clientX)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, tabPositions, activeIndex, onTabChange])

  return (
    <div ref={containerRef} className="relative flex items-center gap-0 overflow-visible" onMouseDown={(e) => handleStart(e.clientX)} onTouchStart={(e) => handleStart(e.touches[0].clientX)} style={{ position: 'relative' }}>
      <div className="absolute pointer-events-none z-0 rounded-full" style={{ left: `${currentPosition}px`, transform: 'translateX(-50%)', width: `${currentWidth}px`, height: '40px', opacity, transition: isDragging ? 'none' : animationMode === 'fade' ? 'opacity 0.2s ease-in-out' : 'left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s ease-in-out', willChange: animationMode === 'fade' ? 'opacity' : 'left, width', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.25)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)' }} />
      {tabs.map((tab, index) => (
        <button key={tab.id} data-tab-index={index} onClick={() => onTabChange(index)} className={`relative z-20 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out ${activeIndex === index ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`} style={{ minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

