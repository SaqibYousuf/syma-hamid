import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";
import { getCategory, LIBRARY_PATH } from "./data/categories";
import { formatDate } from "./data/articles";
import ShareButtons from "./share-buttons";
import { DiamondDivider, Eyebrow } from "./ui";

export default function ArticleHeader({ article }) {
  const category = getCategory(article.category);

  return (
    <header>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 font-avenir text-[13px] text-[#6A5B4C]">
          <li>
            <Link href="/" className="hover:text-[#A67539]">
              Home
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <li>
            <Link href={LIBRARY_PATH} className="hover:text-[#A67539]">
              The Inner Library
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <li>
            <Link href={`${LIBRARY_PATH}?category=${category.slug}`} className="hover:text-[#A67539]">
              {category.name}
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <li aria-current="page" className="text-[#2B2118]">
            {article.title}
          </li>
        </ol>
      </nav>

      <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_220px] xl:grid-cols-[1fr_250px]">
        <div>
          <div className="flex items-start justify-between gap-4">
            <Eyebrow>{category.name}</Eyebrow>
            <div className="lg:hidden">
              <ShareButtons slug={article.slug} title={article.title} />
            </div>
          </div>
          <h1 className="mt-2 max-w-[640px] font-cormorant text-[42px] font-medium leading-[1.02] text-[#1F160F] sm:text-[56px] xl:text-[64px]">{article.title}</h1>
          <p className="mt-4 max-w-[620px] font-cormorant text-[22px] leading-[1.3] text-[#4A3F35] sm:text-[24px]">{article.subtitle}</p>
          <p className="mt-3 font-avenir text-[11px] font-semibold uppercase tracking-[2.5px] text-[#8A6A45]">
            Dr. Syma Hamid <span className="mx-2 text-[#CDB592]">|</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span className="mx-2 text-[#CDB592]">|</span>
            {article.readTime}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="hidden justify-end lg:flex">
            <ShareButtons slug={article.slug} title={article.title} />
          </div>
          <div className="relative border-l border-[#A67539]/45 py-3 pl-6">
            <span className="absolute left-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-[#A67539]" aria-hidden="true" />
            <p className="font-cormorant text-[22px] italic leading-[1.3] text-[#7A5A3A] sm:text-[24px]">{article.pullQuote}</p>
          </div>
        </div>
      </div>

      <DiamondDivider className="mt-8" />
    </header>
  );
}
