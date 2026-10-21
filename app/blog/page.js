import PageHero from "@/components/constants/page-hero";
import ComingSoon from "@/components/constants/coming-soon";

export const metadata = { title: "Blog", description: "Articles and reflections from Dr. Syma Hamid." };

export default function BlogPage() {
  return (
    <div>
      <PageHero eyebrow="Blog" title="Insights & reflections" />
      <ComingSoon
        message="Articles on emotional patterns, relationships and personal change will be published here soon."
        links={[
          { label: "Take an assessment", href: "/assessments" },
          { label: "About Dr. Syma", href: "/about" },
        ]}
      />
    </div>
  );
}
