import profileData from '@/data/profile.json'

export interface ProfileData {
  name: {
    default: {
      vn: string
      en: string
    }
    alternatives: {
      vn: string[]
      en: string[]
    }
  }
  email: string
  socialLinks: Array<{
    name: string
    url: string
    icon: string
  }>
  metrics: Array<{
    label: {
      vn: string
      en: string
    }
    value: number
    prefix?: string
    suffix?: string
  }>
  about: {
    vn: {
      title: string
      content: string
    }
    en: {
      title: string
      content: string
    }
  }
}

export function getProfile(): ProfileData {
  return profileData as ProfileData
}

