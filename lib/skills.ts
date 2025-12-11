import skillsData from '@/data/skills.json'

export interface HardSkill {
  name: string
  category: string
  proofType: 'url' | 'pdf'
  proof: string
}

export interface SoftSkill {
  name: string
  nameEn: string
}

export interface SkillsData {
  hardSkills: HardSkill[]
  softSkills: SoftSkill[]
}

export function getSkills(): SkillsData {
  return skillsData as SkillsData
}

