export default function TechBadge({ tech }: { tech: string }) {
  return (
    <span className="text-xs px-3 py-1.5 rounded-lg text-white/70 font-medium relative inline-block">
      <span className="absolute inset-0 glass-subtle rounded-lg" style={{ backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)', opacity: 0.8 }} />
      <span className="relative z-10">{tech}</span>
    </span>
  )
}

