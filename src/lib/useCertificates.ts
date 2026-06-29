import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase'
import type { Certificate, CertificateInput } from '../types'

/** Fetch all certificates ordered for display. */
export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('issued_date', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setError(null)
      setCertificates((data ?? []) as Certificate[])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { certificates, loading, error, refresh }
}

export async function createCertificate(input: CertificateInput) {
  return supabase.from('certificates').insert(input).select().single()
}

export async function updateCertificate(
  id: string,
  input: Partial<CertificateInput>,
) {
  return supabase.from('certificates').update(input).eq('id', id).select().single()
}

export async function deleteCertificate(id: string) {
  return supabase.from('certificates').delete().eq('id', id)
}
