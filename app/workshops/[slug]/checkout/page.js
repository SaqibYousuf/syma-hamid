"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  Landmark,
  Loader2,
  Lock,
  MapPin,
  Minus,
  Plus,
} from "lucide-react";

import { formatPrice, getWorkshop } from "@/components/workshops/workshops";

const MAX_SEATS_PER_ORDER = 4;

/* ---------------- helpers ---------------- */

const digits = (v) => v.replace(/\D/g, "");

const formatCardNumber = (v) =>
  digits(v)
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (v) => {
  const d = digits(v).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

// Luhn check catches most typos in card numbers
const luhn = (num) => {
  let sum = 0;
  let dbl = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = Number(num[i]);
    if (dbl) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    dbl = !dbl;
  }
  return num.length >= 13 && sum % 10 === 0;
};

const expiryValid = (v) => {
  const [mm, yy] = v.split("/");
  if (!mm || !yy || yy.length !== 2) return false;
  const m = Number(mm);
  if (m < 1 || m > 12) return false;
  const end = new Date(2000 + Number(yy), m, 1); // first day after expiry month
  return end > new Date();
};

function validate(form, method) {
  const e = {};
  if (form.fullName.trim().length < 2) e.fullName = "Please enter your full name";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email";
  if (!/^(\+92|0)3\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
    e.phone = "Use a Pakistani mobile number, e.g. 0300 1234567";

  if (method === "card") {
    if (!luhn(digits(form.cardNumber))) e.cardNumber = "Card number looks incorrect";
    if (form.cardName.trim().length < 2) e.cardName = "Enter the name on the card";
    if (!expiryValid(form.expiry)) e.expiry = "Invalid or expired date";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "3 or 4 digits";
  }
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
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-[#DDD5C5] focus:border-[#223329] focus:ring-[#223329]/15"
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
        <span className="flex size-7 items-center justify-center rounded-full bg-[#223329] font-avenir text-xs text-white">
          {step}
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/* ---------------- page ---------------- */

export default function CheckoutPage() {
  const { slug } = useParams();
  const workshop = getWorkshop(slug);

  const [seats, setSeats] = useState(1);
  const [method, setMethod] = useState("card");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    notes: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | processing | success
  const [reference, setReference] = useState("");

  if (!workshop) {
    return (
      <main className="font-avenir flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F4EFE6] p-6 text-center">
        <h1 className="font-cormorant text-3xl font-semibold text-[#223329]">Workshop not found</h1>
        <Link href="/workshops" className="text-[#223329] underline underline-offset-4">
          Back to workshops
        </Link>
      </main>
    );
  }

  const soldOut = workshop.seatsLeft <= 0;
  const maxSeats = Math.min(MAX_SEATS_PER_ORDER, workshop.seatsLeft);
  const total = workshop.price * seats;

  const set = (key, transform) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: transform ? transform(value) : value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form, method);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("processing");
    try {
      // TODO: replace with your API call. Send booking details to your server and let a
      // payment gateway (e.g. Safepay, PayFast, Stripe) handle the card. Never send or
      // store raw card numbers on your own server.
      await new Promise((r) => setTimeout(r, 1500));
      setReference(`IF-${Date.now().toString(36).toUpperCase().slice(-6)}`);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("idle");
      setErrors({ form: "Payment could not be completed. Please try again." });
    }
  }

  /* ---------- success ---------- */
  if (status === "success") {
    return (
      <main className="font-avenir min-h-screen bg-[#F4EFE6] px-4 py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-[#E6DFD0] bg-[#FBF8F2] p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto size-14 text-[#223329]" strokeWidth={1.5} />
          <h1 className="mt-4 font-cormorant text-3xl font-semibold text-[#223329]">
            {method === "card" ? "Your seat is reserved" : "Booking received"}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5A5649]">
            {method === "card"
              ? `Payment successful. A confirmation has been sent to ${form.email}.`
              : `We have emailed bank transfer details to ${form.email}. Your seat is held for 24 hours.`}
          </p>
          <div className="mt-6 space-y-1 rounded-xl bg-[#F1EBDF] p-4 text-left text-sm text-[#3A372D]">
            <p className="font-medium text-[#223329]">{workshop.title}</p>
            <p>
              {workshop.dateLabel}, {workshop.time}
            </p>
            <p>{workshop.location}</p>
            <p className="pt-2">
              {seats} {seats > 1 ? "seats" : "seat"} · {formatPrice(total)} · Ref{" "}
              <span className="font-mono font-semibold text-[#223329]">{reference}</span>
            </p>
          </div>
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
        <Link
          href="/workshops"
          className="inline-flex items-center gap-1.5 text-sm text-[#5A5649] transition hover:text-[#223329]"
        >
          <ArrowLeft className="size-4" /> All workshops
        </Link>
        <h1 className="mt-4 font-cormorant text-4xl font-semibold sm:text-5xl">
          Reserve your seat
        </h1>

        {soldOut ? (
          <p className="mt-6 rounded-xl bg-[#FBF8F2] p-6 text-[#5A5649]">
            This workshop is sold out. For the waiting list, contact {workshop.contact.name} at{" "}
            {workshop.contact.phones.join(" / ")}.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]"
          >
            {/* ---------- left: details + payment ---------- */}
            <div className="space-y-6">
              <Section step="1" title="Your details">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={set("fullName")}
                    error={errors.fullName}
                    className="sm:col-span-2"
                  />
                  <Field
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={set("email")}
                    error={errors.email}
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="0300 1234567"
                    value={form.phone}
                    onChange={set("phone")}
                    error={errors.phone}
                  />
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-sm font-medium text-[#3A372D]">
                      Anything we should know? <span className="text-[#A39E90]">(optional)</span>
                    </span>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={set("notes")}
                      className="w-full resize-none rounded-lg border border-[#DDD5C5] bg-white px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#223329] focus:ring-2 focus:ring-[#223329]/15"
                    />
                  </label>
                </div>
              </Section>

              <Section step="2" title="Payment">
                <div className="grid grid-cols-2 gap-3" role="radiogroup">
                  {[
                    { id: "card", label: "Debit / credit card", icon: CreditCard },
                    { id: "bank", label: "Bank transfer", icon: Landmark },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={method === id}
                      onClick={() => setMethod(id)}
                      className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                        method === id
                          ? "border-[#223329] bg-white text-[#223329] shadow-sm"
                          : "border-[#DDD5C5] text-[#5A5649] hover:border-[#223329]/40"
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>

                {method === "card" ? (
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <Field
                      label="Card number"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      value={form.cardNumber}
                      onChange={set("cardNumber", formatCardNumber)}
                      error={errors.cardNumber}
                      className="col-span-2"
                    />
                    <Field
                      label="Name on card"
                      autoComplete="cc-name"
                      value={form.cardName}
                      onChange={set("cardName")}
                      error={errors.cardName}
                      className="col-span-2"
                    />
                    <Field
                      label="Expiry"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={set("expiry", formatExpiry)}
                      error={errors.expiry}
                    />
                    <Field
                      label="CVC"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={form.cvc}
                      onChange={set("cvc", (v) => digits(v).slice(0, 4))}
                      error={errors.cvc}
                    />
                  </div>
                ) : (
                  <p className="mt-5 rounded-xl bg-[#F1EBDF] p-4 text-sm leading-relaxed text-[#5A5649]">
                    After you confirm, we will email you our bank details. Your seat is held for 24
                    hours and confirmed once the transfer is received.
                  </p>
                )}
              </Section>
            </div>

            {/* ---------- right: order summary ---------- */}
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-[#E6DFD0] bg-[#FBF8F2]">
                <div className="flex gap-4 border-b border-[#E6DFD0] p-5">
                  <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg bg-[#EEE9DF]">
                    <Image src={workshop.banner} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#223329]/70">
                      {workshop.series}
                    </p>
                    <h2 className="mt-1 line-clamp-3 font-cormorant text-xl font-semibold leading-snug text-[#223329]">
                      {workshop.title}
                    </h2>
                    <p className="mt-1 text-xs text-[#5A5649]">with {workshop.host}</p>
                  </div>
                </div>

                <ul className="space-y-2.5 border-b border-[#E6DFD0] p-5 text-sm text-[#3A372D]">
                  <li className="flex gap-2.5">
                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-[#223329]/60" />
                    {workshop.dateLabel}
                  </li>
                  <li className="flex gap-2.5">
                    <Clock className="mt-0.5 size-4 shrink-0 text-[#223329]/60" />
                    {workshop.time} ({workshop.duration})
                  </li>
                  <li className="flex gap-2.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-[#223329]/60" />
                    {workshop.location}
                  </li>
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
                        className="flex size-9 items-center justify-center rounded-full transition hover:bg-[#F1EBDF] disabled:opacity-30"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{seats}</span>
                      <button
                        type="button"
                        aria-label="Add a seat"
                        disabled={seats >= maxSeats}
                        onClick={() => setSeats((s) => s + 1)}
                        className="flex size-9 items-center justify-center rounded-full transition hover:bg-[#F1EBDF] disabled:opacity-30"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-[#5A5649]">
                    <span>
                      {formatPrice(workshop.price)} × {seats}
                    </span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-[#E6DFD0] pt-4">
                    <span className="font-medium text-[#223329]">Total</span>
                    <span className="font-cormorant text-3xl font-semibold text-[#223329]">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <label className="flex items-start gap-2.5 text-xs leading-relaxed text-[#5A5649]">
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={set("agree")}
                      className="mt-0.5 size-4 accent-[#223329]"
                    />
                    I understand seats are reserved in advance and walk-ins are not accepted.
                  </label>
                  {errors.agree && <p className="-mt-2 text-xs text-red-600">{errors.agree}</p>}
                  {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}

                  <button
                    type="submit"
                    disabled={status === "processing"}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#223329] text-sm font-medium text-white transition hover:bg-[#2E4437] disabled:opacity-70"
                  >
                    {status === "processing" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Processing...
                      </>
                    ) : method === "card" ? (
                      <>
                        <Lock className="size-4" /> Pay {formatPrice(total)}
                      </>
                    ) : (
                      "Confirm booking"
                    )}
                  </button>
                  <p className="text-center text-xs text-[#8A8578]">
                    Questions? {workshop.contact.name}, {workshop.contact.phones[0]}
                  </p>
                </div>
              </div>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}