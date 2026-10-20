import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "./lib/session";

// Optimistic check: keep signed-out visitors away from the admin area.
// Every admin page and API route verifies the session again on the server.
export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === "/admin/login") {
    if (session) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL("/admin/login", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
