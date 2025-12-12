import fs from 'fs'
import path from 'path'

const cvDirectory = path.join(process.cwd(), 'public/cv')

// Get base path for server-side rendering
// This will be used when building static pages
function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || ''
}

// Common CV file names to check
const possibleNames = ['cv.pdf', 'resume.pdf', 'CV.pdf', 'Resume.pdf', 'curriculum-vitae.pdf']

// Common IELTS certificate file names
const ieltsNames = ['ielts.pdf', 'IELTS.pdf', 'ielts-certificate.pdf', 'IELTS-certificate.pdf']

export function getCvPath(): string | null {
  if (!fs.existsSync(cvDirectory)) {
    return null
  }

  // First, try common names
  const basePath = getBasePath()
  for (const name of possibleNames) {
    const filePath = path.join(cvDirectory, name)
    if (fs.existsSync(filePath)) {
      return basePath ? `${basePath}/cv/${name}` : `/cv/${name}`
    }
  }

  // If no common name found, get first PDF file
  try {
    const files = fs.readdirSync(cvDirectory)
    const pdfFile = files.find(file => file.toLowerCase().endsWith('.pdf'))
    if (pdfFile) {
      return basePath ? `${basePath}/cv/${pdfFile}` : `/cv/${pdfFile}`
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
  const basePath = getBasePath()
  for (const name of ieltsNames) {
    const filePath = path.join(cvDirectory, name)
    if (fs.existsSync(filePath)) {
      return basePath ? `${basePath}/cv/${name}` : `/cv/${name}`
    }
  }

  return null
}

