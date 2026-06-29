import type { Project } from '../types'
import FadeIn from '../components/motion/FadeIn'
import { formatMonthYear } from '../lib/utils'

/** "In The Lab" — work in progress, dark theme. */
export default function LabSection({ projects }: { projects: Project[] }) {
  const wip = projects.filter((p) => p.status === 'in_progress')
  if (wip.length === 0) return null

  return (
    <section id="lab" className="bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <FadeIn y={40}>
        <h2
          className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight md:mb-20"
          style={{ fontSize: 'clamp(2rem, 6.5vw, 76px)' }}
        >
          In the lab
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        {wip.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.1}>
            <article className="rounded-[28px] border border-[#D7E2EA]/20 bg-white/[0.03] p-6 md:p-8">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-xl font-medium text-[#D7E2EA]">{p.title}</h3>
                {p.lab_stage && (
                  <span className="shrink-0 rounded-full border border-[#646973] px-3 py-1 text-xs uppercase tracking-wider text-[#646973]">
                    {p.lab_stage}
                  </span>
                )}
              </div>
              <p className="text-sm font-light leading-relaxed text-[#D7E2EA]/70">
                {p.summary}
              </p>

              <div className="mt-5">
                <div className="mb-1 flex justify-between text-xs text-[#646973]">
                  <span>{p.progress}% complete</span>
                  {p.completion_date && (
                    <span>Est. {formatMonthYear(p.completion_date)}</span>
                  )}
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${Math.max(0, Math.min(100, p.progress))}%`,
                      background:
                        'linear-gradient(90deg, #B600A8 0%, #7621B0 100%)',
                    }}
                  />
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
