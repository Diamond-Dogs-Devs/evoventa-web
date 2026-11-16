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

import { ProductFormProps } from "../types/product.types";
import { ProfitHint } from "./ProfitHint";
import { addProductSchema } from "../schemas/addProduct";
import {
  ADD_PRODUCT_FORM_INITIAL_VALUES,
  PRODUCT_FORM_COPY,
  PRODUCT_STATUS_OPTIONS,
} from "../utils/constants";

// Create/edit form for products, rendered in the right-side panel
// (Modal position="right").
export const ProductForm = ({
  mode,
  initialValues,
  onSubmit,
  close,
}: ProductFormProps) => {
  const isCreate = mode === "create";
  const copy = PRODUCT_FORM_COPY[mode];
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
