"use client";

import { EntityCard } from "@/shared/components/EntityCard";
import { useUserCard } from "../hooks/useUserCard";
import { UserCardProps } from "../types/user.types";

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const { media, lines, badges, footer } = useUserCard(user);

  return (
    <EntityCard
      media={media}
      title={user.name}
      lines={lines}
      badges={badges}
      footer={footer}
      onEdit={() => onEdit(user)}
      onDelete={() => onDelete(user)}
      editLabel={`Editar a ${user.name}`}
      deleteLabel={`Eliminar a ${user.name}`}
    />
  );
}
