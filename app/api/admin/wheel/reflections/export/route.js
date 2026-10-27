import { requireAdminApi } from "@/lib/auth";
import { exportReflections } from "@/lib/wheel";
import { handle } from "@/lib/api";
import { str, toInt } from "@/lib/validation";

function csvCell(value) {
  let s = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`; // prevent spreadsheet formula injection
  return `"${s.replace(/"/g, '""')}"`;
}
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const GET = handle(async (request) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const sp = request.nextUrl.searchParams;
  const rows = await exportReflections({
    emotionId: toInt(sp.get("emotion")),
    q: str(sp.get("q"), 100) || null,
    from: DATE_RE.test(sp.get("from") || "") ? sp.get("from") : null,
    to: DATE_RE.test(sp.get("to") || "") ? sp.get("to") : null,
  });
  const header = ["ID", "Date (UTC)", "Emotion", "Feeling", "What felt most true", "Need", "Underlying emotion", "Deeper layer", "Core need", "Reflection"];
  const lines = [header.map(csvCell).join(",")];
  for (const r of rows) {
    const layer = (title) => r.layers.find((l) => l.title === title)?.value ?? "";
    lines.push(
      [r.id, new Date(r.created_at).toISOString().replace("T", " ").slice(0, 16), r.emotion_label, r.feeling_label, r.statement, r.need_label, layer("Underlying Emotion"), layer("Deeper Layer"), layer("Core Need"), r.reflection]
        .map(csvCell)
        .join(",")
    );
  }
  return new Response("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="wheel-reflections-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
});
