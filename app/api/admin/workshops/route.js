import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { listWorkshopsAdmin, normalizeWorkshopInput, saveWorkshop } from "@/lib/workshops";
import { handle, jsonError, readJson } from "@/lib/api";

export const GET = handle(async () => {
  const { response } = await requireAdminApi();
  if (response) return response;
  return NextResponse.json({ workshops: await listWorkshopsAdmin() });
});

export const POST = handle(async (request) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const { data, errors } = normalizeWorkshopInput(await readJson(request));
  if (errors.length) return jsonError(errors[0], 400, { errors });
  const id = await saveWorkshop(null, data);
  return NextResponse.json({ id }, { status: 201 });
});
