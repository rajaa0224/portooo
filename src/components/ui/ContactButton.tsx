interface Props {
  label?: string
  href?: string
  className?: string
}

/** The gradient pill CTA from the template. */
export default function ContactButton({
  label = 'Contact Me',
  href = '#contact',
  className = '',
}: Props) {
  return (
    <a
      href={href}
      className={`inline-block rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #fff',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </a>
  )
}
