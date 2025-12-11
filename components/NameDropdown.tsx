'use client'

import { useState, useRef, useEffect } from 'react'
import { getProfile } from '@/lib/profile'

interface NameDropdownProps {
  currentName: string
  onNameChange: (name: string) => void
  language: 'en' | 'vn'
}

export default function NameDropdown({ currentName, onNameChange, language }: NameDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const profile = getProfile()

  const alternativeNames = profile.name.alternatives[language]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleNameSelect = (name: string) => {
    onNameChange(name)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group"
        aria-label="Show alternative names"
      >
        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          {currentName}
        </span>
        <svg
          className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white/60 group-hover:text-white transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-4 z-50 min-w-[200px] sm:min-w-[250px] max-w-[calc(100vw-32px)]">
          <div className="glass rounded-xl overflow-hidden shadow-2xl" style={{ backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)' }}>
            {alternativeNames.map((name, index) => (
              <button
                key={index}
                onClick={() => handleNameSelect(name)}
                className="w-full text-left px-4 sm:px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-base sm:text-lg md:text-xl font-medium border-b border-white/10 last:border-b-0 break-words"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

