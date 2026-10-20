export default function TestimonialsHeader() {
  return (
    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div>
        <span className="mb-2 block font-avenir text-xs font-semibold uppercase tracking-[0.25em] text-[#1C2E22]/75">
          Testimonials
        </span>

        <h2 className="font-cormorant text-3xl font-semibold leading-tight text-[#1C2E22] sm:text-4xl md:text-5xl">
          What Others Have To Say.
        </h2>
      </div>

      <div className="max-w-md border-t border-[#A67539]/40 pt-3 md:border-t-0 md:pt-0">
        <div className="mb-3 h-0 w-16.5 border-t-2 border-[#A67539]" />

        <p className="font-avenir text-xs font-light leading-relaxed text-[#1C2E22]/85 sm:text-sm">
          A few reflections from people who have chosen to work on themselves,
          understand their patterns and create a different way forward.
        </p>
      </div>
    </div>
  );
}