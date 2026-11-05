"use client";

import { useEffect, useState } from "react";
import { Download, Share, Smartphone, X, CheckCircle2 } from "lucide-react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform?: string }>;
};

export function PWARegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        // The website remains usable when service-worker registration is unavailable.
      });
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);
  return null;
}

export default function PWAInstallButton() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    setIos(isIOS);
    setInstalled(isStandalone);

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
      setOpen(false);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (installed) return;
    if (installEvent) {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
      setInstallEvent(null);
      return;
    }
    setOpen(true);
  }

  if (installed) {
    return <div className="pwa-installed" aria-live="polite"><CheckCircle2 size={16}/> AI HUB مثبت على جهازك</div>;
  }

  return (
    <>
      <button className="pwa-install-button" onClick={install} aria-label="تثبيت AI HUB كتطبيق">
        <Download size={17}/><span>ثبّت التطبيق</span>
      </button>
      {open && (
        <div className="pwa-dialog-backdrop" role="presentation" onClick={() => setOpen(false)}>
          <section className="pwa-dialog" role="dialog" aria-modal="true" aria-labelledby="pwa-dialog-title" onClick={e => e.stopPropagation()}>
            <button className="pwa-dialog-close" onClick={() => setOpen(false)} aria-label="إغلاق"><X size={18}/></button>
            <div className="pwa-dialog-icon"><Smartphone size={27}/></div>
            <h2 id="pwa-dialog-title">ثبّت AI HUB على الموبايل</h2>
            {ios ? (
              <>
                <p>على iPhone أو iPad، افتح الموقع في Safari ثم اتبع الخطوات:</p>
                <ol>
                  <li><Share size={16}/> اضغط زر المشاركة أسفل الشاشة.</li>
                  <li><span className="pwa-step-number">2</span> اختر «إضافة إلى الشاشة الرئيسية».</li>
                  <li><span className="pwa-step-number">3</span> اضغط «إضافة».</li>
                </ol>
                <small>يمكن أن يختلف مكان زر المشاركة حسب إصدار iOS.</small>
              </>
            ) : (
              <>
                <p>لو زر التثبيت المباشر مش ظاهر في المتصفح، استخدم قائمة المتصفح:</p>
                <ol>
                  <li><span className="pwa-step-number">1</span> افتح قائمة Chrome (⋮).</li>
                  <li><span className="pwa-step-number">2</span> اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».</li>
                  <li><span className="pwa-step-number">3</span> أكّد التثبيت.</li>
                </ol>
                <small>تأكد أنك تفتح الموقع من Chrome أو متصفح يدعم تثبيت تطبيقات الويب.</small>
              </>
            )}
            <button className="pwa-dialog-done" onClick={() => setOpen(false)}>فهمت</button>
          </section>
        </div>
      )}
    </>
  );
}
