import Link from "next/link";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { requireAdminPage } from "@/lib/auth";
import { listOrders, orderStats, ORDER_STATUSES, STATUS_LABELS } from "@/lib/orders";
import { listWorkshopsAdmin } from "@/lib/workshops";
import { str, toInt } from "@/lib/validation";
import { formatDate } from "@/lib/format";
import { formatPrice, formatWorkshopDate } from "@/components/workshops/workshops";
import { Badge, Button, Card, EmptyState, PageHeader } from "@/components/admin/ui";

export const metadata = { title: "Orders" };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TONES = { pending: "amber", confirmed: "green", cancelled: "neutral" };

export default async function OrdersPage({ searchParams }) {
  await requireAdminPage();
  const sp = await searchParams;
  const filters = {
    status: ORDER_STATUSES.includes(sp.status) ? sp.status : null,
    workshopId: toInt(sp.workshop) || null,
    q: str(sp.q, 100) || null,
    from: DATE_RE.test(sp.from || "") ? sp.from : null,
    to: DATE_RE.test(sp.to || "") ? sp.to : null,
  };
  const [result, workshops, stats] = await Promise.all([
    listOrders({ ...filters, page: toInt(sp.page) || 1, pageSize: 20 }),
    listWorkshopsAdmin(),
    orderStats(),
  ]);

  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.workshopId) params.set("workshop", filters.workshopId);
  if (filters.q) params.set("q", filters.q);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  const hasFilters = params.toString() !== "";
  const pageHref = (p) => {
    const next = new URLSearchParams(params);
    next.set("page", p);
    return `/admin/orders?${next}`;
  };

  const inputCls =
    "h-10 w-full rounded-xl border border-[#D9CFBD] bg-white px-3 text-sm outline-none focus:border-[#A67539] focus:ring-2 focus:ring-[#A67539]/20";

  return (
    <>
      <PageHeader
        title="Orders"
        description={`${result.total} order${result.total === 1 ? "" : "s"}${hasFilters ? " match your filters" : " in total"}.`}
        actions={
          <a
            href={`/api/admin/orders/export?${params}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#D9CFBD] bg-white px-4 text-sm font-medium text-[#1C2E22] transition-colors hover:bg-[#FBF8F3]"
          >
            <Download className="h-4 w-4" /> Export CSV
          </a>
        }
      />

      <div className="mb-4 grid grid-cols-3 gap-3">
        <Card className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8A8478]">Awaiting payment</p>
          <p className="mt-1 font-cormorant text-3xl font-bold text-amber-700">{stats.pending}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8A8478]">Confirmed</p>
          <p className="mt-1 font-cormorant text-3xl font-bold text-emerald-700">{stats.confirmed}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8A8478]">Received</p>
          <p className="mt-1 font-cormorant text-2xl font-bold sm:text-3xl">{formatPrice(stats.revenue)}</p>
        </Card>
      </div>

      <Card className="mb-4 p-4">
        <form method="get" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.4fr_1fr_0.8fr_0.8fr_auto]">
          <input name="q" defaultValue={filters.q || ""} placeholder="Name, email, phone or reference" className={inputCls} />
          <select name="workshop" defaultValue={filters.workshopId || ""} className={inputCls}>
            <option value="">All workshops</option>
            {workshops.map((w) => (
              <option key={w.id} value={w.id}>
                {w.title} ({formatWorkshopDate(w.event_date)})
              </option>
            ))}
          </select>
          <select name="status" defaultValue={filters.status || ""} className={inputCls}>
            <option value="">All statuses</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <input type="date" name="from" defaultValue={filters.from || ""} className={inputCls} aria-label="Booked from" />
          <input type="date" name="to" defaultValue={filters.to || ""} className={inputCls} aria-label="Booked to" />
          <div className="flex gap-2">
            <button className="h-10 flex-1 cursor-pointer rounded-xl bg-[#1C2E22] px-4 text-sm font-medium text-white hover:bg-[#14241B]">Filter</button>
            {hasFilters && (
              <Link href="/admin/orders" className="flex h-10 items-center rounded-xl px-3 text-sm text-[#5C574F] hover:bg-black/5">
                Clear
              </Link>
            )}
          </div>
        </form>
      </Card>

      <Card className="overflow-hidden">
        {result.rows.length === 0 ? (
          <EmptyState
            title="No orders found"
            description={hasFilters ? "Try changing or clearing the filters." : "Orders appear here when someone books a workshop."}
          />
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FBF8F3] text-xs uppercase tracking-wider text-[#8A8478]">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Reference</th>
                    <th className="px-5 py-3 font-semibold">Customer</th>
                    <th className="px-5 py-3 font-semibold">Workshop</th>
                    <th className="px-5 py-3 font-semibold">Seats</th>
                    <th className="px-5 py-3 font-semibold">Total</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Booked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8DB]">
                  {result.rows.map((o) => (
                    <tr key={o.id} className="hover:bg-[#FBF8F3]">
                      <td className="px-5 py-3">
                        <Link href={`/admin/orders/${o.id}`} className="font-mono font-semibold text-[#A67539] hover:underline">
                          {o.reference}
                        </Link>
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-semibold">{o.full_name}</p>
                        <p className="text-xs text-[#8A8478]">{o.phone}</p>
                      </td>
                      <td className="max-w-[240px] px-5 py-3 text-[#5C574F]">
                        <span className="line-clamp-1">{o.workshop_title}</span>
                        <span className="text-xs text-[#8A8478]">{formatWorkshopDate(o.workshop_date_str)}</span>
                      </td>
                      <td className="px-5 py-3">{o.seats}</td>
                      <td className="whitespace-nowrap px-5 py-3 font-medium">{formatPrice(o.total_amount)}</td>
                      <td className="px-5 py-3">
                        <Badge tone={TONES[o.status]}>{STATUS_LABELS[o.status] || o.status}</Badge>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-[#5C574F]">{formatDate(o.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="divide-y divide-[#EFE8DB] md:hidden">
              {result.rows.map((o) => (
                <li key={o.id}>
                  <Link href={`/admin/orders/${o.id}`} className="block px-4 py-3 hover:bg-[#FBF8F3]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{o.full_name}</p>
                        <p className="font-mono text-xs text-[#A67539]">{o.reference}</p>
                      </div>
                      <Badge tone={TONES[o.status]}>{STATUS_LABELS[o.status] || o.status}</Badge>
                    </div>
                    <p className="mt-1 truncate text-xs text-[#5C574F]">{o.workshop_title}</p>
                    <p className="text-xs text-[#8A8478]">
                      {o.seats} seat{o.seats > 1 ? "s" : ""} · {formatPrice(o.total_amount)} · {formatDate(o.created_at)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>

      {result.pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-[#8A8478]">
            Page {result.page} of {result.pages}
          </span>
          <div className="flex gap-2">
            {result.page > 1 && (
              <Button variant="outline" size="sm" href={pageHref(result.page - 1)}>
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
            )}
            {result.page < result.pages && (
              <Button variant="outline" size="sm" href={pageHref(result.page + 1)}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
