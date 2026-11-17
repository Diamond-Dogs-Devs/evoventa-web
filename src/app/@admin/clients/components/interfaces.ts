import {
  ClientFormMode,
  ClientFormValues,
  ClientI,
  ClientSubmitHandler,
} from "../types/client.types";

export interface ClientCardProps {
  client: ClientI;
  onEdit: (client: ClientI) => void;
  onDelete: (client: ClientI) => void;
}

export interface ClientFormProps {
  mode: ClientFormMode;
  /** Defaults to an empty form. */
  initialValues?: ClientFormValues;
  onSubmit: ClientSubmitHandler;
  close: () => void;
}

export interface AddClientModalProps {
  handleCreateClient: ClientSubmitHandler;
  close: () => void;
}

export interface UpdateClientModalProps {
  handleUpdateClient: ClientSubmitHandler;
  close: () => void;
  values: ClientI;
}

export interface DeleteClientModalProps {
  handleDeleteClient: (id: number) => void;
  close: () => void;
  values: {
    id: number;
    name: string;
  };
}
