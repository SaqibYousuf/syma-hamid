import Image from "next/image";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Sign in" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Image src="/images/logo.png" alt="Dr. Syma Hamid" width={275} height={53} className="h-10 w-auto" priority />
        </div>
        <div className="rounded-2xl border border-[#E7DFD0] bg-white p-6 shadow-sm sm:p-8">
          <h1 className="font-cormorant text-3xl font-bold text-[#1C2E22]">Admin sign in</h1>
          <p className="mb-6 mt-1 text-sm text-[#5C574F]">Manage assessments and view results.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
