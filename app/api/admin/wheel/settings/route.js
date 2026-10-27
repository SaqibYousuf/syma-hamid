import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { getWheelSettings, saveWheelSettings } from "@/lib/wheel";
import { handle, jsonError, readJson } from "@/lib/api";

export const GET = handle(async () => {
  const { response } = await requireAdminApi();
  if (response) return response;
  return NextResponse.json({ settings: await getWheelSettings() });
});

export const PUT = handle(async (request) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const result = await saveWheelSettings(await readJson(request));
  if (!result.ok) return jsonError(result.error);
  return NextResponse.json({ settings: await getWheelSettings() });
});
