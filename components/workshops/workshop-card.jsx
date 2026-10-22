import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { formatPrice } from "@/components/workshops/workshops";


export function WorkshopCard({ workshop: w }) {
  const soldOut = w.seatsLeft <= 0;
  const fewLeft = !soldOut && w.seatsLeft <= 5;

  const body = (
    <>
      {/* Banner carries the details. Fixed 2:3 ratio keeps every card the same size */}
      <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-[#EEE9DF]">
        <Image
          src={w.banner}
          alt={`${w.series}: ${w.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition duration-700 group-hover:scale-[1.03] ${
            soldOut ? "grayscale-60" : ""
          }`}
        />
        {(soldOut || fewLeft) && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider shadow-sm ${
              soldOut ? "bg-white/90 text-[#5A5649]" : "bg-[#223329] text-white"
            }`}
          >
            {soldOut ? "Sold out" : `Only ${w.seatsLeft} seats left`}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="line-clamp-1 font-cormorant text-xl font-semibold text-[#223329]">
          {w.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-[#6B675C]">
          <CalendarDays className="size-3.5 shrink-0" /> {w.dateLabel}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-[15px] font-semibold text-[#223329]">{formatPrice(w.price)}</p>
          <span
            className={`inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-sm font-medium transition ${
              soldOut
                ? "bg-[#EEE9DF] text-[#8A8578]"
                : "bg-[#223329] text-white group-hover:bg-[#2E4437]"
            }`}
          >
            {soldOut ? "Sold out" : "Book now"}
            {!soldOut && (
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            )}
          </span>
        </div>
      </div>
    </>
  );

  const cls =
    "group flex h-full flex-col rounded-2xl bg-white p-3 pb-4 font-avenir ring-1 ring-[#E6DFD0] transition duration-300";

  if (soldOut) {
    return (
      <div className={`${cls} opacity-75`} aria-disabled>
        {body}
      </div>
    );
  }

  return (
    <Link
      href={`/workshops/${w.slug}/checkout`}
      className={`${cls} hover:-translate-y-1 hover:shadow-xl hover:shadow-[#223329]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#223329]`}
    >
      {body}
    </Link>
  );
}