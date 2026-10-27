import Link from "next/link";
import { connection } from "next/server";
import CheckoutForm from "@/components/workshops/checkout-form";
import { getPublicWorkshop } from "@/lib/workshops";
import { getBankDetails } from "@/lib/bank";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const workshop = await getPublicWorkshop(slug);
    return { title: workshop ? `Reserve your seat — ${workshop.title}` : "Workshop not found" };
  } catch {
    return { title: "Reserve your seat" };
  }
}

export default async function CheckoutPage({ params }) {
  await connection();
  const { slug } = await params;

  let workshop = null;
  let loadError = false;
  try {
    workshop = await getPublicWorkshop(slug);
  } catch (error) {
    console.error("[checkout] failed to load workshop", error);
    loadError = true;
  }

  if (!workshop) {
    return (
      <main className="font-avenir flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#F4EFE6] p-6 text-center">
        <h1 className="font-cormorant text-3xl font-semibold text-[#223329]">
          {loadError ? "Something went wrong" : "Workshop not found"}
        </h1>
        <p className="max-w-md text-[15px] text-[#5A5649]">
          {loadError ? "Please refresh the page or try again in a few minutes." : "This workshop may have ended or is no longer available."}
        </p>
        <Link href="/workshops" className="text-[#223329] underline underline-offset-4">
          Back to workshops
        </Link>
      </main>
    );
  }

  return <CheckoutForm workshop={workshop} bank={getBankDetails()} />;
}
