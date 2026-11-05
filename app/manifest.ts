import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "AI HUB - مركز الذكاء الاصطناعي",
    short_name: "AI HUB",
    description: "مركز لتعلّم الذكاء الاصطناعي ومتابعة الأخبار والنماذج والكورسات والأدوات.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "any",
    background_color: "#080d18",
    theme_color: "#080d18",
    lang: "ar",
    dir: "rtl",
    categories: ["education", "productivity", "news"],
    prefer_related_applications: false,
    icons: [
      { src: "/pwa-icon-192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa-icon-512", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ],
    shortcuts: [
      { name: "كورسات AI", short_name: "الكورسات", url: "/courses", icons: [{ src: "/pwa-icon-192", sizes: "192x192", type: "image/png" }] },
      { name: "آخر الأخبار", short_name: "الأخبار", url: "/", icons: [{ src: "/pwa-icon-192", sizes: "192x192", type: "image/png" }] },
      { name: "أفضل النماذج", short_name: "النماذج", url: "/models", icons: [{ src: "/pwa-icon-192", sizes: "192x192", type: "image/png" }] }
    ]
  };
}
