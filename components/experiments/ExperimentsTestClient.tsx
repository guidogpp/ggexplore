'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase'
import { NavigationRoot } from '@/components/navigation/NavigationRoot'

export default function ExperimentsTestClient() {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExperiments() {
      setLoading(true)
      const { data, error } = await supabase
        .from('experiments')
        .select('*')
        .limit(5)
      if (error) setError(error.message)
      else setData(data || [])
      setLoading(false)
    }
    fetchExperiments()
  }, [])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <>
      <div>
        <h2>Prueba de conexión a Supabase</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <NavigationRoot />
    </>
  )
}
