import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "../constants/container";
import { ArrowRight } from "lucide-react";
import { BOOKING_HREF } from "../constants/site-links";

function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center ">
      <Image
        src="/images/hero-bg.png"
        alt="Dr. Syma Hamid"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center] lg:object-center"
      />
      {/* Keeps text readable on smaller screens where the photo sits behind it */}
      <div className="absolute inset-0 bg-linear-to-r from-[#FBF8F3]/95 via-[#FBF8F3]/80 to-[#FBF8F3]/10 lg:hidden" />

      <div className="relative w-full">
        <Container className="py-12 lg:py-16 xl:py-20">
          <div className="flex w-full max-w-[752px] flex-col items-start gap-4 py-2 sm:gap-[22px] lg:max-w-[600px] xl:max-w-[752px]">
            <p className="font-avenir text-sm font-medium uppercase leading-[1.3] tracking-[2px] text-[#1C2E22] sm:text-lg sm:tracking-[3px] xl:text-[22px]">
              Deeper insight. Lasting change
            </p>
            <h1 className="font-cormorant text-[48px] font-semibold capitalize leading-[0.95] text-[#1C2E22] sm:text-[64px] lg:text-[72px] xl:text-[94px] xl:leading-[84px]">
              Real change <br/>begins within
            </h1>
            <p className="font-avenir text-base font-normal leading-[1.55] text-[#1C2E22] sm:text-xl xl:text-[25px] xl:leading-[36px]">
              Gravitate towards authenticity, transform what no longer serves you
            </p>
            <Link
              href={BOOKING_HREF}
              className="flex items-center justify-center gap-[10px] rounded-2xl bg-[#223329] px-6 py-3 font-cormorant text-lg font-semibold leading-[32px] text-white transition-colors hover:bg-[#1C2E22]"
            >
             Begin your journey <ArrowRight />
            </Link>
          </div>
        </Container>
      </div>

      <div className="absolute right-[2%] hidden border-b border-[#D4A453] xl:block">
        <p className="font-cormorant text-[48px] font-medium italic leading-[55px] text-[#FAF6EF]">
          Real change <br />
          begins within
        </p>
      </div>
    </section>
  );
}

export default Hero;
