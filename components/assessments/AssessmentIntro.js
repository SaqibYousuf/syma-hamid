
"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    FileText,
    X,
} from "lucide-react";
import Image from "next/image";

export default function AssessmentIntro({ onBegin, onBack }) {
    return (
        <div className="relative flex min-h-full flex-col bg-[#141210]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                <Image
                    src="/images/assessment/modal_background.png"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 860px"
                    className="object-cover object-center opacity-50"
                />
            </div>

            <div className="relative z-10 flex flex-col px-4 py-5 sm:px-8 sm:py-8 md:px-10 md:py-9 lg:px-12 lg:py-10">
                {/* Header navigation */}
                <div className="mb-6 flex w-full items-center justify-between text-sm font-light text-[#C2BDB5] sm:mb-9">
                    <Button variant="ghost" onClick={onBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>

                    <DialogClose asChild>
                        <Button variant="ghost">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </DialogClose>
                </div>

                {/* Title and description */}
                <div className="mx-auto mb-7 w-full max-w-145 text-center sm:mb-10">
                    <span className="block font-avenir text-xs font-medium uppercase leading-relaxed tracking-[1.5px] text-[#FAF6EF]s sm:text-sm sm:tracking-[2px] md:text-[16.99px] md:tracking-[2.32px]">
                        Assessment
                    </span>

                    <h2 className="mb-4 font-cormorant text-[clamp(2rem,7vw,57.93px)] font-semibold leading-[1.12] tracking-normal text-[#FAF6EF]">
                        Identify Your Pattern
                    </h2>

                    <p className="mx-auto max-w-130 font-avenir text-sm font-normal leading-relaxed tracking-normal text-[#FAF6EF] sm:text-base sm:leading-[1.6] md:text-[21.63px] md:leading-[30.9px]">
                        What keeps repeating may be trying to tell you something.
                        This reflection helps you notice the thoughts, emotions and
                        behaviours that may sit beneath recurring experiences.
                    </p>
                </div>

                {/* Assessment details */}
                <div className="mb-7 grid grid-cols-3 border-y border-white/10 py-4 text-center sm:mb-9 sm:py-6">
                    <div className="flex min-w-0 flex-col items-center justify-center px-1 sm:px-3">
                        <FileText
                            className="mb-2 h-5 w-5 text-[#D1C9BC] sm:mb-3 sm:h-5.5 sm:w-5.5"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />

                        <span className="text-[10px] font-medium leading-snug text-[#F2EFE9] sm:text-sm">
                            12 Questions
                        </span>

                        <span className="mt-1 text-[8px] leading-relaxed text-[#9E978B] sm:text-[11px]">
                            (11 scored + 1 reflection)
                        </span>
                    </div>

                    <div className="flex min-w-0 flex-col items-center justify-center border-x border-white/10 px-1 sm:px-3">
                        <Clock
                            className="mb-2 h-5 w-5 text-[#D1C9BC] sm:mb-3 sm:h-5.5 sm:w-5.5"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />

                        <span className="text-[10px] font-medium leading-snug text-[#F2EFE9] sm:text-sm">
                            5–7 Minutes
                        </span>
                    </div>

                    <div className="flex min-w-0 flex-col items-center justify-center px-1 sm:px-3">
                        <CheckCircle2
                            className="mb-2 h-5 w-5 text-[#D1C9BC] sm:mb-3 sm:h-5.5 sm:w-5.5"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />

                        <span className="max-w-32.5 text-[10px] font-medium leading-snug text-[#F2EFE9] sm:text-sm">
                            Personalized insights
                        </span>
                    </div>
                </div>

                {/* Footer action */}
                <div className="flex justify-center">
                    <Button
                        type="button"
                        onClick={onBegin}
                        className="group inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-[#F4F1EA] px-5 py-3.5 text-sm font-medium text-[#1C1A17] shadow-lg transition-all duration-200 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] active:scale-[0.98] sm:w-auto sm:min-w-55 sm:px-9"
                    >
                        <span>Begin Assessment</span>

                        <ArrowRight
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
}
