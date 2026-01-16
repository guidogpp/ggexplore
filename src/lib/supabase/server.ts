import "server-only";
import { createClient } from "@supabase/supabase-js";

export function createServerClient() {
  // Intentar leer primero las variables server-only, luego fallback a NEXT_PUBLIC_*
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    const msg = `Supabase env vars missing: url=${!!url}, key=${!!key}`;
    throw new Error(msg);
  }

  return createClient(url, key);
}
