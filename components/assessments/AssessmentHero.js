
import Image from "next/image";
import Container from "@/components/constants/container";


export default function AssessmentHero() {
    return (
        <section className="relative isolate flex min-h-46.25 items-center justify-center overflow-hidden  bg-[#f5efe2] px-3 py-10 sm:min-h-51.25 md:min-h-55">
            {/* Background Image */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src="/images/assessment/hero.png"
                    alt="Hero Background"
                    className="h-full w-full object-cover object-center"
                    fill
                    priority
                    sizes="100vw"
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 -z-10 bg-[#f5efe2]/40" />

            <Container>
                <div className="text-center">
                    <p className="mb-2 font-avenir text-[12px] font-medium leading-[1.2] tracking-[2px] text-center uppercase text-[#263d35] sm:text-[16px] sm:tracking-[2.5px] md:text-[22px] md:leading-[76.97px] md:tracking-[3px]">
                        Assessments
                    </p>

                    <h1 className="font-cormorant text-[32px] font-semibold leading-[1.05] tracking-normal text-center capitalize text-[#24372f] sm:text-[48px] md:text-[64px] lg:text-[80px] lg:leading-[84px]">
                        Self-Reflection Tools For Deeper Insight
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl font-avenir text-[14px] font-normal leading-[1.6] tracking-normal text-center text-[#465149] sm:text-[18px] sm:leading-[1.5] md:text-[22px] md:leading-[1.5] lg:text-[25px] lg:leading-[36px]">
                        These brief, thoughtful assessments are designed to help you gain
                        clarity, understand your patterns and take the next step in your healing
                        journey.
                    </p>
                </div>
            </Container>
        </section>
    );
}
