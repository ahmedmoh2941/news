import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI HUB | مركز أخبار الذكاء الاصطناعي",
  description: "تابع أحدث أخبار ونماذج وأدوات الذكاء الاصطناعي في مكان واحد.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
