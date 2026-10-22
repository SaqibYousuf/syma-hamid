import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import { getBankDetails } from "@/lib/bank";
import { handle, jsonError, readJson } from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// Public: create a bank-transfer booking for a workshop
export const POST = handle(async (request, { params }) => {
  const { slug } = await params;
  const limit = rateLimit(`order:${clientIp(request)}`, { limit: 10, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) return jsonError("Too many bookings from this device. Please try again a little later.", 429);

  const body = await readJson(request);
  if (!body) return jsonError("Invalid request.");

  const result = await createOrder(slug, body);
  if (!result.ok) return jsonError(result.error, result.status, result.field ? { field: result.field } : {});
  return NextResponse.json({ order: result.order, bank: getBankDetails() }, { status: 201 });
});
