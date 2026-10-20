"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUp, ImagePlus, Plus, Trash2, X } from "lucide-react";
import { Alert, Badge, Button, Card, Field, Input, Select, Textarea, api, cx } from "./ui";

const newKey = () => `n${Math.random().toString(36).slice(2, 10)}`;

function emptyProfile() {
  return { key: newKey(), id: null, title: "", short_description: "", image: "", quote: "", core_insight: "", notices: [], pattern_steps: [], reflection: "" };
}
function emptyOption() {
  return { key: newKey(), id: null, text: "", profileKey: "" };
}
function emptyQuestion() {
  return { key: newKey(), id: null, question: "", type: "choice", options: [emptyOption(), emptyOption(), emptyOption(), emptyOption()] };
}

/** Convert server data → editor state */
function toState(a) {
  if (!a) {
    return {
      title: "", slug: "", description: "", intro_text: "", image: "", duration: "",
      closing_title: "", closing_text: "", final_reflection: "", is_published: false,
      profiles: [], questions: [],
    };
  }
  return {
    ...a,
    profiles: a.profiles.map((p) => ({ ...p, key: `p${p.id}` })),
    questions: a.questions.map((q) => ({
      ...q,
      key: `q${q.id}`,
      options: q.options.map((o) => ({ ...o, key: `o${o.id}`, profileKey: o.profile_id ? `p${o.profile_id}` : "" })),
    })),
  };
}

function move(list, index, dir) {
  const next = [...list];
  const t = index + dir;
  if (t < 0 || t >= next.length) return list;
  [next[index], next[t]] = [next[t], next[index]];
  return next;
}

/* ───────────────────────── small pieces ───────────────────────── */

function ImageField({ label, value, onChange, hint }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file) {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const { url } = await api("/api/admin/upload", { method: "POST", body: form });
      onChange(url);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5C574F]">{label}</span>
      <div className="flex items-start gap-3">
        <div className="relative flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#D9CFBD] bg-[#FBF8F3]">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImagePlus className="h-5 w-5 text-[#A39E93]" />
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="outline" loading={uploading} onClick={() => inputRef.current?.click()}>
              Upload image
            </Button>
            {value && (
              <Button type="button" size="sm" variant="ghost" onClick={() => onChange("")}>
                Remove
              </Button>
            )}
          </div>
          <Input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="/images/... or https://..." className="h-8 text-xs" />
          {hint && <p className="text-xs text-[#8A8478]">{hint}</p>}
          {error && <p className="text-xs text-red-700">{error}</p>}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
    </div>
  );
}

/** Edit an array of strings, one per line */
function LinesField({ label, value, onChange, hint, rows = 4 }) {
  const [text, setText] = useState((value || []).join("\n"));
  return (
    <Field label={label} hint={hint}>
      <Textarea
        rows={rows}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean));
        }}
      />
    </Field>
  );
}

function IconBtn({ label, onClick, disabled, children, danger }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cx(
        "cursor-pointer rounded-lg p-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-30",
        danger ? "text-red-600 hover:bg-red-50" : "text-[#8A8478] hover:bg-black/5 hover:text-[#1C2E22]"
      )}
    >
      {children}
    </button>
  );
}

/* ───────────────────────── editor ───────────────────────── */

