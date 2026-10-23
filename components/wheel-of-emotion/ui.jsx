import * as React from "react";
import { ArrowLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* Header: Back + Close ------------------------------------------------ */
export function ModalHeader({ onBack, onClose, backTone = "dark" }) {
  return (
    <div className="relative z-20 flex h-14 shrink-0 items-center justify-between px-6 sm:px-8">
      <button
        type="button"
        onClick={onBack}
        className={cn(
          "cursor-pointer inline-flex items-center gap-1.5 rounded-sm font-serif text-[15px] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[#C9A46A]",
          backTone === "light" ? "text-[#F4EFE6]" : "text-[#2B2F2A]",
        )}
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.75} />
        Back
      </button>
      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer inline-flex items-center gap-1.5 rounded-sm font-serif text-[15px] text-[#2B2F2A] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[#C9A46A]"
      >
        <X className="size-3.5" strokeWidth={1.75} />
        Close
      </button>
    </div>
  );
}

/* Layout: scrollable body + right aligned footer ---------------------- */
export function StepBody({ children, footer, className }) {
  return (
    <div className="relative z-10 flex min-h-0 flex-1 flex-col">
      <div className={cn("min-h-0 flex-1 overflow-y-auto px-6 pb-2 sm:px-10", className)}>
        {children}
      </div>
      {footer && (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 px-6 pb-6 pt-3 sm:px-8">
          {footer}
        </div>
      )}
    </div>
  );
}

/* Typography ---------------------------------------------------------- */
export function Eyebrow({ children }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#4A4D46]">
      {children}
    </p>
  );
}

export function Title({ children, className }) {
  return (
    <h2
      className={cn(
        "font-serif text-[38px] font-normal leading-[1.05] tracking-[-0.01em] text-[#1F2A24] sm:text-[44px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Subtitle({ children, className }) {
  return (
    <p className={cn("mt-1.5 text-[12.5px] italic text-[#3A3D37]", className)}>
      {children}
    </p>
  );
}

/* Options ------------------------------------------------------------- */
export function OptionPill({ label, selected, onClick }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "flex min-h-9 w-full items-center cursor-pointer gap-2.5 rounded-full border px-3.5 py-2 text-left text-[12.5px] leading-snug transition-colors",
        selected
          ? "border-[#1F2E25] bg-[#1F2E25]/6 text-[#1F2E25]"
          : "border-[#E2D8C6] bg-[#FBF8F2]/60 text-[#3A3D37] hover:border-[#CDBFA7] hover:bg-[#FBF8F2]",
      )}
    >
      <span
        className={cn(
          "flex size-3.5 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
          selected ? "border-[#1F2E25] bg-[#1F2E25]" : "border-[#BFB29C] bg-transparent",
        )}
      >
        {selected && (
          <svg className="size-2.5 text-white" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

/* Buttons ------------------------------------------------------------- */
export function PrimaryButton({ className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 items-center gap-1.5 cursor-pointer rounded-md bg-[#1F2E25] px-4 font-serif text-[14px] text-[#F4EFE6] shadow-sm transition-colors hover:bg-[#2B3F32] disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-3.5",
        className,
      )}
      {...props}
    />
  );
}

export function SecondaryButton({ className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-md border border-[#D9CDB8] bg-[#FBF8F2]/70 px-4 font-serif text-[14px] text-[#2B2F2A] transition-colors hover:bg-[#FBF8F2] disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-3.5",
        className,
      )}
      {...props}
    />
  );
}

/* Small gold divider -------------------------------------------------- */
export function GoldDivider({ className }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-1.5", className)}
      aria-hidden
    >
      <span className="h-px w-6 bg-[#C9A46A]" />
      <span className="size-1 rotate-45 bg-[#C9A46A]" />
      <span className="h-px w-6 bg-[#C9A46A]" />
    </div>
  );
}
