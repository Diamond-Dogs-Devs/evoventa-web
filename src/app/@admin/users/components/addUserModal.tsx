"use client";

import React from "react";
import { Form, Formik, FormikValues } from "formik";

import { Button, Card, InputFormik } from "@/shared/ui";

import { addUserSchema } from "../schemas/addUser";
import { ADD_USERS_FORM_INITIAL_VALUES } from "../utils/constants";

type Props = {
  handleCreateUser: (values: FormikValues) => void;
  close: () => void;
};

export const AddUserModal = ({ handleCreateUser, close }: Props) => {
  return (
    <Formik
      initialValues={ADD_USERS_FORM_INITIAL_VALUES}
      validationSchema={addUserSchema}
      onSubmit={(values) => {
        handleCreateUser(values);
        close();
      }}
    >
      {({ isValid, dirty }) => (
        <Form>
          <Card title="Agregar nuevo usuario">
            <div className="flex flex-col gap-6">
              <InputFormik
                label="Nombre del usuario"
                name="name"
                type="text"
              />
              <InputFormik label="Email" name="email" type="email" />
              <InputFormik
                label="Número de teléfono"
                name="telephone"
                type="tel"
              />
              <InputFormik
                label="Número de empleado"
                name="employeeNumber"
                type="text"
              />
              <InputFormik
                label="Contraseña"
                name="password"
                type="password"
              />
            </div>
          </Card>

          <div className="flex justify-end mt-14">
            <Button
              type="submit"
              color="primary"
              variant="fill"
              disabled={!dirty || !isValid}
            >
              Crear Usuario
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
