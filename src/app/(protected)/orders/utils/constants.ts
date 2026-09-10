export interface OrderStatusConfig {
  /** Texto legible en español que se muestra al usuario. */
  label: string;
  /** Clases de Tailwind para el badge (fondo + color de texto). */
  badgeClassName: string;
}

/**
 * Configuración por estatus de orden. Las llaves coinciden con los valores que
 * envía el backend (en mayúsculas).
 */
export const ORDER_STATUS_CONFIG: Record<string, OrderStatusConfig> = {
  DRAFT: { label: "Borrador", badgeClassName: "bg-gray-100 !text-gray-600" },
  PENDING: {
    label: "Pendiente",
    badgeClassName: "bg-yellow-100 !text-yellow-700",
  },
  CONFIRMED: {
    label: "Confirmada",
    badgeClassName: "bg-blue-100 !text-blue-700",
  },
  PROCESSING: {
    label: "En proceso",
    badgeClassName: "bg-indigo-100 !text-indigo-700",
  },
  SHIPPED: { label: "Enviada", badgeClassName: "bg-blue-100 !text-blue-700" },
  DELIVERED: {
    label: "Entregada",
    badgeClassName: "bg-green-100 !text-green-700",
  },
  COMPLETED: {
    label: "Completada",
    badgeClassName: "bg-green-100 !text-green-700",
  },
  CANCELLED: { label: "Cancelada", badgeClassName: "bg-red-100 !text-red-600" },
  REFUNDED: {
    label: "Reembolsada",
    badgeClassName: "bg-orange-100 !text-orange-700",
  },
};

export const DEFAULT_ORDER_STATUS_CONFIG: OrderStatusConfig = {
  label: "Sin estatus",
  badgeClassName: "bg-gray-100 !text-gray-600",
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
