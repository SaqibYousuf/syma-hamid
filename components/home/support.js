import React from "react";
import Container from "../constants/container";
import { AssesmentIcon, Brain, HandsIcon, LotusFlower, LotusSolidIcon, LotusTriangleIcon, PlantIcon } from "../constants/icons";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
  { Icon: Brain, title: "Evidence-Based Approach", text: "Rooted in psychology and neuroscience." },
  { Icon: HandsIcon, title: "Personalized Support", text: "Tailored to your unique journey and goals" },
  { Icon: LotusFlower, title: "a safe, Compassionate Space", text: "Where you can be yourself, fully." },
  { Icon: PlantIcon, title: "Lasting Transformation", text: "Not just relief, but real change." },
];

const cards = [
  { image: "/images/assesment.png", Icon: AssesmentIcon, title: "Assessments", text: "Understand your patterns.", link: "Take an Assessment", href: "/assessments" },
  { image: "/images/emotions.png", Icon: LotusSolidIcon, title: "Wheel of emotions", text: "Find words for what you’re feeling", link: "Explore the Wheel", href: "/wheel-of-emotions" },
  { image: "/images/sessions.png", Icon: LotusTriangleIcon, title: "inner alchemy sessions", text: "Turn insight into meaningful change", link: "Learn More", href: "/inner-alchemy" },
];

function Support() {
  return (
    <section className="bg-[#FFF6E2] lg:py-20">
      <Container>
        <div>
          <div className="flex w-full flex-col gap-10 xl:flex-row xl:items-end">
            <div className="xl:w-[33%]">
              <p className="font-avenir text-sm font-medium uppercase leading-[1.4] tracking-[2px] text-[#1C2E22] sm:text-lg sm:tracking-[3px] xl:text-[22px] xl:leading-[76.97px]">
                how can i support you?
              </p>
              <h2 className="mt-3 font-cormorant text-[40px] font-semibold capitalize leading-[1.05] text-[#1C2E22] sm:text-[52px] xl:mt-0 xl:text-[66px] xl:leading-[84px]">
                My Approach
              </h2>
              <p className="mt-3 font-avenir text-base font-normal leading-[1.55] text-[#1C2E22] sm:text-xl xl:mt-0 xl:text-[23px] xl:leading-[36px]">
                I combine evidence-based psychological tools with neuro-linguistic programming to help you create meaningful, lasting change - at your own pace.
              </p>
              <Link href="/about" className="mt-5 flex items-center gap-2 font-cormorant text-2xl font-semibold capitalize leading-[32px] text-[#1C2E22] xl:text-[30px]">
                <span className="underline">Learn more about me</span> <ArrowRight />
              </Link>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
              {features.map(({ Icon, title, text }) => (
                <div key={title} className="flex flex-col items-center justify-start gap-2 border-l border-l-[#F0B75B] px-3 md:pt-10">
                  <Icon />
                  <h3 className="text-center font-cormorant text-xl font-bold capitalize leading-[1.1] text-[#1C2E22] sm:text-[24px]">{title}</h3>
                  <p className="text-center font-avenir text-sm font-normal leading-[1.3] text-[#1C2E22] sm:text-[16px]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid w-full grid-cols-1 gap-[28px] lg:grid-cols-3 lg:gap-5 xl:mt-20 xl:gap-[28px]">
            {cards.map(({ image, Icon, title, text, link, href }) => (
              <div key={title} className="w-full overflow-hidden rounded-[6px] border border-[#F0B75B]">
                <div className="relative aspect-[553/186] w-full overflow-hidden">
                  <Image fill src={image} alt="" sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center" />
                </div>
                <div className="-mt-[50px] px-3 pb-10">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative flex aspect-square w-[100px] items-center justify-center rounded-full border border-[#F0B75B] bg-[#1C2E22]">
                      <Icon />
                    </div>
                    <h3 className="text-center font-cormorant text-[26px] font-bold uppercase leading-[1.15] text-[#1C2E22] xl:text-[30.84px] xl:leading-[34.96px]">{title}</h3>
                    <p className="text-center font-avenir text-lg font-normal leading-[1.5] xl:text-[22.62px] xl:leading-[34.96px]">{text}</p>
                    <div className="h-0.5 w-[68px] bg-[#F0B75B]" />
                    <Link href={href} className="flex items-center gap-2 font-cormorant text-[24px] font-semibold capitalize leading-[32.9px] text-[#1C2E22] xl:text-[26.73px]">
                      <span className="underline">{link}</span> <ArrowRight />
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

export default Support;
