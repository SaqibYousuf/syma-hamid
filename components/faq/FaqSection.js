import Image from "next/image";
import { Sparkle } from "lucide-react";

import FaqAccordion from "@/components/faq/FaqAccordion";
import FaqCta from "@/components/faq/FaqCta";
import { FAQ_IMAGES, faqs } from "@/components/faq/faq-data";

export default function FaqSection() {
  return (
    <section id="faq" className="bg-[#F7F3EC] font-avenir">
      <div className="relative grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)]">
        {/* Left: photo */}
        <div className="hidden lg:block">
          <div className="relative h-full top-0">
            <Image
              src={FAQ_IMAGES.side}
              alt="A calm, sunlit therapy room"
              fill
              sizes="200px"
              className="object-cover object-left"
            />
          </div>
        </div>


        {/* Right: header + questions */}
        <div className="relative z-10 bg-[#F4F1EA]/90 px-5 py-14 sm:px-8 lg:px-14 lg:py-20 xl:px-20">
          <header className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#223329]/80">
                Frequently asked questions
              </p>

              <h2 className="mt-4 font-cormorant text-4xl font-medium leading-[1.05] text-[#223329] sm:text-5xl xl:text-[56px]">
                A few things you may want to know.
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-[#575147]">
                Starting something new often comes with questions. Here are some of the most
                common ones.
              </p>
            </div>

            <aside className="flex max-w-xs gap-3 border-l border-[#C9B48E]/60 pl-4 xl:mt-10 xl:max-w-[13rem]">
              <Sparkle
                className="mt-1 size-4 shrink-0 text-[#A8875A]"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="font-cormorant text-[17px] italic leading-snug text-[#575147]">
                It is okay to have questions. The first step towards change often begins with a
                conversation.
              </p>
            </aside>
          </header>

          <div className="mt-10 lg:mt-12">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </div>

      <FaqCta href="/contact" />
    </section>
  );
}