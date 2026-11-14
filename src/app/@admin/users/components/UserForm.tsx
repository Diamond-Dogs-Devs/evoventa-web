"use client";

import React from "react";
import { Form, Formik, FormikValues } from "formik";

import { Button, InputFormik, SelectFormik } from "@/shared/ui";
import {
  FormSection,
  SidePanelBody,
  SidePanelFooter,
  SidePanelHeader,
} from "@/shared/components/SidePanelForm";

import { addUserSchema, updateUserSchema } from "../schemas/addUser";
import {
  ADD_USERS_FORM_INITIAL_VALUES,
  ROLE_OPTIONS,
} from "../utils/constants";

export type UserFormMode = "create" | "edit";

interface UserFormProps {
  mode: UserFormMode;
  initialValues?: FormikValues;
  onSubmit: (values: FormikValues) => void | Promise<unknown>;
  close: () => void;
}

const COPY: Record<
  UserFormMode,
  { title: string; subtitle: string; submit: string; submitting: string }
> = {
  create: {
    title: "Nuevo usuario",
    subtitle: "Da de alta a un empleado para que pueda entrar al sistema.",
    submit: "Crear usuario",
    submitting: "Creando...",
  },
  edit: {
    title: "Editar usuario",
    subtitle: "Actualiza los datos del empleado.",
    submit: "Guardar cambios",
    submitting: "Guardando...",
  },
};

// Create/edit form for users, rendered in the right-side panel
// (Modal position="right").
export const UserForm = ({
  mode,
  initialValues = ADD_USERS_FORM_INITIAL_VALUES,
  onSubmit,
  close,
}: UserFormProps) => {
  const isCreate = mode === "create";
  const copy = COPY[mode];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={isCreate ? addUserSchema : updateUserSchema}
      onSubmit={async (values) => {
        if (!isCreate) {
          onSubmit(values);
          close();
          return;
        }
        try {
          await onSubmit(values);
          close();
        } catch {
          // Keep the form open so the user can fix the data.
        }
      }}
    >
      {({ isValid, dirty, isSubmitting }) => (
        <Form className="flex h-full flex-col">
          <SidePanelHeader
            title={copy.title}
            subtitle={
              !isCreate && initialValues.name
                ? initialValues.name
                : copy.subtitle
            }
            onClose={close}
          />

          <SidePanelBody>
            <FormSection title="Datos personales">
              <InputFormik label="Nombre completo" name="name" type="text" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputFormik label="Email" name="email" type="email" />
                <InputFormik label="Teléfono" name="telephone" type="tel" />
              </div>
            </FormSection>

            <FormSection title="Datos de empleado">
              {isCreate ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputFormik
                    label="Número de empleado"
                    name="employeeNumber"
                    type="text"
                  />
                  <SelectFormik
                    label="Rol"
                    name="role"
                    options={ROLE_OPTIONS}
                  />
                </div>
              ) : (
                <InputFormik
                  label="Número de empleado"
                  name="employeeNumber"
                  type="text"
                />
              )}
            </FormSection>

            {isCreate ? (
              <FormSection
                title="Acceso"
                description="Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo."
              >
                <InputFormik
                  label="Contraseña"
                  name="password"
                  type="password"
                />
              </FormSection>
            ) : (
              <FormSection
                title="Cambiar contraseña"
                description="Déjala en blanco para conservar la actual. Si la cambias: mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo."
              >
                <InputFormik
                  label="Nueva contraseña"
                  name="password"
                  type="password"
                  placeholder="Dejar en blanco para no cambiarla"
                />
              </FormSection>
            )}
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
              disabled={isCreate && (!dirty || !isValid || isSubmitting)}
            >
              {isCreate && isSubmitting ? copy.submitting : copy.submit}
            </Button>
          </SidePanelFooter>
        </Form>
      )}
    </Formik>
  );
};
