
"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export default function PatternResultView({ onBack, onShowResult }) {
  const notices = [
    "Replaying conversations",
    "Searching for explanations",
    "Second-guessing yourself",
    "Difficulty leaving things unresolved",
  ];

  const patternSteps = [
    "Trigger",
    "Questioning",
    "Overthinking",
    "Exhaustion",
    "More questioning",
  ];

  return (
    <div className="relative mx-auto flex min-h-full w-full flex-col overflow-hidden rounded-3xl bg-[#121619] shadow-2xl md:flex-row">
      {/* LEFT SECTION - Image & Quote Hero */}
      <div className="relative flex min-h-75 w-full flex-col justify-start p-8 text-[#E6E4DF] md:min-h-full md:w-[44%] md:flex-none lg:p-12">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/assessment/modal_background_4_right.png"
            alt="Person sitting by the ocean"
            fill
            priority
            className="object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-black/40" />
        </div>

        {/* Inspirational Quote Header */}
        <div className="relative z-10 max-w-sm pt-6 sm:pt-10">
          <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#F7F5F0] leading-snug tracking-wide">
            &ldquo;You are not too much. You are just used to carrying more than you should&rdquo;
          </blockquote>
        </div>
      </div>

      {/* RIGHT SECTION - Light Profile Insight Details Panel */}
      <div className="relative flex w-full flex-col justify-between bg-[#EDE8DE] p-6 text-[#22211E] md:w-[56%] md:flex-none sm:p-10">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Image
            src="/images/assessment/modal_background_3_right.png"
            alt="Texture background"
            fill
            className="object-cover mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          {/* Header Bar */}
          <div className="mb-2 flex w-full items-center justify-between text-sm font-light  text-[#1C2E22] sm:mb-2">
            <Button variant="ghost" className="hover:bg-transparent! cursor-pointer" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <DialogClose className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm transition-colors text-[#1C2E22] ">
              <X className="h-4 w-4" aria-hidden="true" />
            </DialogClose>
          </div>

          {/* Profile Header */}
          <div className="mb-6">
            <span className="mb-1 font-cormorant block text-xs font-medium uppercase tracking-[0.2em] text-[#6B655B]">
              Your Pattern
            </span>
            <h1 className="font-cormorant text-3xl font-bold tracking-wide text-[#181D17] sm:text-4xl">
              THE OVERTHINKER
            </h1>
          </div>

          {/* Core Insight */}
          <div className="mb-6 border-b border-[#181D17]/10 pb-5">
            <h2 className="mb-1.5 font-avenir text-sm font-semibold text-[#181D17]">
              Core insight
            </h2>
            <p className="text-[#1C2E22BF] font-avenir text-[14px] font-medium leading-[21.94px] tracking-normal">
              You may be trying to find certainty through understanding.
            </p>
          </div>

          {/* You May Notice List */}
          <div className="mb-6 border-b border-[#181D17]/10 pb-5">
            <h2 className="mb-2.5 text-[14px] font-avenir text-sm font-semibold text-[#181D17]">
              You may notice
            </h2>
            <ul className="space-y-1.5 pl-1">
              {notices.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[#1C2E22BF] font-avenir text-[14px] font-medium leading-[21.94px] tracking-normal"
                >
                  <span className="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#1C2E22BF]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The Pattern Flow */}
          <div className="mb-6 border-b border-[#181D17]/10 pb-5">
            <h2 className="mb-2.5 text-sm font-semibold text-[#181D17]">
              The pattern may look like:
            </h2>
            <div className="flex flex-wrap items-center gap-y-2 text-xs font-light text-[#4E483E] sm:text-sm">
              {patternSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-[#1C2E22BF] font-avenir text-[14px] font-medium leading-[21.94px] tracking-normal">
                    {step}
                  </span>
                  {idx < patternSteps.length - 1 && (
                    <ArrowRight className="mx-2 h-3.5 w-3.5 shrink-0 text-[#A67539]" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Reflection Question */}
          <div className="mb-8">
            <h2 className="mb-1.5 text-sm font-semibold text-[#181D17]">
              Reflection
            </h2>
            <p className="leading-relaxed text-[#1C2E22BF] font-avenir text-[14px]">
              What would happen if you didn&apos;t need to understand everything before allowing yourself to move forward?
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-auto flex justify-end pt-2">
            <button
              type="button"
              className="group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#1A2E25] px-6 py-3 text-xs font-medium text-[#F2EFE9] shadow-md transition-colors hover:bg-[#14241D] sm:text-sm"
              onClick={onShowResult}
            >
              <span>Explore Deeper Insights</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
