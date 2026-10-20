import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import {
  deleteAssessment,
  getAssessmentForAdmin,
  normalizeAssessmentInput,
  saveAssessment,
  setAssessmentPublished,
} from "@/lib/assessments";
import { handle, jsonError, readJson } from "@/lib/api";
import { toInt } from "@/lib/validation";

async function idFrom(params) {
  const { id } = await params;
  return toInt(id);
}

export const GET = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const assessment = await getAssessmentForAdmin(await idFrom(params));
  if (!assessment) return jsonError("Assessment not found", 404);
  return NextResponse.json({ assessment });
});

export const PUT = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const id = await idFrom(params);
  if (!id) return jsonError("Assessment not found", 404);
  const { data, errors } = normalizeAssessmentInput(await readJson(request));
  if (errors.length) return jsonError(errors[0], 400, { errors });
  await saveAssessment(id, data);
  return NextResponse.json({ assessment: await getAssessmentForAdmin(id) });
});

// Quick publish / unpublish
export const PATCH = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const body = await readJson(request);
  if (typeof body?.is_published !== "boolean") return jsonError("Nothing to update");
  const result = await setAssessmentPublished(await idFrom(params), body.is_published);
  if (!result.ok) return jsonError(result.error, result.status, { errors: result.errors });
  return NextResponse.json({ ok: true });
});

export const DELETE = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const deleted = await deleteAssessment(await idFrom(params));
  if (!deleted) return jsonError("Assessment not found", 404);
  return NextResponse.json({ ok: true });
});
