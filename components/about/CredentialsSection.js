"use client";

import { GraduationCap, Award, ScrollText, Check } from "lucide-react";

const qualifications = [
  { title: "Doctor of Psychology (PsyD)", subtitle: "California, USA" },
  { title: "Post Graduate Diploma in Clinical Psychology", subtitle: "IHMS, Pakistan" },
  { title: "MSc Psychology", subtitle: "Pakistan" },
  { title: "Licensed Neuro-Linguistic Programming (NLP) Practitioner", subtitle: "UK" },
];

const memberships = [
  { title: "Member", subtitle: "American Psychological Association (APA)" },
  { title: "Member", subtitle: "British Psychological Society (BPS)" },
];

const certifications = [
  "Certified Cognitive Behavioral Therapy Diploma",
  "Certified Cognitive Behavioral Therapy (CBT) for Depression, Anxiety & Phobias",
  "Certified in Gestalt Psychotherapy",
  "Advanced Diploma in Depression Counselling",
  "Certified Cognitive Behavioral Therapy (CBT) Life Coach",
];

/* Group label with a rule that runs out to the edge of the column. */
function GroupHeading({ icon: Icon, children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <Icon
        className="h-[18px] w-[18px] shrink-0 stroke-[1.5] text-[#2F5B51]"
        aria-hidden="true"
      />
      <h3 className="text-sm font-medium text-[#2F5B51]">{children}</h3>
      <span className="h-px flex-1 bg-[#CAD6D0]" aria-hidden="true" />
    </div>
  );
}

/* The one loud element on the page: qualifications on a deep pine panel. */
function QualificationsPanel({ items }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#1B3A34] px-6 py-8 sm:px-10 sm:py-10">
      {/* Concentric rings, like a ripple. Purely decorative. */}
      <svg
        viewBox="0 0 320 320"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 text-[#A9C7BB] opacity-[0.14]"
      >
        <circle cx="160" cy="160" r="38" />
        <circle cx="160" cy="160" r="78" />
        <circle cx="160" cy="160" r="118" />
        <circle cx="160" cy="160" r="158" />
      </svg>

      <ul className="relative divide-y divide-[#A9C7BB]/25">
        {items.map((item) => (
          <li key={item.title} className="py-6 first:pt-0 last:pb-0">
            <h4 className="text-balance font-serif text-2xl leading-snug text-[#F1F5F2] sm:text-[1.75rem]">
              {item.title}
            </h4>
            <p className="mt-2 text-sm text-[#A9C7BB]">{item.subtitle}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MembershipList({ items }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.subtitle} className="border-l-2 border-[#8DB0A3] pl-4">
          <p className="text-xs text-[#55695F]">{item.title}</p>
          <p className="mt-1 font-serif text-lg leading-snug text-[#16302B]">
            {item.subtitle}
          </p>
        </li>
      ))}
    </ul>
  );
}

function CertificationList({ items }) {
  return (
    <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 border-b border-[#CAD6D0] pb-4 text-[15px] leading-snug text-[#2B4139]"
        >
          <Check
            className="mt-0.5 h-4 w-4 shrink-0 stroke-2 text-[#2F5B51]"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CredentialsSection() {
  return (
    <section
      aria-labelledby="credentials-heading"
      className="w-full bg-[#EEF2EF]"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <h2
            id="credentials-heading"
            className="font-serif text-5xl leading-[1.05] tracking-tight text-[#16302B] sm:text-6xl lg:col-span-4 lg:sticky lg:top-24 lg:self-start"
          >
            Credentials
          </h2>

          <div className="space-y-14 lg:col-span-8">
            <div>
              <GroupHeading icon={GraduationCap}>Qualifications</GroupHeading>
              <QualificationsPanel items={qualifications} />
            </div>

            {/* <div>
              <GroupHeading icon={Award}>Professional memberships</GroupHeading>
              <MembershipList items={memberships} />
            </div> */}

            {/* <div>
              <GroupHeading icon={ScrollText}>Certifications</GroupHeading>
              <CertificationList items={certifications} />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}