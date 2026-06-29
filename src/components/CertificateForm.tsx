import { useState, type FormEvent } from 'react'
import { Upload, FileText } from 'lucide-react'
import type { Certificate, CertificateInput } from '../types'
import { uploadProjectFile } from '../lib/upload'

interface Props {
  initial?: Certificate
  onSubmit: (input: CertificateInput) => Promise<void>
  onCancel: () => void
}

export default function CertificateForm({ initial, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [issuer, setIssuer] = useState(initial?.issuer ?? '')
  const [issuedDate, setIssuedDate] = useState(initial?.issued_date ?? '')
  const [fileUrl, setFileUrl] = useState(initial?.file_url ?? '')
  const [fileType, setFileType] = useState<'image' | 'pdf'>(
    initial?.file_type ?? 'image',
  )
  const [credentialUrl, setCredentialUrl] = useState(
    initial?.credential_url ?? '',
  )
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0)

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File | undefined) {
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const url = await uploadProjectFile(file)
      setFileUrl(url)
      setFileType(file.type === 'application/pdf' ? 'pdf' : 'image')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!fileUrl) {
      setError('Please upload a certificate file (image or PDF).')
      return
    }
    setError(null)
    setSaving(true)
    const input: CertificateInput = {
      title: title.trim(),
      issuer: issuer.trim(),
      issued_date: issuedDate || null,
      file_url: fileUrl,
      file_type: fileType,
      credential_url: credentialUrl.trim() || null,
      sort_order: Number(sortOrder) || 0,
    }
    try {
      await onSubmit(input)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="rounded-sm border border-amber-mark/40 bg-amber-mark/10 px-3 py-2 text-sm text-amber-mark">
          {error}
        </p>
      )}

      <div>
        <label className="field-label">Title</label>
        <input
          className="field-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Cisco CCNA: Introduction to Networks"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">Issuer</label>
          <input
            className="field-input"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            placeholder="e.g. Cisco Networking Academy"
            required
          />
        </div>
        <div>
          <label className="field-label">Date issued</label>
          <input
            type="date"
            className="field-input"
            value={issuedDate}
            onChange={(e) => setIssuedDate(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="field-label">Certificate file (image or PDF)</label>
        {fileUrl ? (
          <div className="space-y-2">
            {fileType === 'image' ? (
              <img
                src={fileUrl}
                alt="certificate"
                className="max-h-48 rounded-sm border border-line object-contain"
              />
            ) : (
              <div className="flex items-center gap-2 rounded-sm border border-line bg-paper px-3 py-2 text-sm text-slate-muted">
                <FileText size={16} /> PDF uploaded
              </div>
            )}
            <button
              type="button"
              onClick={() => setFileUrl('')}
              className="text-xs text-slate-muted hover:text-amber-mark"
            >
              Replace file
            </button>
          </div>
        ) : (
          <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-line bg-white text-sm text-slate-muted hover:border-accent">
            <Upload size={18} />
            {uploading ? 'Uploading…' : 'Choose image or PDF'}
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">Verify / credential link (optional)</label>
          <input
            className="field-input font-mono"
            value={credentialUrl}
            onChange={(e) => setCredentialUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="field-label">Sort order</label>
          <input
            type="number"
            className="field-input"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex gap-3 border-t border-line pt-5">
        <button
          type="submit"
          disabled={saving || uploading}
          className="btn-primary disabled:opacity-60"
        >
          {saving ? 'Saving…' : initial ? 'Save changes' : 'Add certificate'}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  )
}
