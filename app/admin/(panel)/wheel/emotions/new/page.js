import { requireAdminPage } from "@/lib/auth";
import { getWheelSettings } from "@/lib/wheel";
import EmotionEditor from "@/components/admin/EmotionEditor";

export const metadata = { title: "New emotion" };

export default async function NewEmotionPage() {
  await requireAdminPage();
  const { defaultStatements } = await getWheelSettings();
  return <EmotionEditor initial={null} defaultStatements={defaultStatements} />;
}
