import type { BadgeTone } from "@/shared/components/StatusBadge";

/**
 * Mirrors the API's ProductStatus enum (evoventa-api/prisma/schema.prisma);
 * the API rejects any other value.
 */
export const PRODUCT_STATUSES = {
  AVAILABLE: { label: "Disponible", tone: "blue" },
  OUT_OF_STOCK: { label: "Agotado", tone: "amber" },
  DISCONTINUED: { label: "Descontinuado", tone: "gray" },
} as const satisfies Record<
  string,
  { label: string; tone: BadgeTone }
>;

export type ProductStatusT = keyof typeof PRODUCT_STATUSES;

export const PRODUCT_STATUS_VALUES = Object.keys(
  PRODUCT_STATUSES,
) as ProductStatusT[];

export const getProductStatus = (status?: string | null) =>
  status && status in PRODUCT_STATUSES
    ? PRODUCT_STATUSES[status as ProductStatusT]
    : null;

/**
 * Whether the product's status allows selling it. Agotado and Descontinuado
 * can't be sold; a missing/unknown status doesn't block (stock still does).
 */
export const isProductStatusSellable = (status?: string | null) =>
  !status || !(status in PRODUCT_STATUSES) || status === "AVAILABLE";

/**
 * Stock pill color: red when it can't be sold (no units, Agotado or
 * Descontinuado), yellow when running low, green otherwise.
 */
export const getStockTone = (
  quantity: number,
  sellable: boolean,
  lowStock = 5,
): BadgeTone =>
  quantity <= 0 || !sellable ? "red" : quantity <= lowStock ? "yellow" : "green";
