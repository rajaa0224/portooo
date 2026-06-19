import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-mono text-sm text-slate-muted">
        Loading…
      </div>
    )
  }

  if (!session) return <Navigate to="/admin" replace />

  return <>{children}</>
}
