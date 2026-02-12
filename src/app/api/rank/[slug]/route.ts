import { createClient } from "@supabase/supabase-js";
import { unstable_noStore } from "next/cache";

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  unstable_noStore();

  const slug = params.slug;
  const json = await request.json();
  if (!("rank" in json)) {
    return Response.json(
      { error: "Invalid request body: rank not found" },
      { status: 400, statusText: "Invalid request body: rank not found" }
    );
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );

  const res = await supabase
    .from("projects")
    .update({ rank: json.rank })
    .eq("id", slug);

  if (res.error != null) {
    const error = `${res.error.message}: ${res.error.details}`;
    return Response.json(
      { error },
      { status: res.status, statusText: res.statusText }
    );
  }

  return Response.json({ id: slug, rank: json.rank }, { status: 200 });
}
