import { NextResponse } from "next/server";
import { saveReflection } from "@/lib/wheel";
import { handle, jsonError, readJson } from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// Public: save a visitor's reflection (anonymous)
export const POST = handle(async (request) => {
  const limit = rateLimit(`reflection:${clientIp(request)}`, { limit: 20, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) return jsonError("Too many reflections from this device. Please try again a little later.", 429);
  const body = await readJson(request);
  if (!body) return jsonError("Invalid request.");
  const result = await saveReflection(body);
  if (!result.ok) return jsonError(result.error, result.status);
  return NextResponse.json({ ok: true, id: result.id }, { status: 201 });
});
