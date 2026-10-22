import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import TestimonialsCTA from "@/components/testimonials/TestimonialsCTA";
import TestimonialsHeader from "@/components/testimonials/TestimonialsHeader";
import Image from "next/image";


export default function TestimonialsSection() {
  return (
    <section className="relative mx-auto flex min-h-160 w-full flex-col justify-between overflow-hidden p-6 text-[#1C2E22] shadow-2xl sm:p-12">
      {/* Shared background image */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/testimonials/villa_arch_bg.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1152px"
          className="object-cover object-center"
        />

      </div>

      {/* Section content */}
      <div className="relative z-10 flex h-full flex-col justify-between gap-8 sm:gap-12">
        <TestimonialsHeader />

        <TestimonialCarousel />

        <TestimonialsCTA />
      </div>
    </section>
  );
}