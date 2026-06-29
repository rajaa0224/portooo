import { useState } from 'react'
import { X, FileText, ExternalLink } from 'lucide-react'
import type { Certificate } from '../types'
import FadeIn from '../components/motion/FadeIn'
import { formatMonthYear } from '../lib/utils'

export default function CertificatesSection({
  certificates,
}: {
  certificates: Certificate[]
}) {
  const [active, setActive] = useState<Certificate | null>(null)
  if (certificates.length === 0) return null

  return (
    <section
      id="certificates"
      className="bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10 md:py-28"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight md:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Certificates
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, i) => (
          <FadeIn key={c.id} delay={i * 0.08}>
            <button
              type="button"
              onClick={() => setActive(c)}
              className="group flex w-full flex-col overflow-hidden rounded-[24px] border border-[#D7E2EA]/15 bg-white/[0.03] text-left transition-colors hover:border-[#D7E2EA]/40"
            >
              <div className="aspect-[4/3] w-full overflow-hidden border-b border-[#D7E2EA]/10">
                {c.file_type === 'image' ? (
                  <img
                    src={c.file_url}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#646973]">
                    <FileText size={28} />
                    <span className="font-mono text-xs">PDF</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-[#D7E2EA]">{c.title}</h3>
                <p className="mt-1 text-sm text-[#646973]">{c.issuer}</p>
                {c.issued_date && (
                  <p className="mt-1 font-mono text-xs text-[#646973]">
                    {formatMonthYear(c.issued_date)}
                  </p>
                )}
              </div>
            </button>
          </FadeIn>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[24px] border border-[#D7E2EA]/20 bg-[#0C0C0C]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#D7E2EA]/15 px-4 py-3">
              <div className="min-w-0">
                <h3 className="truncate font-medium text-[#D7E2EA]">{active.title}</h3>
                <p className="truncate text-xs text-[#646973]">{active.issuer}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="rounded-full p-1.5 text-[#D7E2EA] hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto bg-black">
              {active.file_type === 'image' ? (
                <img src={active.file_url} alt={active.title} className="mx-auto max-h-[75vh] w-auto" />
              ) : (
                <iframe src={active.file_url} title={active.title} className="h-[75vh] w-full" />
              )}
            </div>
            {active.credential_url && (
              <div className="border-t border-[#D7E2EA]/15 px-4 py-3">
                <a
                  href={active.credential_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#BBCCD7] hover:underline"
                >
                  <ExternalLink size={14} /> Verify credential
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
