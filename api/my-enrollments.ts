import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabaseAdmin } from "./_lib/supabaseAdmin";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;
  if (!token) {
    res.status(401).json({ error: "Missing bearer token" });
    return;
  }

  const supabase = getSupabaseAdmin();

  // The email must come from a verified session token, never from a client-supplied
  // query param — otherwise anyone could list another person's enrollments by email.
  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user?.email) {
    res.status(401).json({ error: "Invalid or expired session" });
    return;
  }

  const { data, error } = await supabase
    .from("enrollments")
    .select("course_id")
    .eq("email", userData.user.email.trim().toLowerCase());

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ courseIds: data.map(row => row.course_id) });
}
