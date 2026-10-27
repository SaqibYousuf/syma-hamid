"use client";

import Image from "next/image";
import {
    MapPin,
    Monitor,
    Mail,
    Phone,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
const contactDetails = [
    {
        icon: MapPin,
        title: "Location",
        lines: ["Islamabad, Pakistan", "(Exact address will be shared", "upon booking)"],
    },
    {
        icon: Monitor,
        title: "Consultations",
        lines: ["Available in person and online,", "wherever most beneficial for you."],
    },
    {
        icon: Mail,
        title: "Email",
        lines: ["drysyma@gmail.com"],
    },
    {
        icon: Phone,
        title: "Phone / WhatsApp",
        lines: ["+92 300 1234567", "(For appointment inquiries only)"],
    },
];

export default function ContactSection() {
    return (
        <section id="contact" className="w-full bg-[#F5EFE4] text-[#1D3029]">
            {/* Main contact area */}
            <div className="relative grid grid-cols-1 lg:grid-cols-[30%_70%]">
                {/* Interior photograph */}
                <div className="absolute inset-0 lg:relative lg:min-h-135">
                    <Image
                        src="/images/contact/Sunlit_Scandinavian.png"
                        alt="A warm, sunlit therapy room"
                        fill
                        priority
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover object-left"
                    />
                </div>

                {/* Contact content */}
                <div className="relative z-10 bg-[#F5EFE4]/95 px-5 py-12 sm:px-10 lg:px-10 lg:py-10 xl:px-14">
                    {/* Decorative background detail */}
                    <div className="absolute inset-0">
                        <Image
                            src="/images/services/celestial_bg.png"
                            alt=""
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover object-right "
                        />
                    </div>

                    <div className="relative mx-auto max-w-5xl">
                        {/* Contact label */}
                        <p className="font-avenir text-sm font-medium uppercase leading-[120%] tracking-[2px] text-[#1C2E22] sm:text-lg sm:tracking-[3px] xl:text-[22px]">
                            Contact
                            <span className="ml-3 inline-block h-px w-12 bg-[#C9B48E] align-middle" />
                        </p>

                        {/* Main heading */}
                        <h2 className="mt-2 font-cormorant text-[40px] font-semibold capitalize leading-[100%] text-[#1C2E22] sm:text-[52px] xl:text-[66px]">
                            Get in touch.
                        </h2>

                        {/* Description */}
                        <p className="mt-3 max-w-md font-avenir text-base font-normal leading-[1.45] text-[#1C2E22] sm:text-xl xl:text-[25px] xl:leading-[120%]">
                            If you would like to book an appointment, have a question,
                            or simply want to know more, I would be glad to hear from you.
                        </p>

                        <p className="mt-5 max-w-sm border-t border-[#C9B48E]/60 pt-4 font-cormorant text-base italic leading-snug text-[#92754F] sm:text-lg">
                            The first step towards change often begins
                            <br />
                            with a conversation.
                        </p>


                        {/* Contact details and form */}
                        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 xl:gap-10">
                            {/* Contact information */}
                            <div className="space-y-5">
                                {contactDetails.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div key={item.title} className="flex items-start gap-3">
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EAE0CF]">
                                                <Icon
                                                    size={17}
                                                    strokeWidth={1.3}
                                                    className="text-[#A8875A]"
                                                />
                                            </div>

                                            <div className="pt-0.5">
                                                <h3 className="font-avenir text-sm font-medium leading-[120%] text-[#1C2E22] sm:text-base">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-1 font-avenir text-xs font-normal leading-[1.45] text-[#575147] sm:text-sm">
                                                    {item.lines.map((line, index) => (
                                                        <span key={index} className="block">
                                                            {line}
                                                        </span>
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>

                            {/* Message form */}
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                }}
                                className="border border-[#D9CDBA] bg-[#F0E7D9]/70 p-4 sm:p-5"
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <h3 className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em]">
                                        Send a message
                                    </h3>
                                    <span className="h-px w-8 bg-[#C9B48E]" />
                                </div>

                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        aria-label="Your name"
                                        required
                                        className="w-full border border-transparent bg-[#FAF5EC] px-3 py-2 text-xs outline-none placeholder:text-[#928879] focus:border-[#A8875A]"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        aria-label="Your email"
                                        required
                                        className="w-full border border-transparent bg-[#FAF5EC] px-3 py-2 text-xs outline-none placeholder:text-[#928879] focus:border-[#A8875A]"
                                    />

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Your Phone Number (Optional)"
                                        aria-label="Your phone number (optional)"
                                        className="w-full border border-transparent bg-[#FAF5EC] px-3 py-2 text-xs outline-none placeholder:text-[#928879] focus:border-[#A8875A]"
                                    />

                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        aria-label="Your message"
                                        required
                                        rows={4}
                                        className="w-full resize-y border border-transparent bg-[#FAF5EC] px-3 py-2 text-xs outline-none placeholder:text-[#928879] focus:border-[#A8875A]"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-3 inline-flex items-center gap-3 rounded-full bg-[#19352C] px-5 py-2.5 font-cormorant text-xs text-[#F5EFE4] transition-colors hover:bg-[#29483D]"
                                >
                                    Send Message
                                    <ArrowRight size={14} strokeWidth={1.3} />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Appointment banner */}
            <section className="relative overflow-hidden bg-[#0B241D] text-[#F4F1EA]">
                {/* Decorative background texture */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: "url('/images/contact/Golden_Orbits.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                <div className="relative mx-auto grid max-w-300 grid-cols-1 items-center gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_1px_auto] lg:gap-11 lg:px-12 lg:py-10">
                    {/* Heading */}
                    <div>
                        <p className="flex items-center gap-3 font-avenir text-[9px] font-medium uppercase tracking-[2.5px] text-white">
                            Appointments
                            <span className="h-px w-14 bg-[#A8875A]/70" />
                        </p>

                        <h3 className="mt-2 max-w-117.5 font-cormorant text-[28px] font-medium leading-[0.98] text-[#F4F1EA] sm:text-[34px] lg:text-[32px] xl:text-[36px]">
                            All appointments are available
                            <br />
                            for in-person and online,
                        </h3>

                        <p className="mt-2 font-cormorant text-base leading-tight text-white sm:text-lg">
                            wherever most beneficial for you.
                        </p>
                    </div>

                    {/* Center divider and star */}
                    <div className="relative hidden h-26 items-center justify-center lg:flex">
                        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#A8875A]/60" />
                        <span className="relative z-10 bg-transparent px-1 font-cormorant text-[29px] leading-none text-[#B89A65]">
                            ✳
                        </span>
                    </div>

                    {/* Appointment button */}
                    <div>
                        <a
                            href="/appointment"
                            className="inline-flex min-h-13.5 items-center justify-center gap-4 rounded-full border border-[#A8875A] px-7 font-cormorant text-sm text-[#E8DCC9] transition-colors duration-300 hover:bg-[#A8875A]/10 sm:min-w-[190px] sm:px-8"
                        >
                            Book an Appointment
                            <span aria-hidden="true" className="text-lg leading-none">
                                →
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </section>
    );
}
