import AboutIntroSection from "@/components/about/AboutIntroSection";
import AboutApproachSection from "@/components/about/AboutApproachSection";
import CredentialsSection from "@/components/about/CredentialsSection";
import NoteFromDrSymaSection from "@/components/about/NoteFromDrSymaSection";

export default function AboutMePage() {
  return (
    <main className="w-full overflow-hidden bg-[#FAF8F5] font-sans text-[#2C2925] antialiased">
      <AboutIntroSection />
      <AboutApproachSection />
      <CredentialsSection />
      <NoteFromDrSymaSection />
    </main>
  );
}
