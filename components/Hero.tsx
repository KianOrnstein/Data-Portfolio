'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import GlassCard from './GlassCard'
import NameDropdown from './NameDropdown'
import { useState, useEffect } from 'react'
import { getProfile } from '@/lib/profile'
import { getAssetPath } from '@/lib/paths'

function MetricCard({ metric }: { metric: { label: string; value: number; prefix?: string; suffix?: string } }) {
  return (
    <GlassCard hover>
      <div className="text-center py-4 sm:py-6">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          {metric.prefix || ''}{metric.value}{metric.suffix || ''}
        </div>
        <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider px-2">{metric.label}</div>
      </div>
    </GlassCard>
  )
}

export default function Hero() {
  const { t, language } = useLanguage()
  const [imageError, setImageError] = useState(false)
  const profile = getProfile()
  const [displayName, setDisplayName] = useState(profile.name.default[language])

  const metrics = profile.metrics.map(metric => ({
    label: metric.label[language],
    value: metric.value,
    prefix: metric.prefix,
    suffix: metric.suffix,
  }))

  const about = profile.about[language]

  // Update display name when language changes
  useEffect(() => {
    setDisplayName(profile.name.default[language])
  }, [language, profile.name.default])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12">
      <div className="max-w-7xl w-full">
        {/* Name with Dropdown */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <NameDropdown 
              currentName={displayName} 
              onNameChange={setDisplayName}
              language={language}
            />
          </div>
        </div>

        {/* Profile Image and About Me - Centered */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 mb-12 sm:mb-16 max-w-5xl mx-auto">
          {/* Profile Image */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden glass-strong flex items-center justify-center" style={{ backdropFilter: 'blur(32px) saturate(200%)', WebkitBackdropFilter: 'blur(32px) saturate(200%)' }}>
              {!imageError ? (
                <img
                  src={getAssetPath('profile.jpg')}
                  alt="Phạm Đức Kiên"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/60 text-4xl sm:text-5xl md:text-6xl font-bold">
                  PDK
                </div>
              )}
            </div>
          </div>

          {/* About Me */}
          <div className="order-1 lg:order-2 flex-1 w-full lg:w-auto">
            <GlassCard>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {about.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
                {about.content}
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {metrics.map((metric, index) => <MetricCard key={index} metric={metric} />)}
        </div>
      </div>
    </section>
  )
}

