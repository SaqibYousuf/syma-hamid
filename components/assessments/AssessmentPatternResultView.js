"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export default function PatternResultView({ profile, isOwn = false, onBack, onNext, nextLabel = "Explore Deeper Insights", showNext = true }) {
  const notices = profile.notices || [];
  const patternSteps = profile.pattern_steps || [];

  return (
    <div className="relative mx-auto flex min-h-full w-full flex-col overflow-hidden bg-[#121619] md:flex-row">
      {/* LEFT SECTION - Image & Quote Hero */}
      <div className="relative flex min-h-56 w-full flex-col justify-start p-6 text-[#E6E4DF] sm:min-h-72 sm:p-8 md:min-h-full md:w-[44%] md:flex-none lg:p-12">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/assessment/modal_background_4_right.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-black/40" />
        </div>

        {profile.quote && (
          <div className="relative z-10 max-w-sm pt-2 sm:pt-10">
            <blockquote className="font-cormorant text-2xl italic leading-snug tracking-wide text-[#F7F5F0] sm:text-3xl">
              &ldquo;{profile.quote}&rdquo;
            </blockquote>
          </div>
        )}
      </div>

      {/* RIGHT SECTION - Profile details */}
      <div className="relative flex w-full flex-col justify-between bg-[#EDE8DE] p-5 text-[#22211E] sm:p-10 md:w-[56%] md:flex-none">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <Image src="/images/assessment/modal_background_3_right.png" alt="" fill sizes="480px" className="object-cover mix-blend-overlay" />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-2 flex w-full items-center justify-between text-sm font-light text-[#1C2E22]">
            <Button variant="ghost" className="cursor-pointer px-0 hover:bg-transparent!" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <DialogClose className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#1C2E22] transition-colors hover:bg-[#1C2E22]/10" aria-label="Close">
              <X className="h-4 w-4" aria-hidden="true" />
            </DialogClose>
          </div>

          <div className="mb-6">
            <span className="mb-1 block font-cormorant text-xs font-medium uppercase tracking-[0.2em] text-[#6B655B]">
              {isOwn ? "Your Pattern" : "Pattern profile"}
            </span>
            <h1 className="font-cormorant text-3xl font-bold uppercase tracking-wide text-[#181D17] sm:text-4xl">{profile.title}</h1>
          </div>

          {profile.core_insight && (
            <div className="mb-6 border-b border-[#181D17]/10 pb-5">
              <h2 className="mb-1.5 font-avenir text-sm font-semibold text-[#181D17]">Core insight</h2>
              <p className="font-avenir text-[14px] font-medium leading-[21.94px] text-[#1C2E22BF]">{profile.core_insight}</p>
            </div>
          )}

          {notices.length > 0 && (
            <div className="mb-6 border-b border-[#181D17]/10 pb-5">
              <h2 className="mb-2.5 font-avenir text-sm font-semibold text-[#181D17]">You may notice</h2>
              <ul className="space-y-1.5 pl-1">
                {notices.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-avenir text-[14px] font-medium leading-[21.94px] text-[#1C2E22BF]">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#1C2E22BF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {patternSteps.length > 0 && (
            <div className="mb-6 border-b border-[#181D17]/10 pb-5">
              <h2 className="mb-2.5 font-avenir text-sm font-semibold text-[#181D17]">The pattern may look like:</h2>
              <div className="flex flex-wrap items-center gap-y-2">
                {patternSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="font-avenir text-[14px] font-medium leading-[21.94px] text-[#1C2E22BF]">{step}</span>
                    {idx < patternSteps.length - 1 && <ArrowRight className="mx-2 h-3.5 w-3.5 shrink-0 text-[#A67539]" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {profile.reflection && (
            <div className="mb-8">
              <h2 className="mb-1.5 font-avenir text-sm font-semibold text-[#181D17]">Reflection</h2>
              <p className="font-avenir text-[14px] leading-relaxed text-[#1C2E22BF]">{profile.reflection}</p>
            </div>
          )}

          {showNext && onNext && (
            <div className="mt-auto flex justify-end pt-2">
              <button
                type="button"
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#1A2E25] px-6 py-3 text-sm font-medium text-[#F2EFE9] shadow-md transition-colors hover:bg-[#14241D] sm:w-auto"
                onClick={onNext}
              >
                <span>{nextLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
