import { format, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { getInitials } from "@/shared/components/EntityCard";
import { ClientI } from "../types/client.types";

/** Maps a client to the EntityCard props (presentation logic of ClientCard). */
export const useClientCard = (client: ClientI) => {
  const createdAt = client.createdAt ? new Date(client.createdAt) : null;

  const formattedDate =
    createdAt && isValid(createdAt)
      ? format(createdAt, "d MMM yyyy", { locale: es })
      : undefined;

  return {
    media: {
      alt: client.name,
      initials: getInitials(client.name) || "?",
    },
    lines: [
      { text: client.email, tone: "muted" as const },
      { text: client.telephone },
      { text: client.address },
    ],
    badges:
      client.isActive === false
        ? [{ label: "Inactivo", tone: "red" as const }]
        : [],
    footer: {
      primary: client.rfc,
      primaryTitle: "RFC",
      primaryClassName: "uppercase",
      secondary: formattedDate,
      secondaryTitle: "Fecha de alta",
    },
  };
};
