import Image from "next/image";
import Link from "next/link";
import React from "react";
import { StarIcon } from "../constants/icons";
import { ArrowRight } from "lucide-react";
import { BOOKING_HREF } from "../constants/site-links";

const goldLine =
  "h-[1px] w-[90px] border-[0.68px] border-solid [border-image-source:linear-gradient(90deg,#A67539_27.53%,rgba(166,117,57,0.2)_63.76%,rgba(166,117,57,0.5)_100%)] [border-image-slice:1] sm:w-[150px]";

function Hero() {
  return (
    <section className="relative flex min-h-[640px] w-full flex-col items-center justify-center px-4 py-14 md:px-6 lg:min-h-[600px] xl:min-h-[40vw] xl:py-10">
      <Image fill priority src="/images/alchemy-bg.png" alt="" sizes="100vw" className="object-cover object-[30%_center] xl:object-center" />
      <div className="absolute inset-0 bg-[#FBF8F3]/55 lg:hidden" />
      <div className="relative flex w-full max-w-[752px] flex-col items-start gap-4 py-6 sm:gap-[22px] lg:mr-[22%] lg:max-w-[600px] xl:mr-0 xl:max-w-[752px]">
        <p className="font-avenir text-sm font-medium uppercase leading-[100%] tracking-[2px] text-[#1C2E22] sm:text-lg sm:tracking-[3px] xl:text-[22px]">the signature experience</p>
        <h1 className="font-cormorant text-[48px] font-semibold uppercase leading-[0.95] text-[#1C2E22] sm:text-[64px] lg:text-[76px] xl:text-[94px] xl:leading-[84px]">
          inner alchemy sessions
        </h1>
        <p className="font-cormorant text-[32px] font-medium italic leading-[1.15] text-[#1C2E22] sm:text-[40px] xl:text-[48px] xl:leading-[55px]">Real change begins within</p>
        <div className="flex items-center gap-4 sm:gap-5">
          <div className={goldLine} />
          <StarIcon />
          <div className={goldLine} />
        </div>
        <p className="font-avenir text-base font-normal leading-[1.55] text-[#1C2E22] sm:text-xl xl:text-[25px] xl:leading-[36px]">
          A guided 60-minute deep-dive designed to help you understand the patterns beneath what you're experiencing, reframe limiting narratives, and move forward with greater clarity.
          </p>
        <Link
          href={BOOKING_HREF}
          className="flex items-center justify-center gap-[10px] rounded-2xl bg-[#223329] px-6 py-3 font-cormorant text-lg font-semibold capitalize leading-[32px] text-white transition-colors hover:bg-[#1C2E22]"
        >
          Begin your inner alchemy <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default Hero;
