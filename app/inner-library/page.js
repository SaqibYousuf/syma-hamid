import LibraryHero from "@/components/inner-library/library-hero";
import BookBanner from "@/components/inner-library/book-banner";
import ReflectionsBrowser from "@/components/inner-library/reflections-browser";
import SubscribeSection from "@/components/inner-library/subscribe-section";
import { getArticles } from "@/components/inner-library/data/articles";
import { getCategory } from "@/components/inner-library/data/categories";

export const metadata = {
  title: "The Inner Library",
  description:
    "Ideas to question. Perspectives to reconsider. Truths to discover. Reflections on the mind, emotional patterns, self-awareness and the art of transformation by Dr. Syma Hamid.",
};

export default async function InnerLibraryPage({ searchParams }) {
  const { category } = (await searchParams) || {};

  // Only send what the cards need to the client component
  const summaries = getArticles().map(({ slug, title, subtitle, excerpt, category: cat, images }) => ({
    slug,
    title,
    subtitle,
    excerpt,
    category: cat,
    categoryName: getCategory(cat)?.name,
    images: { card: images.card },
  }));

  return (
    <div className="bg-[#F2E9DC]">
      <LibraryHero />
      <BookBanner />
      <ReflectionsBrowser articles={summaries} initialCategory={typeof category === "string" ? category : "all"} />
      <SubscribeSection />
    </div>
  );
}
