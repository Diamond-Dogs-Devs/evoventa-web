import React from "react";
import { Button, Heading } from "@/shared/ui";

export const DeleteProductModal = ({ handleDeleteProduct, close, values }) => {
  const handleConfirmDelete = () => {
    handleDeleteProduct(values.id);
    close();
  };

  return (
    <div>
      <Heading
        variant="sectionHeadingCard"
        className="text-error-100 text-center"
      >
        ¿Estás seguro de que quieres{" "}
        <span className="text-title-caution">ELIMINAR</span> {values.name}?
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
