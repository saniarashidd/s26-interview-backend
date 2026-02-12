import { createClient } from "@supabase/supabase-js";
import { unstable_noStore } from "next/cache";

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );
  unstable_noStore();

  const res = await supabase.from("projects").select("*");

  if (res.error != null) {
    const error = `${res.error.message}: ${res.error.details}`;
    return Response.json(
      { error },
      { status: res.status, statusText: res.statusText }
    );
  }

  return Response.json(
    { data: res.data.toSorted((a, b) => a.rank - b.rank) },
    { status: 200 }
  );
}
