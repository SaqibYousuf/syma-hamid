import { Plus } from "lucide-react";
import { requireAdminPage } from "@/lib/auth";
import { listAssessmentsAdmin } from "@/lib/assessments";
import { Button, PageHeader } from "@/components/admin/ui";
import AssessmentsTable from "@/components/admin/AssessmentsTable";

export const metadata = { title: "Assessments" };

export default async function AdminAssessmentsPage() {
  await requireAdminPage();
  const assessments = await listAssessmentsAdmin();
  return (
    <>
      <PageHeader
        title="Assessments"
        description="Create, edit and publish the assessments shown on your website."
        actions={
          <Button href="/admin/assessments/new">
            <Plus className="h-4 w-4" /> New assessment
          </Button>
        }
      />
      <AssessmentsTable initial={assessments} />
    </>
  );
}
