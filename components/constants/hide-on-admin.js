"use client";

import { usePathname } from "next/navigation";

/** Renders its children everywhere except in the admin panel (/admin/...) */
export default function HideOnAdmin({ children }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname?.startsWith("/admin/")) return null;
  return children;
}