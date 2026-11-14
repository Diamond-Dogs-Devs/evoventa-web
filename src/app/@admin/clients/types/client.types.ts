export interface ClientI {
  id: number;
  name: string;
  telephone: string;
  email: string;
  address: string;
  rfc: string;
  isActive?: boolean;
  createdAt?: string;
}

export type ClientFormMode = "create" | "edit";

export interface ClientFormValues {
  id?: number | null;
  name: string;
  phone: string;
  email: string;
  address: string;
  rfc: string;
}

export type ClientSubmitHandler = (
  values: ClientFormValues,
) => Promise<unknown>;
