# 🔍 Validación de Conexión Supabase - Resumen

## ✅ Problemas Identificados y Resueltos

### 1. **Variables de entorno** ✅
- **Problema**: No existía archivo `.env.local` (solo `.env.example`)
- **Solución**: Las variables ya estaban configuradas correctamente en `.env.local`

### 2. **Cliente Supabase mal configurado** ✅
- **Problema**: `src/lib/supabase.ts` usaba `'use client'` con `process.env`, causando errores
- **Solución**: Creados dos clientes separados:
  - `createServerClient()` → para Server Components y Server Actions
  - `createBrowserClient()` → para Client Components

---

## 📋 Instrucciones de Validación

### Paso 1: Crear tabla en Supabase

1. Abre tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Ve a **SQL Editor**
3. Ejecuta el contenido de `supabase-setup.sql`:

```sql
CREATE TABLE IF NOT EXISTS experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Desactivar RLS para testing
ALTER TABLE experiments DISABLE ROW LEVEL SECURITY;

-- Datos de prueba
INSERT INTO experiments (slug, name, status) 
VALUES 
  ('pdp-test', 'Product Detail Page Test', 'active'),
  ('checkout-v2', 'Checkout V2 Experiment', 'draft')
ON CONFLICT (slug) DO NOTHING;
```

### Paso 2: Validar Lectura

1. Abre: **http://localhost:3000/test-connection**
2. Deberías ver:
   - ✅ Variables de entorno
   - ✅ Cliente Supabase
   - ✅ Lectura de base de datos
   - Lista de experimentos en JSON

### Paso 3: Validar Escritura

1. Abre: **http://localhost:3000/test-write**
2. Inserta un experimento de prueba
3. Vuelve a `/test-connection` → debería aparecer el nuevo registro
4. Opcionalmente, borra todos desde `/test-write`

---

## 🎯 Resultado Esperado

### ✅ **Conexión OK**
```
✅ Variables de entorno
✅ Cliente Supabase creado
✅ Lectura funcionando
✅ Escritura funcionando
```

### ❌ **Si algo falla**

#### Error: "relation 'experiments' does not exist"
→ No ejecutaste el SQL. Ve a paso 1.

#### Error: "new row violates row-level security policy"
→ RLS está activo. Ejecuta: `ALTER TABLE experiments DISABLE ROW LEVEL SECURITY;`

#### Error: "Supabase env vars not configured"
→ Revisa que `.env.local` tiene las variables correctas

---

## 🚀 Siguiente Fase

Una vez que **ambos tests pasen**:

1. Puedes habilitar RLS con policies específicas
2. Crear tipos TypeScript para `experiments`
3. Implementar la lógica de negocio en `/explore`
4. Refactorizar cliente si necesitas SSR avanzado

---

## 📁 Archivos Creados/Modificados

```
✏️  src/lib/supabase.ts          → Cliente refactorizado
✏️  .env.local                     → Ya existía (sin cambios)
✨  supabase-setup.sql             → SQL setup
✨  app/test-connection/page.tsx   → Test de lectura
✨  app/test-write/page.tsx        → Test de escritura
```

---

## 🔧 Uso del Cliente en Tu App

### Server Component
```tsx
import { createServerClient } from '@/src/lib/supabase'

export default async function Page() {
  const supabase = createServerClient()
  const { data } = await supabase.from('experiments').select('*')
  return <div>{JSON.stringify(data)}</div>
}
```

### Client Component
```tsx
'use client'
import { createBrowserClient } from '@/src/lib/supabase'
import { useEffect, useState } from 'react'

export default function ClientPage() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.from('experiments').select('*').then(({ data }) => {
      setData(data || [])
    })
  }, [])
  
  return <div>{JSON.stringify(data)}</div>
}
```

### Server Action
```tsx
async function myAction() {
  'use server'
  const supabase = createServerClient()
  await supabase.from('experiments').insert({ ... })
}
```
