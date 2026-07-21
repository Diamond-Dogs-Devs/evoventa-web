import { Button, Heading } from "@/shared/ui";

interface DeleteProductModalProps {
  handleDeleteProduct: (id: number) => void;
  close: () => void;
  values: {
    id: number;
    name: string;
  };
}

export const DeleteProductModal = ({
  handleDeleteProduct,
  close,
  values,
}: DeleteProductModalProps) => {
  const { id, name } = values;
  const handleConfirmDelete = () => {
    handleDeleteProduct(id);
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
        <Button onClick={close} variant="fill" color="primary" className="mr-2">
          Cancelar
        </Button>
        <Button onClick={handleConfirmDelete} variant="fill" color="secondary">
          Eliminar Producto
        </Button>
      </div>
    </div>
  );
};
