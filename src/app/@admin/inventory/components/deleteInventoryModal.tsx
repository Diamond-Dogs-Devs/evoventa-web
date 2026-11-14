import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";

interface DeleteInventoryModalProps {
  handleDeleteInventory: (id: number) => void;
  close: () => void;
  values: {
    id: number;
    name: string;
  };
}

export const DeleteInventoryModal = ({ handleDeleteInventory, close, values }: DeleteInventoryModalProps) => (
  <ConfirmDeleteModal
    title="¿Eliminar inventario?"
    itemName={values.name}
    confirmLabel="Eliminar inventario"
    onConfirm={() => handleDeleteInventory(values.id)}
    close={close}
  />
);
