import { NextResponse } from 'next/server'
import { getCvPath, getIeltsPath } from '@/lib/cv'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (type === 'ielts') {
    const ieltsPath = getIeltsPath()
    if (!ieltsPath) {
      return NextResponse.json({ cvUrl: null }, { status: 404 })
    }
    return NextResponse.json({ cvUrl: ieltsPath })
  }

  const cvPath = getCvPath()
  
  if (!cvPath) {
    return NextResponse.json({ cvUrl: null }, { status: 404 })
  }

  return NextResponse.json({ cvUrl: cvPath })
}

