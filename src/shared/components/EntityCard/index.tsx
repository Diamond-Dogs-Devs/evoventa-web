"use client";

import { ComponentType, SVGProps } from "react";
import cn from "classnames";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/shared/ui";

export type EntityCardBadgeTone = "blue" | "gray" | "red" | "amber";

export interface EntityCardBadge {
  label: string;
  tone?: EntityCardBadgeTone;
}

export interface EntityCardLine {
  text: string;
  /** "muted" = gray-500 (first detail line), "subtle" = gray-400. */
  tone?: "muted" | "subtle";
  /** Tooltip; defaults to `text` so truncated values can be read. */
  title?: string;
}

export interface EntityCardMedia {
  imageUrl?: string | null;
  alt: string;
  /** Shown when there is no image, e.g. the person's initials. */
  initials?: string;
  /** Shown when there is neither image nor initials. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface EntityCardFooter {
  primary: string;
  primaryTitle?: string;
  primaryClassName?: string;
  secondary?: string;
  secondaryTitle?: string;
}

export interface EntityCardProps {
  media: EntityCardMedia;
  title: string;
  lines?: EntityCardLine[];
  badges?: EntityCardBadge[];
  footer: EntityCardFooter;
  onEdit: () => void;
  onDelete: () => void;
  onClick?: () => void;
  /** Accessible names for the icon-only buttons. */
  editLabel?: string;
  deleteLabel?: string;
}

const badgeTone: Record<EntityCardBadgeTone, string> = {
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-gray-100 text-gray-500",
  red: "bg-red-100 text-red-700",
  amber: "bg-amber-100 text-amber-800",
};

const lineTone = {
  muted: "text-gray-500",
  subtle: "text-gray-400",
};

export const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const Media = ({ imageUrl, alt, initials, icon: Icon }: EntityCardMedia) => {
  if (imageUrl) {
    return (
      <div className="rounded-xl w-32 h-32 overflow-hidden flex items-center justify-center bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote Cloudinary URLs */}
        <img
          src={imageUrl}
          alt={alt}
          className="rounded-xl h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center"
      aria-hidden
    >
      {initials ? (
        <span className="text-3xl font-semibold text-gray-400">{initials}</span>
      ) : Icon ? (
        <Icon className="h-10 w-10 text-gray-300" />
      ) : null}
    </div>
  );
};

/**
 * Card used by the admin grids (products, users, clients):
 * media box → title + detail lines + badges → highlighted footer → actions.
 */
export function EntityCard({
  media,
  title,
  lines = [],
  badges = [],
  footer,
  onEdit,
  onDelete,
  onClick,
  editLabel = "Editar",
  deleteLabel = "Eliminar",
}: EntityCardProps) {
  return (
    <div
      className={cn(
        "relative bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow",
        onClick ? "cursor-pointer" : "cursor-default",
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className="flex justify-center py-2">
        <Media {...media} />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <p className="font-semibold text-sm text-gray-800 truncate" title={title}>
          {title}
        </p>
        {lines.map((line, i) => (
          <p
            key={i}
            className={cn("text-xs truncate", lineTone[line.tone ?? "subtle"])}
            title={line.title ?? line.text}
          >
            {line.text}
          </p>
        ))}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={cn(
                  "text-xs font-medium px-1.5 py-0.5 rounded-full",
                  badgeTone[badge.tone ?? "gray"],
                )}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-gray-100 mt-1 flex items-baseline justify-between gap-2">
        <span
          className={cn(
            "font-bold text-base text-gray-900 truncate",
            footer.primaryClassName,
          )}
          title={footer.primaryTitle}
        >
          {footer.primary}
        </span>
        {footer.secondary && (
          <span
            className="text-xs text-gray-400 shrink-0"
            title={footer.secondaryTitle}
          >
            {footer.secondary}
          </span>
        )}
      </div>

      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <Button
          type="button"
          variant="fill"
          color="primary"
          size="xs"
          className="flex-1 justify-center"
          onClick={onEdit}
          aria-label={editLabel}
        >
          <PencilSquareIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="fill"
          color="secondary"
          size="xs"
          className="flex-1 justify-center"
          onClick={onDelete}
          aria-label={deleteLabel}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
