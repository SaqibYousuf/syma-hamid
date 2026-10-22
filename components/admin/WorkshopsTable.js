"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { Alert, Badge, Button, Card, EmptyState, api } from "./ui";
import { formatPrice, formatTimeRange, formatWorkshopDate } from "@/components/workshops/workshops";

export default function WorkshopsTable({ initial, today }) {
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

  const togglePublish = (w) =>
    run(`pub-${w.id}`, async () => {
      await api(`/api/admin/workshops/${w.id}`, { method: "PATCH", body: JSON.stringify({ is_published: !w.is_published }) });
      setItems((list) => list.map((x) => (x.id === w.id ? { ...x, is_published: !w.is_published } : x)));
    });

  const remove = (w) => {
    const warn = w.order_count ? `\n\nIts ${w.order_count} order(s) will be kept, but no longer linked to the workshop.` : "";
    if (!window.confirm(`Delete "${w.title}"? This cannot be undone.${warn}`)) return;
    run(`del-${w.id}`, async () => {
      await api(`/api/admin/workshops/${w.id}`, { method: "DELETE" });
      setItems((list) => list.filter((x) => x.id !== w.id));
    });
  };

  if (!items.length) {
    return (
      <Card>
        <EmptyState
          title="No workshops yet"
          description="Create your first workshop to show it on the website."
          action={
            <Button href="/admin/workshops/new">
              <Plus className="h-4 w-4" /> New workshop
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
          {items.map((w) => {
            const past = w.event_date < today;
            return (
              <li key={w.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/admin/workshops/${w.id}`} className="font-semibold hover:text-[#A67539]">
                      {w.title}
                    </Link>
                    {past ? <Badge>Past</Badge> : w.is_published ? <Badge tone="green">Published</Badge> : <Badge tone="amber">Draft</Badge>}
                    {!past && w.seats_left === 0 && <Badge tone="gold">Sold out</Badge>}
                  </div>
                  <p className="mt-1 text-xs text-[#8A8478]">
                    {formatWorkshopDate(w.event_date)}
                    {w.start_time ? ` · ${formatTimeRange(w.start_time, w.end_time)}` : ""} · {formatPrice(w.price)}
                  </p>
                  <p className="mt-0.5 text-xs text-[#8A8478]">
                    {w.seats_taken} / {w.total_seats} seats booked ·{" "}
                    <Link href={`/admin/orders?workshop=${w.id}`} className="hover:underline">
                      {w.order_count} orders
                    </Link>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => togglePublish(w)} loading={busy === `pub-${w.id}`}>
                    {w.is_published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {w.is_published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button size="sm" variant="outline" href={`/admin/workshops/${w.id}`}>
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => remove(w)} loading={busy === `del-${w.id}`} aria-label="Delete" title="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}