'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import GlassCard from './GlassCard'
import { getProfile } from '@/lib/profile'

const glassStyle = { backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }

export default function Contact() {
  const { t } = useLanguage()
  const profile = getProfile()

  const socialLinks = profile.socialLinks
  const email = profile.email

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 pt-32">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {t('contact.title')}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <GlassCard>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Email</h3>
            <a
              href={`mailto:${email}`}
              className="block group glass-subtle rounded-xl px-4 sm:px-6 py-4 sm:py-6 flex items-center gap-3 sm:gap-4 hover:border-white/30 transition-colors"
              style={{ ...glassStyle, minHeight: '70px' }}
            >
              <span className="text-2xl sm:text-3xl inline-block flex-shrink-0">✉️</span>
              <div className="min-w-0 flex-1">
                <span className="block text-xs sm:text-sm text-white/60 mb-1">Email me at</span>
                <span className="block font-medium text-white text-sm sm:text-base md:text-lg break-all">{email}</span>
              </div>
            </a>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Connect</h3>
            <div className="space-y-3 sm:space-y-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group glass-subtle rounded-xl px-4 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 hover:border-white/30 transition-colors"
                  style={{ ...glassStyle, minHeight: '52px' }}
                >
                  <span className="text-xl sm:text-2xl inline-block flex-shrink-0">{link.icon}</span>
                  <span className="font-medium text-white inline-block text-sm sm:text-base">{link.name}</span>
                </a>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

