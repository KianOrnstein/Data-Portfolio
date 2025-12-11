'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import TabIndicator from './TabIndicator'
import { getProfile } from '@/lib/profile'

const glassButtonStyle = { backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }
const buttonClass = 'group glass-subtle rounded-full px-4 py-2 text-sm font-medium text-white flex items-center gap-2 hover:border-white/30 transition-all'

function ToggleButton({ onClick, children, title }: { onClick: () => void; children: React.ReactNode; title?: string }) {
  return (
    <button onClick={onClick} className={buttonClass} style={glassButtonStyle} title={title}>
      <span className="group-hover:scale-105 transition-transform duration-300 inline-block">{children}</span>
    </button>
  )
}

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const profile = getProfile()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const sections = [{ id: 'home' }, { id: 'projects' }, { id: 'experience' }, { id: 'blog' }, { id: 'skills' }, { id: 'resume' }, { id: 'contact' }]
  const [activeIndex, setActiveIndex] = useState(0)
  const [isClickTriggered, setIsClickTriggered] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleNameClick = () => {
    if (pathname === '/') {
      // If on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveIndex(0)
    } else {
      // If on other pages, navigate to home
      router.push('/')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        if (!isClickTriggered) {
          const scrollPosition = window.scrollY + 200
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i].id)
            if (section && scrollPosition >= section.offsetTop) {
              setActiveIndex(i)
              break
            }
          }
        }
      }, 100)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [isClickTriggered, sections])

  const handleTabChange = (index: number) => {
    const element = document.getElementById(sections[index].id)
    if (element) {
      setIsClickTriggered(true)
      setActiveIndex(index)
      setMobileMenuOpen(false)
      window.scrollTo({ top: element.offsetTop - 72, behavior: 'smooth' })
      setTimeout(() => setIsClickTriggered(false), 1500)
    }
  }

  const tabs = sections.map(section => ({ id: section.id, label: t(`nav.${section.id}`) }))

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${scrolled ? 'py-3' : 'py-4'}`} style={{ minHeight: scrolled ? '64px' : '72px', backdropFilter: 'blur(32px) saturate(200%)', WebkitBackdropFilter: 'blur(32px) saturate(200%)', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(30, 41, 59, 0.65) 100%)', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-full overflow-hidden">
          <button onClick={handleNameClick} className="text-lg sm:text-xl font-bold tracking-tight hover:text-white/80 transition-colors cursor-pointer truncate max-w-[140px] sm:max-w-none">
            {profile.name.default[language]}
          </button>
          <div className="hidden md:flex items-center">
            <TabIndicator activeIndex={activeIndex} tabs={tabs} onTabChange={handleTabChange} isClickTriggered={isClickTriggered} />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ToggleButton onClick={toggleTheme} title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </ToggleButton>
            <ToggleButton onClick={() => setLanguage(language === 'en' ? 'vn' : 'en')}>
              {language === 'vn' ? 'VN' : 'EN'}
            </ToggleButton>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden glass-subtle rounded-full p-2 text-white hover:border-white/30 transition-colors"
              style={glassButtonStyle}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div className={`fixed top-[72px] left-0 right-0 z-40 md:hidden transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`} style={{ backdropFilter: 'blur(32px) saturate(200%)', WebkitBackdropFilter: 'blur(32px) saturate(200%)', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
        <div className="px-4 py-4 space-y-2">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(index)}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                activeIndex === index
                  ? 'glass text-white'
                  : 'glass-subtle text-white/80 hover:text-white hover:border-white/30'
              }`}
              style={activeIndex === index ? glassButtonStyle : { ...glassButtonStyle, backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

