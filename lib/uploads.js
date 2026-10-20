import "server-only";
import path from "node:path";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
export const FILE_NAME_RE = /^[a-z0-9-]+\.(png|jpg|webp|gif)$/;

export const MIME = {
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
};

export function uploadDir() {
  return path.resolve(/*turbopackIgnore: true*/ process.cwd(), process.env.UPLOAD_DIR || "uploads");
}

/** Detect the real image type from the first bytes (don't trust the file name). */
export function detectImageType(buf) {
  if (buf.length < 12) return null;
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "png";
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return "webp";
  if (buf.toString("ascii", 0, 3) === "GIF") return "gif";
  return null;
}
