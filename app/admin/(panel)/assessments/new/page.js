import { requireAdminPage } from "@/lib/auth";
import AssessmentEditor from "@/components/admin/AssessmentEditor";

export const metadata = { title: "New assessment" };

export default async function NewAssessmentPage() {
  await requireAdminPage();
  return <AssessmentEditor initial={null} />;
}
