import { notFound } from 'next/navigation'
import GlassCard from '@/components/GlassCard'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import CanvasBackground from '@/components/CanvasBackground'
import { getExperiences } from '@/lib/experiences'

const experiences: Record<string, {
  period: string
  title: string
  company: string
  description: string
  location: string
  details: string
  achievements?: string[]
}> = {
  'academy-of-finance': {
    period: 'Present',
    title: 'Student',
    company: 'Academy of Finance',
    description: 'Currently studying Finance at Academy of Finance, Hanoi, Vietnam.',
    location: 'Hanoi, Vietnam',
    details: `I am currently pursuing a degree in Finance at the Academy of Finance, one of Vietnam's premier institutions for financial education. My studies focus on modern financial theory, risk management, and the application of data science in financial markets.

During my time here, I have developed a strong foundation in:
- Financial analysis and modeling
- Risk assessment and management
- Investment portfolio theory
- Quantitative finance and derivatives
- Data analysis using Python and R

I have actively participated in various projects and case studies, applying theoretical knowledge to real-world financial scenarios. My coursework has included advanced topics in corporate finance, market analysis, and financial engineering.`,
    achievements: [
      'Maintained excellent academic performance with focus on quantitative finance',
      'Completed multiple projects involving financial data analysis using Python',
      'Participated in finance competitions and case study presentations',
      'Developed practical skills in financial modeling and risk assessment'
    ]
  },
  'nguyen-trai-high-school': {
    period: 'Previously',
    title: 'High School Student',
    company: 'Nguyen Trai High School - Ba Dinh',
    description: 'Graduated from Nguyen Trai High School, Ba Dinh District, Hanoi.',
    location: 'Hanoi, Vietnam',
    details: `I graduated from Nguyen Trai High School, located in Ba Dinh District, Hanoi. This period was foundational in developing my analytical thinking and problem-solving skills.

During my high school years, I:
- Excelled in mathematics and science subjects
- Developed strong research and analytical capabilities
- Participated in various academic competitions
- Built a solid foundation for higher education in finance

The rigorous academic environment at Nguyen Trai High School prepared me well for the challenges of university-level finance studies. I learned the importance of discipline, critical thinking, and continuous learning - skills that continue to serve me in my current studies.`,
    achievements: [
      'Achieved excellent results in mathematics and science',
      'Participated in academic competitions and extracurricular activities',
      'Developed strong foundation in analytical thinking',
      'Graduated with honors'
    ]
  }
}

export async function generateStaticParams() {
  // Return slugs from the hardcoded experiences object
  // This matches the actual data structure used in the component
  return Object.keys(experiences).map((slug) => ({
    slug,
  }))
}

export default async function ExperienceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const experience = experiences[slug]

  if (!experience) {
    notFound()
  }

  return (
    <main className="relative min-h-screen">
      <CanvasBackground />
      <Navigation />
      <article className="max-w-4xl mx-auto px-6 py-24 pt-32">
        <Link
          href="/#experience"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white/80 mb-8 transition-colors"
        >
          ← Back to Experience
        </Link>

        <GlassCard className="mb-6">
          <div className="mb-4">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              {experience.period}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{experience.title}</h1>
          <h2 className="text-2xl font-semibold text-white/80 mb-2">{experience.company}</h2>
          <p className="text-white/60 text-sm mb-4">{experience.location}</p>
          <p className="text-white/70">{experience.description}</p>
        </GlassCard>

        <GlassCard>
          <div className="prose prose-invert max-w-none text-white/90">
            <h2 className="text-3xl font-bold mb-6 text-white">Detailed Experience</h2>
            <div className="text-white/80 whitespace-pre-line mb-8">
              {experience.details}
            </div>

            {experience.achievements && (
              <>
                <h2 className="text-3xl font-bold mb-6 text-white mt-12">Key Achievements</h2>
                <ul className="list-disc list-inside space-y-3 text-white/80">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </GlassCard>
      </article>
    </main>
  )
}

