import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppointmentCTA() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-width background image */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/services/appointment_bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Centered content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-5 px-5 py-12 sm:px-8 sm:py-14 md:flex-row md:items-center lg:px-16 lg:py-24 min-[1024px]:max-[1400px]:py-[70px]">
        {/* <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-5 px-5 py-12 sm:px-8 sm:py-14 md:flex-row md:items-center lg:px-16 lg:py-24"> */}
        <div className="max-w-xl text-[#1C2E22]">
          <span className="mb-2 block font-avenir text-xs font-medium uppercase tracking-[0.2em]">
            Appointments
          </span>

          <p className="font-avenir text-sm leading-7 sm:text-base">
            All appointments are available in person and online, whichever
            feels right for you.
          </p>
        </div>

        <Button
          type="button"
          className="cursor-pointer rounded-[14.51px] bg-[#223329] px-8 py-6 font-avenir text-sm font-medium text-white"
        >
          Book an Appointment
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}