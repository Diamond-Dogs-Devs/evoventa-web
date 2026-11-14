import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";

interface DeleteClientModalProps {
  handleDeleteClient: (id: number) => void;
  close: () => void;
  values: {
    id: number;
    name: string;
  };
}

export const DeleteClientModal = ({ handleDeleteClient, close, values }: DeleteClientModalProps) => (
  <ConfirmDeleteModal
    title="¿Eliminar cliente?"
    itemName={values.name}
    confirmLabel="Eliminar cliente"
    onConfirm={() => handleDeleteClient(values.id)}
    close={close}
  />
);
