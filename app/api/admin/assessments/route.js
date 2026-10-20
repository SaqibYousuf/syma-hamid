import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { listAssessmentsAdmin, normalizeAssessmentInput, saveAssessment } from "@/lib/assessments";
import { handle, jsonError, readJson } from "@/lib/api";

export const GET = handle(async () => {
  const { response } = await requireAdminApi();
  if (response) return response;
  return NextResponse.json({ assessments: await listAssessmentsAdmin() });
});

export const POST = handle(async (request) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const { data, errors } = normalizeAssessmentInput(await readJson(request));
  if (errors.length) return jsonError(errors[0], 400, { errors });
  const id = await saveAssessment(null, data);
  return NextResponse.json({ id }, { status: 201 });
});
