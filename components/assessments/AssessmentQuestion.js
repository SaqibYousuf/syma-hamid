"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DialogClose } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "When something difficult happens, what do you do first?",
    options: [
      { id: "1a", text: "Look for what I did wrong" },
      { id: "1b", text: "Try to regain control" },
      { id: "1c", text: "Pull away and process alone" },
      { id: "1d", text: "Focus on the other person's needs" },
    ],
  },
  {
    id: 2,
    question: "When someone disappoints you, how do you usually respond?",
    options: [
      { id: "2a", text: "Question what I could have done differently" },
      { id: "2b", text: "Try to fix the situation immediately" },
      { id: "2c", text: "Withdraw and keep my feelings to myself" },
      { id: "2d", text: "Try to understand and reassure them" },
    ],
  },
  {
    id: 3,
    question: "When you feel misunderstood, what is your first instinct?",
    options: [
      { id: "3a", text: "Blame myself for not explaining clearly" },
      { id: "3b", text: "Explain my point until I feel understood" },
      { id: "3c", text: "Stop explaining and distance myself" },
      { id: "3d", text: "Focus on making the other person comfortable" },
    ],
  },
  {
    id: 4,
    question: "When a relationship feels uncertain, what do you tend to do?",
    options: [
      { id: "4a", text: "Wonder whether I am the problem" },
      { id: "4b", text: "Seek answers and reassurance" },
      { id: "4c", text: "Create distance to protect myself" },
      { id: "4d", text: "Try harder to keep the connection strong" },
    ],
  },
  {
    id: 5,
    question: "When someone criticizes you, what feels most natural?",
    options: [
      { id: "5a", text: "Take it personally and question myself" },
      { id: "5b", text: "Defend myself and explain my actions" },
      { id: "5c", text: "Shut down and avoid further discussion" },
      { id: "5d", text: "Agree to keep the situation peaceful" },
    ],
  },
  {
    id: 6,
    question: "When you feel overwhelmed, how do you usually cope?",
    options: [
      { id: "6a", text: "Analyze what I should have done better" },
      { id: "6b", text: "Make a plan to regain control" },
      { id: "6c", text: "Withdraw until I can process everything" },
      { id: "6d", text: "Put other people's needs before my own" },
    ],
  },
  {
    id: 7,
    question: "When you need support, what is hardest for you?",
    options: [
      { id: "7a", text: "Feeling like I am asking for too much" },
      { id: "7b", text: "Not knowing how to solve the problem myself" },
      { id: "7c", text: "Opening up about what I am feeling" },
      { id: "7d", text: "Worrying about burdening someone else" },
    ],
  },
  {
    id: 8,
    question: "When conflict arises, what do you tend to prioritize?",
    options: [
      { id: "8a", text: "Understanding what I did wrong" },
      { id: "8b", text: "Finding a solution as quickly as possible" },
      { id: "8c", text: "Getting space away from the tension" },
      { id: "8d", text: "Restoring harmony between everyone" },
    ],
  },
  {
    id: 9,
    question: "When someone becomes distant, what do you usually assume?",
    options: [
      { id: "9a", text: "I must have done something wrong" },
      { id: "9b", text: "I need to find out what has changed" },
      { id: "9c", text: "I should distance myself too" },
      { id: "9d", text: "I should do more to reconnect" },
    ],
  },
  {
    id: 10,
    question: "When your needs conflict with someone else's, what do you do?",
    options: [
      { id: "10a", text: "Feel guilty for having needs of my own" },
      { id: "10b", text: "Try to negotiate an outcome that works" },
      { id: "10c", text: "Keep my needs private and step back" },
      { id: "10d", text: "Put their needs first to avoid tension" },
    ],
  },
  {
    id: 11,
    question: "When you make a mistake, how do you typically react?",
    options: [
      { id: "11a", text: "Replay it and criticize myself" },
      { id: "11b", text: "Fix it immediately and regain control" },
      { id: "11c", text: "Avoid thinking about it for a while" },
      { id: "11d", text: "Worry about how it affected others" },
    ],
  },
  {
    id: 12,
    question: "When the same problem keeps repeating, what do you do?",
    options: [
      { id: "12a", text: "Look inward for what I need to change" },
      { id: "12b", text: "Try a new strategy to change the outcome" },
      { id: "12c", text: "Pull back to protect my energy" },
      { id: "12d", text: "Work harder to make things better for everyone" },
    ],
  },
];

