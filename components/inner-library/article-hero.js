import Image from "next/image";
import React from "react";
import { DiamondDivider } from "./ui";

/** Dark image band at the top of each article */
export default function ArticleHero({ image }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#140E08]">
      <div className="absolute inset-y-0 right-0 -z-20 w-full md:w-[74%]">
        <Image src={image} alt="" fill priority sizes="(min-width: 768px) 74vw, 100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#140E08] via-[#140E08]/75 to-transparent md:via-[#140E08]/40" />

      <div className="mx-auto flex min-h-[220px] max-w-[1440px] items-center px-5 py-12 sm:min-h-[260px] sm:px-8 lg:min-h-[300px] lg:px-14">
        <div>
          <p className="font-avenir text-sm font-medium uppercase tracking-[4px] text-[#F3E7D3] sm:text-base">The Inner Library</p>
          <DiamondDivider tone="light" className="my-4 w-44 sm:w-52" />
          <p className="font-cormorant text-[22px] leading-[1.3] text-[#F3E7D3] sm:text-[26px]">
            Ideas to question.
            <br />
            Perspectives to reconsider.
            <br />
            Truths to discover.
          </p>
        </div>
      </div>
    </section>
  );
}
