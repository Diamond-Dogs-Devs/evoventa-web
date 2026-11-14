import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";
import { InventoryProductI } from "../types/inventory.types";

interface Props {
  handleDeleteInventoryProduct: (itemId: number) => void;
  close: () => void;
  values: InventoryProductI;
}

export const DeleteInventoryProductModal = ({
  handleDeleteInventoryProduct,
  close,
  values,
}: Props) => (
  <ConfirmDeleteModal
    title="¿Quitar producto del inventario?"
    message={
      <>
        Se quitará{" "}
        <span className="font-semibold text-gray-800">
          {values.product?.name ?? "este producto"}
        </span>{" "}
        de este inventario. El producto seguirá en el catálogo.
      </>
    }
    confirmLabel="Quitar"
    onConfirm={() => handleDeleteInventoryProduct(values.id)}
    close={close}
  />
);
