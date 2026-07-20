"use client";

import { Form, Formik, FormikValues } from "formik";
import {
  Button,
  Card,
  InputFormik,
  InputAmount,
  BarcodeInput,
  InputImageFormik,
} from "@/shared/ui";
import { addProductSchema } from "../schemas/addProduct";

interface UpdateProductModalProps {
  handleUpdateProduct: (values: FormikValues) => void | Promise<void>;
  close: () => void;
  values: FormikValues;
}

export const UpdateProductModal = ({
  handleUpdateProduct,
  close,
  values,
}: UpdateProductModalProps) => {
  const ADD_PRODUCT_FORM_INITIAL_VALUES = {
    name: values.name || "",
    price: values.price || 0,
    barcode: values.barcode || "",
    id: values.id || null,
    brand: values.brand || "",
    category: values.category || "",
    status: values.status || "",
    image: values.imageUrl || "",
  };

  return (
    <Formik
      initialValues={ADD_PRODUCT_FORM_INITIAL_VALUES}
      validationSchema={addProductSchema}
      onSubmit={(values) => {
        handleUpdateProduct(values);
        close();
      }}
    >
      {() => (
        <Form>
          <Card title="Actualizar producto">
            <div className="flex flex-col gap-6">
              <InputFormik
                label="Nombre del producto"
                name="name"
                type="text"
              />
              <InputAmount
                label="Precio del producto"
                name="price"
                currency="MX"
                type="number"
              />
              <BarcodeInput
                label="Escanea un producto"
                name="barcode"
                type="text"
              />
              <InputFormik
                label="Marca del producto"
                name="brand"
                type="text"
              />
              <InputFormik
                label="Categoría del producto"
                name="category"
                type="text"
              />
              <InputFormik
                label="Status del producto"
                name="status"
                type="text"
              />
              <InputImageFormik name="image" label="Imagen del producto" />
            </div>
          </Card>

          <div className="flex justify-end mt-14">
            <Button type="submit" color="primary" variant="fill">
              Actualizar Producto
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
