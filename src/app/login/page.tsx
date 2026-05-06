import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-8">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-stone-800 tracking-tight">Encourage AI</h1>
          <p className="text-stone-500 mt-2 text-sm">따뜻한 격려 메시지를 받아보세요</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <Suspense>
            <AuthForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
