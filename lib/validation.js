// Tiny validation helpers shared by API routes.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function str(value, max = 1000) {
  if (value === null || value === undefined) return "";
  return String(value).trim().slice(0, max);
}

export function strOrNull(value, max = 1000) {
  const s = str(value, max);
  return s === "" ? null : s;
}

export function strList(value, maxItems = 20, maxLen = 300) {
  if (!Array.isArray(value)) return [];
  return value.map((v) => str(v, maxLen)).filter(Boolean).slice(0, maxItems);
}

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

/** Only allow site-relative paths or http(s) URLs for images. */
export function imagePath(value) {
  const s = str(value, 500);
  if (!s) return null;
  if (s.startsWith("/") && !s.startsWith("//")) return s;
  if (/^https?:\/\//i.test(s)) return s;
  return null;
}

export function parseJson(value, fallback = []) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function toInt(value) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : null;
}
