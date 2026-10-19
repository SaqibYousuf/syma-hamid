"use client";

import Container from "@//components/constants/container";
import AssessmentCard from "@/components/assessments/AssessmentCard";
import AssessmentModal from "@/components/assessments/AssessmentModal";
import { useState } from "react";


const assessments = [
  {
    id: "01",
    title: "What Is Really Hurting You in Your Relationships?",
    description:
      "Discover the emotional patterns beneath relationship pain.",
    questions: 12,
    duration: "5 Minutes",
    image: "/images/assessment/assessment-1.png",
  },
  {
    id: "02",
    title: "What Kind of Grief Are You Carrying?",
    description:
      "Explore the losses that may still be asking for peace.",
    questions: 10,
    duration: "3 Minutes",
    image: "/images/assessment/assessment-2.png",
  },
  {
    id: "03",
    title: "Are You Losing Yourself in Your Relationship?",
    description:
      "Notice where connection may be coming at the cost of self.",
    questions: 10,
    duration: "3 Minutes",
    image: "/images/assessment/assessment-3.png",
  },
  {
    id: "04",
    title: "How Do You Respond When You Feel Hurt?",
    description:
      "Understand your instinctive response to emotional pain.",
    questions: 10,
    duration: "3 Minutes",
    image: "/images/assessment/assessment-4.png",
  },
  {
    id: "05",
    title: "Are You Ready for Change?",
    description:
      "Explore where you are in your readiness for personal change.",
    questions: 10,
    duration: "3 Minutes",
    image: "/images/assessment/assessment-5.png",
  },
  {
    id: "06",
    title: "Identify Your Pattern",
    description:
      "Recognize the thoughts, emotions and behaviors that may keep repeating.",
    questions: 12,
    duration: "4 Minutes",
    image: "/images/assessment/assessment-6.png",
  },
];



export default function AssessmentGrid() {
  const [open, setOpen] = useState(false);
  const handleBeginReflection = (assessmentId) => {
    setOpen(true);
    console.log(`Begin reflection for assessment ID: ${assessmentId}`);
  }
  return (
    <section className="bg-[#f5efe2] py-7 sm:py-8 md:py-9">
      <Container>
        <h2 className="mb-5 text-center text-[9px] font-medium uppercase tracking-[0.18em] text-[#303c33] sm:mb-6 sm:text-[10px]">
          Choose an assessment
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-2.5">
          {assessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              handleClick={handleBeginReflection}
            />
          ))}
        </div>
      </Container>
      <AssessmentModal
        open={open} onOpenChange={setOpen}
      />
    </section>
  );
}
