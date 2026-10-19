"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, X, Sparkles } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PatternIdentityView({ onBack }) {
    return (
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl bg-[#ECE7DC] p-6 text-[#22211E] shadow-2xl sm:p-10">
            {/* Background Subtle Gradient & Watercolor Blends */}
            <div className="pointer-events-none absolute inset-0">
                <Image
                    src="/images/assessment/modal_background_full_1.png"
                    alt="Texture background"
                    fill
                    className="object-cover opacity-30 mix-blend-multiply"
                />
            </div>

            <div className="relative z-10 flex h-full flex-col">
                {/* Header Navigation */}
                <div className="mb-2 flex w-full items-center justify-between text-sm font-light  text-[#1C2E22] sm:mb-2">
                    <Button variant="ghost" className="hover:bg-transparent! cursor-pointer" onClick={onBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>

                    <DialogClose className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm transition-colors text-[#1C2E22] ">
                        <X className="h-4 w-4" aria-hidden="true" />
                    </DialogClose>
                </div>

                {/* Main Content Layout */}
                <div className="my-auto flex flex-col items-center justify-between gap-8 md:flex-row">
                    {/* LEFT SIDE: Text & Reflection Box */}
                    <div className="w-full max-w-lg flex-1">
                        {/* Main Title */}
                        <h1 className="mb-6 font-serif text-3xl font-normal leading-[1.15] text-[#1B221B] sm:text-4xl md:text-5xl">
                            Your Pattern <br />
                            <span className="font-light italic">
                                is not your identity.
                            </span>
                        </h1>

                        {/* Description Paragraphs */}
                        <div className="mb-8 space-y-4 text-sm font-light leading-relaxed text-[#4D483F] sm:text-base">
                            <p>
                                A pattern is something you have learned. It is not who you are.
                            </p>

                            <p>
                                Patterns often develop for understandable reasons. They may
                                once have helped you cope, protect yourself, maintain
                                relationships or navigate difficult experiences.
                            </p>

                            <p>
                                What has been learned can be understood, questioned and changed.
                            </p>
                        </div>

                        {/* Final Reflection Box */}
                        <div className="rounded-2xl border border-[#2C332B]/10 bg-[#E2DACB]/80 p-5 shadow-sm sm:p-6">
                            <div className="mb-2 flex items-center gap-2 text-[#2C332B]">
                                <Sparkles className="h-4 w-4 text-[#8C7A5B]" />

                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7A5B]">
                                    FINAL REFLECTION
                                </span>
                            </div>

                            <p className="text-sm font-medium leading-snug text-[#22211E] sm:text-base">
                                What keeps repeating in your life &ndash; and what might it be
                                asking you to understand?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}