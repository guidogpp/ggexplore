import { createServerClient } from '@/src/lib/supabase'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function insertExperiment(formData: FormData) {
  'use server'
  
  const slug = formData.get('slug') as string
  const name = formData.get('name') as string
  const status = formData.get('status') as string

  const supabase = createServerClient()
  
  const { error } = await supabase
    .from('experiments')
    .insert({ slug, name, status })

  if (error) {
    console.error('❌ Error inserting:', error)
  } else {
    // Insert realizado correctamente
  }

  redirect('/test-connection')
}

async function deleteAllExperiments() {
  'use server'
  
  const supabase = createServerClient()
  
  const { error } = await supabase
    .from('experiments')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Borra todos

  if (error) {
    console.error('❌ Error deleting:', error)
  } else {
    // Experimentos eliminados correctamente
  }

  redirect('/test-connection')
}

export default async function TestWritePage() {
  return (
    <div style={{ 
      fontFamily: 'monospace', 
      padding: '2rem', 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{ marginBottom: '2rem' }}>✍️ Test de Escritura</h1>

      {/* FORM INSERT */}
      <form action={insertExperiment} style={{ 
        backgroundColor: '#2a2a2a', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '1rem'
      }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Insertar experimento</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Slug (único):</label>
          <input 
            type="text" 
            name="slug" 
            required 
            placeholder="pdp-variant-1"
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#3a3a3a',
              color: '#fff'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name:</label>
          <input 
            type="text" 
            name="name" 
            required 
            placeholder="PDP Variant 1"
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#3a3a3a',
              color: '#fff'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Status:</label>
          <select 
            name="status" 
            required
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#3a3a3a',
              color: '#fff'
            }}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>

        <button 
          type="submit"
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            backgroundColor: '#4a9eff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ✅ Insertar
        </button>
      </form>

      {/* FORM DELETE ALL */}
      <form action={deleteAllExperiments} style={{ 
        backgroundColor: '#3a1a1a', 
        padding: '1.5rem', 
        borderRadius: '8px'
      }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>⚠️ Zona peligrosa</h2>
        <button 
          type="submit"
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            backgroundColor: '#ff4a4a',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🗑️ Borrar todos los experimentos
        </button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <a 
          href="/test-connection" 
          style={{ 
            color: '#4a9eff',
            textDecoration: 'none'
          }}
        >
          ← Volver a test de lectura
        </a>
      </div>
    </div>
  )
}