export default function AssessmentQuestion({
  selectedOption,
  onSelect,
  onPrevious,
  onNext,
  onBack,
  questionNumber,
  totalQuestions
}) {
  const currentQuestion = questions[questionNumber - 1];

  if (!currentQuestion) return null;

  const progress = (questionNumber / questions.length) * 100;

  return (
    <section className="relative flex min-h-full flex-col">
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
        <Image
          src="/images/assessment/modal_background_2.png"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 860px"
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-4 py-5 sm:px-8 sm:py-8 md:px-10 md:py-9 lg:px-12 lg:py-10">
        {/* Header */}
        {/* <div className="mb-6 flex w-full items-center justify-between gap-3 text-[#1C2E22] sm:mb-9">
          <DialogClose className="inline-flex cursor-pointer items-center gap-2 rounded-sm font-cormorant text-[29.64px] font-semibold leading-[36.48px] tracking-normal capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1C9BC]">
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Back</span>
          </DialogClose>

          <DialogClose className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm font-cormorant text-[29.64px] font-semibold leading-[36.48px] tracking-normal capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1C9BC]">
            <X className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Close</span>
          </DialogClose>
        </div> */}

        {/* Progress information */}
        <div className="flex items-center justify-between gap-3">
          <p className="font-avenir text-sm font-normal leading-relaxed text-[#1C2E22] sm:text-base md:text-[19.37px]">
            Question{" "}
            <span className="font-semibold">{questionNumber}</span> of{" "}
            <span className="font-semibold">{questions.length}</span>
          </p>

          <p className="shrink-0 font-avenir text-xs text-[#A2A3A7] sm:text-sm">
            {Math.round(progress)}%
          </p>
        </div>

        <div
          className="mt-3 h-1 overflow-hidden rounded-full bg-[#1C2E221A] sm:mt-4"
          role="progressbar"
          aria-label="Assessment progress"
          aria-valuenow={questionNumber}
          aria-valuemin={1}
          aria-valuemax={questions.length}
        >
          <div
            className="h-full rounded-full bg-[#1C2E22] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Current question */}
        <h2
          id={`question-${currentQuestion.id}`}
          className="mt-6 font-cormorant text-[clamp(1.9rem,5vw,3.08rem)] font-semibold leading-[1.12] tracking-normal text-[#1C2E22] sm:mt-8"
        >
          {currentQuestion.question}
        </h2>

        {/* Answer options */}
        <div
          className="mt-6 space-y-3 sm:mt-8"
          role="group"
          aria-labelledby={`question-${currentQuestion.id}`}
        >
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option.id;

            return (
              <div
                key={option.id}
                type="button"
                onClick={() => onSelect(option.id, option.text)}
                aria-pressed={isSelected}
                className={`flex min-h-14 w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-3.5 text-left font-avenir text-sm transition-colors sm:gap-4 sm:px-5 sm:py-4 sm:text-base ${
                  isSelected
                    ? "border-[#1C2E22] bg-[#1C2E22]/10 text-[#1C2E22]"
                    : "border-[#1C2E22]/20 text-[#26372E] hover:border-[#1C2E22]/50"
                }`}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#1C2E22]/50 sm:size-8">
                  {isSelected && (
                    <span className="size-2.5 rounded-full bg-[#1C2E22]" />
                  )}
                </span>

                <span className="min-w-0 flex-1">{option.text}</span>
              </div>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="mt-6 flex items-center justify-between gap-3 sm:mt-8">
          <Button
            type="button"
            onClick={onPrevious}
            disabled={questionNumber === 1}
            className="min-h-11 cursor-pointer border-none bg-transparent px-4 font-avenir text-sm text-[#1C2E22] transition-colors hover:bg-[#1C2E22]/5 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            Previous
          </Button>

          <Button
            type="button"
            onClick={onNext}
            disabled={!selectedOption}
            className="h-[54.07px] w-[130.06px] cursor-pointer rounded-[9.27px] bg-[#1C2E22] px-4 font-avenir text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            {/* {questionNumber === questions.length ? "Finish" : "Next"} */}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
