import { notFound } from "next/navigation";
import ArticleHero from "@/components/inner-library/article-hero";
import ArticleHeader from "@/components/inner-library/article-header";
import ArticleBody from "@/components/inner-library/article-body";
import LibrarySidebar from "@/components/inner-library/library-sidebar";
import { ARTICLES, getArticle } from "@/components/inner-library/data/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — The Inner Library`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: "article",
      publishedTime: article.date,
      authors: ["Dr. Syma Hamid"],
      images: [article.images.hero],
    },
  };
}

export default async function InnerLibraryArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="bg-[#F2E9DC]">
      <ArticleHero image={article.images.hero} />

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[260px_1fr]">
        {/* Sidebar — below the article on mobile, left column on desktop */}
        <aside className="order-2 border-t border-[#D9C5A8] bg-gradient-to-b from-[#EADCC8] to-[#E6D5BE] px-5 py-12 sm:px-8 lg:order-1 lg:border-t-0 lg:px-6 lg:py-14">
          <div className="mx-auto max-w-md lg:max-w-none">
            <LibrarySidebar activeCategory={article.category} />
          </div>
        </aside>

        <article className="order-1 min-w-0 px-5 pb-16 pt-8 sm:px-8 lg:order-2 lg:px-10 lg:pt-10 xl:px-14">
          <ArticleHeader article={article} />
          <ArticleBody article={article} />
        </article>
      </div>
    </div>
  );
}
