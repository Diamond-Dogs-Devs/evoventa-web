"use client";

import { Form, Formik } from "formik";
import { Button, Card } from "@/shared/ui";
import {
  EditInventoryProductModalProps,
  EditInventoryProductValues,
} from "../types/inventory.types";
import { editInventoryProductSchema } from "../schemas/addInventory";
import {
  DEFAULT_CRITICAL_STOCK,
  DEFAULT_LOW_STOCK,
} from "../utils/constants";
import { StockFields } from "./StockFields";

export const EditInventoryProductModal = ({
  inventoryProduct,
  handleEditInventoryProduct,
  close,
}: EditInventoryProductModalProps) => {
  const product = inventoryProduct.product;

  return (
    <Formik
      initialValues={{
        quantity: inventoryProduct.quantity,
        lowStock: inventoryProduct.lowStock || DEFAULT_LOW_STOCK,
        criticalStock: inventoryProduct.criticalStock || DEFAULT_CRITICAL_STOCK,
      }}
      validationSchema={editInventoryProductSchema}
      onSubmit={(values) => {
        handleEditInventoryProduct(inventoryProduct.id, {
          quantity: Number(values.quantity),
          lowStock: Number(values.lowStock),
          criticalStock: Number(values.criticalStock),
        });
        close();
      }}
    >
      <Form>
        <Card title={product?.name ?? `Producto #${inventoryProduct.productId}`}>
          <p className="text-sm text-gray-500 mb-4">
            Modifica la cantidad disponible y los niveles de alerta de stock.
          </p>
          <StockFields />
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
