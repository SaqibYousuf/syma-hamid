import Link from "next/link";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { requireAdminPage } from "@/lib/auth";
import { listEmotionsAdmin, listReflections } from "@/lib/wheel";
import { str, toInt } from "@/lib/validation";
import { formatDate } from "@/lib/format";
import { Badge, Button, Card, EmptyState, PageHeader } from "@/components/admin/ui";
import DeleteReflectionButton from "@/components/admin/DeleteReflectionButton";

export const metadata = { title: "Reflections" };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export default async function ReflectionsPage({ searchParams }) {
  await requireAdminPage();
  const sp = await searchParams;
  const filters = {
    emotionId: toInt(sp.emotion) || null,
    q: str(sp.q, 100) || null,
    from: DATE_RE.test(sp.from || "") ? sp.from : null,
    to: DATE_RE.test(sp.to || "") ? sp.to : null,
  };
  const [result, emotions] = await Promise.all([listReflections({ ...filters, page: toInt(sp.page) || 1, pageSize: 20 }), listEmotionsAdmin()]);
  const colorOf = Object.fromEntries(emotions.map((e) => [e.id, e.color]));

  const params = new URLSearchParams();
  if (filters.emotionId) params.set("emotion", filters.emotionId);
  if (filters.q) params.set("q", filters.q);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  const hasFilters = params.toString() !== "";
  const pageHref = (p) => {
    const next = new URLSearchParams(params);
    next.set("page", p);
    return `/admin/wheel/reflections?${next}`;
  };
  const inputCls =
    "h-10 w-full rounded-xl border border-[#D9CFBD] bg-white px-3 text-sm outline-none focus:border-[#A67539] focus:ring-2 focus:ring-[#A67539]/20";

  return (
    <>
      <PageHeader
        title="Reflections"
        description={`${result.total} reflection${result.total === 1 ? "" : "s"} saved from the Wheel of Emotions${hasFilters ? " match your filters" : ""}. Reflections are anonymous.`}
        actions={
          <a
            href={`/api/admin/wheel/reflections/export?${params}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#D9CFBD] bg-white px-4 text-sm font-medium text-[#1C2E22] transition-colors hover:bg-[#FBF8F3]"
          >
            <Download className="h-4 w-4" /> Export CSV
          </a>
        }
      />

      <Card className="mb-4 p-4">
        <form method="get" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_0.8fr_0.8fr_auto]">
          <input name="q" defaultValue={filters.q || ""} placeholder="Search reflections" className={inputCls} />
          <select name="emotion" defaultValue={filters.emotionId || ""} className={inputCls}>
            <option value="">All emotions</option>
            {emotions.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
          <input type="date" name="from" defaultValue={filters.from || ""} className={inputCls} aria-label="From date" />
          <input type="date" name="to" defaultValue={filters.to || ""} className={inputCls} aria-label="To date" />
          <div className="flex gap-2">
            <button className="h-10 flex-1 cursor-pointer rounded-xl bg-[#1C2E22] px-4 text-sm font-medium text-white hover:bg-[#14241B]">Filter</button>
            {hasFilters && (
              <Link href="/admin/wheel/reflections" className="flex h-10 items-center rounded-xl px-3 text-sm text-[#5C574F] hover:bg-black/5">
                Clear
              </Link>
            )}
          </div>
        </form>
      </Card>

      {result.rows.length === 0 ? (
        <Card>
          <EmptyState
            title="No reflections found"
            description={hasFilters ? "Try changing or clearing the filters." : "Reflections appear here when visitors save one on the Wheel of Emotions."}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {result.rows.map((r) => (
            <Card key={r.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: colorOf[r.emotion_id] || "#CDBFA7" }} aria-hidden />
                  <span className="font-semibold">{r.emotion_label}</span>
                  <span className="text-[#8A8478]">→</span>
                  <span className="font-medium">{r.feeling_label}</span>
                  {r.need_label && <Badge tone="gold">Needs {r.need_label.toLowerCase()}</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8A8478]">{formatDate(r.created_at)}</span>
                  <DeleteReflectionButton id={r.id} />
                </div>
              </div>
              {r.statement && <p className="mt-2 text-sm italic text-[#5C574F]">“{r.statement}”</p>}
              <p className="mt-3 whitespace-pre-line rounded-xl bg-[#FBF8F3] p-4 text-sm leading-relaxed">{r.reflection}</p>
              {r.layers.length > 0 && (
                <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-4">
                  {r.layers.map((l) => (
                    <div key={l.title}>
                      <dt className="font-semibold uppercase tracking-wider text-[#8A8478]">{l.title}</dt>
                      <dd className="text-[#1C2E22]">{l.value || "—"}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </Card>
          ))}
        </div>
      )}

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
