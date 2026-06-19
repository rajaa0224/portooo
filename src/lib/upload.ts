import { supabase, PROJECT_BUCKET } from './supabase'

/**
 * Upload a file to the project-media bucket and return its public URL.
 * Files are namespaced by a timestamp to avoid collisions.
 */
export async function uploadProjectFile(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'bin'
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabase.storage
    .from(PROJECT_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(PROJECT_BUCKET).getPublicUrl(path)
  return data.publicUrl
}
