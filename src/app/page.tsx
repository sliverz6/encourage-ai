import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EncouragementApp from "@/components/EncouragementApp";
import LandingPage from "@/components/LandingPage";
import { createClient } from "@/lib/supabase-server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-stone-800 mb-3 tracking-tight text-center animate-fade-up">
          오늘 하루도 잘 하고 있어요
        </h1>
        <p className="text-stone-500 mb-10 text-base text-center animate-fade-up [animation-delay:100ms]">
          지금 상황을 적으면 AI가 당신만을 위한 격려 메시지를 건네드려요
        </p>
        <div className="w-full max-w-lg animate-fade-up [animation-delay:200ms]">
          <Suspense>
            <EncouragementApp />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
