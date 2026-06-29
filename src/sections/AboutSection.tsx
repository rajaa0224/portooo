import { Cpu, Wifi, ShieldCheck, CircuitBoard } from 'lucide-react'
import FadeIn from '../components/motion/FadeIn'
import AnimatedText from '../components/motion/AnimatedText'
import ContactButton from '../components/ui/ContactButton'

const BIO =
  "I'm a Computer Engineering student at Telkom University Surabaya with a passion for hardware, IoT, and cybersecurity. I love building devices that bridge code and the physical world — from smart robots to embedded systems and secure networks. Let's build something incredible together!"

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
      style={{ overflowX: 'clip' }}
    >
      {/* Decorative floating tech icons in the corners */}
      <FadeIn
        x={-80}
        delay={0.1}
        duration={0.9}
        className="absolute left-[1%] top-[4%] sm:left-[2%] md:left-[4%]"
      >
        <Cpu className="h-[80px] w-[80px] text-[#646973] sm:h-[110px] sm:w-[110px] md:h-[140px] md:w-[140px]" strokeWidth={1} />
      </FadeIn>
      <FadeIn
        x={80}
        delay={0.15}
        duration={0.9}
        className="absolute right-[1%] top-[4%] sm:right-[2%] md:right-[4%]"
      >
        <Wifi className="h-[80px] w-[80px] text-[#646973] sm:h-[110px] sm:w-[110px] md:h-[140px] md:w-[140px]" strokeWidth={1} />
      </FadeIn>
      <FadeIn
        x={-80}
        delay={0.25}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]"
      >
        <CircuitBoard className="h-[70px] w-[70px] text-[#646973] sm:h-[95px] sm:w-[95px] md:h-[120px] md:w-[120px]" strokeWidth={1} />
      </FadeIn>
      <FadeIn
        x={80}
        delay={0.3}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]"
      >
        <ShieldCheck className="h-[70px] w-[70px] text-[#646973] sm:h-[95px] sm:w-[95px] md:h-[120px] md:w-[120px]" strokeWidth={1} />
      </FadeIn>

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40} delay={0}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <AnimatedText
          text={BIO}
          className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />
      </div>

      <div className="mt-16 sm:mt-20 md:mt-24">
        <FadeIn y={20} delay={0.1}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
