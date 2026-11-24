"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BarcodeFromQueryProps {
  /** Same handler as a scan: looks the code up, then opens create or edit. */
  onBarcode: (barcode: string) => void;
}

/**
 * Reads `?barcode=` (sent by the "Producto no encontrado" modal), hands it to
 * `onBarcode` once, and drops it from the URL so a reload doesn't reopen the
 * panel. Render it inside <Suspense> (it uses useSearchParams).
 */
export function BarcodeFromQuery({ onBarcode }: BarcodeFromQueryProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const barcode = searchParams.get("barcode")?.trim();
  // Effects run twice in dev (Strict Mode); handle each code only once.
  const handled = useRef<string | null>(null);

  useEffect(() => {
    if (!barcode || handled.current === barcode) return;
    handled.current = barcode;
    onBarcode(barcode);
    router.replace(pathname, { scroll: false });
  }, [barcode, onBarcode, pathname, router]);

  return null;
}
