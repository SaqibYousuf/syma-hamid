import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { getCategory, LIBRARY_PATH } from "./data/categories";
import { Eyebrow } from "./ui";

export default function ArticleCard({ article }) {
  const href = `${LIBRARY_PATH}/${article.slug}`;
  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative block aspect-[2.15/1] overflow-hidden bg-[#2B2118]" tabIndex={-1} aria-hidden="true">
        <Image
          src={article.images.card}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </Link>
      <Eyebrow className="mt-4">{getCategory(article.category)?.name}</Eyebrow>
      <h3 className="mt-1.5 font-cormorant text-[26px] font-medium leading-[1.15] text-[#2B2118]">
        <Link href={href} className="transition-colors hover:text-[#A67539]">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 font-avenir text-[15px] leading-[1.6] text-[#6A5B4C]">{article.excerpt}</p>
      <Link
        href={href}
        className="mt-3 inline-flex w-fit items-center gap-2 font-cormorant text-[19px] font-semibold text-[#A67539] transition-colors hover:text-[#7A5226]"
        aria-label={`Read more: ${article.title}`}
      >
        Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
