"use client";

import { FormikValues } from "formik";
import { UserForm } from "./UserForm";

interface UpdateUserModalProps {
  handleUpdateUser: (values: FormikValues) => void;
  close: () => void;
  values: FormikValues;
}

export const UpdateUserModal = ({
  handleUpdateUser,
  close,
  values,
}: UpdateUserModalProps) => (
  <UserForm
    mode="edit"
    initialValues={{
      id: values.id || null,
      name: values.name || "",
      email: values.email || "",
      telephone: values.telephone || "",
      employeeNumber: values.employeeNumber || "",
      role: values.role,
      password: "",
    }}
    onSubmit={handleUpdateUser}
    close={close}
  />
);
