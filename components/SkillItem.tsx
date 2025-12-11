'use client'

import { useState, useRef, useEffect } from 'react'
import GlassCard from './GlassCard'
import { HardSkill, SoftSkill } from '@/lib/skills'

interface SkillItemProps {
  skill: HardSkill | SoftSkill
  isHardSkill: boolean
  language: 'en' | 'vn'
}

export default function SkillItem({ skill, isHardSkill, language }: SkillItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        dropdownContentRef.current &&
        !dropdownContentRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    const handleScroll = () => {
      setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('scroll', handleScroll, true)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        window.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [isOpen])

  const hardSkill = isHardSkill ? (skill as HardSkill) : null
  const softSkill = !isHardSkill ? (skill as SoftSkill) : null

  // Auto-detect IELTS PDF
  useEffect(() => {
    if (hardSkill && hardSkill.proofType === 'pdf' && hardSkill.name === 'IELTS') {
      const checkIeltsFile = async () => {
        const possibleNames = ['ielts.pdf', 'IELTS.pdf', 'ielts-certificate.pdf', 'IELTS-certificate.pdf']
        for (const name of possibleNames) {
          try {
            const response = await fetch(`/cv/${name}`, { method: 'HEAD' })
            if (response.ok) {
              setPdfUrl(`/cv/${name}`)
              return
            }
          } catch {
            continue
          }
        }
        // Static export doesn't support API routes, so we only try direct file access
      }
      checkIeltsFile()
    } else if (hardSkill && hardSkill.proofType === 'pdf') {
      setPdfUrl(hardSkill.proof)
    }
  }, [hardSkill])

  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const padding = 16 // 16px padding on mobile
      
      // Calculate width - ensure it doesn't exceed viewport
      let width = rect.width
      let left = rect.left + window.scrollX
      
      // On mobile, make dropdown full width with padding
      if (viewportWidth < 640) {
        width = viewportWidth - (padding * 2)
        left = padding
      } else {
        // On larger screens, ensure dropdown doesn't overflow
        const maxWidth = viewportWidth - padding * 2
        if (width > maxWidth) {
          width = maxWidth
        }
        // Adjust left position if dropdown would overflow right
        if (left + width > viewportWidth - padding) {
          left = viewportWidth - width - padding
        }
        // Ensure it doesn't go off left edge
        if (left < padding) {
          left = padding
        }
      }
      
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left,
        width,
      })
    } else {
      setDropdownPosition(null)
    }
  }, [isOpen])

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full group relative"
        >
          <GlassCard hover className="relative">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold mb-1">
                  {isHardSkill ? hardSkill!.name : (language === 'vn' ? softSkill!.name : softSkill!.nameEn)}
                </h3>
                {isHardSkill && (
                  <p className="text-xs text-white/50 uppercase tracking-wider">{hardSkill!.category}</p>
                )}
              </div>
              <svg
                className={`w-5 h-5 text-white/60 group-hover:text-white transition-all duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </GlassCard>
        </button>
      </div>

      {isOpen && hardSkill && dropdownPosition && (
        <div 
          ref={dropdownContentRef}
          className="fixed z-[9999] max-w-[calc(100vw-32px)] sm:max-w-none" 
          style={{ 
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            maxHeight: 'calc(100vh - 100px)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard className="overflow-hidden">
            {hardSkill.proofType === 'pdf' ? (
              <div className="p-3 sm:p-4">
                <h4 className="text-sm font-semibold mb-3 text-white/80">
                  {language === 'vn' ? 'Chứng chỉ' : 'Certificate'}
                </h4>
                {pdfUrl ? (
                  <>
                    <div className="w-full h-[300px] sm:h-[400px] mb-3 sm:mb-4 rounded-lg overflow-hidden">
                      <iframe
                        src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                        className="w-full h-full border-0"
                        title={`${hardSkill.name} Certificate`}
                      />
                    </div>
                    <a
                      href={pdfUrl}
                      download
                      className="glass-subtle rounded-xl px-4 py-2 text-white text-sm font-medium hover:border-white/30 transition-colors inline-flex items-center gap-2"
                      style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {language === 'vn' ? 'Tải PDF' : 'Download PDF'}
                    </a>
                  </>
                ) : (
                  <p className="text-white/60 text-sm">
                    {language === 'vn' ? 'File PDF chưa được tải lên. Vui lòng đặt file vào public/cv/' : 'PDF file not uploaded. Please place file in public/cv/'}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-3 sm:p-4">
                <h4 className="text-sm font-semibold mb-3 text-white/80">
                  {language === 'vn' ? 'Minh chứng' : 'Proof'}
                </h4>
                <a
                  href={hardSkill.proof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl px-3 sm:px-4 py-2 text-white text-xs sm:text-sm font-medium hover:border-white/30 transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
                  style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
                >
                  <span>{language === 'vn' ? 'Xem minh chứng' : 'View Proof'}</span>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </>
  )
}

