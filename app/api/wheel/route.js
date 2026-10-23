import { NextResponse } from "next/server";
import { getWheelData } from "@/lib/wheel";
import { handle } from "@/lib/api";

// Public: everything the Wheel of Emotions needs (emotions, feelings, needs, default statements)
export const GET = handle(async () => {
  return NextResponse.json({ wheel: await getWheelData() });
});
