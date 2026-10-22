import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { deleteWorkshop, getWorkshopAdmin, normalizeWorkshopInput, saveWorkshop, setWorkshopPublished } from "@/lib/workshops";
import { handle, jsonError, readJson } from "@/lib/api";
import { toInt } from "@/lib/validation";

const idFrom = async (params) => toInt((await params).id);

export const GET = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const workshop = await getWorkshopAdmin(await idFrom(params));
  if (!workshop) return jsonError("Workshop not found", 404);
  return NextResponse.json({ workshop });
});

export const PUT = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const id = await idFrom(params);
  if (!id) return jsonError("Workshop not found", 404);
  const { data, errors } = normalizeWorkshopInput(await readJson(request));
  if (errors.length) return jsonError(errors[0], 400, { errors });
  await saveWorkshop(id, data);
  return NextResponse.json({ workshop: await getWorkshopAdmin(id) });
});

// Quick publish / unpublish
export const PATCH = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const body = await readJson(request);
  if (typeof body?.is_published !== "boolean") return jsonError("Nothing to update");
  const ok = await setWorkshopPublished(await idFrom(params), body.is_published);
  if (!ok) return jsonError("Workshop not found", 404);
  return NextResponse.json({ ok: true });
});

export const DELETE = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const ok = await deleteWorkshop(await idFrom(params));
  if (!ok) return jsonError("Workshop not found", 404);
  return NextResponse.json({ ok: true });
});
