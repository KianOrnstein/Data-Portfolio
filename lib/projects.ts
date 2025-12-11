import projectsData from '@/data/projects.json'

export interface Project {
  title: string
  description: string
  tech: string[]
  category: string
  slug: string
  externalUrl?: string
}

export function getProjects(): Project[] {
  return projectsData as Project[]
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find(p => p.slug === slug)
}

