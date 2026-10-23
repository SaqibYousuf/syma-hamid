import { ArrowRight, Bookmark, Flower2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { EW_IMAGES } from "./data";
import { getWheelIcon } from "./icons";
import { EmotionWheel } from "./emotion-wheel";
import {
  Eyebrow,
  GoldDivider,
  OptionPill,
  PrimaryButton,
  SecondaryButton,
  StepBody,
  Subtitle,
  Title,
} from "./ui";

function NextButton({ disabled, onClick }) {
  return (
    <PrimaryButton disabled={disabled} onClick={onClick}>
      Next
      <ArrowRight strokeWidth={1.75} />
    </PrimaryButton>
  );
}

/* Step 01: The emotional wheel ---------------------------------------- */
export function StepChooseEmotion({ emotions, quote, selectedId, onSelect }) {
  return (
    <div className="relative z-10 flex min-h-0 flex-1">
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto px-6 pb-6 sm:px-10">
        <Eyebrow>The emotional wheel</Eyebrow>
        <Title className="mt-1.5">What are you feeling?</Title>
        <p className="mt-2 max-w-75 text-[12px] leading-relaxed text-[#4A4D46]">
          Choose the emotion that feels most familiar right now. You can always explore
          more.
        </p>
        <div className="flex flex-1 items-center justify-center py-4">
          <EmotionWheel emotions={emotions} selectedId={selectedId} onSelect={onSelect} />
        </div>
      </div>

      <div className="mb-6 hidden w-px shrink-0 bg-[#DCD1BE] md:block" aria-hidden />

      <aside className="relative mb-6 ml-4 mr-6 hidden w-[270px] shrink-0 flex-col items-center overflow-hidden rounded-md bg-[#EDE6D8] px-6 pt-12 md:flex">
        {quote && (
          <blockquote className="text-center font-serif text-[19px] italic leading-snug text-[#2B2F2A]">
            &ldquo;{quote}&rdquo;
          </blockquote>
        )}
        <GoldDivider className="mt-6" />
        <img
          src={EW_IMAGES.botanical}
          alt=""
          aria-hidden
          className="pointer-events-none mt-auto h-[230px] w-auto select-none object-contain object-bottom opacity-80 mix-blend-multiply"
        />
      </aside>
    </div>
  );
}

/* Step 02: Pick a feeling --------------------------------------------- */
export function StepChooseFeeling({ emotion, selectedIds, onToggle, onNext }) {
  return (
    <StepBody footer={<NextButton disabled={selectedIds.length === 0} onClick={onNext} />}>
      <Title className="mt-3">{emotion.label}</Title>
      <Subtitle>{emotion.description}</Subtitle>

      <p className="mt-7 text-[13px] text-[#2B2F2A]">
        {emotion.prompt ?? "Explore what feels closest to you:"}
      </p>
      <div
        role="group"
        aria-label={`${emotion.label} feelings`}
        className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2"
      >
        {emotion.feelings.map((f) => (
          <OptionPill
            key={f.id}
            label={f.label}
            selected={selectedIds.includes(f.id)}
            onClick={() => onToggle(f.id)}
          />
        ))}
      </div>
    </StepBody>
  );
}

/* Step 03: What feels most true --------------------------------------- */
export function StepChooseStatement({ feeling, statements, selected, onToggle, onNext }) {
  return (
    <StepBody footer={<NextButton disabled={selected.length === 0} onClick={onNext} />}>
      <Title className="mt-3">{feeling.label}</Title>
      <Subtitle className="font-semibold">
        What feels most true for you right now?
      </Subtitle>

      <div
        role="group"
        aria-label="What feels most true"
        className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2"
      >
        {statements.map((s) => (
          <OptionPill
            key={s}
            label={s}
            selected={selected.includes(s)}
            onClick={() => onToggle(s)}
          />
        ))}
      </div>
    </StepBody>
  );
}

/* Step 04: Insight + what might be underneath ------------------------- */
export function StepInsight({ heading, insight, needs, selectedNeedIds, onToggleNeed, onNext }) {
  const hasNeeds = needs.length > 0;
  return (
    <StepBody footer={<NextButton disabled={hasNeeds && selectedNeedIds.length === 0} onClick={onNext} />}>
      <h2 className="mt-3 max-w-[480px] font-serif text-[30px] font-normal leading-[1.15] text-[#1F2A24] sm:text-[34px]">
        {heading}
      </h2>
      <p className="mt-2 max-w-[400px] text-[12px] leading-relaxed text-[#3A3D37]">
        {insight}
      </p>

      {hasNeeds && (
      <>
      <div className="my-5 h-px bg-[#E0D6C4]" />

      <h3 className="font-serif text-[22px] font-normal text-[#1F2A24] sm:text-[24px]">
        What might you need right now?
      </h3>
      <div
        role="group"
        aria-label="What might you need right now"
        className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5"
      >
        {needs.map((need) => {
          const Icon = getWheelIcon(need.icon);
          const active = selectedNeedIds.includes(need.id);
          return (
            <button
              key={need.id}
              type="button"
              role="checkbox"
              aria-checked={active}
              onClick={() => onToggleNeed(need.id)}
              className={cn(
                "flex h-22 flex-col cursor-pointer items-center justify-center gap-2.5 rounded-lg border transition-colors",
                active
                  ? "border-[#1F2E25] bg-[#E4D8C2]"
                  : "border-transparent bg-[#EDE3D1]/85 hover:bg-[#E8DDC8]",
              )}
            >
              <Icon className="size-5 text-[#A8743F]" strokeWidth={1.5} />
              <span className="text-[11px] text-[#2B2F2A]">{need.label}</span>
            </button>
          );
        })}
      </div>
      </>
      )}
    </StepBody>
  );
}

/* Step 05: The deeper layers ------------------------------------------ */
const LAYER_DOTS = ["bg-[#1F2E25]", "bg-[#CDBB9E]", "bg-[#DDD3C3]", "bg-[#CFCBC2]"];

export function StepDeeperLayers({ layers, onNext }) {
  return (
    <StepBody className="sm:pl-[190px]" footer={<NextButton onClick={onNext} />}>
      <div className="flex gap-8">
        <div className="min-w-0 flex-1">
          <Eyebrow>The bigger picture</Eyebrow>
          <Title className="mt-1.5 text-[34px] sm:text-[36px]">The deeper layers</Title>
          <p className="mt-2 max-w-[300px] text-[12px] leading-relaxed text-[#3A3D37]">
            Every emotion has a story. Often, what we feel on the surface is connected to
            something deeper.
          </p>

          <ol className="relative mt-5 space-y-3">
            <span
              aria-hidden
              className="absolute bottom-5 left-[54px] top-5 w-px bg-[#C9A46A]/60"
            />
            {layers.map((layer, i) => (
              <li key={layer.title} className="relative flex items-center">
                <span
                  className={cn("size-10 shrink-0 rounded-full shadow-sm", LAYER_DOTS[i])}
                />
                <span aria-hidden className="h-px w-3.5 bg-[#C9A46A]/60" />
                <span
                  aria-hidden
                  className="relative -ml-[3px] size-1.5 rounded-full bg-[#C9A46A]"
                />
                <div className="pl-5">
                  <p className="font-serif text-[14px] font-semibold text-[#1F2A24]">
                    {layer.title}
                  </p>
                  <p className="text-[11px] text-[#4A4D46]">{layer.value}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="hidden w-[240px] shrink-0 flex-col items-center rounded-lg border border-[#D9C9A8] bg-[#F7F2E8] px-6 pb-4 pt-7 text-center md:flex">
          <div className="flex size-10 rotate-45 items-center justify-center rounded-md border border-[#C9A46A]">
            <Flower2 className="size-4 -rotate-45 text-[#B88B4A]" strokeWidth={1.5} />
          </div>
          <p className="mt-5 font-serif text-[18px] leading-snug text-[#1F2A24]">
            It&apos;s not just what you feel, it&apos;s what it&apos;s telling you.
          </p>
          <p className="mt-3 text-[11px] leading-relaxed text-[#4A4D46]">
            Your emotions are not random. They are messages: clues about what you need,
            what you fear, and what matters to you.
          </p>
          <GoldDivider className="mt-4" />
          <img
            src={EW_IMAGES.botanicalSmall}
            alt=""
            aria-hidden
            className="pointer-events-none mt-auto h-16 w-auto select-none object-contain opacity-80 mix-blend-multiply"
          />
        </aside>
      </div>
    </StepBody>
  );
}

/* Step 06: Reflection ------------------------------------------------- */
export const REFLECTION_MAX = 500;

export function StepReflection({ value, onChange, onExploreAnother, onSave, saving = false, error = "" }) {
  return (
    <StepBody
      footer={
        <>
          <SecondaryButton onClick={onExploreAnother}>
            Explore Another Emotion
            <ArrowRight strokeWidth={1.75} />
          </SecondaryButton>
          <PrimaryButton disabled={!value.trim() || saving} onClick={onSave}>
            <Bookmark strokeWidth={1.75} />
            {saving ? "Saving..." : "Save Reflection"}
          </PrimaryButton>
        </>
      }
    >
      <Title className="mt-3">Put it into your own words.</Title>
      <Subtitle className="font-semibold leading-snug">
        What happened, what am I feeling,
        <br />
        and what do I need?
      </Subtitle>

      <div className="relative mt-5 max-w-[680px]">
        <label htmlFor="ew-reflection" className="sr-only">
          Your reflection
        </label>
        <textarea
          id="ew-reflection"
          value={value}
          maxLength={REFLECTION_MAX}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your reflections here..."
          className="h-[190px] w-full resize-none rounded-lg border border-[#E0D6C4] bg-[#FBF8F2]/55 p-4 pb-8 text-[13px] leading-relaxed text-[#2B2F2A] outline-none transition-colors placeholder:text-[#8A877E] focus:border-[#1F2E25]/50 focus:bg-[#FBF8F2]/80"
        />
        <span className="pointer-events-none absolute bottom-3 right-4 text-[11px] text-[#8A877E]">
          {value.length}/{REFLECTION_MAX}
        </span>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-[12px] text-red-700">
          {error}
        </p>
      )}
    </StepBody>
  );
}
