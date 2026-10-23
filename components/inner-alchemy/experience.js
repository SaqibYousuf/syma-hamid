import Image from "next/image";
import React from "react";
import Container from "../constants/container";

function Experience() {
  return (
    <section className="relative w-full bg-[#F4ECD9]">
      <Image src="/images/alchemy-exp-bg.png" alt="" fill sizes="100vw" className="object-cover object-left" />
      <div className="relative flex h-full w-full flex-col lg:flex-row lg:items-stretch">
        <Container className="py-12 lg:py-20">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:py-[33px]">
            <div className="w-full lg:w-[50%]">
              <div className="flex flex-col gap-4 sm:gap-[22px]">
                <p className="font-avenir text-sm font-medium uppercase leading-[120%] tracking-[2px] text-[#1C2E22] sm:text-lg sm:tracking-[3px] xl:text-[22px]">the philosophy</p>
                <h2 className="font-cormorant text-[40px] font-semibold capitalize leading-[100%] text-[#1C2E22] sm:text-[52px] xl:text-[66px]">
                  What is <br />
                  Inner Alchemy?
                </h2>
                <p className="font-avenir text-base font-normal leading-[1.45] text-[#1C2E22] sm:text-xl xl:text-[25px] xl:leading-[120%]">
                  Inner Alchemy is the process of turning inner patterns into conscious choice.
                  <br />
                  <br />
                  It is about understanding what lies beneath the surface, your emotional patterns, beliefs, reactions and protective strategies, and transforming that awareness into meaningful change.
                </p>
                <div className="h-[1px] w-[150px] border-[0.68px] border-solid [border-image-source:linear-gradient(90deg,#A67539_27.53%,rgba(166,117,57,0.2)_63.76%,rgba(166,117,57,0.5)_100%)] [border-image-slice:1]" />
              </div>
            </div>
            <div className="flex w-full justify-center lg:ml-10 lg:w-[50%] lg:justify-start">
              <Image src="/images/circleDiagramm2.png" alt="" width={400} height={400} className="h-auto w-64 object-cover sm:w-80 xl:w-[400px]" />
            </div>
          </div>
        </Container>
        {/* <div className="flex w-full items-center justify-center bg-[#F4ECD9] px-6 py-10 sm:px-[37px] lg:max-w-[300px] xl:max-w-[388px]">
          <p className="font-avenir text-base font-normal leading-[130%] text-[#1C2E22] sm:text-[18px] sm:leading-[120%]">
            <span className="font-medium">
              More than <br className="hidden lg:block" />
              just insight
            </span>
            <br />
            <br />
            This is not about fixing you. It’s about helping you understand yourself more deeply, so you can make different choices and create lasting change.
          </p>
        </div> */}
      </div>
    </section>
  );
}

export default Experience;
