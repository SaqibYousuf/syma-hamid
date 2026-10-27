import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { listEmotionsAdmin, normalizeEmotionInput, saveEmotion } from "@/lib/wheel";
import { handle, jsonError, readJson } from "@/lib/api";

export const GET = handle(async () => {
  const { response } = await requireAdminApi();
  if (response) return response;
  return NextResponse.json({ emotions: await listEmotionsAdmin() });
});

export const POST = handle(async (request) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const { data, errors } = normalizeEmotionInput(await readJson(request));
  if (errors.length) return jsonError(errors[0], 400, { errors });
  const id = await saveEmotion(null, data);
  return NextResponse.json({ id }, { status: 201 });
});
