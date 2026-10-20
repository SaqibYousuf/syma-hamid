import "server-only";

// Small in-memory rate limiter (per server process). Good enough for a single
// VPS / Node server; swap for Redis if you ever run multiple instances.
const buckets = globalThis.__symaRateLimit ?? new Map();
globalThis.__symaRateLimit = buckets;

/**
 * @returns {{ ok: boolean, retryAfter: number }}  retryAfter in seconds
 */
export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  entry.count += 1;
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

export function resetRateLimit(key) {
  buckets.delete(key);
}

export function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
