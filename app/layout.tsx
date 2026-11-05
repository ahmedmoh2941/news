import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI HUB | مركز أخبار الذكاء الاصطناعي",
  description: "تابع أحدث أخبار ونماذج وأدوات الذكاء الاصطناعي في مكان واحد.",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  themeColor: "#080b13",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
