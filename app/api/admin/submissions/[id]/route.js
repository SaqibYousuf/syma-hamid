import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { deleteSubmission } from "@/lib/submissions";
import { handle, jsonError } from "@/lib/api";
import { toInt } from "@/lib/validation";

export const DELETE = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const { id } = await params;
  const deleted = await deleteSubmission(toInt(id));
  if (!deleted) return jsonError("Result not found", 404);
  return NextResponse.json({ ok: true });
});
