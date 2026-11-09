import Image from "next/image";
import React from "react";
import { DiamondDivider } from "./ui";

/** Top banner of /inner-library */
export default function LibraryHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#140E08]">
      <div className="absolute inset-y-0 right-0 -z-20 w-full md:w-[68%]">
        <Image src="/images/inner-library/hero.jpg" alt="" fill priority sizes="(min-width: 768px) 68vw, 100vw" className="object-cover object-center" />
      </div>
      {/* fade image into the dark left side */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#140E08] via-[#140E08]/85 to-[#140E08]/10 md:via-[#140E08]/70 md:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[#140E08]/70 to-transparent" />

      <div className="mx-auto max-w-[1440px] px-5 pb-36 pt-16 sm:px-8 md:pb-40 md:pt-20 lg:px-14 lg:pb-44 lg:pt-24">
        <div className="max-w-[560px]">
          <p className="font-cormorant text-[44px] italic leading-none text-[#D9B077] sm:text-[56px]">The</p>
          <h1 className="font-cormorant text-[56px] font-medium leading-[0.95] text-[#F3E7D3] sm:text-[76px] lg:text-[92px]">Inner Library</h1>
          <DiamondDivider tone="light" className="my-6 w-60 sm:w-72" />
          <p className="font-cormorant text-[24px] leading-[1.3] text-[#F3E7D3] sm:text-[28px]">
            Ideas to question. Perspectives to reconsider.
            <br />
            Truths to discover.
          </p>
          <p className="mt-5 max-w-[440px] font-avenir text-[15px] leading-[1.7] text-[#E4D5BE]/90 sm:text-base">
            A space for reflections on the mind, emotional patterns, self-awareness and the art of transformation.
          </p>
        </div>
      </div>
    </section>
  );
}
