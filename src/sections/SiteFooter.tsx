import { useNavigate } from 'react-router-dom'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import FadeIn from '../components/motion/FadeIn'
import ContactButton from '../components/ui/ContactButton'

export default function SiteFooter() {
  const navigate = useNavigate()

  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] px-5 py-24 sm:px-8 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <FadeIn y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 130px)' }}
          >
            Let&apos;s talk
          </h2>
        </FadeIn>

        <FadeIn y={20} delay={0.1}>
          <p className="max-w-md font-light text-[#D7E2EA]/70">
            Open to internships, collaborations, and interesting hardware
            problems. Reach out — I&apos;d love to build something with you.
          </p>
        </FadeIn>

        <FadeIn y={20} delay={0.2}>
          <ContactButton
            label="Email Me"
            href="mailto:ayakaert@gmail.com"
          />
        </FadeIn>

        <FadeIn y={20} delay={0.3}>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/rajaa0224"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA] transition-colors hover:bg-white/10"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/raja-malik-chaniago-0943352b0"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA] transition-colors hover:bg-white/10"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </FadeIn>
      </div>

      <div className="mt-20 border-t border-[#D7E2EA]/10 pt-8 text-center">
        <p className="text-sm text-[#646973]">
          © 2026 Raja Malik Chaniago.{' '}
          {/* Hidden admin access */}
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="text-[#646973] transition-colors hover:text-[#D7E2EA]"
            title="Built with passion"
          >
            Built with passion.
          </button>
        </p>
      </div>
    </footer>
  )
}
