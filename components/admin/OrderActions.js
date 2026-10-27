"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, CheckCircle2, Clock, Trash2 } from "lucide-react";
import { Alert, Button, Card, Textarea, api } from "./ui";

const ACTIONS = [
  { status: "confirmed", label: "Mark as paid / confirmed", icon: CheckCircle2, variant: "primary" },
  { status: "pending", label: "Back to awaiting payment", icon: Clock, variant: "outline" },
  { status: "cancelled", label: "Cancel order (frees seats)", icon: Ban, variant: "danger" },
];

export default function OrderActions({ order }) {
  const router = useRouter();
  const [status, setStatus] = useState(order.status);
  const [note, setNote] = useState(order.admin_note);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function patch(body, key, success) {
    setError("");
    setMessage("");
    setBusy(key);
    try {
      const { order: updated } = await api(`/api/admin/orders/${order.id}`, { method: "PATCH", body: JSON.stringify(body) });
      setStatus(updated.status);
      setNote(updated.admin_note || "");
      setMessage(success);
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  }

  async function remove() {
    if (!window.confirm("Delete this order permanently? Use “Cancel order” instead if you want to keep a record.")) return;
    setBusy("delete");
    try {
      await api(`/api/admin/orders/${order.id}`, { method: "DELETE" });
      router.replace("/admin/orders");
      router.refresh();
    } catch (e) {
      setError(e.message);
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-3 p-5">
        <h2 className="font-cormorant text-xl font-bold">Status</h2>
        <Alert>{error}</Alert>
        {message && <Alert tone="success">{message}</Alert>}
        {ACTIONS.filter((a) => a.status !== status).map(({ status: s, label, icon: Icon, variant }) => (
          <Button
            key={s}
            type="button"
            variant={variant}
            className="w-full justify-start"
            loading={busy === s}
            disabled={Boolean(busy)}
            onClick={() => {
              if (s === "cancelled" && !window.confirm("Cancel this order? The seats become available again.")) return;
              patch({ status: s }, s, "Status updated.");
            }}
          >
            <Icon className="h-4 w-4" /> {label}
          </Button>
        ))}
        <p className="text-xs text-[#8A8478]">Awaiting-payment and confirmed orders hold seats. Cancelled orders don’t.</p>
      </Card>

      <Card className="space-y-3 p-5">
        <h2 className="font-cormorant text-xl font-bold">Admin note</h2>
        <Textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Payment received in Meezan account on 12 Nov" />
        <Button type="button" variant="outline" loading={busy === "note"} disabled={Boolean(busy)} onClick={() => patch({ admin_note: note }, "note", "Note saved.")}>
          Save note
        </Button>
      </Card>

      <Button type="button" variant="danger" className="w-full" loading={busy === "delete"} disabled={Boolean(busy)} onClick={remove}>
        <Trash2 className="h-4 w-4" /> Delete order
      </Button>
    </div>
  );
}