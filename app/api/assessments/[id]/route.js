import { NextResponse } from "next/server";
import { getPublicAssessment } from "@/lib/assessments";
import { handle, jsonError } from "@/lib/api";

// Public: questions + options of a published assessment (no scoring data)
export const GET = handle(async (request, { params }) => {
  const { id } = await params;
  const assessment = await getPublicAssessment(id);
  if (!assessment) return jsonError("This assessment is not available.", 404);
  return NextResponse.json({ assessment });
});
