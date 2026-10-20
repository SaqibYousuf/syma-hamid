import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/constants/page-hero";
import Container from "@/components/constants/container";
import { BOOKING_HREF } from "@/components/constants/site-links";

export const metadata = {
  title: "Services",
  description: "Individual therapy, couples therapy, online counselling and NLP sessions with Dr. Syma Hamid.",
};

const services = [
  {
    id: "individual-therapy",
    image: "/images/work-1.png",
    title: "Individual Therapy",
    text: "One-to-one support designed to help you understand emotions, improve your mood, recognise patterns and create practical changes that support your individual goals.",
  },
  {
    id: "couples-therapy",
    image: "/images/couple.png",
    title: "Couples Therapy",
    text: "A collaborative space for couples to explore communication, intimacy, co-parenting and relationship patterns while creating greater clarity and connection.",
  },
  {
    id: "online-therapy",
    image: "/images/online.png",
    title: "Online Therapy / Counseling",
    text: "Flexible online counselling and therapy sessions available regardless of location, arranged around your availability and time zone.",
  },
  {
    id: "nlp-sessions",
    image: "/images/nlp.png",
    title: "NLP Sessions",
    text: "Neuro Linguistic Programming techniques are combined with psychological insight to support behavioural change, communication, personal development and improved performance.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Ways we can work together"
        title="Support tailored to where you are"
        text="Every person arrives with a different story. Explore counselling and therapeutic approaches designed to support greater clarity, understanding and meaningful change."
      />
      <section className="bg-[#FFF6E2]">
        <Container>
          <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:gap-12">
            {services.map((s, i) => (
              <article
                id={s.id}
                key={s.id}
                className={`flex scroll-mt-28 flex-col overflow-hidden rounded-[24px] border border-[#F0B75B]/60 bg-[#FBF8F3] md:flex-row ${i % 2 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="relative aspect-[400/230] w-full md:aspect-auto md:w-[45%]">
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8 lg:p-12">
                  <h2 className="font-cormorant text-[32px] font-bold leading-tight text-[#1C2E22] lg:text-[40px]">{s.title}</h2>
                  <p className="font-avenir text-base leading-[1.6] text-[#1C2E22]/85 lg:text-lg">{s.text}</p>
                  <Link href={BOOKING_HREF} className="mt-2 flex items-center gap-2 font-urbanist text-base font-bold tracking-[0.38px] text-[#A67539] underline">
                    Book a session <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
