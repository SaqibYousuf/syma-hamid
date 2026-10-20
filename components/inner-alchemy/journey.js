import React from "react";
import Container from "../constants/container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pillars = [
  { image: "/images/assesment.png", icon: "/images/rootlock.svg", title: "identify the root block", text: "Uncover what’s truly holding you back." },
  { image: "/images/emotions.png", icon: "/images/lotus.svg", title: "get unstuck", text: "Break patterns of self-doubt, perfectionism and self-sabotage." },
  { image: "/images/sessions.png", icon: "/images/wind.svg", title: "cognitive restructuring", text: "Shift persistent negative thoughts and doubts." },
  { image: "/images/sessions.png", icon: "/images/flow.svg", title: "Reconnect with your inner flow", text: "Build emotional resilience and move forward with greater ease and purpose." },
];

function Journey() {
  return (
    <section className="bg-[#FFF6E2] lg:py-20">
      <Container>
        <div>
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:gap-10">
            <div className="lg:w-[50%]">
              <p className="font-avenir text-sm font-medium uppercase leading-[1.4] tracking-[2px] text-[#1C2E22] sm:text-lg sm:tracking-[3px] xl:text-[22px] xl:leading-[76.97px]">The journey</p>
              <h2 className="mt-3 font-cormorant text-[40px] font-semibold capitalize leading-[1.05] text-[#1C2E22] sm:text-[52px] xl:mt-0 xl:text-[66px] xl:leading-[84px]">
                what we’ll work on
              </h2>
            </div>
            <div className="flex-1">
              <p className="font-avenir text-base font-normal leading-[130%] text-[#1C2E22] sm:text-xl xl:text-[22px] xl:leading-[120%]">
                These four pillars guide our work together, helping you move from insight to lasting change.
              </p>
            </div>
          </div>

          <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:mt-20 xl:grid-cols-4 xl:gap-[28px]">
            {pillars.map((p) => (
              <div key={p.title} className="flex w-full flex-col overflow-hidden rounded-[6px] border border-[#F0B75B]">
                <div className="relative h-[150px] w-full overflow-hidden">
                  <Image fill src={p.image} alt="" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover object-center" />
                </div>
                <div className="-mt-[50px] h-full px-3 pb-10">
                  <div className="flex h-full flex-1 flex-col items-center justify-between gap-3">
                    <div className="relative flex aspect-square w-[100px] items-center justify-center rounded-full border border-[#F0B75B] bg-[#1C2E22]">
                      <Image src={p.icon} alt="" width={38} height={38} />
                    </div>
                    <h3 className="text-center font-cormorant text-[26px] font-bold uppercase leading-[1.15] text-[#1C2E22] xl:text-[30.84px] xl:leading-[34.96px]">{p.title}</h3>
                    <p className="text-center font-avenir text-lg font-normal leading-[1.5] xl:text-[22.62px] xl:leading-[34.96px]">{p.text}</p>
                    <div className="h-0.5 w-[68px] bg-[#F0B75B]" />
                    <Link href="#how-it-works" className="flex items-center gap-2 font-cormorant text-[24px] font-semibold capitalize leading-[32.9px] text-[#1C2E22] xl:text-[26.73px]">
                      <span className="underline">Explore</span> <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Journey;
