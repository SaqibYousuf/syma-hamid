
const therapyItems = [
  {
    num: "01",
    title: "Individual Therapy",
    description:
      "A dedicated space to explore your thoughts, emotions, behaviors and recurring patterns, and work towards meaningful, lasting change.",
    suitedFor:
      "Emotional difficulties • Anxiety • Low mood • Recurring patterns • Life transitions • Personal growth",
  },
  {
    num: "02",
    title: "Couples Therapy",
    description:
      "A space to understand relational patterns, improve communication and create greater clarity and connection.",
    suitedFor:
      "Communication • Conflict • Emotional Distance • Intimacy • Trust • Co-parenting • Relationship breakdown",
  },
];

const counsellingItems = [
  { num: "01", title: "Life Transitions" },
  { num: "02", title: "Emotional Difficulties" },
  { num: "03", title: "Grief & Loss" },
  { num: "04", title: "Personal Growth" },
];

function SectionLabel({ children }) {
  return (
    <div className="mb-7 border-b border-[#DCD6CC] pb-3">
      <span className="font-avenir text-xs font-medium uppercase tracking-[0.2em] text-[#1C2E22]">
        {children}
      </span>
    </div>
  );
}

export default function TherapyCounsellingSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-16 lg:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
        {/* Therapy */}
        <div>
          <SectionLabel>Therapy</SectionLabel>

          <div className="space-y-8 sm:space-y-10">
            {therapyItems.map((item) => (
              <article
                key={item.num}
                className="flex gap-4 border-b border-[#DCD6CC]/70 pb-8 last:border-0"
              >
                <span className="shrink-0 font-cormorant text-3xl font-normal text-[#8C7A5B]">
                  {item.num}
                </span>

                <div className="min-w-0">
                  <h3 className="mb-3 font-cormorant text-2xl font-semibold text-[#1C2E22] sm:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mb-5 text-sm leading-7 text-[#575147] sm:text-base">
                    {item.description}
                  </p>

                  <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-[#8C7A5B]">
                    Best suited for
                  </span>

                  <p className="text-sm leading-6 text-[#6B6356]">
                    {item.suitedFor}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Counselling */}
        <div>
          <SectionLabel>Counselling</SectionLabel>

          <p className="mb-7 text-sm leading-7 text-[#575147] sm:mb-8 sm:text-base">
            Counselling offers focused support when you are navigating a
            particular challenge or decision, creating space to understand
            what is happening and determine your next step.
          </p>

          <div className="flex flex-col gap-3 sm:gap-4">
            {counsellingItems.map((item) => (
              <div
                key={item.num}
                className="flex items-center gap-5 rounded-xl border border-[#E5DFD5] bg-[#F2EDE4]/70 p-4 transition-colors hover:bg-[#F2EDE4] sm:gap-6 sm:p-5"
              >
                <span className="font-cormorant text-2xl text-[#8C7A5B]">
                  {item.num}
                </span>

                <h3 className="font-cormorant text-xl font-semibold text-[#1C2E22] sm:text-2xl">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
