import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "../constants/container";

function Experience() {
  return (
    <section className="relative flex w-full items-center bg-[#1C2E22] xl:min-h-[34.17vw]">
      <Image src="/images/experience-bg.png" alt="" fill sizes="100vw" className="object-cover" />
      <div className="relative w-full">
        <Container className="py-14 md:py-16 lg:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="lg:w-[56%]">
              <p className="font-avenir text-sm font-medium uppercase leading-[1.4] tracking-[2px] text-[#FAF6EF] sm:text-lg sm:tracking-[3px] xl:text-[22px] xl:leading-[76.97px]">
                the signature experience
              </p>
              <h2 className="mt-3 font-cormorant text-[40px] font-semibold capitalize leading-[1.05] text-[#FAF6EF] sm:text-[52px] xl:mt-0 xl:text-[66px] xl:leading-[84px]">
                inner alchemy sessions <br />
                <span className="font-cormorant text-[32px] font-medium italic text-[#A67539] sm:text-[44px] xl:text-[55px]">Real change begins within</span>
              </h2>
              <p className="mt-4 font-avenir text-base font-normal leading-[1.55] text-white sm:text-xl xl:text-[25px] xl:leading-[36px]">
                A guided 60-minute deep-dive designed to help you understand the patterns beneath what you&apos;re experiencing, reframe limiting narratives, and move forward with greater clarity.
              </p>
              <Link href="/inner-alchemy" className="mt-6 inline-flex items-center gap-2 font-cormorant text-xl font-semibold text-[#F0B75B] underline underline-offset-4 hover:text-white">
                Discover Inner Alchemy →
              </Link>
            </div>
            <div className="flex justify-center lg:w-[22%]">
              <Image src="/images/circleDiagramm-2.png" alt="" width={300} height={326} className="h-auto w-44 object-contain sm:w-56 lg:w-full lg:max-w-[300px]" />
            </div>
            <div className="flex lg:w-[22%] lg:items-center">
              <div className="border-l-[3px] border-[#F0B75B] pb-6 pl-5 lg:pb-10">
                <div className="relative pb-6 lg:pb-10">
                  <p className="font-cormorant text-[36px] font-medium italic leading-[1.15] text-[#FAF6EF] xl:text-[48px] xl:leading-[55px]">
                    Understand. <br />
                    Reframe. <br />
                    Move Forward.
                  </p>
                  <div className="absolute bottom-0 h-1 w-20 bg-[#D4A453]" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default Experience;
