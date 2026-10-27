import { requireAdminApi } from "@/lib/auth";
import { exportOrders, STATUS_LABELS } from "@/lib/orders";
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
  const rows = await exportOrders({
    status: str(sp.get("status"), 20) || null,
    workshopId: toInt(sp.get("workshop")),
    q: str(sp.get("q"), 100) || null,
    from: DATE_RE.test(sp.get("from") || "") ? sp.get("from") : null,
    to: DATE_RE.test(sp.get("to") || "") ? sp.get("to") : null,
  });

  const header = ["Reference", "Booked on (UTC)", "Status", "Name", "Email", "Phone", "Workshop", "Workshop date", "Seats", "Price per seat", "Total (PKR)", "Payment", "Customer notes", "Admin note"];
  const lines = [header.map(csvCell).join(",")];
  for (const o of rows) {
    lines.push(
      [
        o.reference,
        new Date(o.created_at).toISOString().replace("T", " ").slice(0, 16),
        STATUS_LABELS[o.status] || o.status,
        o.full_name,
        o.email,
        o.phone,
        o.workshop_title,
        o.workshop_date_str,
        o.seats,
        o.unit_price,
        o.total_amount,
        "Bank transfer",
        o.notes,
        o.admin_note,
      ]
        .map(csvCell)
        .join(",")
    );
  }
  return new Response("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="workshop-orders-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
});
