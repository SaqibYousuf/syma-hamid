import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "./session";

/** Current admin from the session cookie, or null. */
export async function getAdmin() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

/** For admin pages (server components): redirect to login if not signed in. */
export async function requireAdminPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

/**
 * For admin API routes. Usage:
 *   const { admin, response } = await requireAdminApi();
 *   if (response) return response;
 */
export async function requireAdminApi() {
  const admin = await getAdmin();
  if (!admin) {
    return { admin: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { admin, response: null };
}
