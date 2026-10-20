import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from "@/lib/session";
import { rateLimit, resetRateLimit, clientIp } from "@/lib/rate-limit";
import { handle, jsonError, readJson } from "@/lib/api";
import { str } from "@/lib/validation";

// Used when the username doesn't exist, so response time is the same either way
const DUMMY_HASH = "$2b$12$ySQPNRjeJ/vzaqmwuDsGq.zsnYBkoI0JlvL5McfWwO23bXZnlMmAm";

export const POST = handle(async (request) => {
  const body = await readJson(request);
  const username = str(body?.username, 100);
  const password = String(body?.password ?? "").slice(0, 200);
  if (!username || !password) return jsonError("Please enter your username and password.");

  const key = `login:${clientIp(request)}:${username.toLowerCase()}`;
  const limit = rateLimit(key, { limit: 5, windowMs: 15 * 60 * 1000 });
  if (!limit.ok) {
    return jsonError(`Too many attempts. Try again in ${Math.ceil(limit.retryAfter / 60)} minute(s).`, 429);
  }

  const rows = await query("SELECT id, username, password_hash FROM admins WHERE username = ? LIMIT 1", [username]);
  const admin = rows[0];
  const valid = await bcrypt.compare(password, admin?.password_hash || DUMMY_HASH);
  if (!admin || !valid) return jsonError("Incorrect username or password.", 401);

  resetRateLimit(key);
  await query("UPDATE admins SET last_login_at = UTC_TIMESTAMP() WHERE id = ?", [admin.id]);

  const token = await createSessionToken(admin);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
});
