import Image from "next/image";
import Container from "./container";

/** Simple banner used at the top of inner pages */
export default function PageHero({ eyebrow, title, text, image = "/images/assessment/hero.png" }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5efe2]">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[#f5efe2]/55" />
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow && (
            <p className="mb-3 font-avenir text-sm font-medium uppercase tracking-[2px] text-[#263d35] sm:text-lg sm:tracking-[3px] md:text-[22px]">{eyebrow}</p>
          )}
          <h1 className="font-cormorant text-[40px] font-semibold capitalize leading-[1.05] text-[#24372f] sm:text-[56px] lg:text-[76px]">{title}</h1>
          {text && (
            <p className="mx-auto mt-4 max-w-2xl font-avenir text-base leading-[1.6] text-[#465149] sm:text-xl lg:text-[23px] lg:leading-[36px]">{text}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
