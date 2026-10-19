"use client";

import Image from "next/image";

export default function NoteFromDrSymaSection() {
  return (
    <section className="relative flex min-h-90 w-full items-center justify-center px-5 py-14 text-center sm:min-h-[440px] sm:px-6 sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/about/landscape_lake.png"
          alt="Peaceful lake surrounded by hills and olive trees"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
        <span className="mb-2 inline-block text-[#1C2E22] font-avenir text-[16px] font-medium uppercase  drop-shadow-sm">
          A Note For You
        </span>
        <h2 className="mb-4 font-cormorant text-2xl font-semibold leading-[1.05] capitalize text-[#1c2e22] sm:mb-6 sm:text-4xl lg:text-[64px] lg:leading-[1.15]">
          A NOTE FROM Dr. SYMA
        </h2>
        <p className="mb-6 font-avenir text-[#1c2e22] text-[16px] font-normal">
          Therapy isn&apos;t about becoming someone else. It is about understanding yourself more deeply, questioning what no longer serves you, and creating the freedom to respond differently.
        </p>
        <span className="mb-2 inline-block text-[#1C2E22] font-avenir text-[16px] font-medium uppercase  drop-shadow-sm">
          Real change begins within.
        </span>
      </div>
    </section>
  );
}
