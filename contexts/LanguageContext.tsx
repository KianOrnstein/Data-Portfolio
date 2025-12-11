'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'vn'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      experience: 'Experience',
      blog: 'Blog',
      skills: 'Skills',
      resume: 'Résumé',
      contact: 'Contact',
    },
    home: {
      title: 'Finance & Data Professional',
      subtitle: 'Transforming data into actionable insights',
    },
    projects: {
      title: 'Featured Projects',
      viewMore: 'View More',
    },
    blog: {
      title: 'Latest Insights',
      readMore: 'Read More',
      category: {
        marketAnalysis: 'Market Analysis',
        pythonTips: 'Python Tips',
        dataScience: 'Data Science',
        finance: 'Finance',
      },
    },
    experience: {
      title: 'Experience',
    },
    skills: {
      title: 'Skills',
      hardSkills: 'Hard Skills',
      softSkills: 'Soft Skills',
    },
    resume: {
      title: 'Résumé',
      download: 'Download PDF',
      notFound: 'CV file not found',
      instruction: 'Please place your CV PDF file in the public/cv folder with one of these names: cv.pdf, resume.pdf, CV.pdf, or Resume.pdf',
    },
    contact: {
      title: 'Get In Touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
    },
  },
  vn: {
    nav: {
      home: 'Trang Chủ',
      projects: 'Dự Án',
      experience: 'Kinh Nghiệm',
      blog: 'Blog',
      skills: 'Kỹ Năng',
      resume: 'Sơ Yếu Lý Lịch',
      contact: 'Liên Hệ',
    },
    home: {
      title: 'Chuyên Gia Tài Chính & Dữ Liệu',
      subtitle: 'Biến đổi dữ liệu thành thông tin hữu ích',
    },
    projects: {
      title: 'Dự Án Nổi Bật',
      viewMore: 'Xem Thêm',
    },
    blog: {
      title: 'Bài Viết Mới Nhất',
      readMore: 'Đọc Thêm',
      category: {
        marketAnalysis: 'Phân Tích Thị Trường',
        pythonTips: 'Mẹo Python',
        dataScience: 'Khoa Học Dữ Liệu',
        finance: 'Tài Chính',
      },
    },
    experience: {
      title: 'Kinh Nghiệm',
    },
    skills: {
      title: 'Kỹ Năng',
      hardSkills: 'Kỹ Năng Cứng',
      softSkills: 'Kỹ Năng Mềm',
    },
    resume: {
      title: 'Sơ Yếu Lý Lịch',
      download: 'Tải PDF',
      notFound: 'Không tìm thấy file CV',
      instruction: 'Vui lòng đặt file CV PDF của bạn vào thư mục public/cv với một trong các tên sau: cv.pdf, resume.pdf, CV.pdf, hoặc Resume.pdf',
    },
    contact: {
      title: 'Liên Hệ',
      name: 'Tên',
      email: 'Email',
      message: 'Tin Nhắn',
      send: 'Gửi Tin Nhắn',
    },
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('vn')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'en' || saved === 'vn')) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

