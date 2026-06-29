import { GithubIcon, LinkedinIcon } from './icons'

/** Brand logo (inline SVG) from the template. */
function Logo() {
  return (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none">
      <path
        fill="rgb(84, 84, 84)"
        d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
      />
    </svg>
  )
}

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'In The Lab', href: '#lab' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

export default function Hero() {
  return (
    <header className="relative min-h-screen overflow-hidden bg-[#f0f0ee]">
      {/* Background photo — replaces the template's video. Put your photo at
          public/raja.jpg. Slow Ken Burns zoom for life. */}
      <img
        src="/raja.jpeg"
        alt="Raja Malik Chaniago"
        className="hero-photo absolute inset-0 h-full w-full object-cover object-[center_25%]"
        onError={(e) => {
          // No photo uploaded yet — hide so the page background shows instead.
          ;(e.currentTarget as HTMLImageElement).style.display = 'none'
        }}
      />
      {/* Subtle scrim — only along the bottom so the text stays readable while
          the photo itself stays clearly visible. */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#f0f0ee]/85 via-[#f0f0ee]/10 to-transparent" />

      {/* Foreground */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navbar */}
        <nav className="hero-anim flex items-center justify-center gap-2 px-4 pt-4 sm:gap-3 sm:px-8 sm:pt-6">
          <a
            href="#top"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm transition-transform duration-200 hover:scale-105 sm:h-11 sm:w-11"
            style={{ backgroundColor: '#EDEDED' }}
            aria-label="Home"
          >
            <Logo />
          </a>
          <div
            className="flex items-center gap-4 rounded-xl px-4 py-2.5 shadow-sm sm:gap-10 sm:px-8 sm:py-3"
            style={{ backgroundColor: '#EDEDED' }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 sm:text-[14px]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero content — bottom-left */}
        <div className="flex flex-1 items-end px-6 pb-10 sm:px-12 sm:pb-16 md:px-20 lg:px-28 lg:pb-20">
          <div className="max-w-sm">
            <a
              href="#projects"
              className="hero-anim group mb-3 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-500 transition-colors hover:text-blue-600"
              style={{ animationDelay: '120ms' }}
            >
              Hardware · IoT · Cybersecurity
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>

            <h1
              className="hero-anim mb-3 text-[2rem] font-semibold leading-[1.1] tracking-tight text-gray-900 sm:text-[2.5rem]"
              style={{ animationDelay: '220ms' }}
            >
              Raja Malik Chaniago
            </h1>

            <p
              className="hero-anim mb-4 text-[13px] font-normal leading-relaxed text-gray-500"
              style={{ animationDelay: '320ms' }}
            >
              Computer Engineering Student at Telkom University Surabaya.
              Building things that bridge code and the physical world.
            </p>

            <div
              className="hero-anim flex items-center gap-3"
              style={{ animationDelay: '420ms' }}
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full border border-blue-400 px-5 py-2.5 text-[13px] font-medium text-blue-500 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
              >
                View my work
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </a>

              <a
                href="https://github.com/rajaa0224"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-900/5 hover:text-gray-900"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/raja-malik-chaniago-0943352b0"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-900/5 hover:text-gray-900"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
