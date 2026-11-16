import type { EntityCardBadgeTone } from "@/shared/components/EntityCard";

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
  { label: string; tone: EntityCardBadgeTone }
>;

export type ProductStatusT = keyof typeof PRODUCT_STATUSES;

export const PRODUCT_STATUS_VALUES = Object.keys(
  PRODUCT_STATUSES,
) as ProductStatusT[];

/** Badge classes per tone, for cards that don't use EntityCard. */
export const PRODUCT_STATUS_BADGE_CLASSES: Record<EntityCardBadgeTone, string> =
  {
    blue: "bg-blue-100 text-blue-700",
    gray: "bg-gray-100 text-gray-500",
    red: "bg-red-100 text-red-700",
    amber: "bg-amber-100 text-amber-800",
  };

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
