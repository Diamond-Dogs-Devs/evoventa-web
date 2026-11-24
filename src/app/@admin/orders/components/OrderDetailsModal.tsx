"use client";

import {
  UserGroupIcon,
  UserIcon,
  CalendarIcon,
  ShoppingBagIcon,
  ExclamationTriangleIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { Button, Heading } from "@/shared/ui";
import { PrintableReceipt } from "@/shared/components/PrintableReceipt";
import {
  BADGE_TONE_CLASSES,
  StatusBadge,
} from "@/shared/components/StatusBadge";
import { formatMoney } from "@/shared/utils/format";
import { useOrderDetailsModal } from "../hooks";
import { OrderI, PendingActionT } from "../types/order.types";
import {
  EDITABLE_ORDER_STATUSES,
  getOrderStatusConfig,
  QUOTATION_BADGE,
} from "../utils";

interface OrderDetailsModalProps {
  order: OrderI;
  close: () => void;
}

const CONFIRMATIONS: Record<
  PendingActionT,
  { question: string; confirm: string; busy: string; tone: "purple" | "red" }
> = {
  convert: {
    question: "¿Convertir esta cotización en venta?",
    confirm: "Sí, convertir",
    busy: "Convirtiendo...",
    tone: "purple",
  },
  cancel: {
    question: "¿Cancelar esta orden? Podrás reactivarla cambiando el estatus.",
    confirm: "Sí, cancelar",
    busy: "Cancelando...",
    tone: "red",
  },
};

const CONFIRMATION_TONE = {
  purple: "border-purple-200 bg-purple-50 text-purple-900",
  red: "border-red-200 bg-red-50 text-red-900",
};

export function OrderDetailsModal({ order, close }: OrderDetailsModalProps) {
  const {
    currentStatus,
    status,
    createdAt,
    items,
    receiptItems,
    loading,
    error,
    isQuotation,
    canPrintReceipt,
    pendingAction,
    setPendingAction,
    savingStatus,
    mutating,
    handleStatusClick,
    confirmActions,
  } = useOrderDetailsModal(order, close);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-2">
        <Heading variant="sectionHeadingCard" className="!py-0 !border-0">
          {order.orderNumber}
        </Heading>
        <div className="flex items-center gap-1.5 shrink-0">
          {isQuotation && <StatusBadge size="md" {...QUOTATION_BADGE} />}
          <StatusBadge size="md" label={status.label} tone={status.tone} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <UserGroupIcon className="h-5 w-5 text-gray-400 shrink-0" />
          <div>
            <Heading variant="body" className="text-xs !text-gray-400">
              Cliente
            </Heading>
            <Heading variant="body" className="font-medium !text-gray-700">
              {order.clientName ?? "—"}
            </Heading>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <UserIcon className="h-5 w-5 text-gray-400 shrink-0" />
          <div>
            <Heading variant="body" className="text-xs !text-gray-400">
              Vendedor
            </Heading>
            <Heading variant="body" className="font-medium !text-gray-700">
              {order.userName ?? "—"}
            </Heading>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CalendarIcon className="h-5 w-5 text-gray-400 shrink-0" />
          <div>
            <Heading variant="body" className="text-xs !text-gray-400">
              Creada
            </Heading>
            <Heading variant="body" className="font-medium !text-gray-700">
              {createdAt}
            </Heading>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
        <p
          id="order-status-label"
          className="text-sm font-medium text-gray-500"
        >
          Cambiar estatus
        </p>
        <div
          role="radiogroup"
          aria-labelledby="order-status-label"
          className="flex flex-wrap gap-2"
        >
          {EDITABLE_ORDER_STATUSES.map((value) => {
            const config = getOrderStatusConfig(value);
            const selected = currentStatus === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={mutating}
                onClick={() => handleStatusClick(value)}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  selected
                    ? `${BADGE_TONE_CLASSES[config.tone]} border-transparent`
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {savingStatus === value ? "Guardando..." : config.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ShoppingBagIcon className="h-4 w-4 shrink-0" />
          <Heading variant="body" className="font-medium !text-gray-500">
            Productos
          </Heading>
        </div>

        {loading && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        )}

        {!loading && Boolean(error) && (
          <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3">
            <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-red-500" />
            <Heading variant="body" className="text-sm !text-red-600">
              No se pudo cargar el detalle de la orden. Intenta de nuevo más
              tarde.
            </Heading>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <Heading variant="body" className="text-sm !text-gray-400">
            No se encontraron productos para esta orden.
          </Heading>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="flex flex-col divide-y divide-gray-100">
            {items.map((item, i) => (
              <div
                key={`${item.productId}-${i}`}
                className="flex items-center justify-between py-2"
              >
                <div className="min-w-0">
                  <Heading
                    variant="body"
                    className="text-sm font-medium !text-gray-800 truncate"
                  >
                    {item.name}
                  </Heading>
                  <Heading variant="body" className="text-xs !text-gray-400">
                    {item.quantity} x {formatMoney(item.price)}
                  </Heading>
                </div>
                <Heading
                  variant="body"
                  className="text-sm font-semibold !text-gray-800 shrink-0"
                >
                  {formatMoney(Number(item.price) * item.quantity)}
                </Heading>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Heading variant="body" className="text-sm !text-gray-500">
          Total
        </Heading>
        <Heading variant="body" className="text-2xl font-bold !text-gray-900">
          {formatMoney(order.totalAmount)}
        </Heading>
      </div>

      {pendingAction ? (
        <div
          className={`flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between ${
            CONFIRMATION_TONE[CONFIRMATIONS[pendingAction].tone]
          }`}
        >
          <p className="text-sm">{CONFIRMATIONS[pendingAction].question}</p>
          <div className="flex shrink-0 gap-2">
            <Button
              type="button"
              variant="border"
              color="primary"
              onClick={() => setPendingAction(null)}
              disabled={mutating}
            >
              Volver
            </Button>
            <Button
              type="button"
              variant="fill"
              color={
                CONFIRMATIONS[pendingAction].tone === "red"
                  ? "secondary"
                  : "primary"
              }
              onClick={confirmActions[pendingAction]}
              loading={mutating}
              disabled={mutating}
            >
              {mutating
                ? CONFIRMATIONS[pendingAction].busy
                : CONFIRMATIONS[pendingAction].confirm}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-end gap-2">
          {canPrintReceipt && (
            <Button
              type="button"
              variant="border"
              color="primary"
              className="gap-2"
              onClick={() => window.print()}
              disabled={loading || !!error || items.length === 0}
            >
              <PrinterIcon className="h-4 w-4" />
              Reimprimir recibo
            </Button>
          )}
          {isQuotation && (
            <Button
              type="button"
              variant="border"
              color="primary"
              onClick={() => setPendingAction("convert")}
            >
              Convertir en venta
            </Button>
          )}
          <Button type="button" variant="fill" color="primary" onClick={close}>
            Cerrar
          </Button>
        </div>
      )}
      {canPrintReceipt && items.length > 0 && (
        <PrintableReceipt
          orderNumber={order.orderNumber}
          date={new Date(order.createdAt)}
          clientName={order.clientName}
          items={receiptItems}
          total={Number(order.totalAmount)}
        />
      )}
    </div>
  );
}
