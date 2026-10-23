import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { deleteReflection } from "@/lib/wheel";
import { handle, jsonError } from "@/lib/api";
import { toInt } from "@/lib/validation";

export const DELETE = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const ok = await deleteReflection(toInt((await params).id));
  if (!ok) return jsonError("Reflection not found", 404);
  return NextResponse.json({ ok: true });
});
