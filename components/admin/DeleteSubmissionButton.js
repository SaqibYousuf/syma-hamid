"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button, api } from "./ui";

export default function DeleteSubmissionButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!window.confirm("Delete this result permanently?")) return;
    setLoading(true);
    try {
      await api(`/api/admin/submissions/${id}`, { method: "DELETE" });
      router.replace("/admin/results");
      router.refresh();
    } catch (e) {
      window.alert(e.message);
      setLoading(false);
    }
  }

  return (
    <Button variant="danger" onClick={onDelete} loading={loading}>
      <Trash2 className="h-4 w-4" /> Delete result
    </Button>
  );
}
