import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FAQ_IMAGES } from "./faq-data";

/* Small decorative star constellation, like the design */
function Constellation({ className = "" }) {
  return (
    <svg viewBox="0 0 220 120" fill="none" className={className} aria-hidden>
      <g stroke="#A8875A" strokeWidth="0.8" opacity="0.7">
        <path d="M20 90 L70 55 L120 70 L165 30 L205 48" />
        <path d="M70 55 L95 20" />
      </g>
      {[
        [20, 90, 2],
        [70, 55, 2.5],
        [120, 70, 2],
        [165, 30, 3],
        [205, 48, 2],
        [95, 20, 1.6],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#A8875A" />
      ))}
      <path
        d="M165 18 L167 28 L177 30 L167 32 L165 42 L163 32 L153 30 L163 28 Z"
        fill="#A8875A"
        opacity="0.9"
      />
    </svg>
  );
}

export default function FaqCta({ href = "/contact" }) {
  return (
    <div className="relative overflow-hidden border-t border-[#DCD3C3] bg-[#EFE9DE]">
      <Image
        src={FAQ_IMAGES.cta}
        alt=""
        fill
        sizes="100vw"
        className="object-cover mix-blend-multiply"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-16 lg:py-16">
        <div className="pl-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#223329]/80">
            Still have a question?
          </p>
          <h2 className="mt-3 font-cormorant text-3xl font-medium leading-tight text-[#223329] sm:text-4xl">
            Begin with a conversation.
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-[#575147]">
            If your question isn&apos;t answered here, you are welcome to get in touch.
          </p>
        </div>

        <Link
          href={href}
          className="inline-flex h-12 w-fit shrink-0 items-center gap-2.5 rounded-full bg-[#223329] px-7 text-sm font-medium uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-[#2E4437]"
        >
          Book an appointment
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}