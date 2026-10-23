"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { EW_IMAGES, getEmotion, getFeelingDetails } from "./data";
import {
  StepChooseEmotion,
  StepChooseFeeling,
  StepChooseStatement,
  StepDeeperLayers,
  StepInsight,
  StepReflection,
} from "./steps";
import { ModalHeader } from "./ui";
import Image from "next/image";

export function EmotionalWheelModal({
  wheel,
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  trigger,
  onSaveReflection,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const [step, setStep] = React.useState(1);
  const [emotionId, setEmotionId] = React.useState(null);
  // multi-select: arrays instead of single values
  const [feelingIds, setFeelingIds] = React.useState([]);
  const [statements, setStatements] = React.useState([]);
  const [needIds, setNeedIds] = React.useState([]);
  const [reflection, setReflection] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState("");
  const emotions = wheel?.emotions ?? [];
  const needs = wheel?.needs ?? [];
  const emotion = getEmotion(emotions, emotionId);

  // Use the first selected feeling for deeper-layer details (step 3–5)
  const primaryFeelingId = feelingIds[0] ?? null;
  const feeling = emotion?.feelings.find((f) => f.id === primaryFeelingId) ?? null;
  const details =
    emotion && feeling ? getFeelingDetails(emotion, feeling, wheel?.defaultStatements) : null;

  // Build layers from primary feeling
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

  const resetFlow = React.useCallback(() => {
    setStep(1);
    setEmotionId(null);
    setFeelingIds([]);
    setStatements([]);
    setNeedIds([]);
    setReflection("");
    setSaveError("");
    setSaving(false);
  }, []);

  const setOpen = (next) => {
    if (openProp === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
    // wait for the close animation before resetting the content
    if (!next) window.setTimeout(resetFlow, 200);
  };

  const goBack = () => (step === 1 ? setOpen(false) : setStep((s) => s - 1));

  const selectEmotion = (id) => {
    if (id !== emotionId) {
      setFeelingIds([]);
      setStatements([]);
      setNeedIds([]);
    }
    setEmotionId(id);
    setStep(2);
  };

  // Toggle helpers for multi-select
  const toggleFeeling = (id) => {
    setFeelingIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    // reset downstream when changing feelings
    setStatements([]);
    setNeedIds([]);
  };

  const toggleStatement = (s) => {
    setStatements((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const toggleNeed = (id) => {
    setNeedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const exploreAnother = () => {
    setEmotionId(null);
    setFeelingIds([]);
    setStatements([]);
    setNeedIds([]);
    setReflection("");
    setStep(1);
  };

  const save = async () => {
    if (!emotion || feelingIds.length === 0 || saving) return;
    setSaveError("");
    setSaving(true);
    try {
      // onSaveReflection may return a promise; if it throws, keep the modal open and show the error
      await onSaveReflection?.({
        emotion: emotion.id,
        emotionLabel: emotion.label,
        feelings: feelingIds,
        feelingLabels: feelingIds.map((id) => emotion.feelings.find((f) => f.id === id)?.label).filter(Boolean),
        statements,
        needs: needIds,
        layers,
        reflection: reflection.trim(),
        createdAt: new Date().toISOString(),
      });
      setOpen(false);
    } catch (e) {
      setSaveError(e?.message || "Your reflection could not be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger nativeButton={false} render={trigger} />}

      <DialogContent
        className={cn(
          // same fixed size for every step
          "flex h-[min(560px,calc(100dvh-2rem))] w-[calc(100vw-2rem)] max-w-220 flex-col gap-0 overflow-hidden rounded-2xl border border-[#E6DCCB] bg-[#F4EFE6] p-0 text-[#2B2F2A] shadow-2xl sm:max-w-[880px]",
          // hide shadcn's built in close icon, this modal has its own
          "[&>button.absolute]:hidden *:data-[slot=dialog-close]:hidden",
        )}
      >
        <DialogTitle className="sr-only text-[#1C2E22]">
          Emotional wheel
        </DialogTitle>
        <DialogDescription className="sr-only text-[#1C2E22]">
          Explore what you are feeling, what might be underneath, and write a
          reflection.
        </DialogDescription>

        {/* background art */}
        <Image
          src={step === 5 ? EW_IMAGES.rock : EW_IMAGES.mist}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 880px"
          className={cn(
            "pointer-events-none z-0 object-cover object-bottom-left mix-blend-multiply",
            step === 5 ? "opacity-100" : "opacity-60",
          )}
        />

        <ModalHeader
          onBack={goBack}
          onClose={() => setOpen(false)}
          backTone={step === 5 ? "light" : "dark"}
        />

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

          {step === 5 && (
            <StepDeeperLayers layers={layers} onNext={() => setStep(6)} />
          )}

          {step === 6 && (
            <StepReflection
              value={reflection}
              onChange={setReflection}
              onExploreAnother={exploreAnother}
              onSave={save}
              saving={saving}
              error={saveError}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
