"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import SmartImage from "@/components/constants/smart-image";

export default function PatternProfilesView({ profiles = [], onBack, onSelect }) {
  return (
    <div className="relative mx-auto flex min-h-full w-full flex-col overflow-hidden bg-[#121619] md:flex-row">
      {/* LEFT SECTION */}
      <div className="relative flex w-full flex-col justify-center p-6 text-[#E6E4DF] sm:p-8 md:w-[44%] md:flex-none lg:p-12">
        <div className="pointer-events-none absolute inset-0">
          <Image src="/images/assessment/modal_backgroung_3.png" alt="" fill priority sizes="(max-width: 768px) 100vw, 380px" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0d1013]/90 via-[#121619]/60 to-[#121619]/40" />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="mb-4 font-cormorant text-3xl font-normal leading-tight text-[#F2EFE9] sm:mb-6 sm:text-4xl md:text-5xl">
            The other pattern profiles
          </h1>
          <p className="text-sm font-light leading-relaxed text-[#B0AAA0] sm:text-base">
            Each pattern reflects a different way of navigating relationships. You may see elements of more than one profile.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
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

          <div className="my-auto flex flex-col gap-3.5 py-2">
            {profiles.map((profile) => (
              <button
                type="button"
                key={profile.id}
                className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-[#2C332B]/10 bg-[#E2DCD0]/70 p-3.5 text-left shadow-sm transition-all hover:border-[#2C332B]/20 hover:bg-[#E2DCD0] sm:p-4"
                onClick={() => onSelect(profile)}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#2C332B]/15 bg-[#d8d0c1]">
                    {profile.image && <SmartImage src={profile.image} alt={profile.title} fill sizes="48px" className="object-cover" />}
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <h3 className="font-cormorant text-base font-semibold leading-snug text-[#1F241E] sm:text-lg">{profile.title}</h3>
                    {profile.short_description && (
                      <p className="text-xs font-light leading-normal text-[#5C574F] sm:text-sm">{profile.short_description}</p>
                    )}
                  </div>
                </div>
                <ArrowRight className="ml-2 h-4 w-4 shrink-0 text-[#2C332B] opacity-80 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
