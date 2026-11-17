"use client";

import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/shared/ui";
import { InventoryProductI } from "../types/inventory.types";
import { PRODUCT_STATUS_BADGE_CLASSES } from "@/shared/utils/productStatus";
import { useInventoryProductCard } from "../hooks/useInventoryProductCard";

interface InventoryProductCardProps {
  inventoryProduct: InventoryProductI;
  onDelete: (ip: InventoryProductI) => void;
}

export function InventoryProductCard({
  inventoryProduct: ip,
  onDelete,
}: InventoryProductCardProps) {
  const { product, status, stockColor, stockLabel, formattedPrice, name } =
    useInventoryProductCard(ip);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="flex justify-center py-2">
        {product?.imageUrl ? (
          <div className="w-32 h-32 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
            <img
              src={product.imageUrl}
              alt={product?.name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center">
            <ShoppingBagIcon className="h-10 w-10 text-gray-300" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <p
          className="font-semibold text-sm text-gray-800 truncate"
          title={product?.name}
        >
          {name}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {product?.brand ?? "—"}
        </p>
        <p className="text-xs text-gray-400 truncate">
          {product?.category ?? "—"}
        </p>

        <div className="flex flex-wrap gap-1 pt-1">
          <span
            className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${stockColor}`}
          >
            {stockLabel}
          </span>
          {status && (
            <span
              className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                PRODUCT_STATUS_BADGE_CLASSES[status.tone]
              }`}
            >
              {status.label}
            </span>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <span className="font-bold text-base text-gray-900">
          {formattedPrice}
        </span>
      </div>

      <Button
        type="button"
        variant="fill"
        color="secondary"
        size="xs"
        className="w-full justify-center"
        onClick={() => onDelete(ip)}
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
