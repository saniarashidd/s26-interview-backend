import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_ANON_KEY!
  );

  const res = await supabase.from("requests").insert(await request.json());

  if (res.error != null) {
    const error = `${res.error.message}: ${res.error.details}`;
    return Response.json(
      { error },
      { status: res.status, statusText: res.statusText }
    );
  }

  return Response.json({ success: true }, { status: 200 });
}
