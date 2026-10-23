import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/auth";
import { getEmotionAdmin, getWheelSettings } from "@/lib/wheel";
import { toInt } from "@/lib/validation";
import EmotionEditor from "@/components/admin/EmotionEditor";

export const metadata = { title: "Edit emotion" };

export default async function EditEmotionPage({ params }) {
  await requireAdminPage();
  const { id } = await params;
  const emotion = toInt(id) ? await getEmotionAdmin(toInt(id)) : null;
  if (!emotion) notFound();
  const { defaultStatements } = await getWheelSettings();
  return <EmotionEditor key={emotion.id} initial={emotion} defaultStatements={defaultStatements} />;
}
