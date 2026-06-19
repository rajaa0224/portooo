import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase'
import type { Project, ProjectInput } from '../types'

/** Fetch all projects ordered for display. Used by the public site and admin. */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setError(null)
      setProjects((data ?? []) as Project[])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { projects, loading, error, refresh }
}

export async function createProject(input: ProjectInput) {
  return supabase.from('projects').insert(input).select().single()
}

export async function updateProject(id: string, input: Partial<ProjectInput>) {
  return supabase.from('projects').update(input).eq('id', id).select().single()
}

export async function deleteProject(id: string) {
  return supabase.from('projects').delete().eq('id', id)
}

export async function toggleStatus(id: string, next: Project['status']) {
  return supabase.from('projects').update({ status: next }).eq('id', id)
}
