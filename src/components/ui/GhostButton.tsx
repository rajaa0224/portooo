import { Link } from 'react-router-dom'

interface Props {
  label: string
  /** Internal route (react-router). */
  to?: string
  /** External href. */
  href?: string
  className?: string
}

const base =
  'inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base'

/** Outline pill — "Live Project" / "View details". */
export default function GhostButton({ label, to, href, className = '' }: Props) {
  if (to) {
    return (
      <Link to={to} className={`${base} ${className}`}>
        {label}
      </Link>
    )
  }
  return (
    <a
      href={href}
      target={href ? '_blank' : undefined}
      rel="noreferrer"
      className={`${base} ${className}`}
    >
      {label}
    </a>
  )
}
