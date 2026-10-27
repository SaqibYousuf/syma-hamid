const therapyItems = [
  {
    num: "01",
    title: "Individual Therapy",
    description:
      "A private space to explore your thoughts, emotions, behaviours and recurring patterns, and work towards meaningful, lasting change.",
    suitedFor: [
      "Emotional difficulties",
      "Anxiety",
      "Low mood",
      "Recurring patterns",
      "Life transitions",
      "Personal growth",
    ],
  },
  {
    num: "02",
    title: "Couples Therapy",
    description:
      "A space to understand relational patterns, improve communication and create greater clarity and connection.",
    suitedFor: [
      "Communication",
      "Conflict",
      "Emotional distance",
      "Intimacy",
      "Trust",
      "Co-parenting",
      "Relationship transitions",
    ],
  },
];

const counsellingItems = [
  { num: "01", title: "Life Transitions" },
  { num: "02", title: "Emotional Difficulties" },
  { num: "03", title: "Grief & Loss" },
  { num: "04", title: "Personal Growth" },
];

/* "THERAPY ———————" label with a line running to the edge */
function SectionLabel({ children }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#223329]">
        {children}
      </span>
      <span className="h-px flex-1 bg-[#C9B48E]/60" />
    </div>
  );
}

/* Gold number, used in both columns */
function Num({ children, className = "" }) {
  return (
    <span
      className={`w-10 shrink-0 font-cormorant text-[32px] leading-none text-[#A8875A] sm:w-12 sm:text-4xl ${className}`}
    >
      {children}
    </span>
  );
}

export default function TherapyCounsellingSection() {
  return (
    <section className="relative overflow-hidden bg-[#fbf5e9] font-avenir">
      {/* Optional soft landscape in the bottom-left, as in the design. Replace or remove. */}
      <img
        src="/images/mist-mountains.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-[60%] max-w-3xl select-none opacity-40 mix-blend-multiply"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-0">
          {/* ---------------- Therapy ---------------- */}
          <div className="lg:border-r lg:border-[#DCD3C3] lg:pr-14">
            <SectionLabel>Therapy</SectionLabel>

            <div className="divide-y divide-[#DCD3C3]">
              {therapyItems.map((item) => (
                <article key={item.num} className="flex gap-4 py-8 first:pt-0 last:pb-0 sm:gap-6">
                  <Num className="pt-1">{item.num}</Num>

                  <div className="min-w-0 border-l border-[#C9B48E]/70 pl-5 sm:pl-6">
                    <h3 className="font-cormorant text-[28px] font-medium leading-tight text-[#1C2E22] sm:text-[32px]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-7 text-[#1C2E22]">
                      {item.description}
                    </p>

                    <span className="mt-5 block h-px w-10 bg-[#A8875A]" />

                    <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#A8875A]">
                      Best suited for
                    </p>
                    {/* dot stays at the end of a line when tags wrap */}
                    <ul className="mt-2.5 max-w-md text-sm leading-7 text-[#575147]">
                      {item.suitedFor.map((tag, i) => (
                        <li key={tag} className="inline">
                          <span className="whitespace-nowrap">{tag}</span>
                          {i < item.suitedFor.length - 1 && (
                            <span aria-hidden className="text-[#A8875A]">
                              {"\u00A0\u00A0\u00B7\u00A0 "}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ---------------- Counselling ---------------- */}
          <div className="lg:pl-14">
            <SectionLabel>Counselling</SectionLabel>

            <p className="max-w-md text-[15px] leading-7 text-[#575147]">
              Counselling offers focused support when you are navigating a particular challenge,
              transition or decision, creating space to understand what is happening and
              determine your next step.
            </p>

            <ul className="mt-8 divide-y divide-[#DCD3C3] border-y border-[#DCD3C3]">
              {counsellingItems.map((item) => (
                <li
                  key={item.num}
                  className="group flex items-center gap-4 py-6 sm:gap-6 sm:py-7"
                >
                  <Num>{item.num}</Num>
                  <span className="h-10 w-px shrink-0 bg-[#C9B48E]/70" />
                  <h3 className="font-cormorant text-2xl font-medium text-[#223329] transition-transform duration-300 group-hover:translate-x-1 sm:text-[28px]">
                    {item.title}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}