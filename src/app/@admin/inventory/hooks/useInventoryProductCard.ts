import {
  getProductStatus,
  isProductStatusSellable,
} from "@/shared/utils/productStatus";
import { InventoryProductI } from "../types/inventory.types";

const LOW_STOCK_THRESHOLD = 5;

/** Presentation logic of InventoryProductCard. */
export const useInventoryProductCard = (ip: InventoryProductI) => {
  const product = ip.product;
  const status = getProductStatus(product?.status);
  const isOutOfStock =
    ip.quantity === 0 || !isProductStatusSellable(product?.status);

  const stockColor = isOutOfStock
    ? "bg-red-100 text-red-600"
    : ip.quantity <= LOW_STOCK_THRESHOLD
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  const stockLabel = ip.quantity === 0 ? "Sin stock" : `Stock: ${ip.quantity}`;

  const formattedPrice =
    product?.salePrice != null
      ? `$${Number(product.salePrice).toLocaleString("es-MX", { minimumFractionDigits: 2 })}`
      : "—";

  return {
    product,
    status,
    stockColor,
    stockLabel,
    formattedPrice,
    name: product?.name ?? `Producto #${ip.productId}`,
  };
};
