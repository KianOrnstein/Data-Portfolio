import Link from 'next/link'
import Navigation from '@/components/Navigation'
import CanvasBackground from '@/components/CanvasBackground'
import GlassCard from '@/components/GlassCard'

const experiences = [
  { period: 'Present', title: 'Student', company: 'Academy of Finance', description: 'Currently studying Finance at Academy of Finance, Hanoi, Vietnam. Focused on financial analysis, risk management, and data science applications in finance.', location: 'Hanoi, Vietnam', slug: 'academy-of-finance' },
  { period: 'Previously', title: 'High School Student', company: 'Nguyen Trai High School - Ba Dinh', description: 'Graduated from Nguyen Trai High School, Ba Dinh District, Hanoi. Achieved excellent academic results and participated in various extracurricular activities.', location: 'Hanoi, Vietnam', slug: 'nguyen-trai-high-school' },
]

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen">
      <CanvasBackground />
      <Navigation />
      <div className="max-w-4xl mx-auto px-6 py-24 pt-32">
        <Link
          href="/#experience"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white/80 mb-8 transition-colors"
        >
          ← Back to Home
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center">All Experiences</h1>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 opacity-100 scale-y-100" style={{ transformOrigin: 'top' }}>
            <div className="absolute inset-0 glass-subtle rounded-full" style={{ backdropFilter: 'blur(12px) saturate(160%)', WebkitBackdropFilter: 'blur(12px) saturate(160%)', background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)', boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)' }} />
          </div>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-20">
                <div className="absolute left-6 w-5 h-5 rounded-full scale-100 opacity-100">
                  <div className="absolute inset-0 glass-strong rounded-full border-2 border-white/40" style={{ backdropFilter: 'blur(20px) saturate(200%)', WebkitBackdropFilter: 'blur(20px) saturate(200%)', boxShadow: '0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)' }} />
                  <div className="absolute inset-1 rounded-full bg-white/20" style={{ boxShadow: 'inset 0 0 8px rgba(255, 255, 255, 0.3)' }} />
                </div>
                <Link href={`/experience/${exp.slug}`}>
                  <GlassCard hover>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                        <p className="text-white/80 font-medium">{exp.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <p className="text-sm text-white/60">{exp.period}</p>
                        <p className="text-xs text-white/50">{exp.location}</p>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm mb-4">{exp.description}</p>
                    <span className="text-sm font-medium text-white/80 hover:text-white transition-colors">View Details →</span>
                  </GlassCard>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

