"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function AssessmentDetailsForm({ initial, submitting, error, onBack, onSubmit }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [touched, setTouched] = useState(false);

  const nameError = name.trim().length < 2 ? "Please enter your name." : "";
  const emailError = !EMAIL_RE.test(email.trim()) ? "Please enter a valid email address." : "";

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (nameError || emailError || submitting) return;
    onSubmit({ name: name.trim(), email: email.trim() });
  }

  const inputCls =
    "h-12 w-full rounded-xl border bg-white/70 px-4 font-avenir text-base text-[#1C2E22] outline-none transition placeholder:text-[#1C2E22]/40 focus:border-[#1C2E22]";

  return (
    <section className="relative isolate flex min-h-full flex-col">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
        <Image src="/images/assessment/modal_background_2.png" alt="" fill sizes="(max-width: 640px) 100vw, 860px" className="object-cover object-center" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="relative z-10 flex flex-1 flex-col px-4 py-5 sm:px-8 sm:py-8 md:px-10 md:py-9 lg:px-12 lg:py-10">
        <p className="pr-10 font-avenir text-xs font-medium uppercase tracking-[2px] text-[#1C2E22]/70 sm:text-sm">Almost there</p>
        <h2 className="mt-3 font-cormorant text-[clamp(1.75rem,5vw,3.08rem)] font-semibold leading-[1.12] text-[#1C2E22]">
          Where should we send your insights?
        </h2>
        <p className="mt-3 max-w-xl font-avenir text-sm leading-relaxed text-[#1C2E22]/80 sm:text-base">
          Enter your name and email to see your result. Your answers are kept private and only seen by Dr. Syma Hamid.
        </p>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
          <div>
            <label htmlFor="assessment-name" className="mb-1.5 block font-avenir text-sm font-medium text-[#1C2E22]">
              Your name
            </label>
            <input
              id="assessment-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              maxLength={191}
              className={`${inputCls} ${touched && nameError ? "border-red-500" : "border-[#1C2E22]/20"}`}
              aria-invalid={Boolean(touched && nameError)}
              aria-describedby="assessment-name-error"
            />
            {touched && nameError && (
              <p id="assessment-name-error" className="mt-1 text-xs text-red-700">
                {nameError}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="assessment-email" className="mb-1.5 block font-avenir text-sm font-medium text-[#1C2E22]">
              Email address
            </label>
            <input
              id="assessment-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              maxLength={191}
              className={`${inputCls} ${touched && emailError ? "border-red-500" : "border-[#1C2E22]/20"}`}
              aria-invalid={Boolean(touched && emailError)}
              aria-describedby="assessment-email-error"
            />
            {touched && emailError && (
              <p id="assessment-email-error" className="mt-1 text-xs text-red-700">
                {emailError}
              </p>
            )}
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-avenir text-sm text-red-800">
            {error}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-4 font-avenir text-sm text-[#1C2E22] transition-colors hover:bg-[#1C2E22]/5 sm:px-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-[54px] cursor-pointer items-center justify-center gap-2 rounded-[9px] bg-[#1C2E22] px-6 font-avenir text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            See my result
            {!submitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </form>
    </section>
  );
}
