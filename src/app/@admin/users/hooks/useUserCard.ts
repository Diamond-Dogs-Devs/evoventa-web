import { format, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { EntityCardBadge, getInitials } from "@/shared/components/EntityCard";
import { UserI } from "../types/user.types";

export const useUserCard = (user: UserI) => {
  const isAdmin = user.role === "ADMIN";

  const badges: EntityCardBadge[] = [
    {
      label: isAdmin ? "Administrador" : "Empleado",
      tone: isAdmin ? "blue" : "gray",
    },
  ];
  if (user.isActive === false) badges.push({ label: "Inactivo", tone: "red" });

  const createdAt = user.createdAt ? new Date(user.createdAt) : null;
  const formattedDate =
    createdAt && isValid(createdAt)
      ? format(createdAt, "d MMM yyyy", { locale: es })
      : undefined;

  return {
    media: { alt: user.name, initials: getInitials(user.name) || "?" },
    lines: [
      { text: user.email, tone: "muted" as const },
      { text: user.telephone },
    ],
    badges,
    footer: {
      primary: user.employeeNumber,
      primaryTitle: "Número de empleado",
      secondary: formattedDate,
      secondaryTitle: "Fecha de alta",
    },
  };
};
