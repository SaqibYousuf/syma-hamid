import PageHero from "@/components/constants/page-hero";
import ComingSoon from "@/components/constants/coming-soon";

export const metadata = { title: "Wheel of Emotions", description: "Find words for what you’re feeling." };

export default function WheelOfEmotionsPage() {
  return (
    <div>
      <PageHero eyebrow="Wheel of emotions" title="Find words for what you’re feeling" image="/images/emotions.png" />
      <ComingSoon
        message="An interactive Wheel of Emotions is on its way. In the meantime, explore a self-reflection assessment."
        links={[
          { label: "Take an assessment", href: "/assessments" },
          { label: "Book an appointment", href: "/contact" },
        ]}
      />
    </div>
  );
}
