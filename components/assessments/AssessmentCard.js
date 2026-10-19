"use client";
import Image from "next/image";
import { ClipboardList, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
function AssessmentCard({ assessment, handleClick }) {
    return (
        <article className="group flex min-w-0 flex-col overflow-hidden rounded-md border border-[#ded3bf] bg-[#f0e9dc]/80 transition duration-300 hover:-translate-y-1 hover:border-[#b5bba8] hover:shadow-md">
            {/* Card Image */}
            <div className="relative aspect-[1.8/1] overflow-hidden bg-[#e6dfd2]">
                <Image
                    src={assessment.image}
                    alt={assessment.title}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-2 sm:p-2.5">
                <span className="mb-2 font-cormorant text-[20px] leading-[130%] font-bold tracking-normal text-[#6c6b5d]">
                    {assessment.id}
                </span>

                <h3 className="font-cormorant text-[20px] font-bold leading-[130%] tracking-normal text-[#1C2E22]">
                    {assessment.title}
                </h3>

                <p className="mt-1.5 font-avenir text-[14px] font-normal leading-[135%] tracking-normal text-[#1C2E22]">
                    {assessment.description}
                </p>

                <div className="mt-auto">
                    <div className="my-2 flex w-full flex-wrap items-start gap-x-0 gap-y-1 border-t border-[#ded3bf] pt-2 text-[8px] text-[#666456] sm:text-[9px]">
                        <span className="flex w-1/2 flex-col items-start gap-1 font-avenir text-[10px] font-medium leading-[11.34px] tracking-normal">
                            <ClipboardList
                                className="h-3 w-3 shrink-0"
                                color="#A67539"
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />
                            <span>{assessment.questions} Questions</span>
                        </span>

                        <span className="flex w-1/2 flex-col items-start gap-1 font-avenir text-[10px] font-medium leading-[12.43px] tracking-normal">
                            <Clock
                                className="h-3 w-3 shrink-0"
                                color="#A67539"
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />
                            <span>{assessment.duration}</span>
                        </span>
                    </div>

                    <Button
                        type="button"
                        variant="link"
                        size="xs"
                        onClick={() => handleClick(assessment.id)}
                        className="group cursor-pointer gap-1 rounded-none border-b border-transparent pb-0.5 text-[9px] font-medium text-[#293a30] transition hover:border-[#293a30] hover:border-t-0 hover:border-l-0 hover:border-r-0 hover:no-underline sm:text-[10px]"
                    >
                        Begin reflection
                        <span
                            aria-hidden="true"
                            className="transition-transform group-hover/button:translate-x-1"
                        >
                            →
                        </span>
                    </Button>
                </div>
            </div>
        </article>
    );
}
export default AssessmentCard;