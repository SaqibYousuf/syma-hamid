import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { listNeedsAdmin, saveNeeds } from "@/lib/wheel";
import { handle, jsonError, readJson } from "@/lib/api";

export const GET = handle(async () => {
  const { response } = await requireAdminApi();
  if (response) return response;
  return NextResponse.json({ needs: await listNeedsAdmin() });
});

// Replace the whole list of needs
export const PUT = handle(async (request) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const body = await readJson(request);
  const result = await saveNeeds(body?.needs);
  if (!result.ok) return jsonError(result.errors[0], 400, { errors: result.errors });
  return NextResponse.json({ needs: await listNeedsAdmin() });
});
