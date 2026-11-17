"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface ReceiptItem {
  name: string;
  quantity: number;
  /** Unit price. */
  price: number;
}

interface PrintableReceiptProps {
  items: ReceiptItem[];
  total: number;
  date: Date;
  clientName?: string;
  orderNumber?: string;
  /** Optional logo in /public, e.g. "/logo.png". */
  logoSrc?: string;
}

/**
 * Sales receipt that only shows when printing (`window.print()`).
 *
 * It renders straight into <body> with `data-print-receipt`; a rule in
 * globals.css hides every other child of <body> while printing, so the page
 * behind (sidebar, lists, open modals) doesn't end up on the ticket.
 */
export function PrintableReceipt({
  items,
  total,
  date,
  clientName,
  orderNumber,
  logoSrc,
}: PrintableReceiptProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Portals need the DOM; this runs once on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const dateStr = date.toLocaleDateString("es-MX", { dateStyle: "long" });
  const timeStr = date.toLocaleTimeString("es-MX", { timeStyle: "short" });

  return createPortal(
    <div data-print-receipt className="hidden print:block text-black">
      <div
        style={{
          margin: "0 auto",
          // Replaces the page margin (set to 0 in globals.css so the browser
          // doesn't print its header/footer with the date and URL).
          padding: "12mm 10mm",
          fontFamily: "monospace",
          fontSize: "24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          {logoSrc && (
            // eslint-disable-next-line @next/next/no-img-element -- print only
            <img src={logoSrc} alt="" className="grayscale mx-auto" />
          )}
          <p className="font-bold">RECIBO DE VENTA</p>
          {orderNumber && <p>{orderNumber}</p>}
          <p className="mt-1">
            {dateStr} · {timeStr}
          </p>
        </div>

        {clientName && (
          <p className="mb-2">
            Cliente: <strong>{clientName}</strong>
          </p>
        )}

        <div
          style={{
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            margin: "8px 0",
          }}
        >
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                marginBottom: "4px",
              }}
            >
              <span>
                {item.name} ×{item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            fontSize: "48px",
          }}
        >
          <span>TOTAL</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
