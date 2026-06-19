import { useState, type FormEvent } from 'react'
import { Plus, Trash2, Upload } from 'lucide-react'
import type { BomItem, Project, ProjectInput, ProjectStatus } from '../types'
import { slugify } from '../lib/utils'
import { uploadProjectFile } from '../lib/upload'

interface Props {
  initial?: Project
  onSubmit: (input: ProjectInput) => Promise<void>
  onCancel: () => void
}

const LAB_STAGES = ['Research Stage', 'Hardware Assembly', 'Code Testing']

export default function ProjectForm({ initial, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [summary, setSummary] = useState(initial?.summary ?? '')
  const [problem, setProblem] = useState(initial?.problem ?? '')
  const [fullDescription, setFullDescription] = useState(
    initial?.full_description ?? '',
  )
  const [techText, setTechText] = useState((initial?.tech ?? []).join(', '))
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? '')
  const [status, setStatus] = useState<ProjectStatus>(
    initial?.status ?? 'in_progress',
  )
  const [labStage, setLabStage] = useState(initial?.lab_stage ?? LAB_STAGES[0])
  const [progress, setProgress] = useState(initial?.progress ?? 0)
  const [completionDate, setCompletionDate] = useState(
    initial?.completion_date ?? '',
  )
  const [bom, setBom] = useState<BomItem[]>(initial?.bom ?? [])
  const [schematicUrl, setSchematicUrl] = useState(initial?.schematic_url ?? '')
  const [sourceCodeUrl, setSourceCodeUrl] = useState(
    initial?.source_code_url ?? '',
  )
  const [codeNotes, setCodeNotes] = useState(initial?.code_notes ?? '')
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0)

  const [uploading, setUploading] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleUpload(
    file: File | undefined,
    setter: (url: string) => void,
    key: string,
  ) {
    if (!file) return
    setUploading(key)
    setError(null)
    try {
      const url = await uploadProjectFile(file)
      setter(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(null)
    }
  }

  function updateBom(i: number, patch: Partial<BomItem>) {
    setBom((prev) => prev.map((b, idx) => (idx === i ? { ...b, ...patch } : b)))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    const input: ProjectInput = {
      title: title.trim(),
      slug: slugify(title),
      summary: summary.trim(),
      problem: problem.trim(),
      full_description: fullDescription.trim(),
      tech: techText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      image_url: imageUrl || null,
      status,
      lab_stage: status === 'in_progress' ? labStage : null,
      progress: Number(progress) || 0,
      completion_date: completionDate || null,
      bom: bom.filter((b) => b.component.trim()),
      schematic_url: schematicUrl || null,
      source_code_url: sourceCodeUrl || null,
      code_notes: codeNotes.trim() || null,
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
          required
        />
      </div>

      <div>
        <label className="field-label">Short summary (cards)</label>
        <input
          className="field-input"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="field-label">Problem it solves (modal)</label>
        <textarea
          className="field-input min-h-20"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
      </div>

      <div>
        <label className="field-label">
          Full description / how it works (detail page)
        </label>
        <textarea
          className="field-input min-h-32"
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="field-label">Technology (comma-separated)</label>
        <input
          className="field-input font-mono"
          placeholder="C++, Python, ESP32"
          value={techText}
          onChange={(e) => setTechText(e.target.value)}
        />
      </div>

      {/* Status + lab fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">Status</label>
          <select
            className="field-input"
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          >
            <option value="in_progress">In Progress (In The Lab)</option>
            <option value="completed">Completed (Showcase)</option>
          </select>
        </div>
        <div>
          <label className="field-label">
            {status === 'completed' ? 'Completion date' : 'Target date'}
          </label>
          <input
            type="date"
            className="field-input"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
          />
        </div>
      </div>

      {status === 'in_progress' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label">Lab stage</label>
            <select
              className="field-input"
              value={labStage}
              onChange={(e) => setLabStage(e.target.value)}
            >
              {LAB_STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Progress: {progress}%</label>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              className="w-full"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
            />
          </div>
        </div>
      )}

      {/* Images */}
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageField
          label="Main photo / render"
          url={imageUrl}
          uploading={uploading === 'image'}
          onFile={(f) => handleUpload(f, setImageUrl, 'image')}
          onClear={() => setImageUrl('')}
        />
        <ImageField
          label="Schematic / architecture"
          url={schematicUrl}
          uploading={uploading === 'schematic'}
          onFile={(f) => handleUpload(f, setSchematicUrl, 'schematic')}
          onClear={() => setSchematicUrl('')}
        />
      </div>

      {/* BOM editor */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="field-label mb-0">Tools &amp; Materials (BOM)</label>
          <button
            type="button"
            onClick={() =>
              setBom((p) => [...p, { component: '', quantity: '', notes: '' }])
            }
            className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            <Plus size={14} /> Add item
          </button>
        </div>
        <div className="space-y-2">
          {bom.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="field-input flex-1"
                placeholder="Component"
                value={item.component}
                onChange={(e) => updateBom(i, { component: e.target.value })}
              />
              <input
                className="field-input w-24"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => updateBom(i, { quantity: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setBom((p) => p.filter((_, idx) => idx !== i))}
                className="rounded-sm border border-line px-2 text-slate-muted hover:text-amber-mark"
                aria-label="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Code */}
      <div>
        <label className="field-label">Source code notes / logic</label>
        <textarea
          className="field-input min-h-24"
          value={codeNotes}
          onChange={(e) => setCodeNotes(e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">GitHub / source link</label>
          <input
            className="field-input font-mono"
            placeholder="https://github.com/..."
            value={sourceCodeUrl}
            onChange={(e) => setSourceCodeUrl(e.target.value)}
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
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? 'Saving…' : initial ? 'Save changes' : 'Create project'}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  )
}

function ImageField({
  label,
  url,
  uploading,
  onFile,
  onClear,
}: {
  label: string
  url: string
  uploading: boolean
  onFile: (file: File | undefined) => void
  onClear: () => void
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {url ? (
        <div className="space-y-2">
          <img
            src={url}
            alt={label}
            className="h-32 w-full rounded-sm border border-line object-cover"
          />
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-slate-muted hover:text-amber-mark"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-line bg-white text-sm text-slate-muted hover:border-accent">
          <Upload size={18} />
          {uploading ? 'Uploading…' : 'Choose image'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
      )}
    </div>
  )
}
