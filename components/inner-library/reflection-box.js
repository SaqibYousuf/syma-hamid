import Image from "next/image";
import React from "react";
import { DiamondDivider, StarBullet } from "./ui";

/** "A Reflection to Carry With You" block at the end of each article */
export default function ReflectionBox({ reflection, image }) {
  return (
    <section
      id="reflection"
      aria-labelledby="reflection-title"
      className="grid scroll-mt-28 grid-cols-1 overflow-hidden border border-[#D9C5A8] bg-gradient-to-br from-[#EFE2CF] via-[#E9D9C2] to-[#E2CFB5] shadow-[0_14px_36px_-22px_rgba(70,45,20,0.6)] md:grid-cols-[minmax(220px,36%)_1fr]"
    >
      <div className="relative min-h-[220px]">
        <Image src={image} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
      </div>
      <div className="px-6 py-7 sm:px-8">
        <h2 id="reflection-title" className="font-cormorant text-[28px] font-medium leading-tight text-[#2B2118]">
          {reflection.title}
        </h2>
        <p className="mt-1.5 font-avenir text-[15px] leading-[1.6] text-[#4A3F35]">{reflection.intro}</p>
        <ul className="mt-4 space-y-2">
          {reflection.questions.map((q) => (
            <li key={q} className="flex items-start gap-3 font-avenir text-[15px] leading-[1.55] text-[#4A3F35]">
              <StarBullet className="mt-[6px]" />
              <span>{q}</span>
            </li>
          ))}
        </ul>
        {reflection.outro?.map((p) => (
          <p key={p} className="mt-4 font-cormorant text-[19px] italic leading-[1.45] text-[#5A3E22]">
            {p}
          </p>
        ))}
        <DiamondDivider className="mt-6" />
      </div>
    </section>
  );
}
