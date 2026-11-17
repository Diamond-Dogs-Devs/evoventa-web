"use client";

import { FormikValues } from "formik";
import { ProductForm } from "./ProductForm";

type Props = {
  handleCreateProduct: (values: FormikValues) => void;
  close: () => void;
  /** Prefilled values, e.g. the scanned barcode of an unknown product. */
  initialValues?: FormikValues | null;
};

export const AddProductModal = ({
  handleCreateProduct,
  close,
  initialValues = null,
}: Props) => (
  <ProductForm
    mode="create"
    initialValues={initialValues}
    onSubmit={handleCreateProduct}
    close={close}
  />
);
