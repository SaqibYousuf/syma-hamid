"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, Copy, Landmark, Loader2, MapPin, Minus, Plus } from "lucide-react";

import SmartImage from "@/components/constants/smart-image";
import { formatPrice } from "@/components/workshops/workshops";

/* ---------------- validation ---------------- */

const PHONE_RE = /^(?:(?:\+92|0)3\d{9}|\+\d{8,15})$/;

function validate(form) {
  const e = {};
  if (form.fullName.trim().length < 2) e.fullName = "Please enter your full name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Please enter a valid email";
  if (!PHONE_RE.test(form.phone.replace(/[\s-]/g, ""))) e.phone = "Use a mobile number, e.g. 0300 1234567";
  if (!form.agree) e.agree = "Please accept the booking terms";
  return e;
}

/* ---------------- small UI pieces ---------------- */

function Field({ label, error, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-[#3A372D]">{label}</span>
      <input
        {...props}
        aria-invalid={!!error}
        className={`h-11 w-full rounded-lg border bg-white px-3.5 text-[15px] text-[#223329] outline-none transition placeholder:text-[#A39E90] focus:ring-2 ${
          error ? "border-red-400 focus:ring-red-200" : "border-[#DDD5C5] focus:border-[#223329] focus:ring-[#223329]/15"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function Section({ step, title, children }) {
  return (
    <section className="rounded-2xl border border-[#E6DFD0] bg-[#FBF8F2] p-5 sm:p-7">
      <h2 className="flex items-center gap-3 font-cormorant text-2xl font-semibold text-[#223329]">
        <span className="flex size-7 items-center justify-center rounded-full bg-[#223329] font-avenir text-xs text-white">{step}</span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CopyValue({ label, value }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="min-w-0">
        <p className="text-xs text-[#8A8578]">{label}</p>
        <p className="break-all font-medium text-[#223329]">{value}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          });
        }}
        className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-[#DDD5C5] px-2.5 py-1 text-xs text-[#5A5649] transition hover:bg-white"
      >
        <Copy className="size-3" /> {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function BankDetails({ bank, amount, reference }) {
  if (!bank) {
    return (
      <p className="text-sm leading-relaxed text-[#5A5649]">
        Our team will share the bank account details with you by email or phone shortly.
      </p>
    );
  }
  return (
    <div className="divide-y divide-[#E6DFD0]">
      <CopyValue label="Bank" value={bank.bankName} />
      <CopyValue label="Account title" value={bank.accountTitle} />
      <CopyValue label="Account number" value={bank.accountNumber} />
      <CopyValue label="IBAN" value={bank.iban} />
      {amount ? <CopyValue label="Amount" value={formatPrice(amount)} /> : null}
      {reference ? <CopyValue label="Payment reference" value={reference} /> : null}
    </div>
  );
}

/* ---------------- form ---------------- */

export default function CheckoutForm({ workshop, bank }) {
  const maxPerOrder = workshop.maxSeatsPerOrder || 4;
  const soldOut = workshop.seatsLeft <= 0;
  const maxSeats = Math.max(1, Math.min(maxPerOrder, workshop.seatsLeft));

  const [seats, setSeats] = useState(1);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", notes: "", agree: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | processing | success
  const [order, setOrder] = useState(null);

  const total = workshop.price * seats;
  const contactLine = [workshop.contact?.name, workshop.contact?.phones?.[0]].filter(Boolean).join(", ");

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("processing");
    try {
      const res = await fetch(`/api/workshops/${encodeURIComponent(workshop.slug)}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, seats }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("idle");
        setErrors(json.field ? { [json.field]: json.error } : { form: json.error || "Booking could not be completed. Please try again." });
        return;
      }
      setOrder({ ...json.order, bank: json.bank });
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("idle");
      setErrors({ form: "Booking could not be completed. Please check your connection and try again." });
    }
  }

  /* ---------- success ---------- */
  if (status === "success" && order) {
    return (
      <main className="font-avenir min-h-screen bg-[#F4EFE6] px-4 py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-[#E6DFD0] bg-[#FBF8F2] p-6 text-center shadow-sm sm:p-8">
          <CheckCircle2 className="mx-auto size-14 text-[#223329]" strokeWidth={1.5} />
          <h1 className="mt-4 font-cormorant text-3xl font-semibold text-[#223329]">Booking received</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5A5649]">
            Your {order.seats > 1 ? `${order.seats} seats are` : "seat is"} held for 24 hours. Please transfer{" "}
            <strong className="text-[#223329]">{formatPrice(order.total)}</strong> using the details below and add your reference{" "}
            <strong className="font-mono text-[#223329]">{order.reference}</strong>. Your booking is confirmed once the payment is received.
          </p>

          <div className="mt-6 rounded-xl bg-[#F1EBDF] p-4 text-left text-sm">
            <p className="mb-2 flex items-center gap-2 font-medium text-[#223329]">
              <Landmark className="size-4" /> Bank transfer details
            </p>
            <BankDetails bank={order.bank} amount={order.total} reference={order.reference} />
          </div>

          <div className="mt-4 space-y-1 rounded-xl bg-[#F1EBDF] p-4 text-left text-sm text-[#3A372D]">
            <p className="font-medium text-[#223329]">{workshop.title}</p>
            <p>
              {workshop.dateLabel}
              {workshop.time ? `, ${workshop.time}` : ""}
            </p>
            {workshop.location && <p>{workshop.location}</p>}
            <p className="pt-2">
              {order.seats} {order.seats > 1 ? "seats" : "seat"} · {formatPrice(order.total)} · Ref{" "}
              <span className="font-mono font-semibold text-[#223329]">{order.reference}</span>
            </p>
          </div>

          {contactLine && (
            <p className="mt-4 text-sm text-[#5A5649]">
              After transferring, please share the payment receipt with {contactLine}.
            </p>
          )}

          <Link
            href="/workshops"
            className="mt-7 inline-flex h-11 items-center rounded-full bg-[#223329] px-6 text-sm font-medium text-white transition hover:bg-[#2E4437]"
          >
            Back to workshops
          </Link>
        </div>
      </main>
    );
  }

  /* ---------- checkout ---------- */
  return (
    <main className="font-avenir min-h-screen bg-[#F4EFE6] text-[#223329]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/workshops" className="inline-flex items-center gap-1.5 text-sm text-[#5A5649] transition hover:text-[#223329]">
          <ArrowLeft className="size-4" /> All workshops
        </Link>
        <h1 className="mt-4 font-cormorant text-4xl font-semibold sm:text-5xl">Reserve your seat</h1>

        {soldOut ? (
          <p className="mt-6 rounded-xl bg-[#FBF8F2] p-6 text-[#5A5649]">
            This workshop is sold out.
            {workshop.contact?.name && (
              <>
                {" "}
                For the waiting list, contact {workshop.contact.name}
                {workshop.contact.phones?.length ? ` at ${workshop.contact.phones.join(" / ")}` : ""}.
              </>
            )}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* ---------- left: details + payment ---------- */}
            <div className="space-y-6">
              <Section step="1" title="Your details">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" autoComplete="name" value={form.fullName} onChange={set("fullName")} error={errors.fullName} className="sm:col-span-2" />
                  <Field label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
                  <Field label="Phone" type="tel" autoComplete="tel" placeholder="0300 1234567" value={form.phone} onChange={set("phone")} error={errors.phone} />
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-sm font-medium text-[#3A372D]">
                      Anything we should know? <span className="text-[#A39E90]">(optional)</span>
                    </span>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={set("notes")}
                      maxLength={2000}
                      className="w-full resize-none rounded-lg border border-[#DDD5C5] bg-white px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#223329] focus:ring-2 focus:ring-[#223329]/15"
                    />
                  </label>
                </div>
              </Section>

              <Section step="2" title="Payment">
                <div className="flex items-center gap-2.5 rounded-xl border border-[#223329] bg-white px-4 py-3 text-sm font-medium text-[#223329] shadow-sm">
                  <Landmark className="size-4 shrink-0" />
                  Bank transfer
                </div>
                <p className="mt-5 rounded-xl bg-[#F1EBDF] p-4 text-sm leading-relaxed text-[#5A5649]">
                  After you confirm, you will see our bank details and your booking reference. Your seat is held for 24 hours and confirmed once the
                  transfer is received.
                </p>
              </Section>
            </div>

            {/* ---------- right: order summary ---------- */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-[#E6DFD0] bg-[#FBF8F2]">
                <div className="flex gap-4 border-b border-[#E6DFD0] p-5">
                  <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg bg-[#EEE9DF]">
                    <SmartImage src={workshop.banner} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    {workshop.series && <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#223329]/70">{workshop.series}</p>}
                    <h2 className="mt-1 line-clamp-3 font-cormorant text-xl font-semibold leading-snug text-[#223329]">{workshop.title}</h2>
                    {workshop.host && <p className="mt-1 text-xs text-[#5A5649]">with {workshop.host}</p>}
                  </div>
                </div>

                <ul className="space-y-2.5 border-b border-[#E6DFD0] p-5 text-sm text-[#3A372D]">
                  <li className="flex gap-2.5">
                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-[#223329]/60" />
                    {workshop.dateLabel}
                  </li>
                  {workshop.time && (
                    <li className="flex gap-2.5">
                      <Clock className="mt-0.5 size-4 shrink-0 text-[#223329]/60" />
                      {workshop.time}
                      {workshop.duration ? ` (${workshop.duration})` : ""}
                    </li>
                  )}
                  {workshop.location && (
                    <li className="flex gap-2.5">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-[#223329]/60" />
                      {workshop.location}
                    </li>
                  )}
                </ul>

                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#3A372D]">Seats</span>
                    <div className="flex items-center rounded-full border border-[#DDD5C5] bg-white">
                      <button
                        type="button"
                        aria-label="Remove a seat"
                        disabled={seats <= 1}
                        onClick={() => setSeats((s) => s - 1)}
                        className="flex size-9 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#F1EBDF] disabled:cursor-default disabled:opacity-30"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{seats}</span>
                      <button
                        type="button"
                        aria-label="Add a seat"
                        disabled={seats >= maxSeats}
                        onClick={() => setSeats((s) => s + 1)}
                        className="flex size-9 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#F1EBDF] disabled:cursor-default disabled:opacity-30"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                  {workshop.seatsLeft <= 5 && <p className="-mt-2 text-right text-xs text-[#A67539]">Only {workshop.seatsLeft} seats left</p>}
                  <div className="flex justify-between text-sm text-[#5A5649]">
                    <span>
                      {formatPrice(workshop.price)} × {seats}
                    </span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-[#E6DFD0] pt-4">
                    <span className="font-medium text-[#223329]">Total</span>
                    <span className="font-cormorant text-3xl font-semibold text-[#223329]">{formatPrice(total)}</span>
                  </div>

                  <label className="flex items-start gap-2.5 text-xs leading-relaxed text-[#5A5649]">
                    <input type="checkbox" checked={form.agree} onChange={set("agree")} className="mt-0.5 size-4 accent-[#223329]" />
                    I understand seats are reserved in advance and walk-ins are not accepted.
                  </label>
                  {errors.agree && <p className="-mt-2 text-xs text-red-600">{errors.agree}</p>}
                  {errors.form && (
                    <p role="alert" className="text-sm text-red-600">
                      {errors.form}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "processing"}
                    className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#223329] text-sm font-medium text-white transition hover:bg-[#2E4437] disabled:opacity-70"
                  >
                    {status === "processing" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      "Confirm booking"
                    )}
                  </button>
                  {contactLine && <p className="text-center text-xs text-[#8A8578]">Questions? {contactLine}</p>}
                </div>
              </div>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}
