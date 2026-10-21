import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

const C = 100; // svg centre (viewBox 0 0 200 200)

const R = 98; // wedge radius

const LABEL_R = 63; // distance of icon + label from centre

/** 0deg = top, clockwise */
function polar(r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)];
}

function wedgePath(centerDeg, sweep) {
  const [x1, y1] = polar(R, centerDeg - sweep / 2);
  const [x2, y2] = polar(R, centerDeg + sweep / 2);
  return `M${C} ${C} L${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2} Z`;
}

export function EmotionWheel({ emotions, selectedId, onSelect, className }) {
  const sweep = 360 / emotions.length;
  return (
    <div
      className={cn(
        "relative aspect-square w-[min(290px,72vw)] rounded-full bg-[#F8F4EC] p-[5px] shadow-[0_14px_36px_-14px_rgba(70,52,24,0.45)]",
        className,
      )}
    >
      <div className="relative size-full">
        <svg viewBox="0 0 200 200" className="size-full" aria-label="Emotion wheel">
          {emotions.map((emotion, i) => (
            <path
              key={emotion.id}
              d={wedgePath(i * sweep, sweep)}
              fill={emotion.color}
              stroke="#F8F4EC"
              strokeWidth={1.4}
              strokeLinejoin="round"
              role="button"
              tabIndex={0}
              aria-label={emotion.label}
              aria-pressed={selectedId === emotion.id}
              onClick={() => onSelect(emotion.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(emotion.id);
                }
              }}
              className="cursor-pointer outline-none transition-[filter] duration-200 hover:brightness-110 focus-visible:brightness-115"
            />
          ))}
        </svg>

        {/* icon + label overlay (click passes through to the wedge) */}
        {emotions.map((emotion, i) => {
          const [x, y] = polar(LABEL_R, i * sweep);
          const Icon = emotion.icon;
          return (
            <div
              key={emotion.id}
              className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-[#FBF7EF]"
              style={{ left: `${x / 2}%`, top: `${y / 2}%` }}
            >
              <Icon className="size-4" strokeWidth={1.5} />
              <span className="text-[9.5px] font-medium tracking-wide">
                {emotion.label}
              </span>
            </div>
          );
        })}

        {/* centre medallion */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 flex size-[15%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E2D3B5] bg-[#F6EFE2] shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)]">
          <Sparkle className="size-3.5 text-[#B88B4A]" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
