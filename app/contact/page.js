import ContactSection from "@/components/contact/ContactSection";

export const metadata = { title: "Contact", description: "Get in touch or book an appointment with Dr. Syma Hamid." };

export default function ContactPage() {
  return (
    <div>
      {/* <PageHero eyebrow="Contact" title="Begin your journey" text="Book an appointment or ask a question — every journey starts with a first conversation." />
      <ComingSoon
        message="Online booking and contact details will be available here shortly."
        links={[
          { label: "Take an assessment", href: "/assessments" },
          { label: "Explore Inner Alchemy", href: "/inner-alchemy" },
        ]}
      /> */}
      <ContactSection />
    </div>
  );
}
