"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { EntityCard } from "@/shared/components/EntityCard";
import { ProductI } from "../types/product.types";
import { PRODUCT_STATUSES, ProductStatusT } from "../utils/constants";
import { formatMoney } from "@/shared/utils/format";

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
  const status =
    PRODUCT_STATUSES[product.status as ProductStatusT] ?? null;

  return (
    <EntityCard
      media={{
        imageUrl: product.imageUrl,
        alt: product.name,
        icon: ShoppingBagIcon,
      }}
      title={product.name}
      lines={[
        { text: product.brand, tone: "muted" },
        { text: product.category },
      ]}
      badges={
        status
          ? [{ label: status.label, tone: status.tone }]
          : [{ label: product.status || "Sin status", tone: "gray" }]
      }
      footer={{ primary: formatMoney(product.salePrice) }}
      onEdit={() => onEdit(product)}
      onDelete={() => onDelete(product)}
      onClick={onClick ? () => onClick(product) : undefined}
      editLabel={`Editar ${product.name}`}
      deleteLabel={`Eliminar ${product.name}`}
    />
  );
}
