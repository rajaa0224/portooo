import type { Project } from '../types'

interface Props {
  project: Project
  onClick: () => void
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-sm border border-line bg-white text-left transition-colors hover:border-ink/40"
    >
      <div className="aspect-[4/3] w-full overflow-hidden border-b border-line bg-paper">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs text-slate-muted">
            no image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-ink group-hover:underline">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-muted">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
