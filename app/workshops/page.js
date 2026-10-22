import { WorkshopCard } from "@/components/workshops/workshop-card";
import { workshops } from "@/components/workshops/workshops";


export const metadata = {
  title: "Workshops",
  description: "Interactive, reflective workshops for inner growth.",
};

export default function WorkshopsPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] font-avenir text-[#5A5649]">
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#223329]">
            Workshops
          </p>
          <h1 className="mt-4 font-cormorant text-4xl font-semibold leading-tight text-[#223329] sm:text-5xl">
            Spaces to pause, reflect and grow
          </h1>
          <div className="mx-auto mt-5 h-px w-16 bg-[#223329]/30" />
          <p className="mt-5 text-[15px] leading-relaxed text-[#6B675C]">
            Small, in-person conversations led by experienced practitioners. Seats are limited
            and must be reserved in advance.
          </p>
        </header>

        {/* 1 column on mobile, 2 on tablet, 3 on desktop. All cards share the same size. */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {workshops.map((w) => (
            <WorkshopCard key={w.slug} workshop={w} />
          ))}
        </div>
      </section>
    </main>
  );
}