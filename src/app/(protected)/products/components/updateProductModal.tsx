"use client";

import { useState } from "react";
import { Form, Formik, FormikValues } from "formik";
import {
  Button,
  Card,
  InputFormik,
  InputAmount,
  BarcodeInput,
  InputImageFormik,
  SelectFormik,
  Switch,
} from "@/shared/ui";
import { addProductSchema } from "../schemas/addProduct";
import { PRODUCT_STATUS_OPTIONS } from "../utils/constants";

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
    salePrice: values.salePrice || 0,
    purchasePrice: values.purchasePrice || 0,
    barcode: values.barcode || "",
    id: values.id || null,
    brand: values.brand || "",
    category: values.category || "",
    status: values.status || "",
    image: values.imageUrl || "",
  };

  const [useScanner, setUseScanner] = useState(true);

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
                label="Precio de venta"
                name="salePrice"
                currency="MX"
                type="number"
              />
              <InputAmount
                label="Precio de compra"
                name="purchasePrice"
                currency="MX"
                type="number"
              />
              {useScanner ? (
                <BarcodeInput
                  label="Escanea un producto"
                  name="barcode"
                  type="text"
                />
              ) : (
                <InputFormik
                  label="Código de barras"
                  name="barcode"
                  type="text"
                  placeholder="Escribe el código de barras"
                />
              )}

              <Switch
                id="useScannerUpdate"
                label="¿Ingresar con lector de código de barras?"
                isChecked={useScanner}
                onChange={setUseScanner}
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
                options={PRODUCT_STATUS_OPTIONS}
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
