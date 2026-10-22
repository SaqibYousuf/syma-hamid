import { NextResponse } from "next/server";
import { getPublicWorkshop } from "@/lib/workshops";
import { handle, jsonError } from "@/lib/api";

// Public: one upcoming, published workshop
export const GET = handle(async (request, { params }) => {
  const { slug } = await params;
  const workshop = await getPublicWorkshop(slug);
  if (!workshop) return jsonError("Workshop not found", 404);
  return NextResponse.json({ workshop });
});
