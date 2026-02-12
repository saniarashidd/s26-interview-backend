import { createClient } from "@supabase/supabase-js";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );

  const resUsers = await supabase.from("users").select("*");

  if (resUsers.error != null) {
    const error = `${resUsers.error.message}: ${resUsers.error.details}`;
    return Response.json(
      { error },
      { status: resUsers.status, statusText: resUsers.statusText }
    );
  }

  const resRequests = await supabase
    .from("requests")
    .select("*")
    .eq("usernameFrom", slug);

  if (resRequests.error != null) {
    const error = `${resRequests.error.message}: ${resRequests.error.details}`;
    return Response.json(
      { error },
      { status: resRequests.status, statusText: resRequests.statusText }
    );
  }

  const requests = resRequests.data.map((req) => req.usernameTo);

  const profiles = resUsers.data.map((user) => {
    return { ...user, requested: requests.includes(user.username) };
  });

  return Response.json({ profiles }, { status: 200 });
}
