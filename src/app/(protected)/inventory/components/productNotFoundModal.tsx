"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@/shared/ui";

interface Props {
  term: string;
  close: () => void;
}

export const ProductNotFoundModal = ({ term, close }: Props) => (
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
        <span className="font-medium text-gray-700">&quot;{term}&quot;</span>.
      </p>
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
