"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Copy, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { Alert, Badge, Button, Card, EmptyState, api } from "./ui";

export default function AssessmentsTable({ initial }) {
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

  const togglePublish = (a) =>
    run(`pub-${a.id}`, async () => {
      await api(`/api/admin/assessments/${a.id}`, { method: "PATCH", body: JSON.stringify({ is_published: !a.is_published }) });
      setItems((list) => list.map((x) => (x.id === a.id ? { ...x, is_published: !a.is_published } : x)));
    });

  const remove = (a) => {
    const warn = a.submission_count
      ? `\n\n${a.submission_count} result(s) will be kept, but will no longer be linked to this assessment.`
      : "";
    if (!window.confirm(`Delete "${a.title}"? This cannot be undone.${warn}`)) return;
    run(`del-${a.id}`, async () => {
      await api(`/api/admin/assessments/${a.id}`, { method: "DELETE" });
      setItems((list) => list.filter((x) => x.id !== a.id));
    });
  };

  const duplicate = (a) =>
    run(`dup-${a.id}`, async () => {
      const { id } = await api(`/api/admin/assessments/${a.id}/duplicate`, { method: "POST" });
      router.push(`/admin/assessments/${id}`);
    });

  const move = (index, dir) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    run("order", () => api("/api/admin/assessments/reorder", { method: "POST", body: JSON.stringify({ ids: next.map((x) => x.id) }) }));
  };

  if (!items.length) {
    return (
      <Card>
        <EmptyState
          title="No assessments yet"
          description="Create your first assessment to show it on the website."
          action={
            <Button href="/admin/assessments/new">
              <Plus className="h-4 w-4" /> New assessment
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Alert>{error}</Alert>
      <Card className="overflow-hidden">
        <ul className="divide-y divide-[#EFE8DB]">
          {items.map((a, index) => (
            <li key={a.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
              <div className="flex items-center gap-1 self-start sm:flex-col sm:self-center">
                <button
                  onClick={() => move(index, -1)}
                  disabled={index === 0 || busy === "order"}
                  className="cursor-pointer rounded p-1 text-[#8A8478] hover:bg-black/5 hover:text-[#1C2E22] disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Move up"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1 || busy === "order"}
                  className="cursor-pointer rounded p-1 text-[#8A8478] hover:bg-black/5 hover:text-[#1C2E22] disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Move down"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/admin/assessments/${a.id}`} className="font-semibold hover:text-[#A67539]">
                    {a.title}
                  </Link>
                  {a.is_published ? <Badge tone="green">Published</Badge> : <Badge tone="amber">Draft</Badge>}
                  {a.is_published && a.question_count === 0 && <Badge>Shows as “Coming soon”</Badge>}
                </div>
                <p className="mt-1 text-xs text-[#8A8478]">
                  {a.question_count} questions · {a.profile_count} result profiles ·{" "}
                  <Link href={`/admin/results?assessment=${a.id}`} className="hover:underline">
                    {a.submission_count} results
                  </Link>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => togglePublish(a)} loading={busy === `pub-${a.id}`}>
                  {a.is_published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {a.is_published ? "Unpublish" : "Publish"}
                </Button>
                <Button size="sm" variant="outline" href={`/admin/assessments/${a.id}`}>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button size="sm" variant="ghost" onClick={() => duplicate(a)} loading={busy === `dup-${a.id}`} aria-label="Duplicate" title="Duplicate">
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="danger" onClick={() => remove(a)} loading={busy === `del-${a.id}`} aria-label="Delete" title="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
