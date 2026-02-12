export default async function Home() {
  // const data = await fetch(
  //   "http://localhost:3000/api/rank/0c77ad6b-5cfb-425e-a827-1d695a003099",
  //   { method: "PUT", body: JSON.stringify({ rank: 3 }) }
  // );

  await fetch("http://localhost:3000/api/reset", { method: "POST" });
  const data = await fetch("http://localhost:3000/api/projects");
  const json = await data.json();
  return <div>{JSON.stringify(json)}</div>;
}
