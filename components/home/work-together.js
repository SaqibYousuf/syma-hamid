"use client";

import Image from "next/image";
import React, { useState } from "react";
import Container from "../constants/container";
import { CounsellingIcon, TherapyIcon } from "../constants/icons";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    image: "/images/work-1.png",
    title: "Individual Therapy",
    text: "One-to-one support designed to help you understand emotions, improve your mood, recognise patterns and create practical changes that support your individual goals.",
    link: "Explore Individual Therapy",
    href: "/services#individual-therapy",
  },
  {
    image: "/images/couple.png",
    title: "Couples Therapy",
    text: "A collaborative space for couples to explore communication, intimacy, co-parenting and relationship patterns while creating greater clarity and connection.",
    link: "Explore Couples Therapy",
    href: "/services#couples-therapy",
  },
  {
    image: "/images/online.png",
    title: "Online Therapy / Counseling",
    text: "Flexible online counselling and therapy sessions available regardless of location, arranged around your availability and time zone.",
    link: "Explore Online Therapy / Counseling",
    href: "/services#online-therapy",
  },
  {
    image: "/images/nlp.png",
    title: "NLP Sessions",
    text: "Neuro Linguistic Programming techniques are combined with psychological insight to support behavioural change, communication, personal development and improved performance.",
    link: "Explore NLP Sessions",
    href: "/services#nlp-sessions",
  },
];

function WorkTogether() {
  const [mode, setMode] = useState("counselling");
  const tabCls = (active) =>
    `flex h-[48px] w-1/2 cursor-pointer items-center justify-center gap-2 rounded-[6px] text-center font-cormorant text-[18px] font-bold leading-[20px] tracking-[0.35px] transition-colors ${
      active
        ? "bg-[#A67539] text-white [&_path[stroke]]:stroke-white [&_path[fill]]:fill-white"
        : "text-[#1C2E22] hover:bg-[#A67539]/10 [&_path[stroke]]:stroke-[#1C2E22] [&_path[fill]]:fill-[#1C2E22]"
    }`;

  return (
    <section className="relative isolate bg-[#1C2E22] lg:py-20">
      <Image fill src="/images/work-bg.png" alt="" sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-[#1C2E2266]" />
      <div className="relative">
        <Container>
          <div>
            <div className="mx-auto flex max-w-[1288px] flex-col items-center justify-center gap-4 text-center sm:gap-[22px]">
              <p className="font-avenir text-sm font-medium uppercase tracking-[2px] text-[#FAF6EF] opacity-70 sm:text-lg sm:tracking-[3px] xl:text-[22px]">
                Ways We Can Work Together
              </p>
              <h2 className="font-cormorant text-[40px] font-semibold capitalize leading-[1.05] text-[#FAF6EF] sm:text-[52px] xl:text-[66px] xl:leading-[84px]">
                Support Tailored to
                <br />
                Where You Are.
              </h2>
              <p className="font-avenir text-base font-normal leading-[1.55] text-[#FAF6EF] opacity-70 sm:text-xl xl:text-[23px] xl:leading-[36px]">
                Every person arrives with a different story. Explore counselling and therapeutic approaches designed to support greater clarity, understanding and meaningful change.
              </p>
              <div className="flex w-full max-w-[400px] items-center justify-center">
                <div role="tablist" aria-label="Support type" className="flex w-full items-center justify-between gap-1 rounded-[12px] bg-[#FAF6EF] p-1.5">
                  <button type="button" role="tab" aria-selected={mode === "counselling"} onClick={() => setMode("counselling")} className={tabCls(mode === "counselling")}>
                    <CounsellingIcon /> Counselling
                  </button>
                  <button type="button" role="tab" aria-selected={mode === "therapy"} onClick={() => setMode("therapy")} className={tabCls(mode === "therapy")}>
                    <TherapyIcon /> Therapy
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 xl:mt-20 xl:grid-cols-4 xl:gap-10">
              {services.map((s) => (
                <div key={s.title} className="flex flex-col overflow-hidden rounded-[24px] bg-[#FBF8F3]">
                  <Image src={s.image} alt={s.title} width={400} height={230} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="aspect-[400/230] w-full object-cover" />
                  <div className="flex flex-1 flex-col justify-between p-[21px]">
                    <div>
                      <h3 className="font-cormorant text-[26.2px] font-bold leading-[130%] text-[#1C2E22]">{s.title}</h3>
                      <p className="font-avenir text-[15.28px] font-normal leading-[135%]">{s.text}</p>
                    </div>
                    <Link href={s.href} className="mt-[10px] flex items-center gap-2 font-urbanist text-[15.28px] font-bold leading-[21.83px] tracking-[0.38px] text-[#A67539] underline">
                      {s.link} <ArrowRight size={14} className="shrink-0" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default WorkTogether;
