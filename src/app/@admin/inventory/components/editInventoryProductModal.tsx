"use client";

import { Form, Formik } from "formik";
import { Button, Card, InputFormik } from "@/shared/ui";
import { InventoryProductI } from "../types/inventory.types";

interface Props {
  inventoryProduct: InventoryProductI;
  handleEditInventoryProduct: (itemId: number, quantity: number) => void;
  close: () => void;
}

export const EditInventoryProductModal = ({
  inventoryProduct,
  handleEditInventoryProduct,
  close,
}: Props) => {
  const product = inventoryProduct.product;

  return (
    <Formik
      initialValues={{ quantity: String(inventoryProduct.quantity) }}
      onSubmit={(values) => {
        handleEditInventoryProduct(
          inventoryProduct.id,
          Math.max(1, Number(values.quantity) || 1),
        );
        close();
      }}
    >
      <Form>
        <Card title={product?.name ?? `Producto #${inventoryProduct.productId}`}>
          <p className="text-sm text-gray-500 mb-4">
            Modifica la cantidad disponible en inventario.
          </p>
          <InputFormik label="Cantidad" name="quantity" type="number" min={1} />
        </Card>
        <div className="flex justify-end gap-2 mt-6">
          <Button
            type="button"
            variant="border"
            color="primary"
            onClick={close}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="fill" color="primary">
            Guardar
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
