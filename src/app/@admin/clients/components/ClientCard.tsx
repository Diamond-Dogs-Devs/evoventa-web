"use client";

import { EntityCard } from "@/shared/components/EntityCard";
import { useClientCard } from "../hooks/useClientCard";
import { ClientCardProps } from "./interfaces";

export function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  const { media, lines, badges, footer } = useClientCard(client);

  return (
    <EntityCard
      media={media}
      title={client.name}
      lines={lines}
      badges={badges}
      footer={footer}
      onEdit={() => onEdit(client)}
      onDelete={() => onDelete(client)}
      editLabel={`Editar a ${client.name}`}
      deleteLabel={`Eliminar a ${client.name}`}
    />
  );
}
