import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "../constants/container";
import { ArrowRight } from "lucide-react";
import { BOOKING_HREF } from "../constants/site-links";

const stepsData = [
  { icon: "/images/la_brain.svg", title: "ARRIVE", desc: "A safe, supportive space to be yourself." },
  { icon: "/images/explore.svg", title: "EXPLORE", desc: "We go beneath the surface." },
  { icon: "/images/brain.svg", title: "UNDERSTAND", desc: "Patterns, beliefs and triggers." },
  { icon: "/images/reframe.svg", title: "REFRAME", desc: "New perspectives, new possibilities." },
  { icon: "/images/forward.svg", title: "MOVE FORWARD", desc: "With clarity, confidence and a practical plan." },
];

function HowWork() {
  return (
    <section id="how-it-works" className="relative isolate scroll-mt-24 bg-[#183324] lg:py-20">
      <Image fill src="/images/howWork-bg.png" alt="" sizes="100vw" className="-z-10 object-cover object-right xl:object-center" />
      <div className="absolute inset-0 -z-10 bg-[#183324]/50 xl:hidden" />
      <div className="relative">
        <Container>
          <div className="flex w-full justify-end">
            <div className="flex w-full flex-col justify-start gap-10 xl:w-[68%] lg:gap-12">
              <div>
                <p className="font-avenir text-sm font-medium uppercase tracking-[2px] text-[#FAF6EF] sm:text-lg sm:tracking-[3px] xl:text-[22px]">the each 60 minutes experience</p>
                <h2 className="mt-2 font-cormorant text-[40px] font-semibold capitalize leading-[1.05] text-[#FAF6EF] sm:text-[52px] xl:text-[66px] xl:leading-[84px]">How it works</h2>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 xl:grid-cols-5 xl:gap-x-2">
                {stepsData.map((step) => (
                  <div key={step.title} className="mx-auto flex max-w-[190px] flex-col items-center gap-4 xl:max-w-[170px] lg:gap-5">
                    <Image width={72} height={72} src={step.icon} alt="" className="h-14 w-14 lg:h-[72px] lg:w-[72px]" />
                    <div className="flex flex-1 flex-col justify-start gap-1">
                      <h3 className="text-center font-cormorant text-[22px] font-bold uppercase leading-[1.2] text-[#FCF9F5] xl:text-[26px] xl:leading-[34px]">{step.title}</h3>
                      <p className="text-center font-avenir text-base font-normal leading-[1.35] text-[#FCF9F5] xl:text-[20px] xl:leading-[26px]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center lg:justify-start">
                <Link
                  href={BOOKING_HREF}
                  className="flex items-center justify-center gap-[10px] rounded-2xl border border-[#F0B75B] px-6 py-3 font-cormorant text-lg font-semibold leading-[32px] text-[#FAF6EF] transition-colors hover:bg-[#F0B75B]/15"
                >
                  Book your session <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default HowWork;
