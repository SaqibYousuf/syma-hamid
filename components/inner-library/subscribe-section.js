"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { DiamondDivider, Eyebrow } from "./ui";

/**
 * "Be part of the journey" newsletter strip.
 * TODO: connect `handleSubmit` to your mailing list / API (no backend exists for this yet).
 */
export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // e.g. await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) })
    setSent(true);
  };

  return (
    <section id="subscribe" className="relative isolate scroll-mt-24 overflow-hidden bg-[#140E08]">
      <Image src="/images/inner-library/hero.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#140E08] via-[#140E08]/90 to-[#140E08]/70" />

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 md:py-16 lg:grid-cols-2 lg:px-14">
        <div>
          <Eyebrow className="text-[#D9B077]">Stay connected</Eyebrow>
          <h2 className="mt-3 font-cormorant text-[38px] font-medium leading-[1.1] text-[#F3E7D3] sm:text-[46px]">Be part of the journey.</h2>
          <p className="mt-3 max-w-[420px] font-avenir text-[15px] leading-[1.7] text-[#E4D5BE]/90 sm:text-base">
            Receive new reflections and updates on The Alchemy of Self as publication approaches.
          </p>
        </div>

        <div>
          {sent ? (
            <p className="border border-[#D9B077]/50 px-5 py-4 font-cormorant text-[22px] italic text-[#F3E7D3]">
              Thank you — you&apos;ll hear from us as new reflections arrive.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col border border-[#D9B077]/45 sm:flex-row">
              <label htmlFor="il-email" className="sr-only">
                Your email address
              </label>
              <input
                id="il-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-5 py-4 font-avenir text-[15px] text-[#F3E7D3] outline-none placeholder:text-[#E4D5BE]/60"
              />
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center justify-center gap-3 bg-gradient-to-b from-[#E2BC85] to-[#C99A5B] px-8 py-4 font-avenir text-xs font-semibold uppercase tracking-[2.5px] text-[#2B2118] transition hover:from-[#D9AF74] hover:to-[#B9884A]"
              >
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
          <DiamondDivider tone="light" className="mx-auto mt-8 w-56" />
          <p className="mt-4 text-center font-cormorant text-[20px] italic text-[#D9B077]">&ldquo;A more conscious you. A more meaningful tomorrow.&rdquo;</p>
          <p className="mt-1 text-center font-avenir text-[10px] font-semibold uppercase tracking-[3px] text-[#E4D5BE]/70">Dr. Syma Hamid</p>
        </div>
      </div>
    </section>
  );
}
