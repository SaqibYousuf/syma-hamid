"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUp, ChevronDown, Plus, Trash2 } from "lucide-react";
import { Alert, Badge, Button, Card, Field, Input, Textarea, api, cx } from "./ui";
import IconSelect from "./IconSelect";
import { getWheelIcon } from "@/components/wheel-of-emotion/icons";

let keySeq = 0;
const newKey = () => `k${++keySeq}`;

const EMPTY = {
  label: "",
  slug: "",
  color: "#A67539",
  icon: "Sparkles",
  description: "",
  prompt: "",
  insight: "",
  underlying: "",
  deeper: "",
  core_need: "",
  is_active: true,
  feelings: [],
};

function toState(e) {
  if (!e) return { ...EMPTY, feelings: [] };
  return {
    ...EMPTY,
    ...e,
    feelings: e.feelings.map((f) => ({
      ...f,
      key: newKey(),
      customStatements: Array.isArray(f.statements) && f.statements.length > 0,
      statementsText: (f.statements || []).join("\n"),
      open: false,
    })),
  };
}

function toPayload(form) {
  return {
    ...form,
    feelings: form.feelings.map((f) => ({
      id: f.id || null,
      label: f.label,
      noun: f.noun,
      statements: f.customStatements ? f.statementsText.split("\n").map((s) => s.trim()).filter(Boolean) : null,
      insight: f.insight,
      underlying: f.underlying,
      deeper: f.deeper,
      core_need: f.core_need,
    })),
  };
}

const move = (list, i, dir) => {
  const t = i + dir;
  if (t < 0 || t >= list.length) return list;
  const next = [...list];
  [next[i], next[t]] = [next[t], next[i]];
  return next;
};

