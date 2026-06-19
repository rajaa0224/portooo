import type { Project } from '../types'
import { formatMonthYear } from '../lib/utils'

function ProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className="mt-4">
      <div className="mb-1 flex justify-between font-mono text-xs text-slate-muted">
        <span>{pct}% complete</span>
      </div>
      <div className="h-2 w-full rounded-sm bg-line">
        <div
          className="h-2 rounded-sm bg-accent"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function InTheLab({ projects }: { projects: Project[] }) {
  const wip = projects.filter((p) => p.status === 'in_progress')
  if (wip.length === 0) return null

  return (
    <section id="lab" className="border-b border-line bg-paper">
      <div className="section">
        <h2 className="section-title">In The Lab</h2>
        <div className="section-rule" />
        <p className="mb-10 max-w-2xl text-slate-muted">
          Work in progress — projects currently being researched, assembled, or
          tested.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {wip.map((p) => (
            <article
              key={p.id}
              className="rounded-sm border border-line bg-white p-6"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                {p.lab_stage && (
                  <span className="shrink-0 rounded-sm border border-amber-mark/40 bg-amber-mark/10 px-2 py-0.5 font-mono text-xs text-amber-mark">
                    {p.lab_stage}
                  </span>
                )}
              </div>

              <p className="text-sm leading-relaxed text-ink/80">{p.summary}</p>

              <ProgressBar value={p.progress} />

              {p.completion_date && (
                <p className="mt-3 font-mono text-xs text-slate-muted">
                  Est. completion: {formatMonthYear(p.completion_date)}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
