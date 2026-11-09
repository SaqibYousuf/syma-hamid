"use client";

import React, { useEffect, useState } from "react";
import { Bookmark, Check, Link2 } from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const STORAGE_KEY = "inner-library:saved";

function readSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

const btn =
  "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#A67539]/60 text-[#7A5226] transition-colors hover:bg-[#A67539] hover:text-white";

/** Save (local only), Facebook, LinkedIn and copy-link buttons */
export default function ShareButtons({ slug, title }) {
  const [url, setUrl] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
    setSaved(readSaved().includes(slug));
  }, [slug]);

  const toggleSave = () => {
    const list = readSaved();
    const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    setSaved(next.includes(slug));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const enc = encodeURIComponent;

  return (
    <div className="flex items-center gap-2.5">
      <button type="button" onClick={toggleSave} className={btn} aria-pressed={saved} aria-label={saved ? "Remove from saved" : "Save article"}>
        <Bookmark className="h-3.5 w-3.5" fill={saved ? "currentColor" : "none"} />
      </button>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label={`Share "${title}" on Facebook`}
      >
        <FaFacebookF className="h-3 w-3" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label={`Share "${title}" on LinkedIn`}
      >
        <FaLinkedinIn className="h-3 w-3" />
      </a>
      <button type="button" onClick={copy} className={btn} aria-label="Copy link">
        {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
