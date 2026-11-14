"use client";

import { FormikValues } from "formik";
import { ClientForm } from "./ClientForm";

interface UpdateClientModalProps {
  handleUpdateClient: (values: FormikValues) => void;
  close: () => void;
  values: FormikValues;
}

export const UpdateClientModal = ({
  handleUpdateClient,
  close,
  values,
}: UpdateClientModalProps) => (
  <ClientForm
    mode="edit"
    initialValues={{
      id: values.id || null,
      name: values.name || "",
      // The API returns `telephone`; the form field is `phone`.
      phone: values.telephone || "",
      email: values.email || "",
      address: values.address || "",
      rfc: values.rfc || "",
    }}
    onSubmit={handleUpdateClient}
    close={close}
  />
);
