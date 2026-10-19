
"use client";

import {
    ArrowRight,
    CheckCircle2,
    Clock,
    FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AssessmentIntro({ onBegin }) {
    return (
        <>
            {/* Title and description */}
            <div className="mx-auto mb-8 w-full max-w-145 text-center sm:mb-10">
                <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.24em] text-[#A39E93] sm:text-xs">
                    Assessment
                </span>

                <h2 className="mb-4 font-cormorant text-[32px] font-semibold leading-[1.1] tracking-normal text-[#F9F6F0] sm:text-[40px] md:text-[48px]">
                    Identify Your Pattern
                </h2>

                <p className="mx-auto max-w-130 font-avenir text-[13px] font-normal leading-[1.8] text-[#B3ACA1] sm:text-[14px] md:text-[15px]">
                    What keeps repeating may be trying to tell you something.
                    This reflection helps you notice the thoughts, emotions and
                    behaviours that may sit beneath recurring experiences.
                </p>
            </div>

            {/* Assessment details */}
            <div className="mb-7 grid grid-cols-3 border-y border-white/10 py-5 text-center sm:mb-9 sm:py-6">
                <div className="flex flex-col items-center justify-center px-1 sm:px-3">
                    <FileText
                        className="mb-2 h-5 w-5 text-[#D1C9BC] sm:mb-3 sm:h-5.5 sm:w-5.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />

                    <span className="text-[11px] font-medium leading-snug text-[#F2EFE9] sm:text-sm">
                        12 Questions
                    </span>

                    <span className="mt-1 text-[9px] leading-relaxed text-[#9E978B] sm:text-[11px]">
                        (11 scored + 1 reflection)
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center border-x border-white/10 px-1 sm:px-3">
                    <Clock
                        className="mb-2 h-5 w-5 text-[#D1C9BC] sm:mb-3 sm:h-5.5 sm:w-5.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />

                    <span className="text-[11px] font-medium leading-snug text-[#F2EFE9] sm:text-sm">
                        5–7 Minutes
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center px-1 sm:px-3">
                    <CheckCircle2
                        className="mb-2 h-5 w-5 text-[#D1C9BC] sm:mb-3 sm:h-5.5 sm:w-5.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />

                    <span className="max-w-32.5 text-[11px] font-medium leading-snug text-[#F2EFE9] sm:text-sm">
                        Personalized insights
                    </span>
                </div>
            </div>

            {/* Footer action */}
            <div className="flex justify-center">
                <Button
                    type="button"
                    onClick={onBegin}
                    className="group inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-[#F4F1EA] px-7 py-3.5 text-sm font-medium text-[#1C1A17] shadow-lg transition-all duration-200 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] active:scale-[0.98] sm:w-auto sm:min-w-[220px] sm:px-9"
                >
                    <span>Begin Assessment</span>

                    <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                    />
                </Button>
            </div>
        </>
    );
}
