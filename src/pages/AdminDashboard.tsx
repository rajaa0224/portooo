import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Plus, Pencil, Trash2, ExternalLink, FileText } from 'lucide-react'
import { useAuth } from '../lib/AuthContext'
import {
  useProjects,
  createProject,
  updateProject,
  deleteProject,
  toggleStatus,
} from '../lib/useProjects'
import {
  useCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from '../lib/useCertificates'
import type {
  Certificate,
  CertificateInput,
  Project,
  ProjectInput,
} from '../types'
import ProjectForm from '../components/ProjectForm'
import CertificateForm from '../components/CertificateForm'
import { formatMonthYear } from '../lib/utils'

type Tab = 'projects' | 'certificates'
type ProjectView =
  | { mode: 'list' }
  | { mode: 'new' }
  | { mode: 'edit'; project: Project }
type CertView =
  | { mode: 'list' }
  | { mode: 'new' }
  | { mode: 'edit'; cert: Certificate }

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const [tab, setTab] = useState<Tab>('projects')

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-ink">Admin Dashboard</h1>
            <Link to="/" className="text-xs text-slate-muted hover:text-ink">
              View site ↗
            </Link>
          </div>
          <button onClick={() => signOut()} className="btn-outline">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-content px-6 py-10">
        <div className="mb-8 flex gap-1 border-b border-line">
          <TabButton active={tab === 'projects'} onClick={() => setTab('projects')}>
            Projects
          </TabButton>
          <TabButton
            active={tab === 'certificates'}
            onClick={() => setTab('certificates')}
          >
            Certificates
          </TabButton>
        </div>

        {tab === 'projects' ? <ProjectsPanel /> : <CertificatesPanel />}
      </main>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? '-mb-px border-b-2 border-accent px-4 py-2 text-sm font-medium text-ink'
          : '-mb-px border-b-2 border-transparent px-4 py-2 text-sm text-slate-muted hover:text-ink'
      }
    >
      {children}
    </button>
  )
}

