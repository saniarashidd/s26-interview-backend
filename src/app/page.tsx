export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch("/api/projects");
  const json = await res.json();

  return (
    <pre>{JSON.stringify(json, null, 2)}</pre>
  );
}
