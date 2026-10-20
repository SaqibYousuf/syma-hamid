import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "./container";
import { StarIcon } from "./icons";

/** Placeholder body for pages whose content isn't ready yet */
export default function ComingSoon({ message, links = [] }) {
  return (
    <section className="bg-[#FFF6E2]">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <StarIcon />
          <h2 className="mt-6 font-cormorant text-[34px] font-semibold leading-tight text-[#1C2E22] sm:text-[44px]">Coming soon</h2>
          <p className="mt-3 font-avenir text-base leading-[1.6] text-[#1C2E22]/80 sm:text-xl">{message}</p>
          {links.length > 0 && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {links.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={
                    i === 0
                      ? "flex items-center justify-center gap-[10px] rounded-2xl bg-[#223329] px-6 py-3 font-cormorant text-lg font-semibold text-white transition-colors hover:bg-[#1C2E22]"
                      : "flex items-center justify-center gap-[10px] rounded-2xl border border-[#A67539] px-6 py-3 font-cormorant text-lg font-semibold text-[#1C2E22] transition-colors hover:bg-[#A67539]/10"
                  }
                >
                  {l.label} <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
