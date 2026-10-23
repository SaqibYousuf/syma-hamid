"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { api } from "./ui";

export default function DeleteReflectionButton({ id }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        if (!window.confirm("Delete this reflection permanently?")) return;
        setBusy(true);
        try {
          await api(`/api/admin/wheel/reflections/${id}`, { method: "DELETE" });
          router.refresh();
        } catch (e) {
          window.alert(e.message);
          setBusy(false);
        }
      }}
      className="cursor-pointer rounded-lg p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-40"
      aria-label="Delete reflection"
      title="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
