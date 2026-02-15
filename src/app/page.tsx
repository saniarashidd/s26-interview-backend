import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

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

  return (
    <div style={{ padding: "1.5rem" }}>
      <p style={{ marginBottom: "1rem" }}>
        <Link href="/spotlight" style={{ color: "#2563eb" }}>
          View Previous Winners Spotlight →
        </Link>
      </p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
