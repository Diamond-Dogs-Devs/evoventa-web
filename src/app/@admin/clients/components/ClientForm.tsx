"use client";

import React from "react";
import { Form, Formik } from "formik";

import { Button, InputFormik } from "@/shared/ui";
import {
  FormSection,
  SidePanelBody,
  SidePanelFooter,
  SidePanelHeader,
} from "@/shared/components/SidePanelForm";

import { addClientSchema } from "../schemas/addClient";
import {
  ADD_CLIENTS_FORM_INITIAL_VALUES,
  CLIENT_FORM_COPY,
} from "../utils/constants";
import { ClientFormProps } from "./interfaces";

// Create/edit form for clients, rendered in the right-side panel
// (Modal position="right").
export const ClientForm = ({
  mode,
  initialValues = ADD_CLIENTS_FORM_INITIAL_VALUES,
  onSubmit,
  close,
}: ClientFormProps) => {
  const copy = CLIENT_FORM_COPY[mode];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addClientSchema}
      onSubmit={(values) => {
        onSubmit(values);
        close();
      }}
    >
      {({ isValid, dirty }) => (
        <Form className="flex h-full flex-col">
          <SidePanelHeader
            title={copy.title}
            subtitle={
              mode === "edit" && initialValues.name
                ? initialValues.name
                : copy.subtitle
            }
            onClose={close}
          />

          <SidePanelBody>
            <FormSection title="Datos de contacto">
              <InputFormik
                label="Nombre del cliente"
                name="name"
                type="text"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputFormik label="Teléfono" name="phone" type="tel" />
                <InputFormik label="Email" name="email" type="email" />
              </div>
            </FormSection>

            <FormSection title="Facturación">
              <InputFormik label="RFC" name="rfc" type="text" />
              <InputFormik label="Dirección" name="address" type="text" />
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
              // Create needs data first; edit keeps the original behavior
              // (always enabled).
              disabled={mode === "create" && (!dirty || !isValid)}
            >
              {copy.submit}
            </Button>
          </SidePanelFooter>
        </Form>
      )}
    </Formik>
  );
};
