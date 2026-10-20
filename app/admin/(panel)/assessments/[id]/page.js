import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/auth";
import { getAssessmentForAdmin } from "@/lib/assessments";
import { toInt } from "@/lib/validation";
import AssessmentEditor from "@/components/admin/AssessmentEditor";

export const metadata = { title: "Edit assessment" };

export default async function EditAssessmentPage({ params }) {
  await requireAdminPage();
  const { id } = await params;
  const assessment = toInt(id) ? await getAssessmentForAdmin(toInt(id)) : null;
  if (!assessment) notFound();
  // Dates aren't serialisable to client components as-is
  const { created_at, updated_at, ...data } = assessment;
  return <AssessmentEditor key={assessment.id} initial={data} />;
}
