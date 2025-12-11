import experiencesData from '@/data/experiences.json'

export interface Experience {
  period: string
  title: string
  company: string
  description: string
  location: string
  slug?: string
}

export function getExperiences(language: 'en' | 'vn'): Experience[] {
  return experiencesData[language] as Experience[]
}

