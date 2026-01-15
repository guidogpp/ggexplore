'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      setIsLoading(false)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    router.push('/login')
  }

  if (isLoading) {
    return null // O un loader si prefieres
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 40 
      }}>
        <h1 style={{ margin: 0 }}>GG explorando</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '13px',
            cursor: 'pointer',
            color: '#666',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = '#111'
            e.currentTarget.style.color = '#111'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = '#ddd'
            e.currentTarget.style.color = '#666'
          }}
        >
          Cerrar sesión
        </button>
      </div>
      <p style={{ color: '#666' }}>Hello World. Exploration lab ready.</p>
    </main>
  )
}
