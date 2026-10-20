import Image from "next/image";

export default function ServicesHero() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#1C2E22]">
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-16">
        <div className="max-w-2xl">
          <span className="block font-avenir text-xs font-medium uppercase tracking-[0.25em] text-[#1C2E22] sm:text-sm">
            Services
          </span>

          <h1 className="font-cormorant text-5xl font-semibold text-[#1C2E22] sm:text-6xl lg:text-[76px] \">
            Ways we can
            <br />
            work together.
          </h1>

          <p className="max-w-xl font-avenir text-base font-normal leading-7 text-[#1C2E22] sm:text-lg sm:leading-8 lg:text-xl">
            Whether you are navigating a specific difficulty, seeking greater
            clarity, or ready for deeper personal transformation, my work
            begins with understanding where you are and what you want to
            change.
          </p>
          <div className="my-6 h-0 w-23.75 border-t-[1.9px] border-[#A67539]" />
          <p className="max-w-xl border-l-2 border-[#734C1B] pl-4 font-cormorant text-xl italic leading-relaxed text-[#734C1B] sm:text-2xl">
            The work is not simply about managing what you experience; it is
            about understanding what shapes it.
          </p>
        </div>
      </div>
    </section>
  );
}
