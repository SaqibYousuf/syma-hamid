"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export default function PatternProfilesView({ onBack, onShowResult }) {
    const profiles = [
        {
            title: "The Overthinker",
            description: "Runs scenarios, seeks reassurance, struggles to let go.",
            image: "/images/assessment/overthinker.png",
        },
        {
            title: "The Controller",
            description: "Feels safer with structure, finds it hard to be vulnerable.",
            image: "/images/assessment/controller.png",
        },
        {
            title: "The Protector",
            description: "Builds emotional walls, avoids getting hurt again.",
            image: "/images/assessment/protector.png",
        },
        {
            title: "The Over-Adapter",
            description: "Prioritizes others' needs, loses sight of their own.",
            image: "/images/assessment/adapter.png",
        },
    ];

    return (
        <div className="relative mx-auto flex min-h-full w-full flex-col overflow-hidden rounded-3xl bg-[#121619] shadow-2xl md:flex-row">

            {/* LEFT SECTION - Dark Hero Side */}
            <div className="relative flex w-full flex-col justify-center p-8 text-[#E6E4DF] md:w-[44%] md:flex-none lg:p-12">
                {/* Background Image with Dark Gradient Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    <Image
                        src="/images/assessment/modal_backgroung_3.png"
                        alt="Hero Background"
                        fill
                        priority
                        className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0d1013]/90 via-[#121619]/60 to-[#121619]/40" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-md">
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F2EFE9] mb-6 leading-tight">
                        The other pattern profiles
                    </h1>
                    <p className="text-sm sm:text-base text-[#B0AAA0] leading-relaxed font-light">
                        Each pattern reflects a different way of navigating relationships. You may see elements of more than one profile.
                    </p>
                </div>
            </div>

            {/* RIGHT SECTION - Light Card Content Side */}
            <div className="relative flex w-full flex-col justify-between bg-[#EDE8DE] p-6 text-[#22211E] md:w-[56%] md:flex-none sm:p-10">

                {/* Subtle Background Texture Layer */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <Image
                        src="/images/assessment/modal_background_3_right.png"
                        alt="Texture background"
                        fill
                        className="object-cover mix-blend-overlay"
                    />
                </div>

                <div className="relative z-10 flex flex-col h-full">
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

                    {/* Profiles Cards Stack */}
                    <div className="flex flex-col gap-3.5 my-auto">
                        {profiles.map((profile, index) => (
                            <div
                                key={index}
                                className="cursor-pointer flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#E2DCD0]/70 border border-[#2C332B]/10 hover:border-[#2C332B]/20 hover:bg-[#E2DCD0] transition-all group shadow-sm"
                                onClick={onShowResult}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Thumbnail Image */}
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#2C332B]/15">
                                        <Image
                                            src={profile.image}
                                            alt={profile.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Profile Info */}
                                    <div className="flex flex-col">
                                        <h3 className="font-serif text-base sm:text-lg text-[#1F241E] font-medium leading-snug">
                                            {profile.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#5C574F] font-light leading-normal">
                                            {profile.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow Action */}
                                <ArrowRight className="w-4 h-4 text-[#2C332B] shrink-0 ml-2 transition-transform group-hover:translate-x-1 opacity-80" />
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
}