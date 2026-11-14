"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  EntityCard,
  EntityCardBadge,
  getInitials,
} from "@/shared/components/EntityCard";
import { UserI } from "../types/user.types";

interface UserCardProps {
  user: UserI;
  onEdit: (user: UserI) => void;
  onDelete: (user: UserI) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const isAdmin = user.role === "ADMIN";
  const badges: EntityCardBadge[] = [
    {
      label: isAdmin ? "Administrador" : "Empleado",
      tone: isAdmin ? "blue" : "gray",
    },
  ];
  if (user.isActive === false) badges.push({ label: "Inactivo", tone: "red" });

  return (
    <EntityCard
      media={{ alt: user.name, initials: getInitials(user.name) || "?" }}
      title={user.name}
      lines={[
        { text: user.email, tone: "muted" },
        { text: user.telephone },
      ]}
      badges={badges}
      footer={{
        primary: user.employeeNumber,
        primaryTitle: "Número de empleado",
        secondary: user.createdAt
          ? format(new Date(user.createdAt), "d MMM yyyy", { locale: es })
          : undefined,
        secondaryTitle: "Fecha de alta",
      }}
      onEdit={() => onEdit(user)}
      onDelete={() => onDelete(user)}
      editLabel={`Editar a ${user.name}`}
      deleteLabel={`Eliminar a ${user.name}`}
    />
  );
}
