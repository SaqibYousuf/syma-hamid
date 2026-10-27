"use client";

import { WHEEL_ICON_NAMES } from "@/components/wheel-of-emotion/icon-names";
import { getWheelIcon } from "@/components/wheel-of-emotion/icons";
import { cx } from "./ui";

/** Grid of icons to pick from (used for emotions and needs) */
export default function IconSelect({ value, onChange, color = "#A67539" }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Icon">
      {WHEEL_ICON_NAMES.map((name) => {
        const Icon = getWheelIcon(name);
        const active = value === name;
        return (
          <button
            key={name}
            type="button"
            role="radio"
            aria-checked={active}
            title={name}
            aria-label={name}
            onClick={() => onChange(name)}
            className={cx(
              "flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-colors",
              active ? "border-[#1C2E22] bg-[#1C2E22]/5" : "border-[#E7DFD0] bg-white hover:border-[#D9CFBD]"
            )}
          >
            <Icon className="h-4 w-4" style={{ color }} strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
}
