"use client";

import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import { Button, Heading } from "@/shared/ui";
import { ProductI, InventoryI } from "../types/sales.types";

interface ProductNotInInventoryModalProps {
  product: ProductI;
  inventory: InventoryI;
  close: () => void;
}

export function ProductNotInInventoryModal({
  product,
  inventory,
  close,
}: ProductNotInInventoryModalProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-2 text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-50">
        <ArchiveBoxXMarkIcon className="h-7 w-7 text-amber-500" />
      </div>
      <div>
        <Heading variant="body" className="font-semibold !text-gray-800 text-base">
          Producto no disponible
        </Heading>
        <Heading variant="body" className="text-sm !text-gray-500 mt-1">
          <Heading variant="body" className="inline font-medium !text-gray-700">
            {product.name}
          </Heading>{" "}
          existe pero no está disponible en el inventario{" "}
          <Heading variant="body" className="inline font-medium !text-gray-700">
            {inventory.name}
          </Heading>
          .
        </Heading>
      </div>
      <Button
        type="button"
        variant="fill"
        color="primary"
        size="md"
        onClick={close}
      >
        Aceptar
      </Button>
    </div>
  );
}
