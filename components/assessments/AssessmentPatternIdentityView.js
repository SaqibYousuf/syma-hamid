"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X, Sparkles } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/** Splits "Your pattern is not your identity." style titles into two lines like the design */
function TitleLines({ title }) {
  const match = title.match(/^(your pattern)\s+(.*)$/i);
  if (!match) return title;
  return (
    <>
      {match[1].replace(/^./, (c) => c.toUpperCase())} <br />
      <span className="font-light italic">{match[2]}</span>
    </>
  );
}

export default function PatternIdentityView({ closing = {}, onBack, onExplore }) {
  const paragraphs = (closing.text || "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="relative flex min-h-full w-full flex-col justify-between overflow-hidden bg-[#ECE7DC] p-5 text-[#22211E] sm:p-10">
      <div className="pointer-events-none absolute inset-0">
        <Image src="/images/assessment/modal_background_full_1.png" alt="" fill sizes="860px" className="object-cover opacity-30 mix-blend-multiply" />
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

        <div className="my-auto flex flex-col items-center justify-between gap-8 py-4 md:flex-row">
          <div className="w-full max-w-lg flex-1">
            {closing.title && (
              <h1 className="mb-6 font-cormorant text-3xl font-normal leading-[1.15] text-[#1B221B] sm:text-4xl md:text-5xl">
                <TitleLines title={closing.title} />
              </h1>
            )}

            {paragraphs.length > 0 && (
              <div className="mb-8 space-y-4 text-sm font-light leading-relaxed text-[#4D483F] sm:text-base">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {closing.reflection && (
              <div className="rounded-2xl border border-[#2C332B]/10 bg-[#E2DACB]/80 p-5 shadow-sm sm:p-6">
                <div className="mb-2 flex items-center gap-2 text-[#2C332B]">
                  <Sparkles className="h-4 w-4 text-[#8C7A5B]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7A5B]">Final reflection</span>
                </div>
                <p className="text-sm font-medium leading-snug text-[#22211E] sm:text-base">{closing.reflection}</p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1A2E25] px-6 py-3 text-sm font-medium text-[#F2EFE9] shadow-md transition-colors hover:bg-[#14241D]"
              >
                Book an appointment <ArrowRight className="h-4 w-4" />
              </Link>
              {onExplore && (
                <button
                  type="button"
                  onClick={onExplore}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#1A2E25]/30 px-6 py-3 text-sm font-medium text-[#1A2E25] transition-colors hover:bg-[#1A2E25]/5"
                >
                  Explore other profiles
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
