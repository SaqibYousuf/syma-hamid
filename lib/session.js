// Session helpers that work in both the Node runtime and Proxy.
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "syma_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET is missing or shorter than 32 characters. Set it in .env.local");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(admin) {
  return new SignJWT({ username: admin.username })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(admin.id))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

/** Returns { id, username } or null. Never throws. */
export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    return { id: Number(payload.sub), username: payload.username };
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
