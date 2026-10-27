"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Alert, Badge, Button, Card, Field, Input, Textarea, api } from "./ui";
import ImageField from "./Imagefield";

const EMPTY = {
  title: "",
  slug: "",
  series: "Inner Flow Series",
  description: "",
  host: "Dr. Syma Hamid",
  host_role: "Psychologist & Cognitive Reframe Expert",
  banner: "",
  event_date: "",
  start_time: "",
  end_time: "",
  location: "",
  city: "",
  price: "",
  total_seats: "",
  max_seats_per_order: 4,
  contact_name: "",
  contact_phones: "",
  is_published: true,
};

export default function WorkshopEditor({ initial }) {
  const router = useRouter();
  const isNew = !initial?.id;
  const [form, setForm] = useState(() => (initial ? { ...EMPTY, ...initial } : EMPTY));
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const update = (patch) => {
    setForm((f) => ({ ...f, ...patch }));
    setDirty(true);
    setSaved(false);
  };
  const bind = (key) => ({ value: form[key] ?? "", onChange: (e) => update({ [key]: e.target.value }) });

  async function save(e) {
    e?.preventDefault();
    setErrors([]);
    setSaving(true);
    try {
      if (isNew) {
        const { id } = await api("/api/admin/workshops", { method: "POST", body: JSON.stringify(form) });
        setDirty(false);
        router.replace(`/admin/workshops/${id}`);
        router.refresh();
        return;
      }
      const { workshop } = await api(`/api/admin/workshops/${initial.id}`, { method: "PUT", body: JSON.stringify(form) });
      setForm({ ...EMPTY, ...workshop });
      setDirty(false);
      setSaved(true);
      router.refresh();
    } catch (err) {
      setErrors(err.errors?.length ? err.errors : [err.message]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="pb-24">
      <Link href="/admin/workshops" className="mb-3 inline-flex items-center gap-1 text-sm text-[#8A8478] hover:text-[#1C2E22]">
        <ArrowLeft className="h-4 w-4" /> All workshops
      </Link>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="font-cormorant text-3xl font-bold leading-tight sm:text-4xl">{isNew ? "New workshop" : form.title || "Untitled"}</h1>
        {!isNew && (form.is_published ? <Badge tone="green">Published</Badge> : <Badge tone="amber">Draft</Badge>)}
      </div>

      <div className="mb-4 space-y-3">
        {errors.length > 0 && (
          <Alert>
            <p className="font-semibold">Please fix the following:</p>
            <ul className="mt-1 list-disc pl-5">
              {errors.map((er, i) => (
                <li key={i}>{er}</li>
              ))}
            </ul>
          </Alert>
        )}
        {saved && <Alert tone="success">Changes saved.</Alert>}
        {!isNew && initial.seats_taken > 0 && (
          <Alert tone="info">
            {initial.seats_taken} of {initial.total_seats} seats are already booked.{" "}
            <Link href={`/admin/orders?workshop=${initial.id}`} className="font-semibold underline">
              View orders
            </Link>
          </Alert>
        )}
      </div>

      <div className="space-y-6">
        <Card className="space-y-5 p-5 sm:p-6">
          <h2 className="font-cormorant text-2xl font-bold">Workshop</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Title *" className="sm:col-span-2">
              <Input {...bind("title")} placeholder="e.g. Finding calm in anxious times" />
            </Field>
            <Field label="Series" hint="Small label above the title, e.g. Inner Flow Series">
              <Input {...bind("series")} />
            </Field>
            <Field label="URL slug" hint="Leave empty to create it from the title.">
              <Input {...bind("slug")} />
            </Field>
            <Field label="Description" className="sm:col-span-2">
              <Textarea rows={4} {...bind("description")} />
            </Field>
            <Field label="Host">
              <Input {...bind("host")} />
            </Field>
            <Field label="Host title">
              <Input {...bind("host_role")} />
            </Field>
            <div className="sm:col-span-2">
              <ImageField
                label="Banner"
                value={form.banner}
                onChange={(banner) => update({ banner })}
                previewClass="h-36 w-24"
                hint="Portrait 2:3 image (e.g. 853×1280). It is shown on the workshop card and at checkout."
              />
            </div>
          </div>
        </Card>

        <Card className="space-y-5 p-5 sm:p-6">
          <h2 className="font-cormorant text-2xl font-bold">Date & place</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Date *">
              <Input type="date" {...bind("event_date")} />
            </Field>
            <Field label="Start time">
              <Input type="time" {...bind("start_time")} />
            </Field>
            <Field label="End time">
              <Input type="time" {...bind("end_time")} />
            </Field>
            <Field label="Address" className="sm:col-span-2">
              <Input {...bind("location")} placeholder="House 14, Street 68, F-8/3, Islamabad" />
            </Field>
            <Field label="City">
              <Input {...bind("city")} />
            </Field>
          </div>
        </Card>

        <Card className="space-y-5 p-5 sm:p-6">
          <h2 className="font-cormorant text-2xl font-bold">Seats & price</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Price per seat (Rs)">
              <Input type="number" min="0" step="1" {...bind("price")} />
            </Field>
            <Field label="Total seats *">
              <Input type="number" min="0" step="1" {...bind("total_seats")} />
            </Field>
            <Field label="Max seats per order">
              <Input type="number" min="1" step="1" {...bind("max_seats_per_order")} />
            </Field>
          </div>
        </Card>

        <Card className="space-y-5 p-5 sm:p-6">
          <h2 className="font-cormorant text-2xl font-bold">Contact for questions</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Contact name">
              <Input {...bind("contact_name")} />
            </Field>
            <Field label="Phone numbers" hint="Separate several numbers with a comma.">
              <Input {...bind("contact_phones")} placeholder="0317 7758489, 0339 5166216" />
            </Field>
          </div>
        </Card>

        <Card className="flex items-start gap-3 p-5 sm:p-6">
          <input
            id="published"
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => update({ is_published: e.target.checked })}
            className="mt-1 h-4 w-4 cursor-pointer accent-[#1C2E22]"
          />
          <label htmlFor="published" className="cursor-pointer">
            <span className="block font-semibold">Published</span>
            <span className="text-sm text-[#8A8478]">Show this workshop on the website (until its date has passed).</span>
          </label>
        </Card>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#E7DFD0] bg-white/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <span className="hidden text-sm text-[#8A8478] sm:block">{dirty ? "You have unsaved changes" : isNew ? "" : "All changes saved"}</span>
          <Button type="submit" loading={saving} className="ml-auto">
            {isNew ? "Create workshop" : "Save changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}