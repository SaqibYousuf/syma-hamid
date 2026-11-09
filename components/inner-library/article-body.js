import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LIBRARY_PATH } from "./data/categories";
import { getAdjacent, sectionId } from "./data/articles";
import ReflectionBox from "./reflection-box";
import RichText from "./rich-text";
import { DiamondDivider, Eyebrow, goldButton, paperCard } from "./ui";

// ─── Small pieces ───

function FloatImage({ img, priority = false }) {
  return (
    <figure className="mb-6 md:float-right md:mb-4 md:ml-8 md:w-[44%]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#2B2118] shadow-[0_14px_30px_-18px_rgba(40,25,10,0.8)]">
        <Image src={img.src} alt={img.alt || ""} fill priority={priority} sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
      </div>
      {img.caption && <figcaption className="mt-3 text-center font-cormorant text-[17px] italic leading-snug text-[#5A4A3B]">{img.caption}</figcaption>}
    </figure>
  );
}

function FloatQuote({ text }) {
  return (
    <aside className={`${paperCard} mb-6 px-7 py-7 md:float-right md:mb-4 md:ml-8 md:w-[38%]`}>
      <p className="font-cormorant text-[22px] italic leading-[1.35] text-[#4A3423]">{text}</p>
      <DiamondDivider className="mt-5" />
    </aside>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 id={sectionId(children)} className="mb-3 mt-10 scroll-mt-28 font-cormorant text-[28px] font-medium leading-[1.15] text-[#1F160F] sm:text-[31px]">
      {children}
    </h2>
  );
}

function Signature() {
  return (
    <div className="mt-8">
      <p className="font-cormorant text-[20px] italic text-[#4A3F35]">Real change begins within.</p>
      <Image src="/images/inner-library/signature.png" alt="Dr. Syma Hamid" width={318} height={70} className="mt-3 h-auto w-[170px]" />
      <p className="mt-1 font-avenir text-[11px] font-semibold uppercase tracking-[3px] text-[#6A5B4C]">Psychologist &amp; Cognitive Reframe Expert</p>
      <p className="mt-5 font-cormorant text-[17px] italic text-[#7A6A58]">The Inner Library | Ideas to question. Perspectives to reconsider. Truths to discover.</p>
    </div>
  );
}

function SideImageCard({ src, quote }) {
  return (
    <div className="relative overflow-hidden bg-[#1A120B]">
      <div className="relative aspect-[3/4]">
        <Image src={src} alt="" fill sizes="(min-width: 1024px) 260px, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A120B]/20 to-[#1A120B]" />
      </div>
      <div className="relative -mt-24 px-6 pb-8 text-center">
        <p className="font-cormorant text-[24px] italic leading-[1.3] text-[#F3E7D3]">{quote}</p>
        <DiamondDivider tone="light" className="mx-auto mt-5 w-32" />
      </div>
    </div>
  );
}

function Contents({ sections }) {
  return (
    <nav aria-label="In this article" className={`${paperCard} px-6 py-6`}>
      <Eyebrow className="text-[#2B2118]">In this article</Eyebrow>
      <ol className="mt-3 space-y-1.5">
        {sections.map((s, i) => (
          <li key={s.heading} className="flex gap-2 font-avenir text-[13px] leading-snug text-[#5A4A3B]">
            <span>{i + 1}.</span>
            <a href={`#${sectionId(s.heading)}`} className="hover:text-[#A67539]">
              {s.heading}
            </a>
          </li>
        ))}
        <li className="flex gap-2 font-avenir text-[13px] leading-snug text-[#5A4A3B]">
          <span>{sections.length + 1}.</span>
          <a href="#reflection" className="hover:text-[#A67539]">
            A reflection to carry with you
          </a>
        </li>
      </ol>
    </nav>
  );
}

