'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import GlassCard from './GlassCard'
import { useEffect, useState } from 'react'

export default function Resume() {
  const { t } = useLanguage()
  const [cvUrl, setCvUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try to find CV file in public/cv folder
    // Common CV file names
    const possibleNames = ['cv.pdf', 'resume.pdf', 'CV.pdf', 'Resume.pdf', 'curriculum-vitae.pdf']
    
    const findCvFile = async () => {
      // Try common names first
      for (const name of possibleNames) {
        try {
          const response = await fetch(`/cv/${name}`, { method: 'HEAD' })
          if (response.ok) {
            setCvUrl(`/cv/${name}`)
            setLoading(false)
            return
          }
        } catch {
          continue
        }
      }
      
      // Static export doesn't support API routes, so we only try direct file access
      setLoading(false)
    }

    findCvFile()
  }, [])

  if (loading) {
    return (
      <section id="resume" className="py-24 px-4 sm:px-6 pt-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
            {t('resume.title')}
          </h2>
          <GlassCard>
            <div className="text-center py-12">
              <div className="text-white/60">Loading...</div>
            </div>
          </GlassCard>
        </div>
      </section>
    )
  }

  if (!cvUrl) {
    return (
      <section id="resume" className="py-24 px-4 sm:px-6 pt-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
            {t('resume.title')}
          </h2>
          <GlassCard>
            <div className="text-center py-12">
              <p className="text-white/60 mb-4">
                {t('resume.notFound')}
              </p>
              <p className="text-sm text-white/40">
                {t('resume.instruction')}
              </p>
            </div>
          </GlassCard>
        </div>
      </section>
    )
  }

  return (
    <section id="resume" className="py-24 px-4 sm:px-6 pt-32">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {t('resume.title')}
        </h2>
        <GlassCard className="overflow-hidden">
          <div className="w-full h-[70vh] sm:h-[80vh] min-h-[400px] sm:min-h-[600px]">
            <iframe
              src={`${cvUrl}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full border-0"
              title="Resume PDF"
            />
          </div>
          <div className="p-3 sm:p-4 border-t border-white/10 flex justify-center">
            <a
              href={cvUrl}
              download
              className="glass-subtle rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-base font-semibold hover:border-white/30 transition-colors inline-flex items-center gap-2"
              style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('resume.download')}
            </a>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}

