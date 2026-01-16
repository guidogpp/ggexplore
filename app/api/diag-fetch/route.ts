import "server-only";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing env vars",
        hasUrl: !!url,
        hasKey: !!key,
      },
      { status: 500 }
    );
  }

  try {
    // Test raw fetch to Supabase REST API
    const restUrl = `${url}/rest/v1/experiments?select=id,name,slug,status&limit=5`;
    
    console.log("[diag-fetch] Testing raw fetch to:", restUrl);

    const response = await fetch(restUrl, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(
      {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: response.ok ? data : null,
        error: !response.ok ? data : null,
        url: restUrl,
      },
      { status: response.status }
    );
  } catch (thrown) {
    const errorMsg = thrown instanceof Error ? thrown.message : String(thrown);
    const errorStack = thrown instanceof Error ? thrown.stack : undefined;

    console.error("[diag-fetch] Error:", errorMsg);

    return NextResponse.json(
      {
        ok: false,
        error: errorMsg,
        stack: errorStack,
        url: `${url}/rest/v1/experiments?select=id,name,slug,status&limit=5`,
      },
      { status: 500 }
    );
  }
}
