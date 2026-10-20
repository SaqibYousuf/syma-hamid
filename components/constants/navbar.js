"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS, BOOKING_HREF } from "./site-links";

function isActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll while the mobile menu is open; close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F3]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FBF8F3]/85">
      <div className="px-4 md:px-6">
        <div className="mx-auto flex max-w-[1720px] items-center justify-between gap-4 py-3 lg:py-4">
          <Link href="/" aria-label="Dr. Syma Hamid — Home" className="shrink-0">
            <Image src="/images/logo.png" alt="Dr. Syma Hamid" width={275} height={53} priority className="h-9 w-auto sm:h-[42px] 2xl:h-[45px]" />
          </Link>

          <nav aria-label="Main" className="hidden items-center justify-center gap-4 xl:flex 2xl:gap-6">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative whitespace-nowrap font-urbanist text-base font-medium leading-[19.5px] tracking-[0.32px] text-[#A67539] transition-colors hover:text-[#1C2E22] 2xl:text-lg ${
                    active ? "text-[#1C2E22] after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-[#A67539]" : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={BOOKING_HREF}
              className="hidden items-center justify-center gap-[10px] rounded-2xl bg-[#223329] px-5 py-2.5 font-cormorant text-lg font-semibold leading-[28px] text-white transition-colors hover:bg-[#1C2E22] sm:flex 2xl:px-6 2xl:py-3"
            >
              Book an Appointment
              <ArrowRight size={16} color="#fff" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-[#1C2E22] transition-colors hover:bg-[#1C2E22]/5 xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full z-40 h-[calc(100dvh-100%)] overflow-y-auto border-t border-[#A67539]/15 bg-[#FBF8F3] transition-all duration-200 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col px-4 pb-10 pt-4 md:px-6">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b border-[#A67539]/15 py-4 font-cormorant text-2xl font-semibold transition-colors ${
                  active ? "text-[#1C2E22]" : "text-[#A67539] hover:text-[#1C2E22]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href={BOOKING_HREF}
            className="mt-8 flex items-center justify-center gap-[10px] rounded-2xl bg-[#223329] px-6 py-3.5 font-cormorant text-xl font-semibold text-white"
          >
            Book an Appointment
            <ArrowRight size={18} color="#fff" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
