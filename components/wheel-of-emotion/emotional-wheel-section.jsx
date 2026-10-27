"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "../constants/container";
import { EW_IMAGES, getEmotion, getFeelingDetails } from "./data";
import {
  StepChooseEmotion,
  StepChooseFeeling,
  StepChooseStatement,
  StepDeeperLayers,
  StepInsight,
  StepReflection,
} from "./steps";

/** Saves a reflection through the API. Throws so the section can show the error. */
async function saveReflection(r) {
  const res = await fetch("/api/wheel/reflections", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emotion: r.emotion,
      feeling: Array.isArray(r.feelings) ? r.feelings[0] : r.feeling,
      statement: Array.isArray(r.statements) ? r.statements[0] : r.statement,
      need: Array.isArray(r.needs) ? r.needs[0] : r.need,
      reflection: r.reflection,
    }),
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || "Your reflection could not be saved. Please try again.");
  }
}

/* Top bar of the card: Back (hidden on step 1) + Start over ------------ */
function SectionHeader({ step, onBack, onReset }) {
  const tone = step === 5 ? "text-[#F4EFE6]" : "text-[#2B2F2A]";
  return (
    <div className="relative z-20 flex h-14 shrink-0 items-center justify-between px-6 sm:px-8">
      {step > 1 ? (
        <button
          type="button"
          onClick={onBack}
          className={cn(
            "inline-flex cursor-pointer items-center gap-1.5 rounded-sm font-serif text-[15px] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[#C9A46A]",
            tone,
          )}
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.75} />
          Back
        </button>
      ) : (
        <span />
      )}
      {step > 1 && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm font-serif text-[15px] text-[#2B2F2A] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[#C9A46A]"
        >
          <RotateCcw className="size-3.5" strokeWidth={1.75} />
          Start over
        </button>
      )}
    </div>
  );
}

export function EmotionalWheelSection({ wheel = null }) {
  const [step, setStep] = React.useState(1);
  const [emotionId, setEmotionId] = React.useState(null);
  const [feelingIds, setFeelingIds] = React.useState([]);
  const [statements, setStatements] = React.useState([]);
  const [needIds, setNeedIds] = React.useState([]);
  const [reflection, setReflection] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState("");
  const [saved, setSaved] = React.useState(false);

  const cardRef = React.useRef(null);
  const firstRender = React.useRef(true);

  const emotions = wheel?.emotions ?? [];
  const needs = wheel?.needs ?? [];
  const available = emotions.length > 0;
  const emotion = getEmotion(emotions, emotionId);

  const primaryFeelingId = feelingIds[0] ?? null;
  const feeling = emotion?.feelings.find((f) => f.id === primaryFeelingId) ?? null;
  const details =
    emotion && feeling ? getFeelingDetails(emotion, feeling, wheel?.defaultStatements) : null;

  const primaryNeedId = needIds[0] ?? null;
  const need = needs.find((n) => n.id === primaryNeedId) ?? null;
  const layers =
    feeling && details
      ? [
          { title: "Surface Emotion", value: feeling.label },
          { title: "Underlying Emotion", value: details.underlying },
          { title: "Deeper Layer", value: details.deeper },
          { title: "Core Need", value: need?.coreNeed ?? details.coreNeed },
        ]
      : [];

  // When the step changes, make sure the card is visible (helpful on phones)
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [step]);

  const resetFlow = () => {
    setStep(1);
    setEmotionId(null);
    setFeelingIds([]);
    setStatements([]);
    setNeedIds([]);
    setReflection("");
    setSaveError("");
    setSaving(false);
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const selectEmotion = (id) => {
    if (id !== emotionId) {
      setFeelingIds([]);
      setStatements([]);
      setNeedIds([]);
    }
    setEmotionId(id);
    setSaved(false);
    setStep(2);
  };

  const toggleFeeling = (id) => {
    setFeelingIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setStatements([]);
    setNeedIds([]);
  };

  const toggleStatement = (s) => {
    setStatements((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const toggleNeed = (id) => {
    setNeedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const save = async () => {
    if (!emotion || feelingIds.length === 0 || saving) return;
    setSaveError("");
    setSaving(true);
    try {
      await saveReflection({
        emotion: emotion.id,
        feelings: feelingIds,
        statements,
        needs: needIds,
        reflection: reflection.trim(),
      });
      setSaved(true);
      resetFlow();
    } catch (e) {
      setSaveError(e?.message || "Your reflection could not be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="explore" className="w-full scroll-mt-6 bg-[#FBF8F3]">
      <Container className="py-12 lg:py-16 xl:py-20">
        {!available ? (
          <p className="mx-auto w-full rounded-xl bg-white/70 px-4 py-3 text-center font-avenir text-sm text-[#1C2E22]">
            The Wheel of Emotions is being updated. Please check back soon.
          </p>
        ) : (
          <div className="mx-auto flex w-full w-full flex-col gap-4">
            {saved && (
              <p
                role="status"
                className="flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2.5 font-avenir text-sm text-[#1C2E22]"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#A67539]" />
                Your reflection has been saved. Thank you for taking a moment for yourself.
              </p>
            )}

            <div
              ref={cardRef}
              className="relative flex h-[640px] w-full flex-col overflow-hidden rounded-2xl border border-[#E6DCCB] bg-[#F4EFE6] text-[#2B2F2A] shadow-xl sm:h-[580px]"
            >
              {/* background art */}
              <Image
                src={step === 5 ? EW_IMAGES.rock : EW_IMAGES.mist}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 640px) 100vw, 880px"
                className={cn(
                  "pointer-events-none z-0 object-cover object-bottom-left mix-blend-multiply",
                  step === 5 ? "opacity-100" : "opacity-60",
                )}
              />

              <SectionHeader step={step} onBack={goBack} onReset={resetFlow} />

              <div
                key={step}
                className="relative z-10 flex min-h-0 flex-1 flex-col animate-in fade-in-0 duration-300"
              >
                {step === 1 && (
                  <StepChooseEmotion
                    emotions={emotions}
                    quote={wheel?.quote}
                    selectedId={emotionId}
                    onSelect={selectEmotion}
                  />
                )}

                {step === 2 && emotion && (
                  <StepChooseFeeling
                    emotion={emotion}
                    selectedIds={feelingIds}
                    onToggle={toggleFeeling}
                    onNext={() => setStep(3)}
                  />
                )}

                {step === 3 && feeling && details && (
                  <StepChooseStatement
                    feeling={feeling}
                    statements={details.statements}
                    selected={statements}
                    onToggle={toggleStatement}
                    onNext={() => setStep(4)}
                  />
                )}

                {step === 4 && details && (
                  <StepInsight
                    heading={details.heading}
                    insight={details.insight}
                    needs={needs}
                    selectedNeedIds={needIds}
                    onToggleNeed={toggleNeed}
                    onNext={() => setStep(5)}
                  />
                )}

                {step === 5 && <StepDeeperLayers layers={layers} onNext={() => setStep(6)} />}

                {step === 6 && (
                  <StepReflection
                    value={reflection}
                    onChange={setReflection}
                    onExploreAnother={resetFlow}
                    onSave={save}
                    saving={saving}
                    error={saveError}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export default EmotionalWheelSection;
