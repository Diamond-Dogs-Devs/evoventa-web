import { FormikValues } from "formik";
import { ClientFormMode, ClientI } from "../types/client.types";

export interface ClientCardProps {
  client: ClientI;
  onEdit: (client: ClientI) => void;
  onDelete: (client: ClientI) => void;
}

export interface ClientFormProps {
  mode: ClientFormMode;
  /** Form values (`phone`, not `telephone`). Defaults to an empty form. */
  initialValues?: FormikValues;
  onSubmit: (values: FormikValues) => void;
  close: () => void;
}

export interface AddClientModalProps {
  handleCreateClient: (values: FormikValues) => void;
  close: () => void;
}

export interface UpdateClientModalProps {
  handleUpdateClient: (values: FormikValues) => void;
  close: () => void;
  values: FormikValues;
}

export interface DeleteClientModalProps {
  handleDeleteClient: (id: number) => void;
  close: () => void;
  values: {
    id: number;
    name: string;
  };
}
