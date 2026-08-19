import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabaseAdmin } from "./_lib/supabaseAdmin";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, courseId } = req.query;
  if (typeof email !== "string" || typeof courseId !== "string") {
    res.status(400).json({ error: "Missing email or courseId" });
    return;
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("enrollments")
    .select("id")
    .eq("email", email.trim().toLowerCase())
    .eq("course_id", Number(courseId))
    .maybeSingle();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ enrolled: !!data });
}
