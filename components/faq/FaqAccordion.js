"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

export default function FaqAccordion({ items, defaultOpen = null }) {
    const [open, setOpen] = useState(defaultOpen);
    const baseId = useId();

    return (
        <ul className="border-t border-[#DCD3C3]">
            {items.map((item, i) => {
                const isOpen = open === i;
                const btnId = `${baseId}-q-${i}`;
                const panelId = `${baseId}-a-${i}`;

                return (
                    <li key={item.q} className="border-b border-[#DCD3C3]">
                        <h3>
                            <button
                                id={btnId}
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => setOpen(isOpen ? null : i)}
                                className="group flex w-full items-center gap-4 py-4 text-left sm:gap-6 sm:py-5"
                            >
                                <span className="w-9 shrink-0 font-cormorant text-[28px] leading-none text-[#A8875A] sm:w-11 sm:text-[34px]">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="h-8 w-px shrink-0 bg-[#C9B48E]/60" aria-hidden />
                                <span
                                    className={`flex-1 font-cormorant text-xl leading-snug transition-colors sm:text-[22px] ${isOpen ? "text-[#223329]" : "text-[#2E3A31] group-hover:text-[#223329]"
                                        }`}
                                >
                                    {item.q}
                                </span>
                                <span
                                    className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen
                                            ? "rotate-45 border-[#223329] bg-[#223329] text-white"
                                            : "border-[#A8875A]/60 text-[#A8875A] group-hover:border-[#223329] group-hover:text-[#223329]"
                                        }`}
                                    aria-hidden
                                >
                                    <Plus className="size-3.5" strokeWidth={1.75} />
                                </span>
                            </button>
                        </h3>

                        {/* grid-rows trick gives a smooth height animation */}
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={btnId}
                            className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                        >
                            <div className="overflow-hidden">
                                <div className="space-y-3 pb-6 pl-[4.3rem] pr-10 text-[15px] leading-7 text-[#575147] sm:pl-[5.8rem] sm:pr-14">
                                    {item.a.map((p) => (
                                        <p key={p}>{p}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}