import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabaseAdmin } from "./_lib/supabaseAdmin";
import { getOmise } from "./_lib/omise";
import { fulfillOrder } from "./_lib/fulfillOrder";

/**
 * Polled by the frontend after showing a PromptPay QR code. Re-fetches the charge
 * from Omise directly (the source of truth) rather than trusting local order state,
 * so this works even without a public webhook URL configured (e.g. during local dev).
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { chargeId } = req.query;
  if (typeof chargeId !== "string") {
    res.status(400).json({ error: "Missing chargeId" });
    return;
  }

  try {
    const omise = getOmise();
    const supabase = getSupabaseAdmin();
    const charge = await omise.charges.retrieve(chargeId);
    const status = await fulfillOrder(supabase, charge);
    res.status(200).json({ status, failureMessage: charge.failure_message ?? null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to check charge status";
    res.status(500).json({ error: message });
  }
}
