import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import type { Project } from '../types'
import FadeIn from '../components/motion/FadeIn'
import GhostButton from '../components/ui/GhostButton'

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const completed = projects.filter((p) => p.status === 'completed')
  const total = completed.length || 1

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] sm:-mt-12 sm:rounded-t-[50px] md:-mt-14 md:rounded-t-[60px]"
    >
      <div className="px-5 pt-20 sm:px-8 md:px-10">
        <FadeIn y={40}>
          <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>
      </div>

      {completed.length === 0 ? (
        <p className="px-6 py-20 text-center font-mono text-sm text-[#646973]">
          No published projects yet.
        </p>
      ) : (
        <div ref={container} className="px-5 pb-20 sm:px-8 md:px-10">
          {completed.map((p, i) => {
            const targetScale = 1 - (total - 1 - i) * 0.03
            const range: [number, number] = [i * (1 / total), 1]
            return (
              <Card
                key={p.id}
                project={p}
                index={i}
                number={String(i + 1).padStart(2, '0')}
                progress={scrollYProgress}
                range={range}
                targetScale={targetScale}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}

function Card({
  project,
  index,
  number,
  progress,
  range,
  targetScale,
}: {
  project: Project
  index: number
  number: string
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}) {
  const scale = useTransform(progress, range, [1, targetScale])
  const img1 = project.image_url
  const img2 = project.schematic_url ?? project.image_url
  const imgTall = project.image_url ?? project.schematic_url

  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.div
        style={{ scale, top: index * 28 }}
        className="relative w-full max-w-5xl rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        {/* Top row */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-4">
            <span className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              {number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#646973] sm:text-sm">
                {project.tech[0] ?? 'Project'}
              </span>
              <span className="text-lg font-medium uppercase text-[#D7E2EA] sm:text-2xl">
                {project.title}
              </span>
            </div>
          </div>
          <GhostButton label="View details" to={`/projects/${project.slug}`} />
        </div>

        {/* Image grid */}
        <div className="flex gap-3">
          <div className="flex w-2/5 flex-col gap-3">
            <Media src={img1} className="w-full" h="clamp(130px, 16vw, 230px)" />
            <Media src={img2} className="w-full" h="clamp(160px, 22vw, 340px)" />
          </div>
          <div className="w-3/5">
            <Media src={imgTall} className="h-full w-full" h="100%" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Media({
  src,
  className,
  h,
}: {
  src: string | null
  className?: string
  h: string
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center rounded-[40px] bg-white/5 font-mono text-xs text-[#646973] sm:rounded-[50px] md:rounded-[60px] ${className}`}
        style={{ height: h, minHeight: h === '100%' ? '320px' : undefined }}
      >
        no image
      </div>
    )
  }
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className={`rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px] ${className}`}
      style={{ height: h, minHeight: h === '100%' ? '320px' : undefined }}
    />
  )
}
