export const runtime = "nodejs";

function checkDebugToken(req: Request) {
  const url = new URL(req.url);
  const token = req.headers.get("x-debug-token") || url.searchParams.get("token");
  const expected = process.env.DEBUG_TOKEN;
  if (!expected || token !== expected) {
    return false;
  }
  return true;
}

export async function GET(req: Request) {
  if (!checkDebugToken(req)) {
    return new Response("Not found", { status: 404 });
  }
  return Response.json({
    vercelEnv: process.env.VERCEL_ENV,
    nodeEnv: process.env.NODE_ENV,
    diagPing: process.env.DIAG_PING ?? null,
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
