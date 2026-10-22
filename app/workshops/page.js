import { connection } from "next/server";
import { WorkshopCard } from "@/components/workshops/workshop-card";
import { listUpcomingWorkshops } from "@/lib/workshops";

export const metadata = {
  title: "Workshops",
  description: "Interactive, reflective workshops for inner growth.",
};

export default async function WorkshopsPage() {
  await connection(); // always read fresh data (seats change with every booking)

  let workshops = [];
  let loadError = false;
  try {
    workshops = await listUpcomingWorkshops();
  } catch (error) {
    console.error("[workshops] failed to load", error);
    loadError = true;
  }

  return (
    <main className="min-h-screen bg-[#F7F4EE] font-avenir text-[#5A5649]">
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#223329]">Workshops</p>
          <h1 className="mt-4 font-cormorant text-4xl font-semibold leading-tight text-[#223329] sm:text-5xl">
            Spaces to pause, reflect and grow
          </h1>
          <div className="mx-auto mt-5 h-px w-16 bg-[#223329]/30" />
          <p className="mt-5 text-[15px] leading-relaxed text-[#6B675C]">
            Small, in-person conversations led by experienced practitioners. Seats are limited and must be reserved in advance.
          </p>
        </header>

        {loadError ? (
          <p className="mx-auto mt-14 max-w-md text-center text-[15px]">
            Workshops could not be loaded right now. Please refresh the page or try again in a few minutes.
          </p>
        ) : workshops.length === 0 ? (
          <p className="mx-auto mt-14 max-w-md text-center text-[15px]">
            New workshops will be announced soon. Please check back later.
          </p>
        ) : (
          /* 1 column on mobile, 2 on tablet, 3 on desktop. All cards share the same size. */
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {workshops.map((w) => (
              <WorkshopCard key={w.slug} workshop={w} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
