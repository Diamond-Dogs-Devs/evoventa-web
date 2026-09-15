import { useEffect, useRef } from "react";

/**
 * Escucha un escaneo de código de barras en cualquier parte de la página.
 *
 * El lector integrado del POS Android "teclea" el código dentro de lo que
 * tenga el foco en ese momento — normalmente el buscador de productos, que
 * es un <input>. Antes este hook ignoraba por completo los eventos cuando el
 * foco estaba sobre un input/textarea/select, así que un escaneo mientras el
 * buscador tenía el foco (el caso normal) nunca llegaba a disparar nada.
 * Ahora siempre escucha; no interfiere con el tecleo manual (no hace
 * `preventDefault`), solo observa.
 *
 * Tampoco se depende únicamente de la tecla Enter: algunos lectores Android
 * integrados escriben a través del IME del sistema en vez de mandar eventos
 * de teclado reales, y ahí el Enter no siempre llega. Por eso, si el buffer
 * deja de crecer por `idleTimeout` ms, el escaneo se da por terminado igual.
 *
 * Para no confundir un escaneo con alguien tecleando a mano se usan dos
 * señales: la velocidad entre caracteres (`scanTimeout`, un lector escribe
 * en ráfaga) y un mínimo de caracteres (`minLength`).
 */
export function useGlobalBarcodeScan(
  onScan: (code: string) => void,
  scanTimeout = 100,
  idleTimeout = 150,
  minLength = 4,
) {
  const bufferRef = useRef("");
  const lastCharTimeRef = useRef(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onScanRef = useRef(onScan);

  useEffect(() => {
    onScanRef.current = onScan;
  });

  useEffect(() => {
    const clearIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const flush = () => {
      const code = bufferRef.current.trim();
      bufferRef.current = "";
      clearIdleTimer();
      if (code.length >= minLength) onScanRef.current(code);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-no-barcode-scan]")) return;

      const now = performance.now();

      if (bufferRef.current && now - lastCharTimeRef.current > scanTimeout) {
        bufferRef.current = "";
      }

      if (e.key === "Enter") {
        if (bufferRef.current) flush();
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        bufferRef.current += e.key;
        lastCharTimeRef.current = now;

        clearIdleTimer();
        idleTimerRef.current = setTimeout(flush, idleTimeout);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearIdleTimer();
    };
  }, [scanTimeout, idleTimeout, minLength]);
}
