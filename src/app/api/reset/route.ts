import { createClient } from "@supabase/supabase-js";
import { unstable_noStore } from "next/cache";

export async function POST() {
  unstable_noStore();

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );

  const res = await supabase.from("projects").select("*");

  if (res.error != null) {
    const error = `${res.error.message}: ${res.error.details}`;
    return Response.json(
      { error },
      { status: res.status, statusText: res.statusText }
    );
  }

  const update = res.data.map((it, i) => {
    return { ...it, rank: i + 1 };
  });
  const resUpdate = await supabase.from("projects").upsert(update);

  if (resUpdate.error != null) {
    const error = `${resUpdate.error.message}: ${resUpdate.error.details}`;
    return Response.json(
      { error },
      { status: resUpdate.status, statusText: resUpdate.statusText }
    );
  }

  return Response.json({ success: true }, { status: 200 });
}
