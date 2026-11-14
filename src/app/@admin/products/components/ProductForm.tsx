"use client";

import React, { useState } from "react";
import { Form, Formik, FormikValues } from "formik";

import {
  Button,
  InputFormik,
  InputAmount,
  InputImageFormik,
  BarcodeInput,
  SelectFormik,
  Switch,
} from "@/shared/ui";
import {
  FormSection,
  SidePanelBody,
  SidePanelFooter,
  SidePanelHeader,
} from "@/shared/components/SidePanelForm";

import { addProductSchema } from "../schemas/addProduct";
import {
  ADD_PRODUCT_FORM_INITIAL_VALUES,
  PRODUCT_STATUS_OPTIONS,
} from "../utils/constants";

export type ProductFormMode = "create" | "edit";

interface ProductFormProps {
  mode: ProductFormMode;
  initialValues?: FormikValues | null;
  onSubmit: (values: FormikValues) => void | Promise<void>;
  close: () => void;
}

const COPY: Record<
  ProductFormMode,
  { title: string; subtitle: string; submit: string }
> = {
  create: {
    title: "Nuevo producto",
    subtitle: "Completa los datos para agregarlo al catálogo.",
    submit: "Crear producto",
  },
  edit: {
    title: "Editar producto",
    subtitle: "Actualiza los datos del producto.",
    submit: "Guardar cambios",
  },
};

export const ProfitHint = ({
  sale,
  purchase,
}: {
  sale: number;
  purchase: number;
}) => {
  if (!(sale > 0 && purchase > 0)) return null;

  const profit = sale - purchase;
  const margin = (profit / sale) * 100;
  const positive = profit >= 0;

  return (
    <p
      className={`text-xs rounded-lg px-3 py-2 ${
        positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
      }`}
    >
      {positive ? "Ganancia" : "Pérdida"} por unidad:{" "}
      <span className="font-semibold">${Math.abs(profit).toFixed(2)}</span> (
      {margin.toFixed(1)}% de margen)
    </p>
  );
};

// Create/edit form for products, rendered in the right-side panel
// (Modal position="right").
export const ProductForm = ({
  mode,
  initialValues,
  onSubmit,
  close,
}: ProductFormProps) => {
  const isCreate = mode === "create";
  const copy = COPY[mode];
  const formInitialValues = initialValues ?? ADD_PRODUCT_FORM_INITIAL_VALUES;
  const [useScanner, setUseScanner] = useState(true);

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={addProductSchema}
      onSubmit={(values) => {
        onSubmit(values);
        close();
      }}
    >
      {({ isValid, dirty, values }) => (
        <Form className="flex h-full flex-col">
          <SidePanelHeader
            title={copy.title}
            subtitle={
              !isCreate && formInitialValues.name
                ? formInitialValues.name
                : copy.subtitle
            }
            onClose={close}
          />

          <SidePanelBody>
            <FormSection title="Información general">
              <InputFormik
                label="Nombre del producto"
                name="name"
                type="text"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputFormik label="Marca" name="brand" type="text" />
                <InputFormik label="Categoría" name="category" type="text" />
              </div>
              <SelectFormik
                label="Status"
                name="status"
                options={PRODUCT_STATUS_OPTIONS}
              />
            </FormSection>

            <FormSection title="Precios">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>
              <ProfitHint
                sale={Number(values.salePrice)}
                purchase={Number(values.purchasePrice)}
              />
            </FormSection>

            <FormSection
              title="Código de barras"
              description={
                useScanner
                  ? "Haz clic en el campo y escanea el producto."
                  : "Escribe el código manualmente."
              }
            >
              {useScanner ? (
                <BarcodeInput
                  label="Código de barras"
                  name="barcode"
                  type="text"
                />
              ) : (
                <InputFormik
                  label="Código de barras"
                  name="barcode"
                  type="text"
                  placeholder="Ej. 7501234567890"
                />
              )}
              <Switch
                id={`useScanner-${mode}`}
                label="Usar lector de código de barras"
                isChecked={useScanner}
                onChange={setUseScanner}
                containerClassName="text-sm"
              />
            </FormSection>

            <FormSection title="Imagen">
              <InputImageFormik name="image" label="Imagen del producto" />
            </FormSection>
          </SidePanelBody>

          <SidePanelFooter>
            <Button
              type="button"
              variant="border"
              color="primary"
              onClick={close}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="fill"
              disabled={isCreate && (!dirty || !isValid)}
            >
              {copy.submit}
            </Button>
          </SidePanelFooter>
        </Form>
      )}
    </Formik>
  );
};
