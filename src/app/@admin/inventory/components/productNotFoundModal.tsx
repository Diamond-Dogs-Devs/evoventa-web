"use client";

import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/shared/ui";

interface Props {
  term: string;
  close: () => void;
}

/**
 * Shown when a scanned barcode matches no product (inventory and sales).
 * "Agregar producto" goes to Productos with the code in `?barcode=`, which
 * opens the create panel with the barcode already filled in.
 */
export const ProductNotFoundModal = ({ term, close }: Props) => {
  const router = useRouter();

  const handleAddProduct = () => {
    close();
    router.push(`/products?barcode=${encodeURIComponent(term)}`);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-2 text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50">
        <MagnifyingGlassIcon className="h-7 w-7 text-red-500" />
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-base">
          Producto no encontrado
        </p>
        <p className="text-sm text-gray-500 mt-1">
          No existe ningún producto con el código{" "}
          <span className="font-medium text-gray-700 break-all">
            &quot;{term}&quot;
          </span>
          .
        </p>
      </div>
      {/* Stacked: the dialog is "xsmall" (20rem), too narrow side by side. */}
      <div className="flex w-full flex-col gap-2">
        <Button
          type="button"
          variant="fill"
          color="primary"
          size="md"
          className="w-full justify-center gap-2"
          onClick={handleAddProduct}
        >
          <PlusIcon className="h-4 w-4" />
          Agregar producto
        </Button>
        <Button
          type="button"
          variant="border"
          color="primary"
          size="md"
          className="w-full justify-center"
          onClick={close}
        >
          Cerrar
        </Button>
      </div>
    </div>
  );
};
