import Hero from '../components/Hero'
import InTheLab from '../components/InTheLab'
import ProjectShowcase from '../components/ProjectShowcase'
import Certificates from '../components/Certificates'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import { useProjects } from '../lib/useProjects'
import { useCertificates } from '../lib/useCertificates'

export default function Home() {
  const { projects, loading, error } = useProjects()
  const { certificates } = useCertificates()

  return (
    <div id="top" className="min-h-screen">
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
          <Reveal>
            <InTheLab projects={projects} />
          </Reveal>
          <Reveal>
            <ProjectShowcase projects={projects} />
          </Reveal>
        </>
      )}

      <Reveal>
        <Certificates certificates={certificates} />
      </Reveal>

      <Footer />
    </div>
  )
}
