import fs from "node:fs/promises";
import path from "node:path";
import { FILE_NAME_RE, MIME, uploadDir } from "@/lib/uploads";

// Serves images uploaded from the admin panel (stored outside /public so
// new uploads work without rebuilding the site).
export async function GET(request, { params }) {
  const { file } = await params;
  if (!FILE_NAME_RE.test(file)) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(path.join(uploadDir(), file));
    const ext = file.split(".").pop();
    return new Response(data, {
      headers: {
        "Content-Type": MIME[ext],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
