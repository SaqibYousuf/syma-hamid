import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { reorderAssessments } from "@/lib/assessments";
import { handle, jsonError, readJson } from "@/lib/api";
import { toInt } from "@/lib/validation";

export const POST = handle(async (request) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const body = await readJson(request);
  const ids = Array.isArray(body?.ids) ? body.ids.map(toInt).filter(Boolean) : [];
  if (!ids.length) return jsonError("No order given");
  await reorderAssessments(ids);
  return NextResponse.json({ ok: true });
});
