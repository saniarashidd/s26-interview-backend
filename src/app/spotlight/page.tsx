import { createClient } from "@supabase/supabase-js";
import SpotlightCards from "./SpotlightCards";

export default async function SpotlightPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("rank");

  if (error) {
    return (
      <main className="spotlight">
        <p className="spotlight-error">Error: {error.message}</p>
      </main>
    );
  }

  const projects = data ?? [];

  return <SpotlightCards projects={projects} />;
}
