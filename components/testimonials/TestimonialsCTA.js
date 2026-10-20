"use client";

import { ArrowRight } from "lucide-react";

export default function TestimonialsCTA() {
  return (
    <div className="pt-4 text-center">
      <p className="mb-1 font-cormorant text-lg font-semibold text-[#1C2E22] sm:text-2xl">
        If you are considering change work, know that you are not alone.
      </p>

      <p className="mb-6 font-avenir text-xs font-light text-[#1C2E22]/85 sm:text-sm">
        Change is possible - and it often begins with a conversation.
      </p>

      <button
        type="button"
        className="group inline-flex items-center gap-2.5 rounded-xl bg-[#223329] px-7 py-3.5 font-avenir text-xs font-medium text-[#F2EFE9] shadow-md transition-colors hover:bg-[#1C2E22] sm:text-sm"
      >
        <span>Work with Syma</span>

        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}