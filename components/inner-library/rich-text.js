import React from "react";
import { StarBullet } from "./ui";

/** Turns the small markup used in data/articles.js into blocks */
export function parseBlocks(text = "") {
  const blocks = [];
  for (const chunk of text.trim().split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (lines.every((l) => l.startsWith("- "))) {
      blocks.push({ type: "list", items: lines.map((l) => l.slice(2)) });
    } else if (lines[0].startsWith("> ")) {
      blocks.push({ type: "quote", text: lines.map((l) => l.replace(/^>\s?/, "")).join(" ") });
    } else {
      blocks.push({ type: "p", text: lines.join(" ") });
    }
  }
  return blocks;
}

/** *text* → <em> */
export function Inline({ text }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="font-cormorant text-[1.12em] text-[#5A3E22]">
        {part.slice(1, -1)}
      </em>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

export function PullQuote({ children }) {
  return (
    <blockquote className="my-7 border-l-[3px] border-[#C99A5B] bg-[#E9DBC6]/70 px-5 py-4 font-cormorant text-[22px] italic leading-[1.35] text-[#4A3423] sm:px-7 sm:text-[25px]">
      {children}
    </blockquote>
  );
}

const pClass = "mb-4 font-avenir text-[15px] leading-[1.75] text-[#4A3F35] sm:text-base";

/** Renders blocks; `dropCap` styles the first letter of the first paragraph */
export default function RichText({ text, dropCap = false }) {
  const blocks = parseBlocks(text);
  let capUsed = !dropCap;
  return blocks.map((b, i) => {
    if (b.type === "quote")
      return (
        <PullQuote key={i}>
          <Inline text={b.text} />
        </PullQuote>
      );
    if (b.type === "list")
      return (
        <ul key={i} className="mb-5 space-y-2.5 pl-1">
          {b.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 font-avenir text-[15px] leading-[1.6] text-[#4A3F35] sm:text-base">
              <StarBullet className="mt-[7px]" />
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    if (!capUsed) {
      capUsed = true;
      return (
        <p
          key={i}
          className={`${pClass} first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-cormorant first-letter:text-[68px] first-letter:font-medium first-letter:leading-[0.8] first-letter:text-[#4A2E17] sm:first-letter:text-[78px]`}
        >
          <Inline text={b.text} />
        </p>
      );
    }
    return (
      <p key={i} className={pClass}>
        <Inline text={b.text} />
      </p>
    );
  });
}
