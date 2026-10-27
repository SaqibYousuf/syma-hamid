import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { deleteOrder, getOrder, updateOrder } from "@/lib/orders";
import { handle, jsonError, readJson } from "@/lib/api";
import { toInt } from "@/lib/validation";

const idFrom = async (params) => toInt((await params).id);

export const GET = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const order = await getOrder(await idFrom(params));
  if (!order) return jsonError("Order not found", 404);
  return NextResponse.json({ order });
});

// Change status (pending / confirmed / cancelled) and/or the admin note
export const PATCH = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const body = (await readJson(request)) || {};
  const result = await updateOrder(await idFrom(params), { status: body.status, admin_note: body.admin_note });
  if (!result.ok) return jsonError(result.error, result.status);
  return NextResponse.json({ order: result.order });
});

export const DELETE = handle(async (request, { params }) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const ok = await deleteOrder(await idFrom(params));
  if (!ok) return jsonError("Order not found", 404);
  return NextResponse.json({ ok: true });
});
