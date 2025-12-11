import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Blog from '@/components/Blog'
import Skills from '@/components/Skills'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'
import CanvasBackgroundWrapper from '@/components/CanvasBackgroundWrapper'
import { getBlogPosts } from '@/lib/blog'

export default async function Home() {
  const posts = await getBlogPosts()
  
  return (
    <main className="relative min-h-screen">
      <CanvasBackgroundWrapper />
      <Navigation />
      <section id="home">
        <Hero />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="blog">
        <Blog posts={posts} />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="resume">
        <Resume />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  )
}
