import { NextResponse } from "next/server";
import { listUpcomingWorkshops } from "@/lib/workshops";
import { handle } from "@/lib/api";

// Public: upcoming, published workshops
export const GET = handle(async () => {
  return NextResponse.json({ workshops: await listUpcomingWorkshops() });
});
