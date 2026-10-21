
"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

export const testimonials = [
    {
        text: "It’s been an absolutely life-changing experience to have Dr. Syma as my therapist for the last three years. During my life changing decisions and anxiety, Dr. Syma always found a way to understand the deeper problems and help me find a solution. I always felt a sense of clarity and confidence after speaking to her...",
        name: "Haseeb Ali - 35 - Italy",
        type: "INDIVIDUAL THERAPY CLIENT",
    },
    {
        text: "When I started therapy, I couldn’t see a way through my own patterns. Working with her changed that. She doesn’t just listen; she challenges my perspective in a way that helps me actually see myself more clearly. Session by session, Dr. Syma has helped me set boundaries I didn’t know I was allowed to have. I feel more like myself than...",
        name: "Sundus W - Pakistan",
        type: "INDIVIDUAL THERAPY CLIENT",
    },
    {
        text: "I once listened to Dr. Syma say that faith, cannot be explained, it can only be experienced by each individual subjectively. Similarly, my experience with her in these past 7 years cannot be simply put into words. Her words and presence have taken many forms for me at various stages of my life; she has been a guide, a mentor, an...",
        name: "EFJ 24 - France",
        type: "INDIVIDUAL THERAPY CLIENT",
    },
];
export default function TestimonialCarousel() {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="mx-auto w-full px-5 sm:px-6"
        >
            <CarouselContent className="-ml-6 py-4">
                {testimonials.map((item, idx) => (
                    <CarouselItem
                        key={idx}
                        className="pl-6 md:basis-1/2 lg:basis-1/3"
                    >
                        <div className="flex h-full flex-col justify-between rounded-3xl border border-white/50 bg-[#FAF7F2]/90 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md sm:p-7">
                            <div>
                                {/* Quote */}
                                <Image
                                    src="/images/testimonials/Vector.svg"
                                    alt=""
                                    width={85}
                                    height={62}
                                    className="mb-3 h-auto w-8"
                                />

                                {/* Testimonial */}
                                <p className="mb-3 font-avenir text-xs font-light leading-relaxed text-[#1C2E22]/90 sm:text-sm">
                                    {item.text}
                                </p>
                            </div>
                            <div className="h-0 w-16.5 border-t-2 border-[#A67539]" />

                            {/* Author */}
                            <div className=" pt-3">
                                <h4 className="font-cormorant text-base font-semibold text-[#1C2E22]">
                                    {item.name}
                                </h4>

                                <span className="mt-0.5 block font-avenir text-[10px] font-medium tracking-wider text-[#1C2E22]/70">
                                    {item.type}
                                </span>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Previous */}
            <CarouselPrevious className="left-0 border-white/60 bg-[#FAF7F2]/90 text-[#1C2E22] shadow-md hover:bg-white sm:-left-1" />

            {/* Next */}
            <CarouselNext className="right-0 border-white/60 bg-[#FAF7F2]/90 text-[#1C2E22] shadow-md hover:bg-white sm:-right-1" />
        </Carousel>
    );
}