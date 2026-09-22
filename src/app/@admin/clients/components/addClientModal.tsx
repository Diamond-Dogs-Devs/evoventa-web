"use client";

import React from "react";
import { Form, Formik, FormikValues } from "formik";

import { Button, Card, InputFormik } from "@/shared/ui";

import { addClientSchema } from "../schemas/addClient";
import { ADD_CLIENTS_FORM_INITIAL_VALUES } from "../utils/constants";

type Props = {
  handleCreateClient: (values: FormikValues) => void;
  close: () => void;
};

export const AddClientModal = ({ handleCreateClient, close }: Props) => {
  return (
    <Formik
      initialValues={ADD_CLIENTS_FORM_INITIAL_VALUES}
      validationSchema={addClientSchema}
      onSubmit={(values) => {
        handleCreateClient(values);
        close();
      }}
    >
      {({ isValid, dirty }) => (
        <Form>
          <Card title="Agregar nuevo cliente">
            <div className="flex flex-col gap-6">
              <InputFormik
                label="Nombre del cliente"
                name="name"
                type="text"
              />
              <InputFormik
                label="Número de teléfono"
                name="phone"
                type="tel"
              />
              <InputFormik label="Email" name="email" type="email" />
              <InputFormik label="Dirección" name="address" type="text" />
              <InputFormik label="RFC" name="rfc" type="text" />
            </div>
          </Card>

          <div className="flex justify-end mt-14">
            <Button
              type="submit"
              color="primary"
              variant="fill"
              disabled={!dirty || !isValid}
            >
              Crear Cliente
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
