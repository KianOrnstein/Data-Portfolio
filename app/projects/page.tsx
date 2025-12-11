'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import CanvasBackground from '@/components/CanvasBackground'
import GlassCard from '@/components/GlassCard'
import TechBadge from '@/components/TechBadge'
import ExternalLink from '@/components/ExternalLink'

const projects = [
  { title: 'Financial Risk Analysis Dashboard', description: 'Real-time risk monitoring system with ML-powered predictions for Apple Inc. in 2024', tech: ['Python', 'React', 'TensorFlow', 'PostgreSQL', 'Matplotlib', 'Pandas', 'yfinance'], category: 'Data Science', slug: 'financial-risk-analysis-apple-2024', externalUrl: 'https://your-blogger-or-substack-url.com/financial-risk-analysis' },
  { title: 'Market Sentiment Analyzer', description: 'NLP-based sentiment analysis for stock market trends', tech: ['Python', 'NLP', 'FastAPI', 'Docker'], category: 'AI/ML', slug: 'market-sentiment-analyzer', externalUrl: 'https://your-blogger-or-substack-url.com/market-sentiment' },
  { title: 'Portfolio Optimization Tool', description: 'Advanced portfolio rebalancing using modern portfolio theory', tech: ['Python', 'QuantLib', 'React', 'TypeScript'], category: 'Finance', slug: 'portfolio-optimization-tool', externalUrl: 'https://your-blogger-or-substack-url.com/portfolio-optimization' },
  { title: 'Cryptocurrency Trading Bot', description: 'Automated trading system with backtesting capabilities', tech: ['Python', 'ccxt', 'Pandas', 'WebSocket'], category: 'Trading', slug: 'cryptocurrency-trading-bot', externalUrl: 'https://your-blogger-or-substack-url.com/crypto-bot' },
  { title: 'Credit Scoring Model', description: 'Machine learning model for credit risk assessment', tech: ['Python', 'Scikit-learn', 'XGBoost', 'Flask'], category: 'Risk Management', slug: 'credit-scoring-model', externalUrl: 'https://your-blogger-or-substack-url.com/credit-scoring' },
  { title: 'Real-time Data Pipeline', description: 'ETL pipeline for processing financial market data', tech: ['Python', 'Apache Kafka', 'Spark', 'MongoDB'], category: 'Data Engineering', slug: 'real-time-data-pipeline', externalUrl: 'https://your-blogger-or-substack-url.com/data-pipeline' },
]

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen">
      <CanvasBackground />
      <Navigation />
      <div className="max-w-7xl mx-auto px-6 py-24 pt-32">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white/80 mb-8 transition-colors"
        >
          ← Back to Home
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center">All Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const CardContent = (
              <GlassCard hover>
                <div className="mb-3"><span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{project.category}</span></div>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">{project.tech.map((tech, i) => <TechBadge key={i} tech={tech} />)}</div>
                <span className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                  View Details {project.externalUrl ? '↗' : '→'}
                </span>
              </GlassCard>
            )
            return project.externalUrl ? (
              <ExternalLink key={index} href={project.externalUrl} type="project" title={project.title} className="block">
                {CardContent}
              </ExternalLink>
            ) : (
              <Link key={index} href={`/projects/${project.slug}`}>
                {CardContent}
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}

