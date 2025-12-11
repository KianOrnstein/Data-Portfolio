import fs from 'fs'
import path from 'path'

const cvDirectory = path.join(process.cwd(), 'public/cv')

// Common CV file names to check
const possibleNames = ['cv.pdf', 'resume.pdf', 'CV.pdf', 'Resume.pdf', 'curriculum-vitae.pdf']

// Common IELTS certificate file names
const ieltsNames = ['ielts.pdf', 'IELTS.pdf', 'ielts-certificate.pdf', 'IELTS-certificate.pdf']

export function getCvPath(): string | null {
  if (!fs.existsSync(cvDirectory)) {
    return null
  }

  // First, try common names
  for (const name of possibleNames) {
    const filePath = path.join(cvDirectory, name)
    if (fs.existsSync(filePath)) {
      return `/cv/${name}`
    }
  }

  // If no common name found, get first PDF file
  try {
    const files = fs.readdirSync(cvDirectory)
    const pdfFile = files.find(file => file.toLowerCase().endsWith('.pdf'))
    if (pdfFile) {
      return `/cv/${pdfFile}`
    }
  } catch {
    return null
  }

  return null
}

export function getIeltsPath(): string | null {
  if (!fs.existsSync(cvDirectory)) {
    return null
  }

  // Try common IELTS names
  for (const name of ieltsNames) {
    const filePath = path.join(cvDirectory, name)
    if (fs.existsSync(filePath)) {
      return `/cv/${name}`
    }
  }

  return null
}