/* ------------------------------- Projects ------------------------------- */
function ProjectsPanel() {
  const { projects, loading, refresh } = useProjects()
  const [view, setView] = useState<ProjectView>({ mode: 'list' })
  const [busyId, setBusyId] = useState<string | null>(null)

  async function handleCreate(input: ProjectInput) {
    const { error } = await createProject(input)
    if (error) throw new Error(error.message)
    await refresh()
    setView({ mode: 'list' })
  }
  async function handleUpdate(id: string, input: ProjectInput) {
    const { error } = await updateProject(id, input)
    if (error) throw new Error(error.message)
    await refresh()
    setView({ mode: 'list' })
  }
  async function handleDelete(p: Project) {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return
    setBusyId(p.id)
    await deleteProject(p.id)
    await refresh()
    setBusyId(null)
  }
  async function handleToggle(p: Project) {
    setBusyId(p.id)
    await toggleStatus(p.id, p.status === 'completed' ? 'in_progress' : 'completed')
    await refresh()
    setBusyId(null)
  }

  if (view.mode === 'new') {
    return (
      <Panel title="New project">
        <ProjectForm onSubmit={handleCreate} onCancel={() => setView({ mode: 'list' })} />
      </Panel>
    )
  }
  if (view.mode === 'edit') {
    return (
      <Panel title={`Edit: ${view.project.title}`}>
        <ProjectForm
          initial={view.project}
          onSubmit={(input) => handleUpdate(view.project.id, input)}
          onCancel={() => setView({ mode: 'list' })}
        />
      </Panel>
    )
  }

  return (
    <>
      <ListHeader
        title={`Projects (${projects.length})`}
        onNew={() => setView({ mode: 'new' })}
        newLabel="New project"
      />
      {loading ? (
        <Loading />
      ) : projects.length === 0 ? (
        <Empty text="No projects yet. Create your first one." />
      ) : (
        <div className="overflow-hidden rounded-sm border border-line bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-paper text-left">
              <tr className="text-xs uppercase tracking-wide text-slate-muted">
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {projects.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink">{p.title}</div>
                    <div className="text-xs text-slate-muted">{p.tech.join(', ')}</div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggle(p)}
                      disabled={busyId === p.id}
                      className={
                        p.status === 'completed'
                          ? 'rounded-sm border border-accent/40 bg-accent-soft px-2 py-1 font-mono text-xs text-accent disabled:opacity-50'
                          : 'rounded-sm border border-amber-mark/40 bg-amber-mark/10 px-2 py-1 font-mono text-xs text-amber-mark disabled:opacity-50'
                      }
                      title="Click to toggle status"
                    >
                      {p.status === 'completed' ? 'Completed' : 'In Progress'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <RowActions
                      viewTo={`/projects/${p.slug}`}
                      onEdit={() => setView({ mode: 'edit', project: p })}
                      onDelete={() => handleDelete(p)}
                      busy={busyId === p.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

/* ----------------------------- Certificates ----------------------------- */
function CertificatesPanel() {
  const { certificates, loading, refresh } = useCertificates()
  const [view, setView] = useState<CertView>({ mode: 'list' })
  const [busyId, setBusyId] = useState<string | null>(null)

  async function handleCreate(input: CertificateInput) {
    const { error } = await createCertificate(input)
    if (error) throw new Error(error.message)
    await refresh()
    setView({ mode: 'list' })
  }
  async function handleUpdate(id: string, input: CertificateInput) {
    const { error } = await updateCertificate(id, input)
    if (error) throw new Error(error.message)
    await refresh()
    setView({ mode: 'list' })
  }
  async function handleDelete(c: Certificate) {
    if (!confirm(`Delete "${c.title}"? This cannot be undone.`)) return
    setBusyId(c.id)
    await deleteCertificate(c.id)
    await refresh()
    setBusyId(null)
  }

  if (view.mode === 'new') {
    return (
      <Panel title="New certificate">
        <CertificateForm onSubmit={handleCreate} onCancel={() => setView({ mode: 'list' })} />
      </Panel>
    )
  }
  if (view.mode === 'edit') {
    return (
      <Panel title={`Edit: ${view.cert.title}`}>
        <CertificateForm
          initial={view.cert}
          onSubmit={(input) => handleUpdate(view.cert.id, input)}
          onCancel={() => setView({ mode: 'list' })}
        />
      </Panel>
    )
  }

  return (
    <>
      <ListHeader
        title={`Certificates (${certificates.length})`}
        onNew={() => setView({ mode: 'new' })}
        newLabel="New certificate"
      />
      {loading ? (
        <Loading />
      ) : certificates.length === 0 ? (
        <Empty text="No certificates yet. Upload your first one." />
      ) : (
        <div className="overflow-hidden rounded-sm border border-line bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-paper text-left">
              <tr className="text-xs uppercase tracking-wide text-slate-muted">
                <th className="px-4 py-3">Certificate</th>
                <th className="px-4 py-3">Issued</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {certificates.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 font-medium text-ink">
                      {c.file_type === 'pdf' && (
                        <FileText size={14} className="text-slate-muted" />
                      )}
                      {c.title}
                    </div>
                    <div className="text-xs text-slate-muted">{c.issuer}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-muted">
                    {formatMonthYear(c.issued_date)}
                  </td>
                  <td className="px-4 py-3">
                    <RowActions
                      viewHref={c.file_url}
                      onEdit={() => setView({ mode: 'edit', cert: c })}
                      onDelete={() => handleDelete(c)}
                      busy={busyId === c.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

/* ------------------------------- Shared UI ------------------------------ */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-line bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold text-ink">{title}</h2>
      {children}
    </div>
  )
}

function ListHeader({
  title,
  onNew,
  newLabel,
}: {
  title: string
  onNew: () => void
  newLabel: string
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <button onClick={onNew} className="btn-primary">
        <Plus size={16} /> {newLabel}
      </button>
    </div>
  )
}

function RowActions({
  viewTo,
  viewHref,
  onEdit,
  onDelete,
  busy,
}: {
  viewTo?: string
  viewHref?: string
  onEdit: () => void
  onDelete: () => void
  busy: boolean
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      {viewTo && (
        <Link
          to={viewTo}
          className="rounded-sm border border-line p-1.5 text-slate-muted hover:text-ink"
          title="View"
        >
          <ExternalLink size={15} />
        </Link>
      )}
      {viewHref && (
        <a
          href={viewHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-sm border border-line p-1.5 text-slate-muted hover:text-ink"
          title="View"
        >
          <ExternalLink size={15} />
        </a>
      )}
      <button
        onClick={onEdit}
        className="rounded-sm border border-line p-1.5 text-slate-muted hover:text-ink"
        title="Edit"
      >
        <Pencil size={15} />
      </button>
      <button
        onClick={onDelete}
        disabled={busy}
        className="rounded-sm border border-line p-1.5 text-slate-muted hover:text-amber-mark disabled:opacity-50"
        title="Delete"
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}

function Loading() {
  return <p className="font-mono text-sm text-slate-muted">Loading…</p>
}
function Empty({ text }: { text: string }) {
  return <p className="font-mono text-sm text-slate-muted">{text}</p>
}
