import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Encourage AI — AI 격려 메시지 서비스",
  description: "힘든 순간, 지금 상황을 적으면 AI가 당신만을 위한 따뜻한 격려 메시지를 건네드려요.",
  keywords: ["격려", "AI", "위로", "동기부여", "멘탈케어"],
  openGraph: {
    title: "Encourage AI",
    description: "힘든 순간, 지금 상황을 적으면 AI가 당신만을 위한 따뜻한 격려 메시지를 건네드려요.",
    siteName: "Encourage AI",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Encourage AI",
    description: "힘든 순간, 지금 상황을 적으면 AI가 당신만을 위한 따뜻한 격려 메시지를 건네드려요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
