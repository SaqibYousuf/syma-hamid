import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { duplicateAssessment } from "@/lib/assessments";
import { handle, jsonError } from "@/lib/api";
import { toInt } from "@/lib/validation";

export const POST = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const { id } = await params;
  const newId = await duplicateAssessment(toInt(id));
  if (!newId) return jsonError("Assessment not found", 404);
  return NextResponse.json({ id: newId }, { status: 201 });
});
