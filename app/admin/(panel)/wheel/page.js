import { requireAdminPage } from "@/lib/auth";
import { getWheelSettings, listEmotionsAdmin, listNeedsAdmin, wheelStats } from "@/lib/wheel";
import { PageHeader } from "@/components/admin/ui";
import WheelAdmin from "@/components/admin/WheelAdmin";

export const metadata = { title: "Wheel of Emotions" };

export default async function AdminWheelPage({ searchParams }) {
  await requireAdminPage();
  const sp = await searchParams;
  const [emotions, needs, settings, stats] = await Promise.all([listEmotionsAdmin(), listNeedsAdmin(), getWheelSettings(), wheelStats()]);
  return (
    <>
      <PageHeader
        title="Wheel of Emotions"
        description={`${stats.emotions} emotions on the wheel · ${stats.feelings} feelings · ${stats.reflections} saved reflections`}
      />
      <WheelAdmin
        initialEmotions={emotions}
        initialNeeds={needs}
        initialSettings={settings}
        initialTab={["emotions", "needs", "settings"].includes(sp.tab) ? sp.tab : "emotions"}
      />
    </>
  );
}
