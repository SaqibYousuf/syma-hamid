"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

export default function AssessmentQuestion({
  question,
  questionNumber,
  totalQuestions,
  answer,
  onSelect,
  onText,
  onPrevious,
  onNext,
  isLast,
  submitting,
  submitError,
}) {
  if (!question) return null;

  const progress = (questionNumber / totalQuestions) * 100;
  const isText = question.type === "text";
  const canContinue = isText || Boolean(answer?.optionId);

  return (
    <section className="relative isolate flex min-h-full flex-col">
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
        {/* Progress information */}
        <div className="flex items-center justify-between gap-3 pr-10 sm:pr-12">
          <p className="font-avenir text-sm font-normal leading-relaxed text-[#1C2E22] sm:text-base md:text-[19.37px]">
            Question <span className="font-semibold">{questionNumber}</span> of{" "}
            <span className="font-semibold">{totalQuestions}</span>
          </p>

          <p className="shrink-0 font-avenir text-xs text-[#A2A3A7] sm:text-sm">{Math.round(progress)}%</p>
        </div>

        <div
          className="mt-3 h-1 overflow-hidden rounded-full bg-[#1C2E221A] sm:mt-4"
          role="progressbar"
          aria-label="Assessment progress"
          aria-valuenow={questionNumber}
          aria-valuemin={1}
          aria-valuemax={totalQuestions}
        >
          <div className="h-full rounded-full bg-[#1C2E22] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        {/* Current question */}
        <h2
          id={`question-${question.id}`}
          className="mt-6 font-cormorant text-[clamp(1.6rem,5vw,3.08rem)] font-semibold leading-[1.12] tracking-normal text-[#1C2E22] sm:mt-8"
        >
          {question.question}
        </h2>

        {/* Answer */}
        {isText ? (
          <div className="mt-6 sm:mt-8">
            <label htmlFor={`answer-${question.id}`} className="sr-only">
              Your reflection
            </label>
            <textarea
              id={`answer-${question.id}`}
              rows={5}
              maxLength={5000}
              value={answer?.text ?? ""}
              onChange={(e) => onText(e.target.value)}
              placeholder="Take a moment and write whatever comes to mind (optional)…"
              className="w-full resize-y rounded-xl border border-[#1C2E22]/20 bg-white/60 px-4 py-3 font-avenir text-sm text-[#1C2E22] outline-none transition placeholder:text-[#1C2E22]/40 focus:border-[#1C2E22] sm:text-base"
            />
          </div>
        ) : (
          <div className="mt-6 space-y-3 sm:mt-8" role="radiogroup" aria-labelledby={`question-${question.id}`}>
            {question.options.map((option) => {
              const isSelected = answer?.optionId === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelect(option.id)}
                  className={`flex min-h-14 w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-3.5 text-left font-avenir text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C2E22]/40 sm:gap-4 sm:px-5 sm:py-4 sm:text-base ${
                    isSelected
                      ? "border-[#1C2E22] bg-[#1C2E22]/10 text-[#1C2E22]"
                      : "border-[#1C2E22]/20 text-[#26372E] hover:border-[#1C2E22]/50"
                  }`}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#1C2E22]/50 sm:size-8">
                    {isSelected && <span className="size-2.5 rounded-full bg-[#1C2E22]" />}
                  </span>
                  <span className="min-w-0 flex-1">{option.text}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:mt-8">
          {submitError && isLast && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-avenir text-sm text-red-800">
              {submitError}
            </p>
          )}
          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              onClick={onPrevious}
              disabled={submitting}
              className="min-h-11 cursor-pointer border-none bg-transparent px-4 font-avenir text-sm text-[#1C2E22] transition-colors hover:bg-[#1C2E22]/5 sm:px-6"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
              Previous
            </Button>

            <Button
              type="button"
              onClick={onNext}
              disabled={!canContinue || submitting}
              className="h-[54px] min-w-[130px] cursor-pointer rounded-[9px] bg-[#1C2E22] px-5 font-avenir text-sm font-medium text-white transition-opacity hover:bg-[#1C2E22] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting && isLast ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
              ) : (
                <>
                  {isLast ? "Finish" : "Next"}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
