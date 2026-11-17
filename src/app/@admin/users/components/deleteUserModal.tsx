import { ConfirmDeleteModal } from "@/shared/components/ConfirmDeleteModal";

interface DeleteUserModalProps {
  handleDeleteUser: (id: number) => void;
  close: () => void;
  values: {
    id: number;
    name: string;
  };
}

export const DeleteUserModal = ({ handleDeleteUser, close, values }: DeleteUserModalProps) => (
  <ConfirmDeleteModal
    title="¿Eliminar usuario?"
    itemName={values.name}
    confirmLabel="Eliminar usuario"
    onConfirm={() => handleDeleteUser(values.id)}
    close={close}
  />
);
