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
      <FadeIn y={-20} delay={0} className="relative z-10">
        <nav className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
          <a
            href="#top"
            className="text-sm font-semibold uppercase tracking-wider text-[#D7E2EA] md:text-base"
          >
            RMC
          </a>
          <div className="flex items-center gap-5 md:gap-9">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-xs font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-sm"
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      {/* Heading */}
      <div className="relative z-10 overflow-hidden px-6 md:px-10">
        <FadeIn y={40} delay={0.15}>
          <h1
            className="hero-heading mt-6 w-full whitespace-nowrap font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.25rem, 10vw, 7rem)' }}
          >
            Hi, i&apos;m raja
          </h1>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mt-auto flex items-end justify-between px-6 pb-8 md:px-10 md:pb-12">
        <FadeIn y={20} delay={0.35}>
          <p
            className="max-w-[200px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[240px] md:max-w-[280px]"
            style={{ fontSize: 'clamp(0.7rem, 1vw, 1rem)' }}
          >
            a computer engineering student crafting striking hardware, iot &amp;
            cybersecurity projects
          </p>
        </FadeIn>
        <FadeIn y={20} delay={0.5}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Magnetic portrait — cropped + edge-faded so it blends in */}
      <FadeIn
        y={30}
        delay={0.6}
        className="pointer-events-none absolute left-1/2 top-[52%] z-0 -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:translate-y-0"
      >
        <Magnet
          padding={140}
          strength={4}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src="/raja.png"
            alt="Raja Malik Chaniago"
            className="w-[200px] object-contain drop-shadow-2xl sm:w-[240px] md:w-[280px] lg:w-[320px]"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
        </Magnet>
      </FadeIn>
    </section>
  )
}
