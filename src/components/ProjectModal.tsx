import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, ArrowRight } from 'lucide-react'
import type { Project } from '../types'

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm border border-line bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-sm bg-white/80 p-1.5 text-ink hover:bg-ink/10"
        >
          <X size={18} />
        </button>

        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.title}
            className="aspect-video w-full border-b border-line object-cover"
          />
        )}

        <div className="p-6">
          <h3 className="text-xl font-semibold text-ink">{project.title}</h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="badge">
                {t}
              </span>
            ))}
          </div>

          <h4 className="mt-5 font-mono text-xs uppercase tracking-wider text-amber-mark">
            The problem it solves
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-ink/80">
            {project.problem || project.summary}
          </p>

          <Link
            to={`/projects/${project.slug}`}
            className="btn-primary mt-6 w-full"
          >
            View Build Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
