"use client";

import { ReactNode } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/shared/ui";

interface ConfirmDeleteModalProps {
  /** e.g. "¿Eliminar producto?" */
  title: string;
  /** Name of the record being deleted; shown in bold. */
  itemName?: string;
  /** Replaces the default "Se eliminará <itemName>." sentence. */
  message?: ReactNode;
  /** Label of the destructive button. Defaults to "Eliminar". */
  confirmLabel?: string;
  onConfirm: () => void;
  close: () => void;
}

/**
 * Confirmation dialog for destructive actions. Open it centered with
 * `open(<X />, { size: "xsmall", fullHeight: false })`.
 */
export const ConfirmDeleteModal = ({
  title,
  itemName,
  message,
  confirmLabel = "Eliminar",
  onConfirm,
  close,
}: ConfirmDeleteModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    close();
  };

  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
        aria-hidden
      >
        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">
          {message ?? (
            <>
              Se eliminará{" "}
              {itemName ? (
                <span className="font-semibold text-gray-800 break-words">
                  {itemName}
                </span>
              ) : (
                "este registro"
              )}
              .
            </>
          )}
        </p>
      </div>

      {/* Stacked: the dialog opens at size "xsmall" (20rem), too narrow
          for two labelled buttons side by side. */}
      <div className="mt-2 flex w-full flex-col-reverse gap-2">
        <Button
          type="button"
          onClick={close}
          variant="border"
          color="primary"
          className="flex-1 justify-center"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          variant="fill"
          color="secondary"
          className="flex-1 justify-center"
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
};
