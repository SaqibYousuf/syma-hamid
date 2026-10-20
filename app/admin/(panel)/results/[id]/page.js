import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { requireAdminPage } from "@/lib/auth";
import { getSubmission } from "@/lib/submissions";
import { toInt } from "@/lib/validation";
import { Badge, Card } from "@/components/admin/ui";
import { formatDate } from "@/lib/format";
import DeleteSubmissionButton from "@/components/admin/DeleteSubmissionButton";

export const metadata = { title: "Result" };

export default async function ResultDetailPage({ params }) {
  await requireAdminPage();
  const { id } = await params;
  const s = toInt(id) ? await getSubmission(toInt(id)) : null;
  if (!s) notFound();
  const maxScore = Math.max(1, ...s.scores.map((x) => x.count));

  return (
    <>
      <Link href="/admin/results" className="mb-3 inline-flex items-center gap-1 text-sm text-[#8A8478] hover:text-[#1C2E22]">
        <ArrowLeft className="h-4 w-4" /> All results
      </Link>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-cormorant text-3xl font-bold leading-tight sm:text-4xl">{s.name}</h1>
          <a href={`mailto:${s.email}`} className="mt-1 inline-flex items-center gap-1.5 text-sm text-[#A67539] hover:underline">
            <Mail className="h-3.5 w-3.5" /> {s.email}
          </a>
        </div>
        <DeleteSubmissionButton id={s.id} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8A8478]">Assessment</p>
            <p className="mt-1 font-semibold">
              {s.assessment_id ? (
                <Link href={`/admin/assessments/${s.assessment_id}`} className="hover:text-[#A67539]">
                  {s.assessment_title}
                </Link>
              ) : (
                s.assessment_title
              )}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#8A8478]">Result</p>
            <p className="mt-1 font-cormorant text-2xl font-bold text-[#A67539]">{s.result_profile_title || "—"}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#8A8478]">Completed</p>
            <p className="mt-1 text-sm">{formatDate(s.created_at)}</p>
          </Card>

          {s.scores.length > 0 && (
            <Card className="p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8A8478]">Score breakdown</p>
              <ul className="space-y-3">
                {s.scores.map((sc) => (
                  <li key={sc.profile_id ?? sc.title}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{sc.title}</span>
                      <span className="font-semibold">{sc.count}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#F1ECE2]">
                      <div className="h-full rounded-full bg-[#A67539]" style={{ width: `${(sc.count / maxScore) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <Card className="lg:col-span-2">
          <h2 className="border-b border-[#EFE8DB] px-5 py-4 font-cormorant text-xl font-bold">Answers</h2>
          <ol className="divide-y divide-[#EFE8DB]">
            {s.answers.map((a, i) => (
              <li key={a.id} className="px-5 py-4">
                <p className="text-sm text-[#5C574F]">
                  <span className="mr-1 font-semibold text-[#1C2E22]">{i + 1}.</span>
                  {a.question_text}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <p className="whitespace-pre-line font-medium">{a.answer_text || <span className="text-[#A39E93]">No answer</span>}</p>
                  {a.profile_title && <Badge>{a.profile_title}</Badge>}
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}
