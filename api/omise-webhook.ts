import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabaseAdmin } from "./_lib/supabaseAdmin";
import { getOmise } from "./_lib/omise";
import { fulfillOrder } from "./_lib/fulfillOrder";

/**
 * Omise webhook events aren't signed, so the payload is never trusted directly —
 * it's only used to learn which charge id to re-fetch from Omise's API (the
 * authoritative source) before updating anything.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const event = req.body as { key?: string; data?: { id?: string } };
  const chargeId = event?.data?.id;

  if (event?.key === "charge.complete" && chargeId) {
    const omise = getOmise();
    const supabase = getSupabaseAdmin();
    const charge = await omise.charges.retrieve(chargeId);
    await fulfillOrder(supabase, charge);
  }

  res.status(200).json({ received: true });
}
