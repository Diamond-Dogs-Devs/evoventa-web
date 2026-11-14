"use client";

import { FormikValues } from "formik";
import { ProductForm } from "./ProductForm";

interface UpdateProductModalProps {
  handleUpdateProduct: (values: FormikValues) => void | Promise<void>;
  close: () => void;
  values: FormikValues;
}

export const UpdateProductModal = ({
  handleUpdateProduct,
  close,
  values,
}: UpdateProductModalProps) => (
  <ProductForm
    mode="edit"
    initialValues={{
      name: values.name || "",
      salePrice: values.salePrice || 0,
      purchasePrice: values.purchasePrice || 0,
      barcode: values.barcode || "",
      id: values.id || null,
      brand: values.brand || "",
      category: values.category || "",
      status: values.status || "",
      image: values.imageUrl || "",
    }}
    onSubmit={handleUpdateProduct}
    close={close}
  />
);
