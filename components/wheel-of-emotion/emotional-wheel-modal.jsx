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
import { EW_IMAGES, NEEDS, getEmotion, getFeelingDetails } from "./data";
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
  const [feelingId, setFeelingId] = React.useState(null);
  const [statement, setStatement] = React.useState(null);
  const [needId, setNeedId] = React.useState(null);
  const [reflection, setReflection] = React.useState("");
  const emotion = getEmotion(emotionId);
  const feeling = emotion?.feelings.find((f) => f.id === feelingId) ?? null;
  const details =
    emotion && feeling ? getFeelingDetails(emotion, feeling) : null;
  const need = NEEDS.find((n) => n.id === needId) ?? null;
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
    setFeelingId(null);
    setStatement(null);
    setNeedId(null);
    setReflection("");
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
      setFeelingId(null);
      setStatement(null);
      setNeedId(null);
    }
    setEmotionId(id);
    setStep(2);
  };
  const selectFeeling = (id) => {
    if (id !== feelingId) setStatement(null);
    setFeelingId(id);
  };
  const exploreAnother = () => {
    setEmotionId(null);
    setFeelingId(null);
    setStatement(null);
    setNeedId(null);
    setReflection("");
    setStep(1);
  };
  const save = () => {
    if (!emotion || !feeling) return;
    onSaveReflection?.({
      emotion: emotion.id,
      feeling: feeling.label,
      statement,
      need: needId,
      layers,
      reflection: reflection.trim(),
      createdAt: new Date().toISOString(),
    });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
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
              selectedId={emotionId}
              onSelect={selectEmotion}
            />
          )}

          {step === 2 && emotion && (
            <StepChooseFeeling
              emotion={emotion}
              selectedId={feelingId}
              onSelect={selectFeeling}
              onNext={() => setStep(3)}
            />
          )}

          {step === 3 && feeling && details && (
            <StepChooseStatement
              feeling={feeling}
              statements={details.statements}
              selected={statement}
              onSelect={setStatement}
              onNext={() => setStep(4)}
            />
          )}

          {step === 4 && details && (
            <StepInsight
              heading={details.heading}
              insight={details.insight}
              selectedNeed={needId}
              onSelectNeed={setNeedId}
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
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
