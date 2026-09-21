import Experience from "@/components/home/experience";
import Hero from "@/components/home/hero";
import Support from "@/components/home/support";
import WorkTogether from "@/components/home/work-together";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Experience />
      <Support />
      <WorkTogether />
    </div>
  );
}
