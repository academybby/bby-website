import type { SupabaseClient } from "@supabase/supabase-js";
import type { Charges } from "omise";

/**
 * Single source of truth for turning a charge's current status into order/enrollment
 * state. Always re-derive from the charge object Omise gave us (never trust a webhook
 * body blindly) and upsert enrollment idempotently so retries/duplicate webhooks are safe.
 */
export async function fulfillOrder(
  supabase: SupabaseClient,
  charge: Charges.ICharge
): Promise<Charges.ChargeStatus | "unknown"> {
  const orderId = charge.metadata?.order_id;
  if (!orderId) return "unknown";

  await supabase
    .from("orders")
    .update({ status: charge.status, omise_charge_id: charge.id })
    .eq("id", orderId);

  if (charge.status === "successful") {
    const { data: order } = await supabase
      .from("orders")
      .select("email, course_id")
      .eq("id", orderId)
      .single();

    if (order) {
      await supabase
        .from("enrollments")
        .upsert(
          { email: order.email, course_id: order.course_id, order_id: orderId },
          { onConflict: "email,course_id" }
        );
    }
  }

  return charge.status;
}
