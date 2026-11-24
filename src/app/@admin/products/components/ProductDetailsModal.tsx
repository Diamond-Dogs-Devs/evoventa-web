"use client";

import { ReactNode } from "react";
import {
  ShoppingBagIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/shared/ui";
import { getProductStatus } from "@/shared/utils/productStatus";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { ProductI } from "../types/product.types";
import { ProfitHint } from "./ProfitHint";
import { formatDate, formatMoney } from "@/shared/utils/format";

interface ProductDetailsModalProps {
  product: ProductI;
  close: () => void;
  onEdit: (product: ProductI) => void;
}

const Detail = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="min-w-0">
    <dt className="text-xs text-gray-400">{label}</dt>
    <dd className="text-sm font-medium text-gray-800 truncate">
      {children || "—"}
    </dd>
  </div>
);

/**
 * Read-only product detail. Open it centered with
 * `open(<ProductDetailsModal />, { size: "small", fullHeight: false })`.
 * The image bleeds to the panel edges (the modal body has p-6).
 */
export function ProductDetailsModal({
  product,
  close,
  onEdit,
}: ProductDetailsModalProps) {
  const status = getProductStatus(product.status);
  const sale = Number(product.salePrice);
  const purchase = Number(product.purchasePrice);

  return (
    <div className="flex flex-col gap-5">
      {/* Fixed height so the whole detail fits on a laptop screen. */}
      <div className="relative -mx-6 -mt-6 h-56 bg-gray-100">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote Cloudinary URLs
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain bg-white"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-300">
            <ShoppingBagIcon className="h-16 w-16" aria-hidden />
            <span className="text-xs text-gray-400">Sin imagen</span>
          </div>
        )}
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-gray-600 shadow hover:bg-white hover:text-gray-900"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 break-words">
            {product.name}
          </h2>
          {product.brand && (
            <p className="text-sm text-gray-500">{product.brand}</p>
          )}
        </div>
        <StatusBadge
          size="md"
          label={status?.label ?? (product.status || "Sin status")}
          tone={status?.tone ?? "gray"}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-400">Precio de venta</p>
            <p className="text-xl font-bold text-gray-900">
              {formatMoney(sale)}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-400">Precio de compra</p>
            <p className="text-xl font-semibold text-gray-700">
              {formatMoney(purchase)}
            </p>
          </div>
        </div>
        <ProfitHint sale={sale} purchase={purchase} />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-gray-100 pt-4">
        <Detail label="Categoría">{product.category}</Detail>
        <Detail label="Código de barras">
          {product.barcode && (
            <span className="font-mono" title={product.barcode}>
              {product.barcode}
            </span>
          )}
        </Detail>
        {product.sku && <Detail label="SKU">{product.sku}</Detail>}
        <Detail label="Creado">{formatDate(product.createdAt)}</Detail>
        <Detail label="Última actualización">
          {formatDate(product.updatedAt)}
        </Detail>
      </dl>

      <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
        <Button type="button" variant="border" color="primary" onClick={close}>
          Cerrar
        </Button>
        <Button
          type="button"
          variant="fill"
          color="primary"
          className="gap-2"
          onClick={() => onEdit(product)}
        >
          <PencilSquareIcon className="h-4 w-4" />
          Editar
        </Button>
      </div>
    </div>
  );
}
