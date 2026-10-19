"use client";

import Image from "next/image";

export default function AboutApproachSection() {
  return (
    <section className="relative min-h-150 w-full overflow-hidden bg-[#F3EFEA] sm:min-h-162.5 lg:min-h-175">
      {/* Full-section background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about/books_decor.png"
          alt="Therapeutic desk with books and bowl"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Left-aligned text */}
      <div className="relative z-10 mx-auto flex min-h-150 w-full max-w-7xl items-center px-5 py-12 sm:min-h-162.5 sm:px-8 lg:min-h-175 lg:px-16 xl:px-20">
        <div className="w-full max-w-xl lg:w-1/2 pl-2 pr-2">
          <h2 className="mb-5 font-cormorant text-3xl text-[#1c2e22] font-semibold leading-[1.05] capitalize sm:mb-6 sm:text-5xl lg:text-[80px] lg:leading-21">
            My Approach
          </h2>

          <div className="space-y-4 text-sm font-light leading-relaxed text-[#1c2e22] sm:text-base sm:leading-7 lg:text-lg">
            <p className="font-avenir text-[20px] font-medium leading-9 tracking-normal text-[#1c2e22]">
              My orientation is primarily cognitive-based, which means my sessions are
              conversational, pragmatic and focused on the present.
            </p>

            <p className="font-avenir text-[#1c2e22] text-[18px] font-normal">
              Together, we explore the patterns, beliefs and interpretations that may be
              shaping your experience. During the assessment process, we establish clear
              therapeutic goals and collaboratively identify approaches that are meaningful
              and practical for you. My intention is not simply to help you understand what
              is happening, but to help you develop the insight and perspective needed to
              respond differently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}