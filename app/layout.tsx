import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI HUB | كورسات وتعلم الذكاء الاصطناعي",
  description: "مكتبة كورسات ومسارات عملية لتعلم الذكاء الاصطناعي واستخدام ChatGPT وGemini وClaude وأحدث الأدوات والنماذج.",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  themeColor: "#080b13",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
