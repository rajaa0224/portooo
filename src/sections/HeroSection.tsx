import FadeIn from '../components/motion/FadeIn'
import Magnet from '../components/motion/Magnet'
import ContactButton from '../components/ui/ContactButton'

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

export default function HeroSection() {
  return (
    <section
      className="relative flex h-screen flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn y={-20} delay={0}>
        <nav className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
          <a
            href="#top"
            className="text-sm font-semibold uppercase tracking-wider text-[#D7E2EA] md:text-lg lg:text-[1.4rem]"
          >
            RMC
          </a>
          <div className="flex items-center gap-5 md:gap-10">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      {/* Massive heading */}
      <div className="overflow-hidden px-6 md:px-10">
        <FadeIn y={40} delay={0.15}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m raja
          </h1>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="mt-auto flex items-end justify-between px-6 pb-7 md:px-10 sm:pb-8 md:pb-10">
        <FadeIn y={20} delay={0.35}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a computer engineering student crafting striking hardware, iot &amp;
            cybersecurity projects
          </p>
        </FadeIn>
        <FadeIn y={20} delay={0.5}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Magnetic portrait */}
      <FadeIn
        y={30}
        delay={0.6}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:translate-y-0"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src="/raja.jpeg"
            alt="Raja Malik Chaniago"
            className="w-[280px] rounded-[28px] object-cover shadow-2xl ring-1 ring-white/10 sm:w-[360px] md:w-[440px] lg:w-[520px]"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
        </Magnet>
      </FadeIn>
    </section>
  )
}
