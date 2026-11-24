"use client";

import {
  ShoppingBagIcon,
  PlusIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Button, Heading } from "@/shared/ui";
import { InventoryProductI } from "../types/sales.types";
import {
  getProductStatus,
  getStockTone,
  isProductStatusSellable,
} from "@/shared/utils/productStatus";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { formatMoney } from "@/shared/utils/format";

interface ProductCardProps {
  inventoryProduct: InventoryProductI;
  quantityInCart: number;
  onAdd: (ip: InventoryProductI) => void;
}

export function ProductCard({
  inventoryProduct: ip,
  quantityInCart,
  onAdd,
}: ProductCardProps) {
  const availableStock = ip.quantity;
  const sellable = isProductStatusSellable(ip.product?.status);
  // Agotado / Descontinuado can't be sold even if the inventory has units.
  const isOutOfStock = availableStock === 0 || !sellable;
  const isMaxReached = quantityInCart >= availableStock;

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow cursor-default select-none">
      {quantityInCart > 0 && (
        <Heading
          variant="body"
          className="absolute top-2 right-2 bg-background-secondary !text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center z-10"
        >
          {quantityInCart}
        </Heading>
      )}

      <div className="flex justify-center py-2">
        {ip.product?.imageUrl ? (
          <div className="rounded-xl w-32 h-32 flex items-center justify-center">
            <img
              src={ip.product.imageUrl}
              alt={ip.product.name}
              className="rounded-xl h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center">
            <ShoppingBagIcon className="h-7 w-7 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <Heading variant="titleCard" className="mb-0">
          {ip.product?.name ?? `Producto #${ip.productId}`}
        </Heading>
        <Heading variant="body" className="my-2">
          {ip.product?.brand ?? "—"}
        </Heading>
        <div className="flex items-center gap-1 mt-1">
          <StatusBadge
            tone={getStockTone(availableStock, sellable)}
            label={
              !sellable
                ? (getProductStatus(ip.product?.status)?.label ?? "No disponible")
                : isOutOfStock
                  ? "Sin stock"
                  : `Stock: ${availableStock}`
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <Heading variant="body" className="font-bold text-base !text-gray-900">
          {formatMoney(ip.product?.salePrice)}
        </Heading>
        <Button
          type="button"
          variant="fill"
          color={isMaxReached && !isOutOfStock ? "lightGray" : "primary"}
          size="xs"
          disabled={isOutOfStock || isMaxReached}
          onClick={() => onAdd(ip)}
          className="gap-1"
        >
          {isMaxReached && !isOutOfStock ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
