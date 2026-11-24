import {
  getProductStatus,
  getStockTone,
  isProductStatusSellable,
} from "@/shared/utils/productStatus";
import { formatMoney } from "@/shared/utils/format";
import { InventoryProductI } from "../types/inventory.types";

const LOW_STOCK_THRESHOLD = 5;

/** Presentation logic of InventoryProductCard. */
export const useInventoryProductCard = (ip: InventoryProductI) => {
  const product = ip.product;
  const status = getProductStatus(product?.status);
  const stockTone = getStockTone(
    ip.quantity,
    isProductStatusSellable(product?.status),
    LOW_STOCK_THRESHOLD,
  );

  const stockLabel = ip.quantity === 0 ? "Sin stock" : `Stock: ${ip.quantity}`;

  const formattedPrice =
    product?.salePrice != null ? formatMoney(product.salePrice) : "—";

  return {
    product,
    status,
    stockTone,
    stockLabel,
    formattedPrice,
    name: product?.name ?? `Producto #${ip.productId}`,
  };
};
