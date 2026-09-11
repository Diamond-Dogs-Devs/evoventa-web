"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Heading } from "@/shared/ui";

interface ProductNotFoundModalProps {
  term: string;
  close: () => void;
}

export function ProductNotFoundModal({
  term,
  close,
}: ProductNotFoundModalProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-2 text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50">
        <MagnifyingGlassIcon className="h-7 w-7 text-red-500" />
      </div>
      <div>
        <Heading variant="body" className="font-semibold !text-gray-800 text-base">
          Producto no encontrado
        </Heading>
        <Heading variant="body" className="text-sm !text-gray-500 mt-1">
          No existe ningún producto con el código o nombre{" "}
          <Heading variant="body" className="inline font-medium !text-gray-700">
            &quot;{term}&quot;
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
