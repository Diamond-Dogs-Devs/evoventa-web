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
