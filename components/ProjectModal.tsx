'use client'

import { useEffect } from 'react'
import GlassCard from './GlassCard'
import TechBadge from './TechBadge'

interface ProjectModalProps {
  project: { title: string; description: string; tech: string[]; category: string; analysis?: string } | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [project])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
      <GlassCard className="relative z-10 max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white text-2xl sm:text-3xl z-20 w-10 h-10 flex items-center justify-center">×</button>
        <div className="mb-3 sm:mb-4"><span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{project.category}</span></div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 pr-8">{project.title}</h2>
        <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">{project.description}</p>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Technologies</h3>
          <div className="flex flex-wrap gap-2">{project.tech.map((tech, i) => <TechBadge key={i} tech={tech} />)}</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Analysis</h3>
          <div className="glass-subtle rounded-xl p-4" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
            {project.analysis || <p className="text-white/60 italic">Detailed analysis will be added soon...</p>}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
