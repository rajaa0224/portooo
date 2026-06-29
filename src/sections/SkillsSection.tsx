import FadeIn from '../components/motion/FadeIn'

const SKILLS = [
  {
    no: '01',
    name: 'Hardware Development',
    desc: 'Designing and assembling electronic devices — from circuits to working prototypes for robotics and embedded systems.',
  },
  {
    no: '02',
    name: 'IoT Systems',
    desc: 'Connecting sensors and microcontrollers (ESP32 / Arduino) to the cloud for monitoring, automation, and smart control.',
  },
  {
    no: '03',
    name: 'Embedded Programming',
    desc: 'Writing efficient C/C++ and Python firmware that drives sensors, motors, and real-time control loops.',
  },
  {
    no: '04',
    name: 'Cybersecurity',
    desc: 'Exploring network security, penetration-testing fundamentals, and building safer, more resilient systems.',
  },
  {
    no: '05',
    name: 'PCB & Circuit Design',
    desc: 'Schematic capture and circuit design to turn ideas into reliable, manufacturable hardware.',
  },
]

export default function SkillsSection() {
  return (
    <section className="rounded-t-[40px] bg-white px-5 py-16 sm:rounded-t-[50px] sm:px-8 sm:py-20 md:rounded-t-[60px] md:px-10 md:py-24">
      <FadeIn y={40}>
        <h2
          className="mb-12 text-center font-black uppercase text-[#0C0C0C] sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(2rem, 6.5vw, 76px)' }}
        >
          Skills
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SKILLS.map((s, i) => (
          <FadeIn key={s.no} delay={i * 0.1}>
            <div
              className="flex items-start gap-5 py-8 sm:gap-8 sm:py-10 md:py-12"
              style={{ borderTop: '1px solid rgba(12, 12, 12, 0.15)' }}
            >
              <span
                className="shrink-0 font-black leading-none text-[#0C0C0C]"
                style={{ fontSize: 'clamp(2rem, 5.5vw, 72px)' }}
              >
                {s.no}
              </span>
              <div className="flex flex-col gap-3 pt-2">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {s.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
