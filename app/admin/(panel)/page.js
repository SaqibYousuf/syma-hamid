import Link from "next/link";
import { ArrowRight, ClipboardList, Eye, TrendingUp, Users } from "lucide-react";
import { requireAdminPage } from "@/lib/auth";
import { dashboardStats } from "@/lib/submissions";
import { Card, PageHeader } from "@/components/admin/ui";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Dashboard" };

function Stat({ icon: Icon, label, value }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8478]">{label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A67539]/10 text-[#A67539]">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-cormorant text-4xl font-bold text-[#1C2E22]">{value}</p>
    </Card>
  );
}

export default async function AdminDashboard() {
  await requireAdminPage();
  const { totals, perAssessment, recent, profileBreakdown } = await dashboardStats();
  const maxPer = Math.max(1, ...perAssessment.map((a) => a.total));
  const maxProfile = Math.max(1, ...profileBreakdown.map((p) => p.total));

  return (
    <>
      <PageHeader title="Dashboard" description="An overview of your assessments and results." />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat icon={Users} label="Total results" value={totals.submissions} />
        <Stat icon={TrendingUp} label="Last 7 days" value={totals.last7} />
        <Stat icon={ClipboardList} label="Assessments" value={totals.assessments} />
        <Stat icon={Eye} label="Published" value={totals.published} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between border-b border-[#EFE8DB] px-5 py-4">
            <h2 className="font-cormorant text-xl font-bold">Recent results</h2>
            <Link href="/admin/results" className="flex items-center gap-1 text-sm font-medium text-[#A67539] hover:underline">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-[#8A8478]">No results yet. They will appear here when visitors complete an assessment.</p>
          ) : (
            <ul className="divide-y divide-[#EFE8DB]">
              {recent.map((r) => (
                <li key={r.id}>
                  <Link href={`/admin/results/${r.id}`} className="flex items-center justify-between gap-4 px-5 py-3 transition-colors hover:bg-[#FBF8F3]">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{r.name}</p>
                      <p className="truncate text-xs text-[#8A8478]">{r.assessment_title}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium text-[#A67539]">{r.result_profile_title || "—"}</p>
                      <p className="text-xs text-[#8A8478]">{formatDate(r.created_at)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card className="p-5">
            <h2 className="mb-4 font-cormorant text-xl font-bold">Results by assessment</h2>
            <ul className="space-y-3">
              {perAssessment.map((a) => (
                <li key={a.id}>
                  <div className="mb-1 flex justify-between gap-3 text-xs">
                    <span className="truncate text-[#5C574F]">{a.title}</span>
                    <span className="font-semibold">{a.total}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#F1ECE2]">
                    <div className="h-full rounded-full bg-[#1C2E22]" style={{ width: `${(a.total / maxPer) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          {profileBreakdown.length > 0 && (
            <Card className="p-5">
              <h2 className="mb-4 font-cormorant text-xl font-bold">Most common results</h2>
              <ul className="space-y-3">
                {profileBreakdown.map((p) => (
                  <li key={p.title}>
                    <div className="mb-1 flex justify-between gap-3 text-xs">
                      <span className="truncate text-[#5C574F]">{p.title}</span>
                      <span className="font-semibold">{p.total}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#F1ECE2]">
                      <div className="h-full rounded-full bg-[#A67539]" style={{ width: `${(p.total / maxProfile) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
