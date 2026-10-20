
const approaches = [
  {
    title: "Psychodynamic Psychotherapy",
    desc: "Exploring unconscious patterns and past experiences.",
  },
  {
    title: "Cognitive Behavioral Therapy",
    desc: "Understanding thoughts, emotions, and behaviors.",
  },
  {
    title: "Interpersonal Psychotherapy",
    desc: "Understanding relationships in your life and society.",
  },
];

export default function TherapeuticApproaches() {
  return (
    <section className="border-t border-[#E5DFD5]">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
        <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-[#8C8476]">
          A Personalized, Integrative Approach
        </span>

        <h2 className="mb-4 font-cormorant text-3xl font-semibold leading-tight text-[#1C2E22] sm:text-4xl lg:text-5xl">
          Therapeutic Approaches
        </h2>

        <p className="mb-8 max-w-3xl text-sm leading-7 text-[#575147] sm:mb-10 sm:text-base">
          My approach is integrative and adapted to match your specific goals,
          preferences and individual needs.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {approaches.map((item) => (
            <article
              key={item.title}
              className="flex min-h-44 flex-col justify-center rounded-2xl border border-[#E5DFD5] bg-[#F2EDE4]/50 p-6 transition-colors hover:bg-[#F2EDE4] sm:p-7"
            >
              <h3 className="mb-3 font-cormorant text-2xl font-semibold leading-tight text-[#1C2E22]">
                {item.title}
              </h3>

              <p className="text-sm leading-7 text-[#6B6356] sm:text-base">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
