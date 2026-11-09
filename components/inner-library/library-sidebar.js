import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { BOOK, CATEGORIES, LIBRARY_PATH } from "./data/categories";
import { DiamondDivider, Eyebrow, goldButton } from "./ui";

/** Left column on article pages: categories, book promo, quote card */
export default function LibrarySidebar({ activeCategory }) {
  const links = [{ slug: "all", name: "All Articles" }, ...CATEGORIES];

  return (
    <div className="flex flex-col gap-10">
      <nav aria-label="Categories">
        <p className="px-5 font-avenir text-xs font-semibold uppercase tracking-[3px] text-[#2B2118]">Categories</p>
        <DiamondDivider className="mb-2 ml-5 mt-3 w-36" />
        <ul>
          {links.map((c) => {
            const active = c.slug === activeCategory;
            const href = c.slug === "all" ? LIBRARY_PATH : `${LIBRARY_PATH}?category=${c.slug}`;
            return (
              <li key={c.slug} className="border-b border-[#D9C5A8]/70 last:border-0">
                <Link
                  href={href}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-center justify-between px-5 py-3 font-cormorant text-[18px] transition-colors ${
                    active ? "bg-[#DCC6A5] text-[#2B2118]" : "text-[#5A4A3B] hover:bg-[#E4D2B8]/60 hover:text-[#2B2118]"
                  }`}
                >
                  {c.name}
                  {active && <ChevronRight className="h-4 w-4" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <DiamondDivider className="mx-2" />

      {/* Book promo */}
      <div className="px-2">
        <Eyebrow>{BOOK.eyebrow}</Eyebrow>
        <p className="mt-2 font-cormorant text-[28px] font-medium leading-[1.1] text-[#2B2118]">{BOOK.title}</p>
        <p className="mt-1 font-cormorant text-[19px] text-[#4A3F35]">{BOOK.tagline}</p>
        <Image
          src={BOOK.cover}
          alt={`${BOOK.title} — book cover`}
          width={189}
          height={288}
          sizes="200px"
          className="mx-auto mt-5 h-auto w-[170px] shadow-[14px_18px_30px_-12px_rgba(25,15,5,0.7)] lg:mx-0 lg:ml-5"
        />
        <p className="mt-6 font-avenir text-sm leading-[1.65] text-[#5A4A3B]">{BOOK.description}</p>
        <DiamondDivider className="my-4" />
        <Eyebrow>Publication anticipated</Eyebrow>
        <p className="mt-1 font-avenir text-xs font-semibold uppercase tracking-[2.5px] text-[#2B2118]">{BOOK.publication}</p>
        <Link href={BOOK.href} className={`${goldButton} mt-5`}>
          Learn more <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="bg-gradient-to-br from-[#EFE2CF] via-[#E6D4BB] to-[#DCC5A6] px-6 py-12 text-center shadow-[0_10px_30px_-18px_rgba(70,45,20,0.55)]">
        <p className="font-cormorant text-[28px] italic leading-[1.25] text-[#4A3423]">
          Real change
          <br />
          begins within.
        </p>
        <DiamondDivider className="mx-auto mt-6 w-28" />
      </div>
    </div>
  );
}
