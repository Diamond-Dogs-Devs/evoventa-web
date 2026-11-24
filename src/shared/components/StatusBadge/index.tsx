import cn from "classnames";

export type BadgeTone =
  | "gray"
  | "blue"
  | "indigo"
  | "purple"
  | "green"
  | "yellow"
  | "amber"
  | "orange"
  | "red";

/** Background + text per tone. Also used by controls that mimic a badge. */
export const BADGE_TONE_CLASSES: Record<BadgeTone, string> = {
  gray: "bg-gray-100 text-gray-600",
  blue: "bg-blue-100 text-blue-700",
  indigo: "bg-indigo-100 text-indigo-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  amber: "bg-amber-100 text-amber-800",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
};

interface StatusBadgeProps {
  label: string;
  tone?: BadgeTone;
  /** "sm" for cards, "md" for detail headers. */
  size?: "sm" | "md";
  className?: string;
}

/** Colored pill for statuses and labels (product status, order status, stock…). */
export function StatusBadge({
  label,
  tone = "gray",
  size = "sm",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full text-xs font-medium",
        size === "sm" ? "px-1.5 py-0.5" : "px-2 py-1",
        BADGE_TONE_CLASSES[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
