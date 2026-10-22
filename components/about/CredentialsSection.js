"use client";

import { GraduationCap, Award, ScrollText } from "lucide-react";

const qualifications = [
  { title: "Doctor of Psychology (PsyD)", subtitle: "California, USA" },
  { title: "Post Graduate Diploma in Clinical Psychology", subtitle: "UK / Ireland" },
  { title: "MSc Psychology", subtitle: "London" },
  { title: "Licensed Neuro-Linguistic Programming (NLP) Practitioner", subtitle: "Society of NLP, UK" },
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

function CredentialCard({ icon: Icon, title, children }) {
  return (
    <div className="flex flex-col rounded-3xl border border-[#E5DFD5] bg-[#FAF8F5] p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFE9DF] text-[#5A5144]">
          <Icon className="h-5 w-5 stroke-[1.5]" />
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E6558]">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function CredentialItem({ title, subtitle, isLast }) {
  return (
    <div className={isLast ? "" : "border-b border-[#E5DFD5]/60 pb-4"}>
      <h4 className="font-serif text-base font-medium leading-snug text-[#1E1B18]">
        {title}
      </h4>
      <p className="mt-0.5 text-xs font-light text-[#82786B]">{subtitle}</p>
    </div>
  );
}

export default function CredentialsSection() {
  return (
    <section className="w-full bg-[#FAF8F5]">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          <CredentialCard icon={GraduationCap} title="Qualifications">
            <div className="space-y-5">
              {qualifications.map((item, idx) => (
                <CredentialItem
                  key={item.title}
                  {...item}
                  isLast={idx === qualifications.length - 1}
                />
              ))}
            </div>
          </CredentialCard>

          <CredentialCard icon={Award} title="Professional Memberships">
            <div className="space-y-6">
              {memberships.map((item, idx) => (
                <CredentialItem
                  key={item.subtitle}
                  {...item}
                  isLast={idx === memberships.length - 1}
                />
              ))}
            </div>
          </CredentialCard>

          <CredentialCard icon={ScrollText} title="Certifications">
            <div className="space-y-3.5">
              {certifications.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C7263]" />
                  <p className="text-xs font-light leading-snug text-[#4A443C] sm:text-sm">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </CredentialCard>
        </div>
      </div>
    </section>
  );
}
