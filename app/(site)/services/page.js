
"use client";

import ServicesHero from "@/components/services/ServicesHero";
import TherapyCounsellingSection from "@/components/services/TherapyCounsellingSection";
import TherapeuticApproaches from "@/components/services/TherapeuticApproaches";
import InnerAlchemyBanner from "@/components/services/InnerAlchemyBanner";
import AppointmentCTA from "@/components/services/AppointmentCTA";

export default function ServicesPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FAF8F5] font-avenir text-[#1E1B18] antialiased">
      <ServicesHero />
      <TherapyCounsellingSection />
      <TherapeuticApproaches />
      <InnerAlchemyBanner />
      <AppointmentCTA />
    </main>
  );
}
