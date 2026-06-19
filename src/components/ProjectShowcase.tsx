import { useState } from 'react'
import type { Project } from '../types'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null)
  const completed = projects.filter((p) => p.status === 'completed')

  return (
    <section id="projects" className="bg-white">
      <div className="section">
        <h2 className="section-title">Project Showcase</h2>
        <div className="section-rule" />
        <p className="mb-10 max-w-2xl text-slate-muted">
          Completed builds. Click a project for a quick overview, then open the
          full build details.
        </p>

        {completed.length === 0 ? (
          <p className="font-mono text-sm text-slate-muted">
            No projects published yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {completed.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={() => setSelected(p)}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
