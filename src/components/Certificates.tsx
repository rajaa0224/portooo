import { useState } from 'react'
import { X, FileText, ExternalLink } from 'lucide-react'
import type { Certificate } from '../types'
import { formatMonthYear } from '../lib/utils'

function CertThumb({ cert }: { cert: Certificate }) {
  if (cert.file_type === 'image') {
    return (
      <img
        src={cert.file_url}
        alt={cert.title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    )
  }
  // PDF — show an icon placeholder.
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-paper text-slate-muted">
      <FileText size={28} />
      <span className="font-mono text-xs">PDF</span>
    </div>
  )
}

export default function Certificates({
  certificates,
}: {
  certificates: Certificate[]
}) {
  const [active, setActive] = useState<Certificate | null>(null)
  if (certificates.length === 0) return null

  return (
    <section id="certificates" className="border-t border-line bg-paper">
      <div className="section">
        <h2 className="section-title">Certificates</h2>
        <div className="section-rule" />
        <p className="mb-10 max-w-2xl text-slate-muted">
          Courses, competitions, and credentials. Click any certificate to view
          it full size.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c)}
              className="group flex flex-col overflow-hidden rounded-sm border border-line bg-white text-left transition-colors hover:border-ink/40"
            >
              <div className="aspect-[4/3] w-full overflow-hidden border-b border-line">
                <CertThumb cert={c} />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-ink group-hover:underline">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-slate-muted">{c.issuer}</p>
                {c.issued_date && (
                  <p className="mt-1 font-mono text-xs text-slate-muted">
                    {formatMonthYear(c.issued_date)}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <CertificateViewer cert={active} onClose={() => setActive(null)} />
      )}
    </section>
  )
}

function CertificateViewer({
  cert,
  onClose,
}: {
  cert: Certificate
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-line bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-ink">{cert.title}</h3>
            <p className="truncate text-xs text-slate-muted">{cert.issuer}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-sm p-1.5 text-ink hover:bg-ink/10"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-paper">
          {cert.file_type === 'image' ? (
            <img
              src={cert.file_url}
              alt={cert.title}
              className="mx-auto max-h-[75vh] w-auto"
            />
          ) : (
            <iframe
              src={cert.file_url}
              title={cert.title}
              className="h-[75vh] w-full"
            />
          )}
        </div>

        {cert.credential_url && (
          <div className="border-t border-line px-4 py-3">
            <a
              href={cert.credential_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <ExternalLink size={14} /> Verify credential
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
