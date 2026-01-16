import "server-only";
import { NextResponse } from "next/server";
import { createServerClient } from "@/src/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const supabase = createServerClient();

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
    return NextResponse.json(
      {
        ok: false,
        error: thrown instanceof Error ? thrown.message : String(thrown),
        thrown: true,
        rows: null,
        sample: null,
      },
      { status: 500 }
    );
  }
}
