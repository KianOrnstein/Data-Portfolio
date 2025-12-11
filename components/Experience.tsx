'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import GlassCard from './GlassCard'
import Link from 'next/link'
import { getExperiences } from '@/lib/experiences'

type Experience = { period: string; title: string; company: string; description: string; location: string; slug?: string }

function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    <div className="relative pl-12 sm:pl-16 md:pl-20">
      <div className="absolute left-4 sm:left-5 md:left-6 w-4 h-4 sm:w-5 sm:h-5 rounded-full">
        <div className="absolute inset-0 glass-strong rounded-full border-2 border-white/40" style={{ backdropFilter: 'blur(20px) saturate(200%)', WebkitBackdropFilter: 'blur(20px) saturate(200%)', boxShadow: '0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)' }} />
        <div className="absolute inset-1 rounded-full bg-white/20" style={{ boxShadow: 'inset 0 0 8px rgba(255, 255, 255, 0.3)' }} />
      </div>
      <GlassCard hover>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold mb-1">{exp.title}</h3>
            <p className="text-white/80 font-medium text-sm sm:text-base">{exp.company}</p>
          </div>
          <div className="sm:mt-0 sm:text-right">
            <p className="text-xs sm:text-sm text-white/60">{exp.period}</p>
            <p className="text-xs text-white/50">{exp.location}</p>
          </div>
        </div>
        <p className="text-white/70 text-sm leading-relaxed">{exp.description}</p>
      </GlassCard>
    </div>
  )
}

export default function Experience() {
  const { t, language } = useLanguage()
  
  const experiences = getExperiences(language)

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 pt-32">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {t('experience.title')}
        </h2>
        <div className="relative">
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 sm:w-1">
            <div className="absolute inset-0 glass-subtle rounded-full" style={{ backdropFilter: 'blur(12px) saturate(160%)', WebkitBackdropFilter: 'blur(12px) saturate(160%)', background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)', boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)' }} />
          </div>
          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => <ExperienceItem key={index} exp={exp} />)}
          </div>
        </div>
        <div className="text-center mt-12">
          <Link href="/experience" className="inline-block glass rounded-xl px-8 py-3 text-white font-semibold hover:border-white/30 transition-colors" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
            View All Experiences →
          </Link>
        </div>
      </div>
    </section>
  )
}

