
"use client";

import Image from "next/image";

export default function AboutIntroSection() {
  return (
    <section className="relative w-full min-h-150 overflow-hidden bg-[#FAF8F5] sm:min-h-162.5 lg:min-h-175">
      {/* Full-section background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about/dr_syma_portrait.png"
          alt="Dr. Syma Portrait"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%] sm:object-center"
        />

        {/* Overlay for text readability */}
       
      </div>

      {/* Right 50% content, vertically centered */}
      <div className="relative z-10 mx-auto flex min-h-150 w-full max-w-7xl items-center justify-end px-5 py-12 sm:min-h-162.5 sm:px-8 lg:min-h-175 lg:px-16 xl:px-20">
        <div className="w-full px-4 text-white sm:px-0 lg:w-1/2">
          <h1 className="mb-5 font-cormorant text-3xl text-[#1c2e22] font-semibold leading-[1.05] capitalize sm:mb-6 sm:text-5xl lg:text-[80px] lg:leading-21">
            About Me
          </h1>

          <div className="space-y-4 font-avenir text-sm font-normal leading-relaxed text-white sm:text-base sm:leading-7 lg:text-[25px] lg:leading-9">
            <p className="font-avenir text-[20px] font-medium leading-9 tracking-normal text-[#1c2e22]">
              I have always been fascinated by the complexity of the human
              mind—the way we think, interpret, feel and respond.
            </p>

            <p className="font-avenir text-[#1c2e22] text-[16px] font-normal">
              As a psychologist, systemic therapist and licensed
              Neuro-Linguistic Programming (NLP) practitioner, I feel
              privileged to accompany people as they navigate their own
              journeys of transformation. My practice is grounded in honesty,
              empathy and genuine human connection. I believe that feeling
              seen, heard and understood is an essential part of meaningful
              therapeutic work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
