import { ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

export default function Hero() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-mark">
          Portfolio
        </p>

        <h1 className="text-4xl font-semibold leading-tight text-ink md:text-6xl">
          Raja Malik Chaniago
        </h1>

        <p className="text-lg text-slate-muted md:text-xl">
          Computer Engineering Student, Telkom University Surabaya
        </p>

        <p className="max-w-2xl text-base leading-relaxed text-ink/80">
          Passionate in Hardware Development, IoT, and Cybersecurity — building
          things that bridge code and the physical world.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <a href="#projects" className="btn-primary">
            View My Work
            <ArrowDown size={16} />
          </a>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-sm border border-line p-2.5 text-ink transition-colors hover:bg-ink/5"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-sm border border-line p-2.5 text-ink transition-colors hover:bg-ink/5"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
