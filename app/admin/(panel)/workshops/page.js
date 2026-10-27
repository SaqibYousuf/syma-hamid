import { Plus } from "lucide-react";
import { requireAdminPage } from "@/lib/auth";
import { listWorkshopsAdmin, todayPk } from "@/lib/workshops";
import { Button, PageHeader } from "@/components/admin/ui";
import WorkshopsTable from "@/components/admin/WorkshopsTable";

export const metadata = { title: "Workshops" };

export default async function AdminWorkshopsPage() {
  await requireAdminPage();
  const workshops = await listWorkshopsAdmin();
  return (
    <>
      <PageHeader
        title="Workshops"
        description="Create and manage the workshops shown on the website. Past workshops are hidden from the website automatically."
        actions={
          <Button href="/admin/workshops/new">
            <Plus className="h-4 w-4" /> New workshop
          </Button>
        }
      />
      <WorkshopsTable initial={workshops} today={todayPk()} />
    </>
  );
}
