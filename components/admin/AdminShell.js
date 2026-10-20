"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClipboardList, ExternalLink, LayoutDashboard, LogOut, Menu, Users, X } from "lucide-react";
import { cx } from "./ui";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/assessments", label: "Assessments", icon: ClipboardList },
  { href: "/admin/results", label: "Results", icon: Users },
];

export default function AdminShell({ username, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-[#1C2E22] text-[#E9E4D8]">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/admin" className="flex items-center">
          <Image src="/images/footer-logo.png" alt="Dr. Syma Hamid" width={408} height={86} className="h-8 w-auto" />
        </Link>
        <button className="cursor-pointer p-1 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-[#A67539] text-white" : "text-[#E9E4D8]/80 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#E9E4D8]/80 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          View website
        </Link>
      </nav>
      <div className="border-t border-white/10 p-3">
        <div className="px-3 pb-2 text-xs text-[#E9E4D8]/60">
          Signed in as <span className="font-semibold text-[#E9E4D8]">{username}</span>
        </div>
        <button
          onClick={logout}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#E9E4D8]/80 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">{sidebar}</aside>

      {/* Mobile sidebar */}
      <div className={cx("fixed inset-0 z-40 lg:hidden", open ? "" : "pointer-events-none")}>
        <div
          className={cx("absolute inset-0 bg-black/40 transition-opacity", open ? "opacity-100" : "opacity-0")}
          onClick={() => setOpen(false)}
        />
        <aside className={cx("absolute inset-y-0 left-0 w-72 max-w-[85vw] transition-transform", open ? "translate-x-0" : "-translate-x-full")}>
          {sidebar}
        </aside>
      </div>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-[#E7DFD0] bg-[#F6F2EA]/95 px-4 backdrop-blur lg:hidden">
        <button onClick={() => setOpen(true)} className="cursor-pointer rounded-lg p-1.5 hover:bg-black/5" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-cormorant text-lg font-bold">Admin</span>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
    </div>
  );
}
