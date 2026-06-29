import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import InTheLab from '../components/InTheLab'
import ProjectShowcase from '../components/ProjectShowcase'
import Certificates from '../components/Certificates'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import { useProjects } from '../lib/useProjects'
import { useCertificates } from '../lib/useCertificates'

// Heavy (Three.js + Rapier) — load it as a separate chunk so the rest of the
// page renders immediately.
const Playground3D = lazy(() => import('../components/Playground3D'))

export default function Home() {
  const { projects, loading, error } = useProjects()
  const { certificates } = useCertificates()

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Interactive 3D physics playground — the centerpiece. */}
      <Suspense
        fallback={
          <div className="flex h-[88vh] w-full items-center justify-center bg-[#cfe0e6] font-mono text-sm text-ink/60">
            Loading the playground…
          </div>
        }
      >
        <Playground3D />
      </Suspense>

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
