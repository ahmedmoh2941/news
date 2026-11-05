import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PWARegister } from "./pwa-tools";
import PWAInstallButton from "./pwa-tools";

export const metadata: Metadata = {
  title: "AI HUB | مركز الذكاء الاصطناعي",
  description: "مركز متكامل لتعلّم الذكاء الاصطناعي ومتابعة الأخبار والنماذج والكورسات والأدوات العملية.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }]
  },
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#080d18",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <PWARegister />
        {children}
        <PWAInstallButton />
      </body>
    </html>
  );
}
