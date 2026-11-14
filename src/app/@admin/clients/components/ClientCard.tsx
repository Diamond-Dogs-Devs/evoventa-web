"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { EntityCard, getInitials } from "@/shared/components/EntityCard";
import { ClientCardProps } from "./interfaces";

export function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  return (
    <EntityCard
      media={{ alt: client.name, initials: getInitials(client.name) || "?" }}
      title={client.name}
      lines={[
        { text: client.email, tone: "muted" },
        { text: client.telephone },
        { text: client.address },
      ]}
      badges={
        client.isActive === false ? [{ label: "Inactivo", tone: "red" }] : []
      }
      footer={{
        primary: client.rfc,
        primaryTitle: "RFC",
        primaryClassName: "uppercase",
        secondary: client.createdAt
          ? format(new Date(client.createdAt), "d MMM yyyy", { locale: es })
          : undefined,
        secondaryTitle: "Fecha de alta",
      }}
      onEdit={() => onEdit(client)}
      onDelete={() => onDelete(client)}
      editLabel={`Editar a ${client.name}`}
      deleteLabel={`Eliminar a ${client.name}`}
    />
  );
}
