export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    vercelEnv: process.env.VERCEL_ENV,
    nodeEnv: process.env.NODE_ENV,
    hasPublicUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    publicUrlLen: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
    hasPublicKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    publicKeyLen: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
    hasUrl: !!process.env.SUPABASE_URL,
    urlLen: process.env.SUPABASE_URL?.length || 0,
    hasKey: !!process.env.SUPABASE_ANON_KEY,
    keyLen: process.env.SUPABASE_ANON_KEY?.length || 0,
  });
}
