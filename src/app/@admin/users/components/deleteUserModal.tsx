import { Button, Heading } from "@/shared/ui";

interface DeleteUserModalProps {
  handleDeleteUser: (id: number) => void;
  close: () => void;
  values: {
    id: number;
    name: string;
  };
}

export const DeleteUserModal = ({
  handleDeleteUser,
  close,
  values,
}: DeleteUserModalProps) => {
  const { id, name } = values;
  const handleConfirmDelete = () => {
    handleDeleteUser(id);
    close();
  };

  return (
    <div>
      <Heading
        variant="sectionHeadingCard"
        className="text-error-100 text-center"
      >
        ¿Estás seguro de que quieres{" "}
        <span className="text-title-caution">ELIMINAR</span> {name}?
      </Heading>
      <div className="flex justify-end mt-14">
        <Button
          onClick={close}
          variant="fill"
          color="primary"
          className="mr-2"
        >
          Cancelar
        </Button>
        <Button onClick={handleConfirmDelete} variant="fill" color="secondary">
          Eliminar Usuario
        </Button>
      </div>
    </div>
  );
};
