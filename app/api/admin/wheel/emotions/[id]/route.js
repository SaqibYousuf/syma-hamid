import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { deleteEmotion, getEmotionAdmin, normalizeEmotionInput, saveEmotion, setEmotionActive } from "@/lib/wheel";
import { handle, jsonError, readJson } from "@/lib/api";
import { toInt } from "@/lib/validation";

const idFrom = async (params) => toInt((await params).id);

export const GET = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const emotion = await getEmotionAdmin(await idFrom(params));
  if (!emotion) return jsonError("Emotion not found", 404);
  return NextResponse.json({ emotion });
});

export const PUT = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const id = await idFrom(params);
  if (!id) return jsonError("Emotion not found", 404);
  const { data, errors } = normalizeEmotionInput(await readJson(request));
  if (errors.length) return jsonError(errors[0], 400, { errors });
  await saveEmotion(id, data);
  return NextResponse.json({ emotion: await getEmotionAdmin(id) });
});

// Show / hide on the wheel
export const PATCH = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const body = await readJson(request);
  if (typeof body?.is_active !== "boolean") return jsonError("Nothing to update");
  const ok = await setEmotionActive(await idFrom(params), body.is_active);
  if (!ok) return jsonError("Emotion not found", 404);
  return NextResponse.json({ ok: true });
});

export const DELETE = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const ok = await deleteEmotion(await idFrom(params));
  if (!ok) return jsonError("Emotion not found", 404);
  return NextResponse.json({ ok: true });
});
