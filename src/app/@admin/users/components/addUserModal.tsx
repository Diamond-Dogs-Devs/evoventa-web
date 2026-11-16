"use client";

import { FormikValues } from "formik";
import { UserForm } from "./UserForm";

type Props = {
  handleCreateUser: (values: FormikValues) => Promise<unknown>;
  close: () => void;
};

export const AddUserModal = ({ handleCreateUser, close }: Props) => (
  <UserForm mode="create" onSubmit={handleCreateUser} close={close} />
);
