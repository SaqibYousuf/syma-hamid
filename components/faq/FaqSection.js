import Image from "next/image";
import { Sparkle } from "lucide-react";

import FaqAccordion from "@/components/faq/FaqAccordion";
import FaqCta from "@/components/faq/FaqCta";
import { FAQ_IMAGES, faqs } from "@/components/faq/faq-data";

export default function FaqSection() {
  return (
    <section id="faq" className="bg-[#F7F3EC] font-avenir">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* ---------- Left: photo ---------- */}
        <div className="relative h-72 sm:h-96 lg:h-auto">
          <Image
            src={FAQ_IMAGES.side}
            alt="A calm, sunlit therapy room"
            fill
            // sizes="(min-width: 1024px) 10vw, 100vw"
            className="object-cover"
          />
          {/* soft fade into the page colour */}
          <div className="absolute inset-0 bg-linear-to-t from-[#F7F3EC] via-transparent to-transparent lg:bg-linear-to-l lg:from-[#F7F3EC]/70 lg:via-transparent" />
          <Sparkle
            className="absolute left-8 top-8 size-8 text-[#F7F3EC]/80"
            strokeWidth={1}
            aria-hidden
          />
        </div>

        {/* ---------- Right: header + questions ---------- */}
        <div className="px-5 py-14 sm:px-8 lg:px-14 lg:py-20 xl:px-20">
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

            {/* side note from the design */}
            <aside className="flex max-w-xs gap-3 border-l border-[#C9B48E]/60 pl-4 xl:mt-10 xl:max-w-[13rem]">
              <Sparkle className="mt-1 size-4 shrink-0 text-[#A8875A]" strokeWidth={1.5} aria-hidden />
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