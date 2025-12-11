'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import GlassCard from './GlassCard'
import { useState } from 'react'
import ProjectModal from './ProjectModal'
import TechBadge from './TechBadge'
import Link from 'next/link'
import ExternalLink from './ExternalLink'
import { getProjects } from '@/lib/projects'

type Project = { title: string; description: string; tech: string[]; category: string; slug?: string; externalUrl?: string }

function ProjectCard({ project, onClick }: { project: Project & { slug: string }; onClick: () => void }) {
  return (
    <GlassCard hover>
        <div className="mb-3"><span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{project.category}</span></div>
        <h3 className="text-xl font-bold mb-3">{project.title}</h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">{project.tech.map((tech, i) => <TechBadge key={i} tech={tech} />)}</div>
        <div className="flex justify-between items-center">
          <button onClick={onClick} className="text-sm font-medium text-white/80 hover:text-white transition-colors">Quick View</button>
          {project.externalUrl ? (
            <ExternalLink 
              href={project.externalUrl}
              type="project"
              title={project.title}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              View Details ↗
            </ExternalLink>
          ) : (
            <Link href={`/projects/${project.slug}`} className="text-sm font-medium text-white/80 hover:text-white transition-colors">View Details →</Link>
          )}
        </div>
      </GlassCard>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<(Project & { slug: string }) | null>(null)

  const projects = getProjects()

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 pt-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          {t('projects.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.slice(0, 6).map((project, index) => <ProjectCard key={index} project={project} onClick={() => setSelectedProject(project)} />)}
        </div>
        <div className="text-center mt-12">
          <Link href="/projects" className="inline-block glass rounded-xl px-8 py-3 text-white font-semibold hover:border-white/30 transition-colors" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
            View All Projects →
          </Link>
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

