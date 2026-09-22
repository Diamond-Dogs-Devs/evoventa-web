"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, Heading } from "@/shared/ui";

interface StockExceededModalProps {
  available: number;
  close: () => void;
}

export function StockExceededModal({
  available,
  close,
}: StockExceededModalProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-2 text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50">
        <ExclamationTriangleIcon className="h-7 w-7 text-red-500" />
      </div>
      <div>
        <Heading variant="body" className="font-semibold !text-gray-800 text-base">
          Stock insuficiente
        </Heading>
        <Heading variant="body" className="text-sm !text-gray-500 mt-1">
          Solo hay{" "}
          <Heading variant="body" className="inline font-medium !text-gray-700">
            {available}
          </Heading>{" "}
          {available === 1 ? "unidad disponible" : "unidades disponibles"} en
          inventario.
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
