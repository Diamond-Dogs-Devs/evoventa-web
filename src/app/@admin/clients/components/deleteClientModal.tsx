import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";
import { DeleteClientModalProps } from "./interfaces";

export const DeleteClientModal = ({ handleDeleteClient, close, values }: DeleteClientModalProps) => (
  <ConfirmDeleteModal
    title="¿Eliminar cliente?"
    itemName={values.name}
    confirmLabel="Eliminar cliente"
    onConfirm={() => handleDeleteClient(values.id)}
    close={close}
  />
);
