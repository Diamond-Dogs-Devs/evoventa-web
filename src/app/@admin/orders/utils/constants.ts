import type { BadgeTone } from "@/shared/components/StatusBadge";

export interface OrderStatusConfig {
  /** Texto legible en español que se muestra al usuario. */
  label: string;
  /** Color del badge (ver shared/components/StatusBadge). */
  tone: BadgeTone;
}

/**
 * Configuración por estatus de orden. Las llaves coinciden con los valores que
 * envía el backend (en mayúsculas).
 */
export const ORDER_STATUS_CONFIG: Record<string, OrderStatusConfig> = {
  DRAFT: { label: "Borrador", tone: "gray" },
  PENDING: {
    label: "Pendiente",
    tone: "yellow",
  },
  PAID: {
    label: "Pagada",
    tone: "green",
  },
  CONFIRMED: {
    label: "Confirmada",
    tone: "blue",
  },
  PROCESSING: {
    label: "En proceso",
    tone: "indigo",
  },
  SHIPPED: { label: "Enviada", tone: "blue" },
  DELIVERED: {
    label: "Entregada",
    tone: "green",
  },
  COMPLETED: {
    label: "Completada",
    tone: "green",
  },
  CANCELLED: { label: "Cancelada", tone: "red" },
  REFUNDED: {
    label: "Reembolsada",
    tone: "orange",
  },
};

export const DEFAULT_ORDER_STATUS_CONFIG: OrderStatusConfig = {
  label: "Sin estatus",
  tone: "gray",
};

/**
 * Devuelve la configuración (etiqueta y colores) de un estatus de orden.
 * Si el estatus no está mapeado, usa colores neutros y muestra el valor crudo.
 */
export const getOrderStatusConfig = (
  status?: string | null,
): OrderStatusConfig => {
  if (!status) return DEFAULT_ORDER_STATUS_CONFIG;

  const config = ORDER_STATUS_CONFIG[status.toUpperCase()];
  if (config) return config;

  return { ...DEFAULT_ORDER_STATUS_CONFIG, label: status };
};

export type OrderTypeT = "ORDER" | "QUOTATION";

export const QUOTATION_BADGE: { label: string; tone: BadgeTone } = {
  label: "Cotización",
  tone: "purple",
};

export type OrderTypeFilterT = "" | OrderTypeT;

export const ORDER_TYPE_FILTERS: { value: OrderTypeFilterT; label: string }[] = [
  { value: "", label: "Todas" },
  { value: "ORDER", label: "Ventas" },
  { value: "QUOTATION", label: "Cotizaciones" },
];

/**
 * Statuses the API accepts on PATCH /orders/status/:id and on ?status=
 * (evoventa-api orders/enum/order.enum.ts). PAID exists in the database but
 * the API rejects it here with a 400, so it can't be set or filtered from the
 * front.
 */
export const EDITABLE_ORDER_STATUSES = ["PENDING", "DELIVERED", "CANCELLED"] as const;

export type EditableOrderStatusT = (typeof EDITABLE_ORDER_STATUSES)[number];

export type OrderStatusFilterT = "" | EditableOrderStatusT;

export const ORDER_STATUS_FILTERS: { value: OrderStatusFilterT; label: string }[] = [
  { value: "", label: "Todos" },
  ...EDITABLE_ORDER_STATUSES.map((value) => ({
    value,
    label: ORDER_STATUS_CONFIG[value].label,
  })),
];
