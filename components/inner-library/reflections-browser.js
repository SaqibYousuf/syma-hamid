"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import ArticleCard from "./article-card";
import CategoryIcon from "./category-icon";
import { CATEGORIES, LIBRARY_PATH } from "./data/categories";

const TABS = [{ slug: "all", name: "All" }, ...CATEGORIES];

/**
 * Category tabs + "Recent Reflections" grid with topic filter and search.
 * `articles` are light summaries (no body) passed from the server page.
 */
export default function ReflectionsBrowser({ articles, initialCategory = "all" }) {
  const [category, setCategory] = useState(TABS.some((t) => t.slug === initialCategory) ? initialCategory : "all");
  const [query, setQuery] = useState("");

  const selectCategory = (slug) => {
    setCategory(slug);
    // keep the URL shareable without a server round-trip
    const url = slug === "all" ? LIBRARY_PATH : `${LIBRARY_PATH}?category=${slug}`;
    window.history.replaceState(null, "", url);
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      if (!q) return true;
      return [a.title, a.excerpt, a.subtitle, a.categoryName].some((s) => s?.toLowerCase().includes(q));
    });
  }, [articles, category, query]);

  return (
    <>
      {/* Category tabs */}
      <div className="border-y border-[#D9C5A8] bg-[#F0E5D5]">
        <nav aria-label="Topics" className="mx-auto max-w-[1440px] overflow-x-auto px-5 sm:px-8 lg:px-14">
          <ul className="flex min-w-max items-stretch xl:min-w-full xl:justify-between">
            {TABS.map((tab, i) => {
              const active = tab.slug === category;
              return (
                <li key={tab.slug} className="flex items-center">
                  {i > 0 && <span className="h-7 w-px bg-[#D9C5A8]" aria-hidden="true" />}
                  <button
                    type="button"
                    onClick={() => selectCategory(tab.slug)}
                    aria-pressed={active}
                    className={`relative flex cursor-pointer items-center gap-2 whitespace-nowrap px-3.5 py-6 font-cormorant text-[17px] transition-colors 2xl:px-5 ${
                      active ? "text-[#2B2118]" : "text-[#6A5B4C] hover:text-[#2B2118]"
                    }`}
                  >
                    <CategoryIcon slug={tab.slug} className="h-6 w-6 text-[#8A6A45]" />
                    {tab.name}
                    {active && (
                      <span className="absolute inset-x-3 bottom-3 flex items-center" aria-hidden="true">
                        <span className="h-px flex-1 bg-[#2B2118]" />
                        <span className="mx-1 h-1 w-1 rotate-45 bg-[#2B2118]" />
                        <span className="h-px flex-1 bg-[#2B2118]" />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Recent reflections */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 md:py-14 lg:px-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="font-cormorant text-[36px] font-medium leading-none text-[#2B2118] sm:text-[44px]">Recent Reflections</h2>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <label className="relative flex items-center gap-3">
              <span className="hidden h-px w-12 bg-[#A67539]/60 sm:block" aria-hidden="true" />
              <span className="sr-only">Filter by topic</span>
              <select
                value={category}
                onChange={(e) => selectCategory(e.target.value)}
                className="cursor-pointer appearance-none bg-transparent py-2 pr-7 font-avenir text-[11px] font-semibold uppercase tracking-[2.5px] text-[#2B2118] outline-none"
              >
                <option value="all">Filter by topic</option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-[#2B2118]" aria-hidden="true" />
            </label>

            <label className="flex w-full items-center gap-2.5 rounded-full border border-[#CDB592] bg-[#F5ECDF] px-4 py-2.5 sm:w-[260px]">
              <Search className="h-4 w-4 shrink-0 text-[#4A3F35]" aria-hidden="true" />
              <span className="sr-only">Search articles</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-transparent font-avenir text-sm text-[#2B2118] outline-none placeholder:text-[#9A8A78]"
              />
            </label>
          </div>
        </div>

        {visible.length ? (
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-dashed border-[#CDB592] px-6 py-14 text-center">
            <p className="font-cormorant text-[26px] italic text-[#3A2C20]">New reflections are on their way.</p>
            <p className="mt-2 font-avenir text-[15px] text-[#6A5B4C]">
              {query ? "No articles match your search." : "Articles for this topic will be published soon."}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                selectCategory("all");
              }}
              className="mt-5 cursor-pointer font-avenir text-xs font-semibold uppercase tracking-[2.5px] text-[#A67539] hover:text-[#7A5226]"
            >
              View all articles
            </button>
          </div>
        )}
      </section>
    </>
  );
}
