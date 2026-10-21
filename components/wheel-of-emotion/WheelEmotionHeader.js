"use client"
import Image from "next/image";
import Container from "../constants/container";
import { ArrowRight } from "lucide-react";
import { EmotionalWheelModal } from "@/components/wheel-of-emotion/emotional-wheel-modal";
function WheelEmotionHeader() {
  return (
    <section className="relative flex min-h-155 w-full items-center sm:min-h-140 lg:min-h-130 xl:min-h-[34.17vw]">
      <Image
        src="/images/wheel_of_emotion/hero-bg.png"
        alt="Dr. Syma Hamid"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Keeps text readable on smaller screens where the photo sits behind it */}
      <div className="absolute inset-0 bg-linear-to-r from-[#FBF8F3]/95 via-[#FBF8F3]/80 to-[#FBF8F3]/10 lg:hidden" />

      <div className="relative w-full">
        <Container className="py-12 lg:py-16 xl:py-20">
          <div className="flex w-full max-w-188 flex-col items-start gap-4 py-2 sm:gap-5.5 lg:max-w-150 xl:max-w-188">
            <h1 className="font-cormorant text-[48px] font-semibold capitalize leading-[0.95] text-[#1C2E22] sm:text-[64px] lg:text-[72px] xl:text-[94px] xl:leading-21">
              wheel of emotions
            </h1>
            <h1 className="font-cormorant text-[48px] italic capitalize leading-[0.95] text-[#1C2E22] sm:text-[64px] lg:text-[72px] xl:text-[94px] xl:leading-21">
              Put words to what you feel.
            </h1>
            <p className="font-avenir text-base font-normal leading-[1.55] text-[#1C2E22] sm:text-xl xl:text-[25px] xl:leading-9">
              Psychological support, powerful tools and a compassionate space to help you understand yourself, break unhelpful patterns and create a more fulfilling life.
            </p>
            {/* <Button
              className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#223329] px-6 py-3 font-cormorant text-lg font-semibold leading-8 text-white transition-colors hover:bg-[#1C2E22]"
            >
              Begin your journey <ArrowRight />
            </Button> */}
            <EmotionalWheelModal
              trigger={<div
                className="flex cursor-pointer rounded-[14.51px] bg-[#223329] px-8 py-6 font-avenir text-sm font-medium text-white"
              >
                Begin your journey <ArrowRight />
              </div>}
              onSaveReflection={(r) => console.log(r)}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}

export default WheelEmotionHeader;
