import { ClientI } from "../types/client.types";

export interface ClientCardProps {
  client: ClientI;
  onEdit: (client: ClientI) => void;
  onDelete: (client: ClientI) => void;
}

export type ClientFormMode = "create" | "edit";
