import "server-only";
import { NextResponse } from "next/server";
import { createServerClient } from "@/src/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Check env vars
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      return NextResponse.json(
        {
          ok: false,
          error: "Supabase env vars missing",
          hasUrl: !!url,
          hasKey: !!key,
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
      },
      { status: 200 }
    );
  } catch (thrown) {
    const errorMsg = thrown instanceof Error ? thrown.message : String(thrown);
    const errorStack = thrown instanceof Error ? thrown.stack : undefined;

    console.error("[diag-supabase] Error:", errorMsg);
    if (errorStack) console.error("[diag-supabase] Stack:", errorStack);

    return NextResponse.json(
      {
        ok: false,
        error: errorMsg,
        thrown: true,
        stack: errorStack,
        rows: null,
        sample: null,
      },
      { status: 500 }
    );
  }
}
