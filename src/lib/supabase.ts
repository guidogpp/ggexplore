import { createClient } from '@supabase/supabase-js'

// Cliente para usar en Server Components y Server Actions
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('❌ Supabase env vars not configured')
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Cliente para usar en Client Components
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('❌ Supabase env vars not configured')
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}
