// import { createClient } from "@supabase/supabase-js";
// import { unstable_noStore } from "next/cache";

// export async function GET() {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL!,
//     process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_ANON_KEY!
//   );
//   unstable_noStore();

//   const res = await supabase.from("projects").select("*");

//   if (res.error != null) {
//     const error = `${res.error.message}: ${res.error.details}`;
//     return Response.json(
//       { error },
//       { status: res.status, statusText: res.statusText }
//     );
//   }

//   return Response.json(
//     { data: res.data.toSorted((a, b) => a.rank - b.rank) },
//     { status: 200 }
//   );
// }

import { createClient } from "@supabase/supabase-js";
import { unstable_noStore } from "next/cache";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { headers });
}

export async function GET() {
  unstable_noStore();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_ANON_KEY!
  );

  const res = await supabase.from("projects").select("*");

  if (res.error) {
    return new Response(
      JSON.stringify({ error: res.error.message }),
      { status: 500, headers }
    );
  }

  return new Response(
    JSON.stringify({
      data: res.data.toSorted((a, b) => a.rank - b.rank),
    }),
    { status: 200, headers }
  );
}
