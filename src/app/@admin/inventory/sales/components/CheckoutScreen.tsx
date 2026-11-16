"use client";

import { Button, Card, Heading } from "@/shared/ui";
import {
  PrinterIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import type { CartItemI, ClientI } from "../types/sales.types";
import { PrintableReceipt } from "@/shared/components/PrintableReceipt";

interface Props {
  cartItems: CartItemI[];
  selectedClient: ClientI | null;
  total: number;
  orderLoading: boolean;
  onConfirm: () => void;
  quotationLoading: boolean;
  onSaveQuotation: () => void;
  onBack: () => void;
}

export function CheckoutScreen({
  cartItems,
  selectedClient,
  total,
  orderLoading,
  onConfirm,
  quotationLoading,
  onSaveQuotation,
  onBack,
}: Props) {
  const busy = orderLoading || quotationLoading;
  const handlePrint = () => window.print();

  const now = new Date();
  const dateStr = now.toLocaleDateString("es-MX", { dateStyle: "long" });
  const timeStr = now.toLocaleTimeString("es-MX", { timeStyle: "short" });

  return (
    <>
      {/* Receipt — visible only on print */}
      <PrintableReceipt
        date={now}
        clientName={selectedClient?.name}
        items={cartItems.map(({ inventoryProduct: ip, quantity }) => ({
          name: ip.product?.name ?? `#${ip.productId}`,
          quantity,
          price: Number(ip.product?.salePrice ?? 0),
        }))}
        total={total}
      />

      {/* Screen layout */}
      <div className="w-full max-w-2xl mx-auto w-full flex flex-col gap-6 print:hidden">
        <Button
          type="button"
          variant="link"
          color="lightGray"
          onClick={onBack}
          disabled={orderLoading}
          className="!no-underline text-xl flex items-center gap-2 !text-gray-500 w-fit"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver al carrito
        </Button>

        <Card className="overflow-hidden" childrenPadding="">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <Heading variant="sectionHeadingCard" className="!py-0 !border-0">
              Confirmar venta
            </Heading>
            <Heading variant="body" className="text-sm !text-gray-500 mt-0.5">
              {dateStr} · {timeStr}
            </Heading>
          </div>

          {/* Client */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <UserIcon className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <Heading
                variant="body"
                className="text-xs !text-gray-400 uppercase tracking-wide font-medium"
              >
                Cliente
              </Heading>
              <Heading variant="body" className="text-sm font-semibold !text-gray-800">
                {selectedClient?.name ?? "—"}
              </Heading>
            </div>
          </div>

          {/* Items */}
          <div className="px-6 py-4 divide-y divide-gray-50">
            {cartItems.map(({ inventoryProduct: ip, quantity }) => {
              const salePrice = ip.product?.salePrice ?? 0;
              return (
                <div
                  key={ip.productId}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <Heading
                      variant="body"
                      className="text-sm font-medium !text-gray-800 truncate"
                    >
                      {ip.product?.name ?? `Producto #${ip.productId}`}
                    </Heading>
                    <Heading variant="body" className="text-xs !text-gray-400 mt-0.5">
                      {ip.product?.brand ?? "—"} · ${salePrice.toFixed(2)} c/u
                    </Heading>
                  </div>
                  <div className="text-right shrink-0">
                    <Heading variant="body" className="text-sm font-bold !text-gray-800">
                      ${(salePrice * quantity).toFixed(2)}
                    </Heading>
                    <Heading variant="body" className="text-xs !text-gray-400">
                      {quantity} unid.
                    </Heading>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <Heading variant="body" className="text-base font-bold !text-gray-700">
              Total
            </Heading>
            <Heading variant="body" className="text-3xl font-bold !text-gray-900">
              ${total.toFixed(2)}
            </Heading>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="border"
            color="primary"
            size="md"
            className="flex-1 justify-center gap-2"
            onClick={handlePrint}
            disabled={busy}
          >
            <PrinterIcon className="h-4 w-4" />
            Imprimir recibo
          </Button>
          <Button
            type="button"
            variant="border"
            color="primary"
            size="md"
            className="flex-1 justify-center gap-2"
            onClick={onSaveQuotation}
            loading={quotationLoading}
            disabled={busy}
          >
            <DocumentTextIcon className="h-4 w-4" />
            {quotationLoading ? "Guardando..." : "Guardar cotización"}
          </Button>
          <Button
            type="button"
            variant="fill"
            color="primary"
            size="md"
            className="flex-1 justify-center gap-2"
            onClick={onConfirm}
            loading={orderLoading}
            disabled={busy}
          >
            <CheckCircleIcon className="h-4 w-4" />
            {orderLoading ? "Procesando..." : "Finalizar compra"}
          </Button>
        </div>
      </div>
    </>
  );
}
