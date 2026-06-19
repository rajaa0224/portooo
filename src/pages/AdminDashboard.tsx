import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { useAuth } from '../lib/AuthContext'
import {
  useProjects,
  createProject,
  updateProject,
  deleteProject,
  toggleStatus,
} from '../lib/useProjects'
import type { Project, ProjectInput } from '../types'
import ProjectForm from '../components/ProjectForm'

type View = { mode: 'list' } | { mode: 'new' } | { mode: 'edit'; project: Project }

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const { projects, loading, refresh } = useProjects()
  const [view, setView] = useState<View>({ mode: 'list' })
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
        {view.mode === 'list' && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-ink">
                Projects ({projects.length})
              </h2>
              <button
                onClick={() => setView({ mode: 'new' })}
                className="btn-primary"
              >
                <Plus size={16} /> New project
              </button>
            </div>

            {loading ? (
              <p className="font-mono text-sm text-slate-muted">Loading…</p>
            ) : projects.length === 0 ? (
              <p className="font-mono text-sm text-slate-muted">
                No projects yet. Create your first one.
              </p>
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
                      <tr key={p.id} className="align-middle">
                        <td className="px-4 py-3">
                          <div className="font-medium text-ink">{p.title}</div>
                          <div className="text-xs text-slate-muted">
                            {p.tech.join(', ')}
                          </div>
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
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              to={`/projects/${p.slug}`}
                              className="rounded-sm border border-line p-1.5 text-slate-muted hover:text-ink"
                              title="View"
                            >
                              <ExternalLink size={15} />
                            </Link>
                            <button
                              onClick={() => setView({ mode: 'edit', project: p })}
                              className="rounded-sm border border-line p-1.5 text-slate-muted hover:text-ink"
                              title="Edit"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(p)}
                              disabled={busyId === p.id}
                              className="rounded-sm border border-line p-1.5 text-slate-muted hover:text-amber-mark disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {view.mode === 'new' && (
          <div className="rounded-sm border border-line bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold text-ink">New project</h2>
            <ProjectForm
              onSubmit={handleCreate}
              onCancel={() => setView({ mode: 'list' })}
            />
          </div>
        )}

        {view.mode === 'edit' && (
          <div className="rounded-sm border border-line bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold text-ink">
              Edit: {view.project.title}
            </h2>
            <ProjectForm
              initial={view.project}
              onSubmit={(input) => handleUpdate(view.project.id, input)}
              onCancel={() => setView({ mode: 'list' })}
            />
          </div>
        )}
      </main>
    </div>
  )
}
