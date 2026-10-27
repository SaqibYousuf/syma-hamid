"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import AssessmentIntro from "@/components/assessments/AssessmentIntro";
import AssessmentQuestion from "@/components/assessments/AssessmentQuestion";
import PatternProfilesView from "@/components/assessments/AssessmentPatternProfile";
import PatternResultView from "@/components/assessments/AssessmentPatternResultView";
import PatternIdentityView from "@/components/assessments/AssessmentPatternIdentityView";

/**
 * Screens:
 *   loading → intro → question (1..n) → result
 *   result → closing ("pattern is not your identity") → profiles → profile
 */
export default function AssessmentModal({ open, onOpenChange, assessment }) {
  const [screen, setScreen] = useState("loading");
  const [data, setData] = useState(null); // full assessment with questions
  const [loadError, setLoadError] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: { optionId } | { text } }
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState(null); // response from submit
  const [viewProfile, setViewProfile] = useState(null);
  const scrollRef = useRef(null);

  // Load questions whenever a (different) assessment is opened
  useEffect(() => {
    if (!open || !assessment) return;
    if (data?.id === assessment.id) return;
    let cancelled = false;
    setScreen("loading");
    setLoadError("");
    fetch(`/api/assessments/${assessment.id}`)
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json.error || "Could not load this assessment.");
        return json.assessment;
      })
      .then((full) => {
        if (cancelled) return;
        setData(full);
        setScreen("intro");
      })
      .catch((e) => !cancelled && setLoadError(e.message));
    return () => {
      cancelled = true;
    };
  }, [open, assessment, data?.id]);

  // Scroll modal content to the top on every screen change
  useEffect(() => {
    scrollRef.current?.scrollTo?.({ top: 0 });
  }, [screen, questionIndex, viewProfile]);

  const questions = data?.questions ?? [];
  const current = questions[questionIndex];

  function reset() {
    setScreen(data ? "intro" : "loading");
    setQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setViewProfile(null);
    setSubmitError("");
  }

  function handleOpenChange(isOpen) {
    onOpenChange(isOpen);
    if (!isOpen) {
      // wait for the close animation before resetting
      setTimeout(() => {
        reset();
        setData((d) => d); // keep loaded data cached
      }, 150);
    }
  }

  const isAnswered = (q) => {
    if (!q) return false;
    const a = answers[q.id];
    return q.type === "text" ? true : Boolean(a?.optionId);
  };

  function handleNext() {
    if (!isAnswered(current)) return;
    if (questionIndex < questions.length - 1) setQuestionIndex((i) => i + 1);
    else handleCalculate();
  }

  function handlePrevious() {
    if (questionIndex === 0) setScreen("intro");
    else setQuestionIndex((i) => i - 1);
  }

  async function handleCalculate() {
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/assessments/${data.id}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: questions.map((q) => ({ questionId: q.id, ...answers[q.id] })),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setResult(json);
      setScreen("result");
    } catch (e) {
      setSubmitError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  const hasClosing = Boolean(result?.closing?.title || result?.closing?.text || result?.closing?.reflection);
  const otherProfiles = (result?.profiles ?? []).filter((p) => p.id !== result?.result?.id);

  let content;
  if (loadError) {
    content = (
      <div className="flex min-h-80 flex-col items-center justify-center gap-4 bg-[#141210] p-8 text-center text-[#FAF6EF]">
        <p className="font-avenir">{loadError}</p>
        <DialogClose className="cursor-pointer rounded-full bg-[#F4F1EA] px-6 py-2.5 text-sm font-medium text-[#1C1A17]">Close</DialogClose>
      </div>
    );
  } else if (screen === "loading" || !data) {
    content = (
      <div className="flex min-h-80 items-center justify-center bg-[#141210] text-[#FAF6EF]">
        <Loader2 className="h-6 w-6 animate-spin" aria-label="Loading" />
      </div>
    );
  } else if (screen === "intro") {
    content = <AssessmentIntro assessment={data} onBegin={() => setScreen("question")} onBack={() => handleOpenChange(false)} />;
  } else if (screen === "question") {
    content = (
      <AssessmentQuestion
        question={current}
        questionNumber={questionIndex + 1}
        totalQuestions={questions.length}
        answer={answers[current?.id]}
        onSelect={(optionId) => setAnswers((a) => ({ ...a, [current.id]: { optionId } }))}
        onText={(text) => setAnswers((a) => ({ ...a, [current.id]: { text } }))}
        onPrevious={handlePrevious}
        onNext={handleNext}
        isLast={questionIndex === questions.length - 1}
        submitting={submitting}
        submitError={submitError}
      />
    );
  } else if (screen === "result" && result?.result) {
    content = (
      <PatternResultView
        profile={result.result}
        isOwn
        onBack={() => setScreen("question")}
        onNext={() => setScreen(hasClosing ? "closing" : "profiles")}
        nextLabel={hasClosing ? "Explore Deeper Insights" : "See the other profiles"}
        showNext={hasClosing || otherProfiles.length > 0}
      />
    );
  } else if (screen === "result") {
    // Assessment without profiles: just thank the visitor
    content = (
      <PatternIdentityView
        closing={{ title: "Thank you for reflecting.", text: "Your answers have been received.", reflection: result?.closing?.reflection }}
        onBack={() => setScreen("question")}
      />
    );
  } else if (screen === "closing") {
    content = (
      <PatternIdentityView
        closing={result.closing}
        onBack={() => setScreen("result")}
        onExplore={otherProfiles.length ? () => setScreen("profiles") : null}
      />
    );
  } else if (screen === "profiles") {
    content = (
      <PatternProfilesView
        profiles={otherProfiles}
        onBack={() => setScreen(hasClosing ? "closing" : "result")}
        onSelect={(profile) => {
          setViewProfile(profile);
          setScreen("profile");
        }}
      />
    );
  } else if (screen === "profile" && viewProfile) {
    content = <PatternResultView profile={viewProfile} onBack={() => setScreen("profiles")} showNext={false} />;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          flex w-[calc(100vw-24px)]! max-w-215! flex-col
          max-h-[92dvh] overflow-hidden
          rounded-[20px] border-0 p-0
          text-[#EFECE6] shadow-2xl ring-1 ring-white/10
          sm:w-[90vw]! sm:max-h-[calc(100dvh-40px)]
          sm:rounded-[30px]
          lg:rounded-[34px]"
      >
        <DialogTitle className="sr-only">{assessment?.title || "Assessment"}</DialogTitle>
        <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {content}
        </div>
        {/* Always-available close button (some screens have their own too) */}
        {(screen === "question") && (
          <DialogClose
            className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#1C2E22] transition-colors hover:bg-[#1C2E22]/10 sm:right-5 sm:top-5"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
}
