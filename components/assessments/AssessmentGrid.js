"use client";

import { useEffect, useState } from "react";
import Container from "@/components/constants/container";
import AssessmentCard from "@/components/assessments/AssessmentCard";
import AssessmentModal from "@/components/assessments/AssessmentModal";

export default function AssessmentGrid({ assessments = [], loadError = false, initialOpen = null }) {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  // Support links like /assessments?open=identify-your-pattern
  useEffect(() => {
    if (!initialOpen) return;
    const match = assessments.find((a) => a.slug === initialOpen || String(a.id) === initialOpen);
    if (match && match.question_count > 0) {
      setSelected(match);
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialOpen]);

  const handleBeginReflection = (assessment) => {
    setSelected(assessment);
    setOpen(true);
  };

  return (
    <section className="bg-[#f5efe2] py-7 sm:py-8 md:py-9">
      <Container>
        <h2 className="mb-5 text-center text-[9px] font-medium uppercase tracking-[0.18em] text-[#303c33] sm:mb-6 sm:text-[10px]">
          Choose an assessment
        </h2>

        {loadError ? (
          <p className="mx-auto max-w-md text-center font-avenir text-base text-[#465149]">
            Assessments could not be loaded right now. Please refresh the page or try again in a few minutes.
          </p>
        ) : assessments.length === 0 ? (
          <p className="mx-auto max-w-md text-center font-avenir text-base text-[#465149]">New assessments are coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-2.5">
            {assessments.map((assessment, index) => (
              <AssessmentCard
                key={assessment.id}
                number={String(index + 1).padStart(2, "0")}
                assessment={assessment}
                handleClick={handleBeginReflection}
              />
            ))}
          </div>
        )}
      </Container>
      <AssessmentModal open={open} onOpenChange={setOpen} assessment={selected} />
    </section>
  );
}
