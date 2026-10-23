"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Trash2, X } from "lucide-react";
import { Alert, Badge, Button, Card, EmptyState, Field, Input, Select, Textarea, api, cx } from "./ui";
import { EmotionWheel } from "@/components/wheel-of-emotion/emotion-wheel";
import { getWheelIcon } from "@/components/wheel-of-emotion/icons";
import { WHEEL_ICON_NAMES } from "@/components/wheel-of-emotion/icon-names";

const move = (list, i, dir) => {
  const t = i + dir;
  if (t < 0 || t >= list.length) return list;
  const next = [...list];
  [next[i], next[t]] = [next[t], next[i]];
  return next;
};

/* ───────────────────────── Emotions tab ───────────────────────── */

function EmotionsTab({ initial }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");

  async function run(key, fn) {
    setError("");
    setBusy(key);
    try {
      await fn();
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  }

  const toggle = (e) =>
    run(`act-${e.id}`, async () => {
      await api(`/api/admin/wheel/emotions/${e.id}`, { method: "PATCH", body: JSON.stringify({ is_active: !e.is_active }) });
      setItems((list) => list.map((x) => (x.id === e.id ? { ...x, is_active: !e.is_active } : x)));
    });

  const remove = (e) => {
    if (!window.confirm(`Delete "${e.label}" and its ${e.feeling_count} feelings? This cannot be undone.\n\nSaved reflections are kept.`)) return;
    run(`del-${e.id}`, async () => {
      await api(`/api/admin/wheel/emotions/${e.id}`, { method: "DELETE" });
      setItems((list) => list.filter((x) => x.id !== e.id));
    });
  };

  const reorder = (i, dir) => {
    const next = move(items, i, dir);
    if (next === items) return;
    setItems(next);
    run("order", () => api("/api/admin/wheel/emotions/reorder", { method: "POST", body: JSON.stringify({ ids: next.map((x) => x.id) }) }));
  };

  const preview = items.filter((e) => e.is_active).map((e) => ({ id: e.slug, label: e.label, color: e.color, icon: e.icon }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-4">
        <div className="flex justify-end">
          <Button href="/admin/wheel/emotions/new">
            <Plus className="h-4 w-4" /> New emotion
          </Button>
        </div>
        <Alert>{error}</Alert>
        {items.length === 0 ? (
          <Card>
            <EmptyState title="No emotions yet" description="Add the emotions that appear on the wheel." />
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <ul className="divide-y divide-[#EFE8DB]">
              {items.map((e, i) => {
                const Icon = getWheelIcon(e.icon);
                return (
                  <li key={e.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:px-5">
                    <div className="flex items-center gap-1 self-start sm:flex-col sm:self-center">
                      <button
                        type="button"
                        onClick={() => reorder(i, -1)}
                        disabled={i === 0 || busy === "order"}
                        className="cursor-pointer rounded p-1 text-[#8A8478] hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Move up"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => reorder(i, 1)}
                        disabled={i === items.length - 1 || busy === "order"}
                        className="cursor-pointer rounded p-1 text-[#8A8478] hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Move down"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ background: e.color }}>
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link href={`/admin/wheel/emotions/${e.id}`} className="font-semibold hover:text-[#A67539]">
                          {e.label}
                        </Link>
                        {e.is_active ? <Badge tone="green">On the wheel</Badge> : <Badge tone="amber">Hidden</Badge>}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-xs text-[#8A8478]">{e.description}</p>
                      <p className="mt-0.5 text-xs text-[#8A8478]">
                        {e.feeling_count} feelings ·{" "}
                        <Link href={`/admin/wheel/reflections?emotion=${e.id}`} className="hover:underline">
                          {e.reflection_count} reflections
                        </Link>
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => toggle(e)} loading={busy === `act-${e.id}`}>
                        {e.is_active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        {e.is_active ? "Hide" : "Show"}
                      </Button>
                      <Button size="sm" variant="outline" href={`/admin/wheel/emotions/${e.id}`}>
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => remove(e)} loading={busy === `del-${e.id}`} aria-label="Delete" title="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </div>

      <Card className="h-fit p-5 lg:sticky lg:top-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#8A8478]">Preview</p>
        {preview.length > 0 ? (
          <div className="flex justify-center">
            <EmotionWheel emotions={preview} selectedId={null} onSelect={() => {}} className="w-[min(260px,100%)]" />
          </div>
        ) : (
          <p className="text-sm text-[#8A8478]">No emotions are switched on.</p>
        )}
        <p className="mt-4 text-xs text-[#8A8478]">The wheel goes clockwise from the top in the order of the list.</p>
      </Card>
    </div>
  );
}

/* ───────────────────────── Needs tab ───────────────────────── */

let needKey = 0;
const withKey = (n) => ({ ...n, key: `n${++needKey}` });

function NeedsTab({ initial }) {
  const router = useRouter();
  const [items, setItems] = useState(() => initial.map(withKey));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const set = (i, patch) => {
    setItems((list) => list.map((n, j) => (j === i ? { ...n, ...patch } : n)));
    setSaved(false);
  };

  async function save() {
    setError("");
    setSaving(true);
    try {
      const { needs } = await api("/api/admin/wheel/needs", { method: "PUT", body: JSON.stringify({ needs: items }) });
      setItems(needs.map(withKey));
      setSaved(true);
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-4">
      <Alert tone="info">
        These are the options for “What might you need right now?” (step 4). The chosen need’s “core need” text replaces the Core Need shown on
        the deeper layers (step 5). Five needs fit best on one row.
      </Alert>
      <Alert>{error}</Alert>
      {saved && <Alert tone="success">Needs saved.</Alert>}
      <Card className="divide-y divide-[#EFE8DB]">
        {items.map((n, i) => {
          const Icon = getWheelIcon(n.icon);
          return (
            <div key={n.key} className="grid gap-3 p-4 sm:grid-cols-[auto_1fr_170px_1.4fr_auto] sm:items-end">
              <div className="flex items-center gap-1 sm:flex-col">
                <button
                  type="button"
                  onClick={() => setItems((l) => move(l, i, -1))}
                  disabled={i === 0}
                  className="cursor-pointer rounded p-1 text-[#8A8478] hover:bg-black/5 disabled:opacity-30"
                  aria-label="Move up"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setItems((l) => move(l, i, 1))}
                  disabled={i === items.length - 1}
                  className="cursor-pointer rounded p-1 text-[#8A8478] hover:bg-black/5 disabled:opacity-30"
                  aria-label="Move down"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </div>
              <Field label="Name">
                <Input value={n.label} onChange={(e) => set(i, { label: e.target.value })} />
              </Field>
              <Field label="Icon">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE3D1]">
                    <Icon className="h-4 w-4 text-[#A8743F]" />
                  </span>
                  <Select value={n.icon} onChange={(e) => set(i, { icon: e.target.value })}>
                    {WHEEL_ICON_NAMES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </div>
              </Field>
              <Field label="Core need text">
                <Input value={n.core_need} onChange={(e) => set(i, { core_need: e.target.value })} placeholder="To feel seen and understood" />
              </Field>
              <div className="flex items-center gap-3 pb-2">
                <label className="flex cursor-pointer items-center gap-1.5 text-xs text-[#5C574F]">
                  <input type="checkbox" checked={n.is_active} onChange={(e) => set(i, { is_active: e.target.checked })} className="accent-[#1C2E22]" />
                  Show
                </label>
                <button
                  type="button"
                  onClick={() => setItems((l) => l.filter((_, j) => j !== i))}
                  className="cursor-pointer rounded-lg p-1.5 text-red-600 hover:bg-red-50"
                  aria-label="Remove need"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
        {items.length === 0 && <p className="p-6 text-center text-sm text-[#8A8478]">No needs. Step 4 will only show the insight text.</p>}
      </Card>
      <div className="flex flex-wrap justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setItems((l) => [...l, withKey({ id: null, label: "", icon: "Heart", core_need: "", is_active: true })])}
          disabled={items.length >= 12}
        >
          <Plus className="h-4 w-4" /> Add need
        </Button>
        <Button type="button" onClick={save} loading={saving}>
          Save needs
        </Button>
      </div>
    </div>
  );
}

/* ───────────────────────── Settings tab ───────────────────────── */

function SettingsTab({ initial }) {
  const router = useRouter();
  const [statements, setStatements] = useState(initial.defaultStatements.join("\n"));
  const [quote, setQuote] = useState(initial.quote);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function save() {
    setError("");
    setSaving(true);
    try {
      const list = statements.split("\n").map((s) => s.trim()).filter(Boolean);
      const { settings } = await api("/api/admin/wheel/settings", { method: "PUT", body: JSON.stringify({ defaultStatements: list, quote }) });
      setStatements(settings.defaultStatements.join("\n"));
      setQuote(settings.quote);
      setSaved(true);
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="max-w-3xl space-y-5 p-5 sm:p-6">
      <Alert>{error}</Alert>
      {saved && <Alert tone="success">Settings saved.</Alert>}
      <Field
        label="Default “What feels most true?” options"
        hint="One per line. Used on step 3 for every feeling that doesn’t have its own options."
      >
        <Textarea
          rows={6}
          value={statements}
          onChange={(e) => {
            setStatements(e.target.value);
            setSaved(false);
          }}
        />
      </Field>
      <Field label="Quote on the first screen" hint="Shown next to the wheel. Leave empty to hide it.">
        <Input
          value={quote}
          onChange={(e) => {
            setQuote(e.target.value);
            setSaved(false);
          }}
        />
      </Field>
      <div className="flex justify-end">
        <Button type="button" onClick={save} loading={saving}>
          Save settings
        </Button>
      </div>
    </Card>
  );
}

/* ───────────────────────── Shell ───────────────────────── */

export default function WheelAdmin({ initialEmotions, initialNeeds, initialSettings, initialTab = "emotions" }) {
  const [tab, setTab] = useState(initialTab);
  const tabs = [
    { id: "emotions", label: `Emotions (${initialEmotions.length})` },
    { id: "needs", label: `Needs (${initialNeeds.length})` },
    { id: "settings", label: "Settings" },
  ];
  return (
    <>
      <div className="mb-5 flex max-w-xl gap-1 overflow-x-auto rounded-xl bg-[#EDE6D8] p-1">
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
      {tab === "emotions" && <EmotionsTab initial={initialEmotions} />}
      {tab === "needs" && <NeedsTab initial={initialNeeds} />}
      {tab === "settings" && <SettingsTab initial={initialSettings} />}
    </>
  );
}
