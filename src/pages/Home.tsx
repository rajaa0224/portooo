import { useMemo } from 'react'
import HeroSection from '../sections/HeroSection'
import MarqueeSection from '../sections/MarqueeSection'
import AboutSection from '../sections/AboutSection'
import SkillsSection from '../sections/SkillsSection'
import ProjectsSection from '../sections/ProjectsSection'
import LabSection from '../sections/LabSection'
import CertificatesSection from '../sections/CertificatesSection'
import SiteFooter from '../sections/SiteFooter'
import { useProjects } from '../lib/useProjects'
import { useCertificates } from '../lib/useCertificates'

export default function Home() {
  const { projects, error } = useProjects()
  const { certificates } = useCertificates()

  // Build the marquee from a random mix of ALL media: projects (completed +
  // in the lab), schematics, and certificate images.
  const marqueeImages = useMemo(() => {
    const all = Array.from(
      new Set([
        ...projects.flatMap((p) => [p.image_url, p.schematic_url]),
        ...certificates
          .filter((c) => c.file_type === 'image')
          .map((c) => c.file_url),
      ]),
    ).filter((u): u is string => Boolean(u))

    // Shuffle (Fisher–Yates) so the strip is a random blend each load.
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[all[i], all[j]] = [all[j], all[i]]
    }
    return all
  }, [projects, certificates])

  return (
    <main id="top" className="min-h-screen bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection images={marqueeImages} />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection projects={projects} />
      <LabSection projects={projects} />
      <CertificatesSection certificates={certificates} />

      {error && (
        <div className="mx-auto max-w-content px-6 py-4">
          <p className="rounded-sm border border-amber-mark/40 bg-amber-mark/10 px-4 py-3 text-sm text-amber-mark">
            Couldn’t load content: {error}
          </p>
        </div>
      )}

      <SiteFooter />
    </main>
  )
}
