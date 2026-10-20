"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function PWARegister() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isSecureContext =
      window.location.protocol === "https:" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (!("serviceWorker" in navigator) || !isSecureContext) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "imports",
        });

        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener("statechange", () => {
            if (
              installingWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.info(
                "Nueva versión del PWA disponible. Recarga la aplicación.",
              );
            }
          });
        });
      } catch (error) {
        console.error("Service worker registration failed:", error);
      }
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
    };

    window.addEventListener("load", registerServiceWorker, { once: true });
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("load", registerServiceWorker);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.info("El usuario aceptó instalar la app.");
    }

    setInstallPrompt(null);
  };

  if (!installPrompt) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[min(92vw,360px)] rounded-2xl border border-slate-700/60 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_100%)] p-4 text-slate-50 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-300">
            Instalación
          </div>
          <div className="mt-2 text-lg font-bold text-white">
            Instala Evoventa
          </div>
          <div className="mt-1.5 text-sm leading-5 text-slate-300">
            Accede más rápido y úsalo como aplicación nativa.
          </div>
        </div>

        <button
          type="button"
          onClick={() => setInstallPrompt(null)}
          aria-label="Cerrar instalación"
          className="text-lg leading-none text-slate-200 transition-colors hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={handleInstall}
          className="flex-1 rounded-xl bg-blue-600 px-3.5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-500 active:scale-[0.98]"
        >
          Instalar
        </button>

        <button
          type="button"
          onClick={() => setInstallPrompt(null)}
          className="flex-1 rounded-xl border border-slate-500/50 bg-transparent px-3.5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-slate-400 hover:bg-slate-800/60 active:scale-[0.98]"
        >
          Luego
        </button>
      </div>
    </div>
  );
}
