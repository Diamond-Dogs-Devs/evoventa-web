"use client";

import React from "react";
import { Form, Formik, FormikValues } from "formik";

import {
  Button,
  Card,
  InputFormik,
  InputAmount,
  InputImageFormik,
  BarcodeInput,
  SelectFormik,
} from "@/shared/ui";

import { addProductSchema } from "../schemas/addProduct";
import { ADD_PRODUCT_FORM_INITIAL_VALUES } from "../utils/constants";

type Props = {
  handleCreateProduct: (values: FormikValues) => void;
  close: () => void;
  initialValues?: FormikValues | null;
};

export const AddProductModal = ({
  handleCreateProduct,
  close,
  initialValues = null,
}: Props) => {
  const formInitialValues = initialValues ?? ADD_PRODUCT_FORM_INITIAL_VALUES;

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={addProductSchema}
      onSubmit={(values) => {
        handleCreateProduct(values);
        close();
      }}
    >
      {({ isValid, dirty }) => (
        <Form>
          <Card title="Agregar nuevo producto">
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

              <SelectFormik
                label="Status del producto"
                name="status"
                options={[
                  { value: "", label: "Selecciona un status" },
                  { value: "AVAILABLE", label: "Disponible" },
                  { value: "UNAVAILABLE", label: "No disponible" },
                ]}
              />

              <InputImageFormik name="image" label="Imagen del producto" />
            </div>
          </Card>

          <div className="flex justify-end mt-14">
            <Button
              type="submit"
              color="primary"
              variant="fill"
              disabled={!dirty || !isValid}
            >
              Crear Producto
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
