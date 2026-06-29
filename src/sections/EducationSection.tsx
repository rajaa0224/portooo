import { GraduationCap, Briefcase } from 'lucide-react'
import FadeIn from '../components/motion/FadeIn'

interface TimelineItem {
  period: string
  title: string
  org: string
  detail: string
}

// EDIT THESE with your real details.
const EDUCATION: TimelineItem[] = [
  {
    period: '2023 — Present',
    title: 'Computer Engineering',
    org: 'Telkom University Surabaya',
    detail:
      'Studying hardware development, embedded systems, IoT, and cybersecurity.',
  },
  {
    period: '2020 — 2023',
    title: 'Senior High School',
    org: 'SMA / SMK (update me)',
    detail: 'Science / vocational track.',
  },
]

const EXPERIENCE: TimelineItem[] = [
  {
    period: '2024 — Present',
    title: 'Member — Robotics & IoT',
    org: 'Campus organization (update me)',
    detail: 'Designing, assembling, and testing embedded hardware prototypes.',
  },
  {
    period: '2023 — 2024',
    title: 'Freelance / Project work',
    org: 'Self-directed (update me)',
    detail: 'Built personal hardware and automation projects end to end.',
  },
]

function Timeline({
  icon,
  heading,
  items,
}: {
  icon: React.ReactNode
  heading: string
  items: TimelineItem[]
}) {
  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <span className="text-[#BBCCD7]">{icon}</span>
        <h3 className="text-xl font-medium uppercase tracking-wide text-[#D7E2EA]">
          {heading}
        </h3>
      </div>

      <div className="relative border-l border-[#D7E2EA]/20 pl-6">
        {items.map((item, i) => (
          <FadeIn key={i} delay={i * 0.1} x={20}>
            <div className="relative mb-8 last:mb-0">
              {/* dot */}
              <span className="absolute -left-[1.92rem] top-1.5 h-3 w-3 rounded-full border-2 border-[#0C0C0C] bg-[#BBCCD7]" />
              <p className="font-mono text-xs uppercase tracking-wider text-[#646973]">
                {item.period}
              </p>
              <h4 className="mt-1 text-lg font-medium text-[#D7E2EA]">
                {item.title}
              </h4>
              <p className="text-sm text-[#BBCCD7]">{item.org}</p>
              <p className="mt-1 text-sm font-light leading-relaxed text-[#D7E2EA]/60">
                {item.detail}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative z-10 bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10 md:py-28"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight md:mb-20"
          style={{ fontSize: 'clamp(2rem, 6.5vw, 76px)' }}
        >
          Journey
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2 md:gap-16">
        <Timeline
          icon={<GraduationCap size={22} />}
          heading="Education"
          items={EDUCATION}
        />
        <Timeline
          icon={<Briefcase size={22} />}
          heading="Experience"
          items={EXPERIENCE}
        />
      </div>
    </section>
  )
}
