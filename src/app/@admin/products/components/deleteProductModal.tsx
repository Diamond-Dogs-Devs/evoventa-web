import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";

interface DeleteProductModalProps {
  handleDeleteProduct: (id: number) => void;
  close: () => void;
  values: {
    id: number;
    name: string;
  };
}

export const DeleteProductModal = ({ handleDeleteProduct, close, values }: DeleteProductModalProps) => (
  <ConfirmDeleteModal
    title="¿Eliminar producto?"
    itemName={values.name}
    confirmLabel="Eliminar producto"
    onConfirm={() => handleDeleteProduct(values.id)}
    close={close}
  />
);
