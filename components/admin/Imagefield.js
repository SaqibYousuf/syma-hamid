"use client";

import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { Button, Input, api, cx } from "./ui";

/** Image picker: upload a file or type a path/URL. `previewClass` sets the preview box size/shape. */
export default function ImageField({ label, value, onChange, hint, previewClass = "h-20 w-28" }) {
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
        <div className={cx("relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#D9CFBD] bg-[#FBF8F3]", previewClass)}>
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