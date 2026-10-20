"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-cormorant text-3xl font-bold leading-tight text-[#1C2E22] sm:text-4xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-[#5C574F]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ className, children, ...props }) {
  return (
    <div className={cx("rounded-2xl border border-[#E7DFD0] bg-white shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}

const btnVariants = {
  primary: "bg-[#1C2E22] text-white hover:bg-[#14241B] disabled:bg-[#1C2E22]/50",
  gold: "bg-[#A67539] text-white hover:bg-[#8F642F] disabled:bg-[#A67539]/50",
  outline: "border border-[#D9CFBD] bg-white text-[#1C2E22] hover:bg-[#FBF8F3] disabled:opacity-50",
  ghost: "text-[#1C2E22] hover:bg-[#1C2E22]/5 disabled:opacity-50",
  danger: "border border-red-200 bg-white text-red-700 hover:bg-red-50 disabled:opacity-50",
};

export function Button({ variant = "primary", size = "md", loading, className, children, href, ...props }) {
  const classes = cx(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A67539]/50",
    size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 text-sm",
    btnVariants[variant],
    className
  );
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} disabled={loading || props.disabled} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export function Field({ label, hint, children, className }) {
  return (
    <label className={cx("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5C574F]">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[#8A8478]">{hint}</span>}
    </label>
  );
}

const inputBase =
  "w-full rounded-xl border border-[#D9CFBD] bg-white px-3 py-2 text-sm text-[#1C2E22] placeholder:text-[#A39E93] outline-none transition focus:border-[#A67539] focus:ring-2 focus:ring-[#A67539]/20";

export function Input({ className, ...props }) {
  return <input className={cx(inputBase, "h-10", className)} {...props} />;
}

export function Textarea({ className, rows = 3, ...props }) {
  return <textarea rows={rows} className={cx(inputBase, "resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }) {
  return (
    <select className={cx(inputBase, "h-10 pr-8", className)} {...props}>
      {children}
    </select>
  );
}

export function Badge({ tone = "neutral", children }) {
  const tones = {
    neutral: "bg-[#F1ECE2] text-[#5C574F]",
    green: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    gold: "bg-[#A67539]/10 text-[#8F642F]",
  };
  return <span className={cx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone])}>{children}</span>;
}

export function Alert({ tone = "error", children }) {
  if (!children) return null;
  const tones = {
    error: "border-red-200 bg-red-50 text-red-800",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    info: "border-[#E7DFD0] bg-[#FBF8F3] text-[#5C574F]",
  };
  return <div role={tone === "error" ? "alert" : "status"} className={cx("rounded-xl border px-4 py-3 text-sm", tones[tone])}>{children}</div>;
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-cormorant text-2xl font-bold text-[#1C2E22]">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-[#5C574F]">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** fetch wrapper that throws with the server's error message */
export async function api(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json", ...options.headers } : options.headers,
  });
  let data = null;
  try {
    data = await res.json();
  } catch {}
  if (res.status === 401 && typeof window !== "undefined" && !url.startsWith("/api/auth/")) {
    window.location.href = "/admin/login";
  }
  if (!res.ok) {
    const err = new Error(data?.error || "Something went wrong");
    err.errors = data?.errors;
    throw err;
  }
  return data;
}
