import Link from "next/link";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { requireAdminPage } from "@/lib/auth";
import { listAssessmentsAdmin } from "@/lib/assessments";
import { distinctResultProfiles, listSubmissions } from "@/lib/submissions";
import { str, toInt } from "@/lib/validation";
import { Badge, Button, Card, EmptyState, PageHeader } from "@/components/admin/ui";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Results" };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export default async function ResultsPage({ searchParams }) {
  await requireAdminPage();
  const sp = await searchParams;
  const filters = {
    assessmentId: toInt(sp.assessment) || null,
    profile: str(sp.profile, 255) || null,
    q: str(sp.q, 100) || null,
    from: DATE_RE.test(sp.from || "") ? sp.from : null,
    to: DATE_RE.test(sp.to || "") ? sp.to : null,
  };
  const [result, assessments, profiles] = await Promise.all([
    listSubmissions({ ...filters, page: toInt(sp.page) || 1, pageSize: 20 }),
    listAssessmentsAdmin(),
    distinctResultProfiles(),
  ]);

  const params = new URLSearchParams();
  if (filters.assessmentId) params.set("assessment", filters.assessmentId);
  if (filters.profile) params.set("profile", filters.profile);
  if (filters.q) params.set("q", filters.q);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  const pageHref = (p) => {
    const next = new URLSearchParams(params);
    next.set("page", p);
    return `/admin/results?${next}`;
  };
  const hasFilters = params.toString() !== "";

  const inputCls =
    "h-10 w-full rounded-xl border border-[#D9CFBD] bg-white px-3 text-sm outline-none focus:border-[#A67539] focus:ring-2 focus:ring-[#A67539]/20";

  return (
    <>
      <PageHeader
        title="Results"
        description={`${result.total} result${result.total === 1 ? "" : "s"}${hasFilters ? " match your filters" : " in total"}.`}
        actions={
          <a
            href={`/api/admin/submissions/export?${params}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#D9CFBD] bg-white px-4 text-sm font-medium text-[#1C2E22] transition-colors hover:bg-[#FBF8F3]"
          >
            <Download className="h-4 w-4" /> Export CSV
          </a>
        }
      />

      <Card className="mb-4 p-4">
        <form method="get" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_1fr_0.8fr_0.8fr_auto]">
          <input name="q" defaultValue={filters.q || ""} placeholder="Search name or email" className={inputCls} />
          <select name="assessment" defaultValue={filters.assessmentId || ""} className={inputCls}>
            <option value="">All assessments</option>
            {assessments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>
          <select name="profile" defaultValue={filters.profile || ""} className={inputCls}>
            <option value="">All results</option>
            {profiles.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <input type="date" name="from" defaultValue={filters.from || ""} className={inputCls} aria-label="From date" />
          <input type="date" name="to" defaultValue={filters.to || ""} className={inputCls} aria-label="To date" />
          <div className="flex gap-2">
            <button className="h-10 flex-1 cursor-pointer rounded-xl bg-[#1C2E22] px-4 text-sm font-medium text-white hover:bg-[#14241B]">Filter</button>
            {hasFilters && (
              <Link href="/admin/results" className="flex h-10 items-center rounded-xl px-3 text-sm text-[#5C574F] hover:bg-black/5">
                Clear
              </Link>
            )}
          </div>
        </form>
      </Card>

      <Card className="overflow-hidden">
        {result.rows.length === 0 ? (
          <EmptyState
            title="No results found"
            description={hasFilters ? "Try changing or clearing the filters." : "Results appear here when visitors complete an assessment."}
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FBF8F3] text-xs uppercase tracking-wider text-[#8A8478]">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Name</th>
                    <th className="px-5 py-3 font-semibold">Assessment</th>
                    <th className="px-5 py-3 font-semibold">Result</th>
                    <th className="px-5 py-3 font-semibold">Date</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8DB]">
                  {result.rows.map((r) => (
                    <tr key={r.id} className="hover:bg-[#FBF8F3]">
                      <td className="px-5 py-3">
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-xs text-[#8A8478]">{r.email}</p>
                      </td>
                      <td className="max-w-[260px] px-5 py-3 text-[#5C574F]">
                        <span className="line-clamp-2">{r.assessment_title}</span>
                      </td>
                      <td className="px-5 py-3">{r.result_profile_title ? <Badge tone="gold">{r.result_profile_title}</Badge> : "—"}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-[#5C574F]">{formatDate(r.created_at)}</td>
                      <td className="px-5 py-3 text-right">
                        <Link href={`/admin/results/${r.id}`} className="font-medium text-[#A67539] hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile list */}
            <ul className="divide-y divide-[#EFE8DB] md:hidden">
              {result.rows.map((r) => (
                <li key={r.id}>
                  <Link href={`/admin/results/${r.id}`} className="block px-4 py-3 hover:bg-[#FBF8F3]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{r.name}</p>
                        <p className="truncate text-xs text-[#8A8478]">{r.email}</p>
                      </div>
                      {r.result_profile_title && <Badge tone="gold">{r.result_profile_title}</Badge>}
                    </div>
                    <p className="mt-1 truncate text-xs text-[#5C574F]">{r.assessment_title}</p>
                    <p className="text-xs text-[#8A8478]">{formatDate(r.created_at)}</p>
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
            {result.page > 1 ? (
              <Button variant="outline" size="sm" href={pageHref(result.page - 1)}>
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
            ) : null}
            {result.page < result.pages ? (
              <Button variant="outline" size="sm" href={pageHref(result.page + 1)}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
