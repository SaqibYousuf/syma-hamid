import { connection } from "next/server";
import WheelEmotionHeader from "@/components/wheel-of-emotion/WheelEmotionHeader";
import { getWheelData } from "@/lib/wheel";

export const metadata = { title: "Wheel of Emotions", description: "Find words for what you’re feeling." };

export default async function WheelOfEmotionsPage() {
  await connection(); // always read the latest wheel content from the database

  let wheel = null;
  try {
    wheel = await getWheelData();
  } catch (error) {
    console.error("[wheel-of-emotions] failed to load", error);
  }

  return (
    <div>
      <WheelEmotionHeader wheel={wheel} />
    </div>
  );
}
