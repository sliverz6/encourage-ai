import Link from "next/link";
import Footer from "@/components/Footer";
import PricingCards from "@/components/PricingCards";

export const metadata = { title: "요금제 — Encourage AI" };

export default function PricePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-sm text-stone-500 hover:text-stone-700 transition-colors mb-10 inline-block">
            ← 홈으로
          </Link>

          <PricingCards />
        </div>
      </div>
      <Footer />
    </div>
  );
}
