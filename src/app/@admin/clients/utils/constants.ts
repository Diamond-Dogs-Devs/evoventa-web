import type { ClientFormMode } from "../types/client.types";

export const ADD_CLIENTS_FORM_INITIAL_VALUES = {
  name: "",
  phone: "",
  email: "",
  address: "",
  rfc: "",
};

export const CLIENT_FORM_COPY: Record<
  ClientFormMode,
  { title: string; subtitle: string; submit: string }
> = {
  create: {
    title: "Nuevo cliente",
    subtitle: "Registra los datos de contacto y facturación del cliente.",
    submit: "Crear cliente",
  },
  edit: {
    title: "Editar cliente",
    subtitle: "Actualiza los datos del cliente.",
    submit: "Guardar cambios",
  },
};
