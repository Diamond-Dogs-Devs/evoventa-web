"use client";

import { Form, Formik, FormikValues } from "formik";

import { Button, Card, InputFormik } from "@/shared/ui";

import { updateUserSchema } from "../schemas/addUser";

interface UpdateUserModalProps {
  handleUpdateUser: (values: FormikValues) => void;
  close: () => void;
  values: FormikValues;
}

export const UpdateUserModal = ({
  handleUpdateUser,
  close,
  values,
}: UpdateUserModalProps) => {
  const UPDATE_USER_FORM_INITIAL_VALUES = {
    id: values.id || null,
    name: values.name || "",
    email: values.email || "",
    telephone: values.telephone || "",
    employeeNumber: values.employeeNumber || "",
    password: "",
  };

  return (
    <Formik
      initialValues={UPDATE_USER_FORM_INITIAL_VALUES}
      validationSchema={updateUserSchema}
      onSubmit={(values) => {
        handleUpdateUser(values);
        close();
      }}
    >
      {() => (
        <Form>
          <Card title="Actualizar usuario">
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
                placeholder="Dejar en blanco para no cambiarla"
              />
            </div>
          </Card>

          <div className="flex justify-end mt-14">
            <Button type="submit" color="primary" variant="fill">
              Actualizar Usuario
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
