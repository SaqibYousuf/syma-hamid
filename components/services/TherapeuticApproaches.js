const approaches = [
  {
    title: "Psychodynamic Psychotherapy",
    desc: "Understanding deeper patterns and experiences.",
  },
  {
    title: "Cognitive Behavioural Therapy",
    desc: "Understanding thoughts, emotions and behaviours.",
  },
  {
    title: "Interpersonal Psychotherapy",
    desc: "Understanding relationships and life transitions.",
  },
];

export default function TherapeuticApproaches() {
  return (
    <section className="border-y border-[#DCD3C3] bg-[#fbf5e9] font-avenir">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-16 lg:py-20">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#223329]">
          A personalised, integrative approach
        </p>
        <h2 className="mt-3 font-cormorant text-4xl font-medium uppercase leading-tight tracking-[0.04em] text-[#223329] sm:text-5xl">
          Therapeutic Approaches
        </h2>
        <span className="mt-5 block h-px w-12 bg-[#A8875A]" />
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#575147]">
          My approach is personalised and integrative, drawing from established psychological
          approaches and tailored to your unique needs.
        </p>

        {/* 3 columns with thin dividers, stacks on mobile */}
        <div className="mt-12 grid grid-cols-1 divide-y divide-[#DCD3C3] md:grid-cols-3 md:divide-x md:divide-y-0">
          {approaches.map((item) => (
            <article
              key={item.title}
              className="py-6 first:pt-0 last:pb-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0"
            >
              <h3 className="max-w-[14rem] font-cormorant text-2xl font-medium leading-tight text-[#223329] sm:text-[26px]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#575147]">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}