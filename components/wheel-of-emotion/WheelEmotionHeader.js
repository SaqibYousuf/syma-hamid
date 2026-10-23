"use client"
import { useState } from "react";
import Image from "next/image";
import Container from "../constants/container";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { EmotionalWheelModal } from "@/components/wheel-of-emotion/emotional-wheel-modal";
/** Saves a reflection through the API. Throws so the modal can show the error. */
async function saveReflection(r) {
  const res = await fetch("/api/wheel/reflections", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emotion: r.emotion,
      feeling: Array.isArray(r.feelings) ? r.feelings[0] : r.feeling,
      statement: Array.isArray(r.statements) ? r.statements[0] : r.statement,
      need: Array.isArray(r.needs) ? r.needs[0] : r.need,
      reflection: r.reflection,
    }),
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || "Your reflection could not be saved. Please try again.");
  }
}

function WheelEmotionHeader({ wheel = null }) {
  const [saved, setSaved] = useState(false);
  const available = Boolean(wheel?.emotions?.length);

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
            {available ? (
              <EmotionalWheelModal
                wheel={wheel}
                trigger={<div
                  className="flex cursor-pointer gap-2 rounded-[14.51px] bg-[#223329] px-8 py-4 font-avenir text-sm font-medium text-white"
                >
                  Explore <ArrowRight />
                </div>}
                onSaveReflection={async (r) => {
                  await saveReflection(r);
                  setSaved(true);
                }}
              />
            ) : (
              <p className="rounded-xl bg-white/70 px-4 py-3 font-avenir text-sm text-[#1C2E22]">
                The Wheel of Emotions is being updated. Please check back soon.
              </p>
            )}
            {saved && (
              <p role="status" className="flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2.5 font-avenir text-sm text-[#1C2E22]">
                <CheckCircle2 className="h-4 w-4 text-[#A67539]" /> Your reflection has been saved. Thank you for taking a moment for yourself.
              </p>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}

export default WheelEmotionHeader;
