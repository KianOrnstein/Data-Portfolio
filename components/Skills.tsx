'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import GlassCard from './GlassCard'
import SkillItem from './SkillItem'
import { getSkills } from '@/lib/skills'

export default function Skills() {
  const { t, language } = useLanguage()
  const skills = getSkills()

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 pt-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {t('skills.title')}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Hard Skills */}
          <div>
            <GlassCard>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {t('skills.hardSkills')}
              </h3>
              <div className="space-y-3">
                {skills.hardSkills.map((skill, index) => (
                  <SkillItem key={index} skill={skill} isHardSkill={true} language={language} />
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Soft Skills */}
          <div>
            <GlassCard>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {t('skills.softSkills')}
              </h3>
              <div className="space-y-3">
                {skills.softSkills.map((skill, index) => (
                  <SkillItem key={index} skill={skill} isHardSkill={false} language={language} />
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}

