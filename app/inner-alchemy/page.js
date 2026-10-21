import Hero from "@/components/inner-alchemy/hero";
import Experience from "@/components/inner-alchemy/experience";
import Journey from "@/components/inner-alchemy/journey";
import HowWork from "@/components/inner-alchemy/how-work";

export const metadata = {
  title: "Inner Alchemy Sessions",
  description: "A guided 60-minute deep-dive to understand the patterns beneath what you're experiencing, reframe limiting narratives and move forward with clarity.",
};

export default function InnerAlchemyPage() {
  return (
    <div>
      <Hero />
      <Experience />
      <Journey />
      <HowWork />
    </div>
  );
}
