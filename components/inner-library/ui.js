import React from "react";

// Shared palette for The Inner Library (sepia / gold, from the design)
export const IL = {
  bg: "#F2E9DC",
  panel: "#EADCC8",
  ink: "#2B2118",
  body: "#4A3F35",
  muted: "#7A6A58",
  gold: "#A67539",
  line: "#D9C5A8",
  dark: "#1A120B",
};

export const goldButton =
  "inline-flex items-center justify-center gap-3 bg-gradient-to-b from-[#E2BC85] to-[#C99A5B] px-6 py-3 font-avenir text-xs font-semibold uppercase tracking-[2.5px] text-[#2B2118] shadow-[0_6px_16px_-8px_rgba(80,50,15,0.6)] transition hover:from-[#D9AF74] hover:to-[#B9884A]";

export function Eyebrow({ children, className = "" }) {
  return <p className={`font-avenir text-[11px] font-semibold uppercase tracking-[3px] text-[#8A6A45] ${className}`}>{children}</p>;
}

/** Thin gold line with a small diamond in the middle */
export function DiamondDivider({ className = "", tone = "gold" }) {
  const color = tone === "light" ? "rgba(226,188,133,0.7)" : "rgba(166,117,57,0.55)";
  return (
    <div className={`flex items-center ${className}`} aria-hidden="true">
      <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
      <span className="mx-2 h-1.5 w-1.5 rotate-45" style={{ background: color }} />
      <span className="h-px flex-1" style={{ background: `linear-gradient(270deg, transparent, ${color})` }} />
    </div>
  );
}

/** Small decorative 4-point star used as bullet */
export function StarBullet({ className = "" }) {
  return (
    <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 shrink-0 ${className}`} aria-hidden="true">
      <path d="M6 0 L7.2 4.8 L12 6 L7.2 7.2 L6 12 L4.8 7.2 L0 6 L4.8 4.8 Z" fill="#A67539" />
    </svg>
  );
}

/** Paper-texture card used for quotes & side boxes */
export const paperCard = "bg-gradient-to-br from-[#EFE2CF] via-[#E9D9C2] to-[#E2CFB5] shadow-[0_10px_30px_-18px_rgba(70,45,20,0.55)]";
