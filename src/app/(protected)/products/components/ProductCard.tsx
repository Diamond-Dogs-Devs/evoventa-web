"use client";

import {
  ShoppingBagIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/shared/ui";
import { ProductI } from "../types/product.types";

interface ProductCardProps {
  product: ProductI;
  onEdit: (product: ProductI) => void;
  onDelete: (product: ProductI) => void;
  onClick?: (product: ProductI) => void;
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
  onClick,
}: ProductCardProps) {
  return (
    <div
      className="relative bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow"
      onClick={() => onClick?.(product)}
      role={onClick ? "button" : undefined}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="flex justify-center py-2">
        {product.imageUrl ? (
          <div className="rounded-xl w-32 h-32 overflow-hidden flex items-center justify-center bg-gray-50">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="rounded-xl h-full w-full object-cover"
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
          title={product.name}
        >
          {product.name}
        </p>
        <p className="text-xs text-gray-500 truncate">{product.brand}</p>
        <p className="text-xs text-gray-400 truncate">{product.category}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          <span
            className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
              product.status === "AVAILABLE"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {product.status === "AVAILABLE" ? "Disponible" : "No disponible"}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 mt-1">
        <span className="font-bold text-base text-gray-900">
          ${Number(product.price).toFixed(2)}
        </span>
      </div>

      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <Button
          type="button"
          variant="fill"
          color="primary"
          size="xs"
          className="flex-1 justify-center"
          onClick={() => onEdit(product)}
        >
          <PencilSquareIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="fill"
          color="secondary"
          size="xs"
          className="flex-1 justify-center"
          onClick={() => onDelete(product)}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
