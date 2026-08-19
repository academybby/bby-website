import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabaseAdmin } from "./_lib/supabaseAdmin";
import { getOmise } from "./_lib/omise";
import { fulfillOrder } from "./_lib/fulfillOrder";
import { ALL_COURSES } from "../src/data/courses-data";

type Method = "card" | "promptpay" | "bank_transfer" | "line";

interface CreateChargeBody {
  email: string;
  name: string;
  phone?: string;
  courseId: number;
  planName: string;
  method: Method;
  cardToken?: string; // required for method "card", from Omise.js client-side tokenization
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body as Partial<CreateChargeBody>;
  if (!body.email || !body.name || !body.courseId || !body.planName || !body.method) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  // The price is never trusted from the client — it's always re-derived from the
  // course catalog server-side, otherwise a tampered request could pay any amount
  // it likes for a course.
  const course = ALL_COURSES.find(c => c.id === body.courseId);
  if (!course) {
    res.status(400).json({ error: "Invalid courseId" });
    return;
  }
  const plan = course.plans.find(p => p.name === body.planName);
  if (!plan) {
    res.status(400).json({ error: "Invalid planName" });
    return;
  }
  const amount = Number(plan.price.replace(/[^\d.]/g, ""));

  const supabase = getSupabaseAdmin();
  const email = body.email.trim().toLowerCase();
  const amountSatang = Math.round(amount * 100);

  const { data: order, error: insertError } = await supabase
    .from("orders")
    .insert({
      email,
      name: body.name,
      phone: body.phone ?? null,
      course_id: body.courseId,
      plan_name: body.planName,
      amount,
      payment_method: body.method,
      status: "pending",
    })
    .select()
    .single();

  if (insertError || !order) {
    res.status(500).json({ error: insertError?.message ?? "Failed to create order" });
    return;
  }

  // Bank transfer / LINE are verified manually by staff — no gateway involved,
  // just record the order as awaiting manual confirmation.
  if (body.method === "bank_transfer" || body.method === "line") {
    res.status(200).json({ orderId: order.id, status: "pending_manual" });
    return;
  }

  const omise = getOmise();

  try {
    if (body.method === "card") {
      if (!body.cardToken) {
        res.status(400).json({ error: "Missing cardToken" });
        return;
      }
      const charge = await omise.charges.create({
        amount: amountSatang,
        currency: "thb",
        card: body.cardToken,
        capture: true,
        metadata: { order_id: order.id },
      });
      await fulfillOrder(supabase, charge);
      res.status(200).json({
        orderId: order.id,
        chargeId: charge.id,
        status: charge.status,
        failureMessage: charge.failure_message ?? null,
      });
      return;
    }

    if (body.method === "promptpay") {
      const source = await omise.sources.create({
        type: "promptpay",
        amount: amountSatang,
        currency: "thb",
      });
      const charge = await omise.charges.create({
        amount: amountSatang,
        currency: "thb",
        source: source.id,
        metadata: { order_id: order.id },
      });
      await fulfillOrder(supabase, charge);
      const qrImage = charge.source?.scannable_code?.image?.download_uri ?? null;
      res.status(200).json({
        orderId: order.id,
        chargeId: charge.id,
        status: charge.status,
        qrImage,
      });
      return;
    }

    res.status(400).json({ error: "Unsupported payment method" });
  } catch (err) {
    await supabase.from("orders").update({ status: "failed" }).eq("id", order.id);
    const message = err instanceof Error ? err.message : "Payment failed";
    res.status(500).json({ error: message });
  }
}
