import "server-only";
import { NextResponse } from "next/server";
import { createServerClient } from "@/src/lib/supabase/server";

export const runtime = "nodejs";

function analyzeUrl(urlString: string | undefined) {
  if (!urlString) return null;
  return {
    raw: urlString,
    rawJson: JSON.stringify(urlString),
    rawLen: urlString.length,
    hostname: (() => {
      try {
        return new URL(urlString).hostname;
      } catch {
        return "INVALID_URL";
      }
    })(),
    rawTail: urlString.slice(-10),
    rawTailCodes: Array.from(urlString.slice(-10)).map((c) => c.charCodeAt(0)),
  };
}

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
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  try {
    // Check ONLY server-side env vars
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    const urlAnalysis = analyzeUrl(url);

    // Log for debugging
    console.log("[diag-supabase] URL Analysis:", urlAnalysis);
    console.log("[diag-supabase] Has key:", !!key);

    if (!url || !key) {
      return NextResponse.json(
        {
          ok: false,
          error: "Supabase env vars missing",
          hasUrl: !!url,
          hasKey: !!key,
          urlAnalysis,
          keyPrefix: key ? key.substring(0, 10) + "..." : "MISSING",
          rows: null,
          sample: null,
        },
        { status: 500 }
      );
    }
    const supabase = createServerClient();

    // First, test connectivity with a simple query
    const { data, error } = await supabase
      .from("experiments")
      .select("id, name, slug, status")
      .limit(5);
    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
          code: error.code,
          hint: error.hint,
          details: error.details,
          urlAnalysis,
          rows: null,
          sample: null,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        ok: true,
        error: null,
        rows: data?.length || 0,
        sample: data || [],
        urlAnalysis,
      },
      { status: 200 }
    );
  } catch (thrown) {
    const errorMsg = thrown instanceof Error ? thrown.message : String(thrown);
    const errorStack = thrown instanceof Error ? thrown.stack : undefined;
    console.error("[diag-supabase] Error:", errorMsg);
    if (errorStack) console.error("[diag-supabase] Stack:", errorStack);
    const url = process.env.SUPABASE_URL;
    const urlAnalysis = analyzeUrl(url);
    return NextResponse.json(
      {
        ok: false,
        error: errorMsg,
        thrown: true,
        stack: errorStack,
        urlAnalysis,
        rows: null,
        sample: null,
      },
      { status: 500 }
    );
  }
}
