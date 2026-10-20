import { requireAdminApi } from "@/lib/auth";
import { exportSubmissions } from "@/lib/submissions";
import { handle } from "@/lib/api";
import { str, toInt } from "@/lib/validation";

function csvCell(value) {
  let s = value === null || value === undefined ? "" : String(value);
  // Prevent spreadsheet formula injection
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export const GET = handle(async (request) => {
  const { response } = await requireAdminApi();
  if (response) return response;
  const sp = request.nextUrl.searchParams;
  const rows = await exportSubmissions({
    assessmentId: toInt(sp.get("assessment")),
    profile: str(sp.get("profile"), 255) || null,
    q: str(sp.get("q"), 100) || null,
    from: /^\d{4}-\d{2}-\d{2}$/.test(sp.get("from") || "") ? sp.get("from") : null,
    to: /^\d{4}-\d{2}-\d{2}$/.test(sp.get("to") || "") ? sp.get("to") : null,
  });

  const maxAnswers = rows.reduce((m, r) => Math.max(m, r.answers.length), 0);
  const header = ["ID", "Date (UTC)", "Name", "Email", "Assessment", "Result"];
  for (let i = 1; i <= maxAnswers; i++) header.push(`Q${i}`, `A${i}`);

  const lines = [header.map(csvCell).join(",")];
  for (const r of rows) {
    const cells = [
      r.id,
      new Date(r.created_at).toISOString().replace("T", " ").slice(0, 19),
      r.name,
      r.email,
      r.assessment_title,
      r.result_profile_title,
    ];
    for (let i = 0; i < maxAnswers; i++) cells.push(r.answers[i]?.question_text ?? "", r.answers[i]?.answer_text ?? "");
    lines.push(cells.map(csvCell).join(","));
  }

  const date = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="assessment-results-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
});
