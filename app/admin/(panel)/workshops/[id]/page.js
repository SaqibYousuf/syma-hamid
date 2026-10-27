import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/auth";
import { getWorkshopAdmin } from "@/lib/workshops";
import { toInt } from "@/lib/validation";
import WorkshopEditor from "@/components/admin/Workshopeditor";

export const metadata = { title: "Edit workshop" };

export default async function EditWorkshopPage({ params }) {
  await requireAdminPage();
  const { id } = await params;
  const workshop = toInt(id) ? await getWorkshopAdmin(toInt(id)) : null;
  if (!workshop) notFound();
  return <WorkshopEditor key={workshop.id} initial={workshop} />;
}
