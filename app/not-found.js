import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#FBF8F3] px-4 text-center">
      <Link href="/">
        <Image src="/images/logo.png" alt="Dr. Syma Hamid" width={275} height={53} className="h-10 w-auto" />
      </Link>
      <p className="mt-10 font-avenir text-sm uppercase tracking-[3px] text-[#A67539]">404</p>
      <h1 className="mt-2 font-cormorant text-[40px] font-semibold leading-tight text-[#1C2E22] sm:text-[56px]">This page could not be found</h1>
      <p className="mt-3 max-w-md font-avenir text-base text-[#1C2E22]/80">The page may have moved, or the link may be incorrect.</p>
      <Link href="/" className="mt-8 rounded-2xl bg-[#223329] px-6 py-3 font-cormorant text-lg font-semibold text-white hover:bg-[#1C2E22]">
        Back to home
      </Link>
    </div>
  );
}
