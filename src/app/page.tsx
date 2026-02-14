import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("rank");

  if (error) {
    return <pre>{error.message}</pre>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
