import { Button, Heading } from "@/shared/ui";
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
}: Props) => {
  const handleConfirm = () => {
    handleDeleteInventoryProduct(values.id);
    close();
  };

  return (
    <div>
      <Heading variant="sectionHeadingCard" className="text-center">
        ¿Eliminar{" "}
        <span className="text-title-caution">{values.product?.name}</span> del
        inventario?
      </Heading>
      <div className="flex justify-end gap-2 mt-14">
        <Button onClick={close} variant="fill" color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} variant="fill" color="secondary">
          Eliminar
        </Button>
      </div>
    </div>
  );
};
