import cn from "classnames";

/**
 * Shared look for every form field (InputFormik, SelectFormik, InputAmount,
 * BarcodeInput): label above, a white rounded box that carries the border and
 * focus ring, and the native control inside it with no chrome of its own.
 * The same look as shared/components/SearchInput.
 */

export const fieldLabelClass = "mb-1.5 block text-sm font-medium text-gray-700";

export const fieldBoxClass = ({
  invalid,
  disabled,
  className,
}: {
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}) =>
  cn(
    "flex h-10 w-full items-center gap-2 rounded-lg border bg-white px-3 text-sm text-gray-900 shadow-xs transition-colors",
    "focus-within:ring-2",
    invalid
      ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/15"
      : "border-gray-300 hover:border-gray-400 focus-within:border-background-secondary focus-within:ring-background-secondary/15",
    disabled && "cursor-not-allowed bg-gray-50 text-gray-500 hover:border-gray-300",
    className,
  );

export const fieldControlClass = (disabled?: boolean) =>
  cn(
    "h-full w-full min-w-0 appearance-none border-0 bg-transparent p-0 text-inherit shadow-none outline-none",
    "placeholder:text-gray-400 focus:outline-none focus:ring-0",
    // Inputs don't inherit text-align; this lets the box's className
    // (e.g. "text-center") align the value.
    "[text-align:inherit]",
    // Hide the number spinners: they crowd the box and amounts are typed.
    "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
    disabled && "cursor-not-allowed",
  );

/** Prefix/suffix text such as "$" or a unit. */
export const fieldAffixClass = "shrink-0 text-sm text-gray-500";

export const fieldErrorClass = "mt-1.5 text-xs text-red-600";