export default function AssessmentEditor({ initial }) {
  const router = useRouter();
  const isNew = !initial?.id;
  const [form, setForm] = useState(() => toState(initial));
  const [tab, setTab] = useState("details");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState([]);
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

  function update(patch) {
    setForm((f) => ({ ...f, ...(typeof patch === "function" ? patch(f) : patch) }));
    setDirty(true);
    setSaved(false);
  }

  const setProfile = (index, patch) => update((f) => ({ profiles: f.profiles.map((p, i) => (i === index ? { ...p, ...patch } : p)) }));
  const setQuestion = (index, patch) => update((f) => ({ questions: f.questions.map((q, i) => (i === index ? { ...q, ...patch } : q)) }));
  const setOption = (qi, oi, patch) =>
    update((f) => ({
      questions: f.questions.map((q, i) => (i === qi ? { ...q, options: q.options.map((o, j) => (j === oi ? { ...o, ...patch } : o)) } : q)),
    }));

  const unmappedCount = useMemo(
    () => form.questions.filter((q) => q.type === "choice").reduce((n, q) => n + q.options.filter((o) => !o.profileKey).length, 0),
    [form.questions]
  );

  function removeProfile(index) {
    const p = form.profiles[index];
    const used = form.questions.some((q) => q.options.some((o) => o.profileKey === p.key));
    if (!window.confirm(`Remove result profile "${p.title || "Untitled"}"?${used ? "\n\nOptions linked to it will become unassigned." : ""}`)) return;
    update((f) => ({
      profiles: f.profiles.filter((_, i) => i !== index),
      questions: f.questions.map((q) => ({ ...q, options: q.options.map((o) => (o.profileKey === p.key ? { ...o, profileKey: "" } : o)) })),
    }));
  }

  async function save(publishOverride) {
    setErrors([]);
    setSaving(true);
    const payload = { ...form, is_published: publishOverride ?? form.is_published };
    try {
      if (isNew) {
        const { id } = await api("/api/admin/assessments", { method: "POST", body: JSON.stringify(payload) });
        setDirty(false);
        router.replace(`/admin/assessments/${id}?created=1`);
        router.refresh();
        return;
      }
      const { assessment } = await api(`/api/admin/assessments/${initial.id}`, { method: "PUT", body: JSON.stringify(payload) });
      setForm(toState(assessment));
      setDirty(false);
      setSaved(true);
      router.refresh();
    } catch (e) {
      setErrors(e.errors?.length ? e.errors : [e.message]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSaving(false);
    }
  }

  const tabs = [
    { id: "details", label: "Details" },
    { id: "profiles", label: `Result profiles (${form.profiles.length})` },
    { id: "questions", label: `Questions (${form.questions.length})` },
  ];

  return (
    <div className="pb-24">
      <div className="mb-6">
        <Link href="/admin/assessments" className="mb-3 inline-flex items-center gap-1 text-sm text-[#8A8478] hover:text-[#1C2E22]">
          <ArrowLeft className="h-4 w-4" /> All assessments
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-cormorant text-3xl font-bold leading-tight sm:text-4xl">{isNew ? "New assessment" : form.title || "Untitled"}</h1>
          {!isNew && (form.is_published ? <Badge tone="green">Published</Badge> : <Badge tone="amber">Draft</Badge>)}
        </div>
      </div>

      <div className="mb-4 space-y-3">
        {errors.length > 0 && (
          <Alert>
            <p className="font-semibold">Please fix the following:</p>
            <ul className="mt-1 list-disc pl-5">
              {errors.slice(0, 8).map((e, i) => (
                <li key={i}>{e}</li>
              ))}
              {errors.length > 8 && <li>…and {errors.length - 8} more</li>}
            </ul>
          </Alert>
        )}
        {saved && <Alert tone="success">Changes saved.</Alert>}
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl bg-[#EDE6D8] p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cx(
              "flex-1 cursor-pointer whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              tab === t.id ? "bg-white text-[#1C2E22] shadow-sm" : "text-[#5C574F] hover:text-[#1C2E22]"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* DETAILS */}
      {tab === "details" && (
        <div className="space-y-6">
          <Card className="space-y-5 p-5 sm:p-6">
            <h2 className="font-cormorant text-2xl font-bold">Card & intro</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Title *" className="sm:col-span-2">
                <Input value={form.title} onChange={(e) => update({ title: e.target.value })} placeholder="e.g. Identify Your Pattern" />
              </Field>
              <Field label="Short description" hint="Shown on the assessment card." className="sm:col-span-2">
                <Textarea rows={2} value={form.description} onChange={(e) => update({ description: e.target.value })} />
              </Field>
              <Field label="Intro text" hint="Shown on the first screen before questions start." className="sm:col-span-2">
                <Textarea rows={4} value={form.intro_text} onChange={(e) => update({ intro_text: e.target.value })} />
              </Field>
              <Field label="Duration" hint="e.g. 5–7 Minutes">
                <Input value={form.duration} onChange={(e) => update({ duration: e.target.value })} />
              </Field>
              <Field label="URL slug" hint="Leave empty to create from the title.">
                <Input value={form.slug} onChange={(e) => update({ slug: e.target.value })} />
              </Field>
              <div className="sm:col-span-2">
                <ImageField label="Card image" value={form.image} onChange={(image) => update({ image })} hint="Recommended ratio 1.8 : 1 (e.g. 900×500)." />
              </div>
            </div>
          </Card>

          <Card className="space-y-5 p-5 sm:p-6">
            <div>
              <h2 className="font-cormorant text-2xl font-bold">Closing screen</h2>
              <p className="text-sm text-[#8A8478]">Optional. Shown after the result (“Your pattern is not your identity”).</p>
            </div>
            <Field label="Title">
              <Input value={form.closing_title} onChange={(e) => update({ closing_title: e.target.value })} />
            </Field>
            <Field label="Text" hint="Use an empty line between paragraphs.">
              <Textarea rows={5} value={form.closing_text} onChange={(e) => update({ closing_text: e.target.value })} />
            </Field>
            <Field label="Final reflection">
              <Textarea rows={2} value={form.final_reflection} onChange={(e) => update({ final_reflection: e.target.value })} />
            </Field>
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
              <span className="text-sm text-[#8A8478]">
                Show this assessment on the website. If it has no questions yet it appears as “Coming soon”.
              </span>
            </label>
          </Card>
        </div>
      )}

      {/* PROFILES */}
      {tab === "profiles" && (
        <div className="space-y-4">
          <Alert tone="info">
            Result profiles are the possible outcomes (e.g. “The Overthinker”). Each answer option counts towards one profile —
            the profile with the most answers becomes the visitor’s result.
          </Alert>
          {form.profiles.map((p, i) => (
            <Card key={p.key} className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-cormorant text-xl font-bold">
                  {i + 1}. {p.title || "Untitled profile"}
                </h3>
                <div className="flex items-center">
                  <IconBtn label="Move up" onClick={() => update((f) => ({ profiles: move(f.profiles, i, -1) }))} disabled={i === 0}>
                    <ArrowUp className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn label="Move down" onClick={() => update((f) => ({ profiles: move(f.profiles, i, 1) }))} disabled={i === form.profiles.length - 1}>
                    <ArrowDown className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn label="Remove profile" onClick={() => removeProfile(i)} danger>
                    <Trash2 className="h-4 w-4" />
                  </IconBtn>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Title *">
                  <Input value={p.title} onChange={(e) => setProfile(i, { title: e.target.value })} placeholder="The Overthinker" />
                </Field>
                <Field label="Short description" hint="Shown in the “other profiles” list.">
                  <Input value={p.short_description} onChange={(e) => setProfile(i, { short_description: e.target.value })} />
                </Field>
                <div className="sm:col-span-2">
                  <ImageField label="Image" value={p.image} onChange={(image) => setProfile(i, { image })} hint="Square image works best." />
                </div>
                <Field label="Quote" className="sm:col-span-2">
                  <Textarea rows={2} value={p.quote} onChange={(e) => setProfile(i, { quote: e.target.value })} />
                </Field>
                <Field label="Core insight" className="sm:col-span-2">
                  <Textarea rows={2} value={p.core_insight} onChange={(e) => setProfile(i, { core_insight: e.target.value })} />
                </Field>
                <LinesField label="You may notice" hint="One item per line." value={p.notices} onChange={(notices) => setProfile(i, { notices })} />
                <LinesField label="The pattern may look like" hint="One step per line (shown with arrows)." value={p.pattern_steps} onChange={(pattern_steps) => setProfile(i, { pattern_steps })} />
                <Field label="Reflection" className="sm:col-span-2">
                  <Textarea rows={2} value={p.reflection} onChange={(e) => setProfile(i, { reflection: e.target.value })} />
                </Field>
              </div>
            </Card>
          ))}
          <Button type="button" variant="outline" onClick={() => update((f) => ({ profiles: [...f.profiles, emptyProfile()] }))} className="w-full border-dashed">
            <Plus className="h-4 w-4" /> Add result profile
          </Button>
        </div>
      )}

      {/* QUESTIONS */}
      {tab === "questions" && (
        <div className="space-y-4">
          {form.profiles.length === 0 && (
            <Alert tone="info">
              Tip: add your result profiles first, then link each answer option to a profile.{" "}
              <button type="button" className="cursor-pointer font-semibold underline" onClick={() => setTab("profiles")}>
                Go to result profiles
              </button>
            </Alert>
          )}
          {unmappedCount > 0 && form.profiles.length > 0 && (
            <Alert tone="info">{unmappedCount} option(s) are not linked to a result profile yet.</Alert>
          )}

          {form.questions.map((q, qi) => (
            <Card key={q.key} className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A67539]">Question {qi + 1}</span>
                <div className="flex items-center">
                  <IconBtn label="Move up" onClick={() => update((f) => ({ questions: move(f.questions, qi, -1) }))} disabled={qi === 0}>
                    <ArrowUp className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn label="Move down" onClick={() => update((f) => ({ questions: move(f.questions, qi, 1) }))} disabled={qi === form.questions.length - 1}>
                    <ArrowDown className="h-4 w-4" />
                  </IconBtn>
                  <IconBtn
                    label="Remove question"
                    danger
                    onClick={() => {
                      if (window.confirm("Remove this question?")) update((f) => ({ questions: f.questions.filter((_, i) => i !== qi) }));
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconBtn>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
                <Field label="Question *">
                  <Textarea rows={2} value={q.question} onChange={(e) => setQuestion(qi, { question: e.target.value })} />
                </Field>
                <Field label="Type">
                  <Select
                    value={q.type}
                    onChange={(e) => {
                      const type = e.target.value;
                      setQuestion(qi, { type, options: type === "choice" && q.options.length === 0 ? [emptyOption(), emptyOption()] : q.options });
                    }}
                  >
                    <option value="choice">Multiple choice (scored)</option>
                    <option value="text">Written reflection (not scored)</option>
                  </Select>
                </Field>
              </div>

              {q.type === "choice" ? (
                <div className="mt-4 space-y-2">
                  <div className="hidden grid-cols-[1fr_220px_32px] gap-2 text-xs font-semibold uppercase tracking-wider text-[#5C574F] sm:grid">
                    <span>Answer options</span>
                    <span>Counts towards</span>
                  </div>
                  {q.options.map((o, oi) => (
                    <div key={o.key} className="grid grid-cols-[1fr_32px] gap-2 rounded-xl bg-[#FBF8F3] p-2 sm:grid-cols-[1fr_220px_32px] sm:bg-transparent sm:p-0">
                      <Input value={o.text} onChange={(e) => setOption(qi, oi, { text: e.target.value })} placeholder={`Option ${oi + 1}`} />
                      <Select
                        value={o.profileKey}
                        onChange={(e) => setOption(qi, oi, { profileKey: e.target.value })}
                        className={cx("order-3 col-span-2 sm:order-none sm:col-span-1", !o.profileKey && form.profiles.length > 0 && "border-amber-300")}
                      >
                        <option value="">— Choose profile —</option>
                        {form.profiles.map((p) => (
                          <option key={p.key} value={p.key}>
                            {p.title || "Untitled profile"}
                          </option>
                        ))}
                      </Select>
                      <div className="flex items-center justify-center">
                        <IconBtn
                          label="Remove option"
                          onClick={() => setQuestion(qi, { options: q.options.filter((_, j) => j !== oi) })}
                          disabled={q.options.length <= 2}
                        >
                          <X className="h-4 w-4" />
                        </IconBtn>
                      </div>
                    </div>
                  ))}
                  {q.options.length < 10 && (
                    <Button type="button" size="sm" variant="ghost" onClick={() => setQuestion(qi, { options: [...q.options, emptyOption()] })}>
                      <Plus className="h-3.5 w-3.5" /> Add option
                    </Button>
                  )}
                </div>
              ) : (
                <p className="mt-3 text-sm text-[#8A8478]">Visitors can type a free answer. It is saved with their result but not scored.</p>
              )}
            </Card>
          ))}

          <Button type="button" variant="outline" onClick={() => update((f) => ({ questions: [...f.questions, emptyQuestion()] }))} className="w-full border-dashed">
            <Plus className="h-4 w-4" /> Add question
          </Button>
        </div>
      )}

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#E7DFD0] bg-white/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <span className="hidden text-sm text-[#8A8478] sm:block">{dirty ? "You have unsaved changes" : isNew ? "" : "All changes saved"}</span>
          <div className="ml-auto flex gap-2">
            {!form.is_published && (
              <Button type="button" variant="outline" loading={saving} onClick={() => save(true)}>
                Save & publish
              </Button>
            )}
            <Button type="button" loading={saving} onClick={() => save()}>
              {isNew ? "Create assessment" : "Save changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
