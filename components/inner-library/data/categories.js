// Categories used by The Inner Library (listing tabs + article sidebar)
export const CATEGORIES = [
  { slug: "mind-and-thought", name: "Mind & Thought" },
  { slug: "emotions-and-healing", name: "Emotions & Healing" },
  { slug: "relationships", name: "Relationships" },
  { slug: "self-awareness", name: "Self-Awareness" },
  { slug: "inner-transformation", name: "Inner-Transformation" },
  { slug: "cognitive-reframing", name: "Cognitive Reframing" },
  { slug: "inner-alchemy", name: "Inner-Alchemy" },
  { slug: "book-insights", name: "Book Insights" },
];

export const LIBRARY_PATH = "/inner-library";

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}

// The forthcoming book promoted across the section
export const BOOK = {
  eyebrow: "The forthcoming book",
  title: "The Alchemy of Self",
  tagline: "A journey inward.",
  description:
    "A deeper exploration of the patterns that shape us, the beliefs that bind us and the awareness that makes transformation possible.",
  publication: "November 2026",
  cover: "/images/inner-library/book-cover.jpg",
  // Change this when a dedicated book page exists
  href: `${LIBRARY_PATH}#subscribe`,
};
