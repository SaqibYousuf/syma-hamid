import { requireAdminPage } from "@/lib/auth";
import WorkshopEditor from "@/components/admin/Workshopeditor";

export const metadata = { title: "New workshop" };

export default async function NewWorkshopPage() {
  await requireAdminPage();
  return <WorkshopEditor initial={null} />;
}
