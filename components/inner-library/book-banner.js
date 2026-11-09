import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { BOOK } from "./data/categories";
import { Eyebrow, goldButton } from "./ui";

/** "The Alchemy of Self" announcement strip (overlaps the hero) */
export default function BookBanner() {
  return (
    <section className="relative bg-gradient-to-br from-[#EADBC5] via-[#E6D3B9] to-[#D9C2A2]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 pb-12 sm:px-8 md:grid-cols-[220px_1fr] md:gap-10 lg:grid-cols-[250px_1fr_260px] lg:px-14">
        {/* Book cover — pulled up into the hero */}
        <div className="-mt-28 flex justify-center md:-mt-32 md:justify-start">
          <div className="relative w-[190px] sm:w-[210px] lg:w-[230px]">
            <Image
              src={BOOK.cover}
              alt={`${BOOK.title} by Dr. Syma Hamid — book cover`}
              width={189}
              height={288}
              sizes="230px"
              className="h-auto w-full shadow-[18px_24px_40px_-14px_rgba(25,15,5,0.75)]"
            />
          </div>
        </div>

        <div className="pt-0 md:pt-10">
          <Eyebrow>{BOOK.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-cormorant text-[40px] font-medium leading-[1.05] text-[#2B2118] sm:text-[52px]">{BOOK.title}</h2>
          <p className="mt-1 font-cormorant text-[22px] text-[#3A2C20] sm:text-[24px]">{BOOK.tagline}</p>
          <p className="mt-4 max-w-[560px] font-avenir text-[15px] leading-[1.7] text-[#4A3F35]">{BOOK.description}</p>
          <p className="mt-6 font-avenir text-[11px] font-semibold uppercase tracking-[3px] text-[#3A2C20]">
            Publication anticipated <span className="mx-1.5 text-[#A67539]">·</span> {BOOK.publication}
          </p>
          <Link href={BOOK.href} className={`${goldButton} mt-5`}>
            Learn more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="hidden items-center lg:flex">
          <div className="relative border-l border-[#A67539]/40 py-10 pl-10">
            <span className="absolute left-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-[#A67539]" aria-hidden="true" />
            <p className="font-cormorant text-[32px] italic leading-[1.2] text-[#3A2C20]">
              Real change
              <br />
              begins within.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