export default function EmotionEditor({ initial, defaultStatements = [] }) {
  const router = useRouter();
  const isNew = !initial?.id;
  const [form, setForm] = useState(() => toState(initial));
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
    setForm((f) => ({ ...f, ...(typeof patch === "function" ? patch(f) : patch) }));
    setDirty(true);
    setSaved(false);
  };
  const bind = (key) => ({ value: form[key] ?? "", onChange: (e) => update({ [key]: e.target.value }) });
  const setFeeling = (i, patch) => update((f) => ({ feelings: f.feelings.map((x, j) => (j === i ? { ...x, ...patch } : x)) }));

  async function save(e) {
    e?.preventDefault();
    setErrors([]);
    setSaving(true);
    try {
      const payload = toPayload(form);
      if (isNew) {
        const { id } = await api("/api/admin/wheel/emotions", { method: "POST", body: JSON.stringify(payload) });
        setDirty(false);
        router.replace(`/admin/wheel/emotions/${id}`);
        router.refresh();
        return;
      }
      const { emotion } = await api(`/api/admin/wheel/emotions/${initial.id}`, { method: "PUT", body: JSON.stringify(payload) });
      setForm(toState(emotion));
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

  const Icon = getWheelIcon(form.icon);

  return (
    <form onSubmit={save} className="pb-24">
      <Link href="/admin/wheel" className="mb-3 inline-flex items-center gap-1 text-sm text-[#8A8478] hover:text-[#1C2E22]">
        <ArrowLeft className="h-4 w-4" /> Wheel of Emotions
      </Link>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ background: form.color }}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h1 className="font-cormorant text-3xl font-bold leading-tight sm:text-4xl">{isNew ? "New emotion" : form.label || "Untitled"}</h1>
        {!isNew && (form.is_active ? <Badge tone="green">On the wheel</Badge> : <Badge tone="amber">Hidden</Badge>)}
      </div>

      <div className="mb-4 space-y-3">
        {errors.length > 0 && (
          <Alert>
            <p className="font-semibold">Please fix the following:</p>
            <ul className="mt-1 list-disc pl-5">
              {errors.slice(0, 8).map((er, i) => (
                <li key={i}>{er}</li>
              ))}
            </ul>
          </Alert>
        )}
        {saved && <Alert tone="success">Changes saved.</Alert>}
      </div>

      <div className="space-y-6">
        <Card className="space-y-5 p-5 sm:p-6">
          <h2 className="font-cormorant text-2xl font-bold">Emotion</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name *">
              <Input {...bind("label")} placeholder="e.g. Joy" />
            </Field>
            <Field label="Colour *" hint="Colour of its slice on the wheel">
              <div className="flex gap-2">
                <input
                  type="color"
                  value={/^#[0-9a-fA-F]{6}$/.test(form.color) ? form.color : "#A67539"}
                  onChange={(e) => update({ color: e.target.value })}
                  className="h-10 w-12 cursor-pointer rounded-lg border border-[#D9CFBD] bg-white p-1"
                  aria-label="Pick colour"
                />
                <Input {...bind("color")} placeholder="#D6A54E" />
              </div>
            </Field>
            <div className="sm:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5C574F]">Icon</span>
              <IconSelect value={form.icon} onChange={(icon) => update({ icon })} color={form.color} />
            </div>
            <Field label="Description" hint="Shown under the emotion name (step 2)" className="sm:col-span-2">
              <Textarea rows={2} {...bind("description")} />
            </Field>
            <Field label="Prompt above the feelings" hint="Default: “Explore what feels closest to you:”" className="sm:col-span-2">
              <Input {...bind("prompt")} placeholder="Explore what feels closest to you:" />
            </Field>
            <Field label="URL key" hint="Leave empty to create it from the name.">
              <Input {...bind("slug")} />
            </Field>
          </div>
        </Card>

        <Card className="space-y-5 p-5 sm:p-6">
          <div>
            <h2 className="font-cormorant text-2xl font-bold">Insight & deeper layers</h2>
            <p className="text-sm text-[#8A8478]">Default text for every feeling of this emotion. A feeling can override any of these.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Insight (step 4)" className="sm:col-span-3">
              <Textarea rows={3} {...bind("insight")} />
            </Field>
            <Field label="Underlying emotion">
              <Input {...bind("underlying")} />
            </Field>
            <Field label="Deeper layer">
              <Input {...bind("deeper")} />
            </Field>
            <Field label="Core need">
              <Input {...bind("core_need")} />
            </Field>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="mb-4">
            <h2 className="font-cormorant text-2xl font-bold">Feelings ({form.feelings.length})</h2>
            <p className="text-sm text-[#8A8478]">The options on step 2. Click a feeling to set its own step 3 options or override the text.</p>
          </div>
          <ul className="space-y-2">
            {form.feelings.map((f, i) => (
              <li key={f.key} className="rounded-xl border border-[#E7DFD0] bg-[#FDFBF7]">
                <div className="flex items-center gap-2 p-2.5">
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => update((s) => ({ feelings: move(s.feelings, i, -1) }))}
                      disabled={i === 0}
                      className="cursor-pointer rounded p-0.5 text-[#8A8478] hover:bg-black/5 disabled:opacity-30"
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => update((s) => ({ feelings: move(s.feelings, i, 1) }))}
                      disabled={i === form.feelings.length - 1}
                      className="cursor-pointer rounded p-0.5 text-[#8A8478] hover:bg-black/5 disabled:opacity-30"
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </button>
                  </div>
                  <Input value={f.label} onChange={(e) => setFeeling(i, { label: e.target.value })} placeholder="Feeling, e.g. Hopeful" className="flex-1" />
                  <button
                    type="button"
                    onClick={() => setFeeling(i, { open: !f.open })}
                    className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg px-2 py-1.5 text-xs font-medium text-[#5C574F] hover:bg-black/5"
                    aria-expanded={f.open}
                  >
                    Details <ChevronDown className={cx("h-3.5 w-3.5 transition-transform", f.open && "rotate-180")} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Remove "${f.label || "this feeling"}"?`)) update((s) => ({ feelings: s.feelings.filter((_, j) => j !== i) }));
                    }}
                    className="cursor-pointer rounded-lg p-1.5 text-red-600 hover:bg-red-50"
                    aria-label="Remove feeling"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {f.open && (
                  <div className="grid gap-4 border-t border-[#EFE8DB] p-4 sm:grid-cols-2">
                    <Field label="Noun" hint={`Heading becomes “You may be experiencing ___.” Leave empty for “You may be feeling ${(f.label || "…").toLowerCase()}.”`}>
                      <Input value={f.noun} onChange={(e) => setFeeling(i, { noun: e.target.value })} placeholder="e.g. hope" />
                    </Field>
                    <div>
                      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                        <input
                          type="checkbox"
                          checked={f.customStatements}
                          onChange={(e) =>
                            setFeeling(i, {
                              customStatements: e.target.checked,
                              statementsText: e.target.checked && !f.statementsText ? defaultStatements.join("\n") : f.statementsText,
                            })
                          }
                          className="accent-[#1C2E22]"
                        />
                        Own “What feels most true?” options
                      </label>
                      {f.customStatements ? (
                        <Textarea
                          rows={5}
                          value={f.statementsText}
                          onChange={(e) => setFeeling(i, { statementsText: e.target.value })}
                          className="mt-2"
                          placeholder="One option per line"
                        />
                      ) : (
                        <p className="mt-2 text-xs text-[#8A8478]">Uses the default options: {defaultStatements.join(" · ")}</p>
                      )}
                    </div>
                    <Field label="Insight (override)" className="sm:col-span-2">
                      <Textarea rows={2} value={f.insight} onChange={(e) => setFeeling(i, { insight: e.target.value })} placeholder={form.insight || "Uses the emotion’s insight"} />
                    </Field>
                    <Field label="Underlying emotion (override)">
                      <Input value={f.underlying} onChange={(e) => setFeeling(i, { underlying: e.target.value })} placeholder={form.underlying} />
                    </Field>
                    <Field label="Deeper layer (override)">
                      <Input value={f.deeper} onChange={(e) => setFeeling(i, { deeper: e.target.value })} placeholder={form.deeper} />
                    </Field>
                    <Field label="Core need (override)">
                      <Input value={f.core_need} onChange={(e) => setFeeling(i, { core_need: e.target.value })} placeholder={form.core_need} />
                    </Field>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="outline"
            className="mt-3 w-full border-dashed"
            onClick={() =>
              update((s) => ({
                feelings: [
                  ...s.feelings,
                  { key: newKey(), id: null, label: "", noun: "", statements: null, customStatements: false, statementsText: "", insight: "", underlying: "", deeper: "", core_need: "", open: false },
                ],
              }))
            }
          >
            <Plus className="h-4 w-4" /> Add feeling
          </Button>
        </Card>

        <Card className="flex items-start gap-3 p-5 sm:p-6">
          <input
            id="active"
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => update({ is_active: e.target.checked })}
            className="mt-1 h-4 w-4 cursor-pointer accent-[#1C2E22]"
          />
          <label htmlFor="active" className="cursor-pointer">
            <span className="block font-semibold">Show on the wheel</span>
            <span className="text-sm text-[#8A8478]">Hidden emotions keep their content but don’t appear on the website.</span>
          </label>
        </Card>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#E7DFD0] bg-white/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <span className="hidden text-sm text-[#8A8478] sm:block">{dirty ? "You have unsaved changes" : isNew ? "" : "All changes saved"}</span>
          <Button type="submit" loading={saving} className="ml-auto">
            {isNew ? "Create emotion" : "Save changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
