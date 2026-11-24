"use client";

import { useState, useSyncExternalStore } from "react";
import {
  ArrowUpOnSquareIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

const DISMISSED_KEY = "evoventa-ios-install-dismissed";

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const wasDismissed = () => {
  try {
    return localStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
};

const subscribeNoop = () => () => {};

export function IOSInstallHint() {
  // Browser-only checks: false on the server, read once on the client.
  const shouldShow = useSyncExternalStore(
    subscribeNoop,
    () => isIOS() && !isStandalone() && !wasDismissed(),
    () => false,
  );
  const [dismissed, setDismissed] = useState(false);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Private mode: it will show again next visit, which is fine.
    }
  };

  if (!shouldShow || dismissed) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="ios-install-title"
      className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-sm rounded-2xl border border-slate-700/60 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_100%)] p-4 text-slate-50 shadow-[0_18px_40px_rgba(15,23,42,0.35)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-300">
            Instalación
          </div>
          <div id="ios-install-title" className="mt-2 text-lg font-bold">
            Instala Evoventa en tu iPhone
          </div>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Cerrar instrucciones de instalación"
          className="text-lg leading-none text-slate-200 hover:text-white"
        >
          ×
        </button>
      </div>

      <ol className="mt-3 space-y-2 text-sm text-slate-300">
        <li className="flex items-center gap-2">
          <span className="font-semibold text-white">1.</span>
          Toca
          <ArrowUpOnSquareIcon
            className="h-5 w-5 text-blue-400"
            aria-label="Compartir"
          />
          <span className="font-semibold text-white">Compartir</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="font-semibold text-white">2.</span>
          Elige
          <SquaresPlusIcon className="h-5 w-5 text-blue-400" aria-hidden />
          <span className="font-semibold text-white">
            Agregar a pantalla de inicio
          </span>
        </li>
      </ol>

      <button
        type="button"
        onClick={dismiss}
        className="mt-4 w-full rounded-xl border border-slate-500/50 px-3.5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-800/60"
      >
        Entendido
      </button>
    </div>
  );
}
