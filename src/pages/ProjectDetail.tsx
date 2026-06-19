import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { GithubIcon } from '../components/icons'
import { supabase } from '../lib/supabase'
import type { Project } from '../types'
import Footer from '../components/Footer'
import { formatMonthYear } from '../lib/utils'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()
      if (!active) return
      if (error || !data) {
        setNotFound(true)
      } else {
        setProject(data as Project)
      }
      setLoading(false)
    }
    load()
    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-mono text-sm text-slate-muted">
        Loading…
      </div>
    )
  }

  if (notFound || !project) {
    return (
      <div className="mx-auto flex min-h-screen max-w-content flex-col items-start gap-4 px-6 py-20">
        <p className="text-lg text-ink">Project not found.</p>
        <Link to="/" className="btn-outline">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-content px-6 py-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-muted hover:text-ink"
          >
            <ArrowLeft size={16} /> Back to projects
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold text-ink md:text-4xl">
              {project.title}
            </h1>
            <span
              className={
                project.status === 'completed'
                  ? 'rounded-sm border border-accent/40 bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent'
                  : 'rounded-sm border border-amber-mark/40 bg-amber-mark/10 px-2 py-0.5 font-mono text-xs text-amber-mark'
              }
            >
              {project.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-slate-muted">{project.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="badge">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-content gap-12 px-6 py-12 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <article className="min-w-0 space-y-10">
          {project.image_url && (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full rounded-sm border border-line"
            />
          )}

          <section>
            <h2 className="mb-3 text-xl font-semibold text-ink">
              Full Description
            </h2>
            <p className="whitespace-pre-line leading-relaxed text-ink/85">
              {project.full_description || project.problem || project.summary}
            </p>
          </section>

          {project.schematic_url && (
            <section>
              <h2 className="mb-3 text-xl font-semibold text-ink">
                Schematic / Architecture
              </h2>
              <img
                src={project.schematic_url}
                alt={`${project.title} schematic`}
                className="w-full rounded-sm border border-line bg-white"
              />
            </section>
          )}

          {project.code_notes && (
            <section>
              <h2 className="mb-3 text-xl font-semibold text-ink">
                Source Code &amp; Logic
              </h2>
              <p className="whitespace-pre-line leading-relaxed text-ink/85">
                {project.code_notes}
              </p>
              {project.source_code_url && (
                <a
                  href={project.source_code_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline mt-4"
                >
                  <GithubIcon size={16} /> View on GitHub
                </a>
              )}
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          {project.completion_date && (
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-amber-mark">
                {project.status === 'completed' ? 'Completed' : 'Target date'}
              </h3>
              <p className="text-sm text-ink/85">
                {formatMonthYear(project.completion_date)}
              </p>
            </div>
          )}

          {project.bom.length > 0 && (
            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-amber-mark">
                Tools &amp; Materials (BOM)
              </h3>
              <ul className="divide-y divide-line rounded-sm border border-line bg-white">
                {project.bom.map((item, i) => (
                  <li key={i} className="px-3 py-2 text-sm">
                    <div className="flex justify-between gap-2">
                      <span className="text-ink">{item.component}</span>
                      <span className="shrink-0 font-mono text-xs text-slate-muted">
                        {item.quantity}
                      </span>
                    </div>
                    {item.notes && (
                      <p className="mt-0.5 text-xs text-slate-muted">
                        {item.notes}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.source_code_url && (
            <a
              href={project.source_code_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <ExternalLink size={14} /> Repository
            </a>
          )}
        </aside>
      </div>

      <Footer />
    </div>
  )
}
