import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "./container";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { ArrowRight, CopyrightIcon } from "lucide-react";
import { BOOKING_HREF, NAV_LINKS, SOCIAL_LINKS } from "./site-links";

const socials = [
  { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FaFacebookF },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: FaInstagram },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, Icon: FaLinkedinIn },
  { label: "X (Twitter)", href: SOCIAL_LINKS.x, Icon: FaXTwitter },
];

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden bg-[#1C2E22]">
      <Image fill src="/images/footer-bg.png" alt="" sizes="100vw" className="-z-10 object-cover" />
      <Container className="pt-14 pb-0 md:pt-16 lg:pt-20">
        <div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-[#A67539]">
            <div className="flex items-center justify-center lg:justify-start">
              <Link href="/" aria-label="Dr. Syma Hamid — Home">
                <Image src="/images/footer-logo.png" alt="Dr. Syma Hamid" width={408} height={86} className="h-14 w-auto sm:h-[64px] xl:h-[75px]" />
              </Link>
            </div>
            <div className="flex items-center justify-center border-y border-[#A67539]/40 py-8 lg:border-y-0 lg:py-0">
              <div>
                <h4 className="text-center font-avenir text-xl font-normal text-white sm:text-[24px]">Deeper Insight. Lasting Change.</h4>
                <div className="mt-5 flex justify-center gap-3 sm:gap-4">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex aspect-square w-12 items-center justify-center rounded-full border border-[#A67539] transition-colors hover:bg-[#A67539]/20 sm:w-14"
                    >
                      <Icon size={20} color="white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <Link
                href={BOOKING_HREF}
                className="flex items-center justify-center gap-2 rounded-[10px] border border-[#A67539] px-5 py-3 text-white transition-colors hover:bg-[#A67539]/20"
              >
                <span className="font-cormorant text-xl font-semibold">Begin your journey</span>
                <ArrowRight />
              </Link>
            </div>
          </div>

          <nav aria-label="Footer" className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:mt-16">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="font-urbanist text-sm font-medium tracking-[0.32px] text-white/80 transition-colors hover:text-[#F0B75B] sm:text-base">
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8 border-t border-t-[#A6753980] lg:mt-10">
            <div className="flex items-center justify-center py-5">
              <p className="flex items-center gap-2 text-center font-avenir text-sm font-normal uppercase text-white sm:gap-3 sm:text-lg">
                <CopyrightIcon color="#A67539" className="h-4 w-4 shrink-0 sm:h-6 sm:w-6" />
                {year} Syma Hamid. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
