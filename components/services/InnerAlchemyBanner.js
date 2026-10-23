"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InnerAlchemyBanner() {
  return (
    <section className="w-full">
      <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden bg-[#1C2E22] px-5 py-12 text-center text-[#F3EFEA] sm:gap-8 sm:px-8 sm:py-16 lg:py-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/services/alchemy_bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-left"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="block font-avenir text-xs font-medium uppercase tracking-[0.2em] text-[#D6CEBF]">
             Now Introducing
          </span>

          <h2 className="font-cormorant text-3xl font-semibold text-[#F3EFEA] sm:text-4xl lg:text-5xl">
            Inner-Alchemy Sessions
          </h2>

          <p className="font-avenir text-sm leading-7 text-[#EABA7E] sm:text-base">
            A deeper, more intentional experience in transformation.
          </p>
        </div>

        {/* Button below the text */}
        <div className="relative z-10 w-full sm:w-auto">
          <Link href="/inner-alchemy">
          <Button
            type="button"
            className="cursor-pointer rounded-[12px] bg-white hover:bg-white px-8 py-6 font-avenir text-sm font-medium text-[#1C2E22]"
            >
            <span>Explore Inner-Alchemy</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Button>
            </Link>
        </div>
      </div>
    </section>
  );
}