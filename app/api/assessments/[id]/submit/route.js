import { NextResponse } from "next/server";
import { submitAssessment } from "@/lib/submissions";
import { handle, jsonError, readJson } from "@/lib/api";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const POST = handle(async (request, { params }) => {
  const { id } = await params;
  const limit = rateLimit(`submit:${clientIp(request)}`, { limit: 20, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) return jsonError("Too many submissions. Please try again a little later.", 429);

  const body = await readJson(request);
  if (!body) return jsonError("Invalid request.");

  const result = await submitAssessment(id, body);
  if (!result.ok) return jsonError(result.error, result.status);
  const { ok, ...data } = result;
  return NextResponse.json(data, { status: 201 });
});
