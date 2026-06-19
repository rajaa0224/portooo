import Hero from '../components/Hero'
import InTheLab from '../components/InTheLab'
import ProjectShowcase from '../components/ProjectShowcase'
import Footer from '../components/Footer'
import { useProjects } from '../lib/useProjects'

export default function Home() {
  const { projects, loading, error } = useProjects()

  return (
    <div className="min-h-screen">
      <Hero />

      {error && (
        <div className="mx-auto max-w-content px-6 py-4">
          <p className="rounded-sm border border-amber-mark/40 bg-amber-mark/10 px-4 py-3 text-sm text-amber-mark">
            Couldn’t load projects: {error}
          </p>
        </div>
      )}

      {loading ? (
        <div className="section font-mono text-sm text-slate-muted">
          Loading projects…
        </div>
      ) : (
        <>
          <InTheLab projects={projects} />
          <ProjectShowcase projects={projects} />
        </>
      )}

      <Footer />
    </div>
  )
}
