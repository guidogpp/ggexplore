import "server-only";
import { createClient } from "@supabase/supabase-js";

export function createServerClient() {
  // Use ONLY server-side env vars (no fallbacks to NEXT_PUBLIC_*)
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    const msg = `Supabase env vars missing: SUPABASE_URL=${!!url}, SUPABASE_ANON_KEY=${!!key}`;
    throw new Error(msg);
  }

  return createClient(url, key);
}
