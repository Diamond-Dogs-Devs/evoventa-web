"use client";

import { FormikValues } from "formik";
import { ClientForm } from "./ClientForm";

type Props = {
  handleCreateClient: (values: FormikValues) => void;
  close: () => void;
};

export const AddClientModal = ({ handleCreateClient, close }: Props) => (
  <ClientForm mode="create" onSubmit={handleCreateClient} close={close} />
);