function ReflectionTeaser({ image, intro }) {
  return (
    <div className={`${paperCard} px-5 py-6 text-center`}>
      <Eyebrow className="text-[#2B2118]">
        A reflection
        <br />
        to carry with you
      </Eyebrow>
      <DiamondDivider className="mx-auto mb-4 mt-3 w-28" />
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={image} alt="" fill sizes="(min-width: 1024px) 220px, 100vw" className="object-cover" />
      </div>
      <p className="mt-4 text-left font-avenir text-[13px] leading-[1.6] text-[#5A4A3B]">{intro}</p>
      <a href="#reflection" className={`${goldButton} mt-5 w-full flex-col gap-1 px-4 text-[11px]`}>
        Explore the reflection <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function AdjacentNav({ slug }) {
  const { prev, next } = getAdjacent(slug);
  if (!prev && !next) return null;
  const item = (a, dir) => (
    <Link
      href={`${LIBRARY_PATH}/${a.slug}`}
      className={`group flex flex-col gap-1 border border-[#D9C5A8] px-5 py-4 transition-colors hover:border-[#A67539] ${dir === "next" ? "items-end text-right" : ""}`}
    >
      <span className="flex items-center gap-2 font-avenir text-[11px] font-semibold uppercase tracking-[2.5px] text-[#8A6A45]">
        {dir === "prev" && <ArrowLeft className="h-3.5 w-3.5" />}
        {dir === "prev" ? "Previous reflection" : "Next reflection"}
        {dir === "next" && <ArrowRight className="h-3.5 w-3.5" />}
      </span>
      <span className="font-cormorant text-[21px] leading-tight text-[#2B2118] group-hover:text-[#A67539]">{a.title}</span>
    </Link>
  );
  return (
    <nav aria-label="More reflections" className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {prev ? item(prev, "prev") : <span className="hidden sm:block" />}
      {next && item(next, "next")}
    </nav>
  );
}

// ─── Layouts ───

/** Text column with images / quotes floated beside the text (Journals 1, 2, 5) */
function InlineLayout({ article }) {
  const imagesFor = (key) => (article.inlineImages || []).filter((img) => img.section === key);
  const quotesFor = (i) => (article.asideQuotes || []).filter((q) => q.section === i);

  return (
    <div className="mt-8">
      <div className="flow-root">
        {imagesFor("intro").map((img) => (
          <FloatImage key={img.src} img={img} priority />
        ))}
        <RichText text={article.intro} dropCap />
      </div>

      {article.sections.map((s, i) => (
        <div key={s.heading} className="flow-root">
          <SectionHeading>{s.heading}</SectionHeading>
          {imagesFor(i).map((img) => (
            <FloatImage key={img.src} img={img} />
          ))}
          {quotesFor(i).map((q) => (
            <FloatQuote key={q.text} text={q.text} />
          ))}
          <RichText text={s.body} />
        </div>
      ))}

      <Signature />
      <div className="mt-10">
        <ReflectionBox reflection={article.reflection} image={article.images.reflection} />
      </div>
    </div>
  );
}

/** Wide feature image + right column with image card, contents and reflection card (Journals 3, 4, 6) */
function FeatureLayout({ article }) {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_260px]">
        <div className="min-w-0">
          <div className="relative mb-7 aspect-[2.4/1] overflow-hidden bg-[#2B2118]">
            <Image src={article.images.feature} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <RichText text={article.intro} dropCap />
          {article.sections.map((s) => (
            <div key={s.heading}>
              <SectionHeading>{s.heading}</SectionHeading>
              <RichText text={s.body} />
            </div>
          ))}
          <Signature />
        </div>

        <aside className="flex flex-col gap-6">
          <SideImageCard src={article.images.side} quote={article.sideQuote} />
          <Contents sections={article.sections} />
          <div className="lg:sticky lg:top-28">
            <ReflectionTeaser image={article.images.reflection} intro={article.reflection.intro} />
          </div>
        </aside>
      </div>

      <div className="mt-10">
        <ReflectionBox reflection={article.reflection} image={article.images.reflection} />
      </div>
    </div>
  );
}

export default function ArticleBody({ article }) {
  return (
    <>
      {article.layout === "feature" ? <FeatureLayout article={article} /> : <InlineLayout article={article} />}
      <AdjacentNav slug={article.slug} />
    </>
  );
}
