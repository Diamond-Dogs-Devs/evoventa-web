import { InputHTMLAttributes, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import cn from "classnames";
import debounce from "lodash/debounce";

/* eslint-disable-next-line */
interface SearchComponentProps {
  label?: string;
  name?: string;
  className?: string;
  error?: string;
  onChange?: (searchComponent: string) => void;
}

export function SearchComponent({
  label,
  className,
  error,
  onChange,
  ...props
}: SearchComponentProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const labelClassName = cn({
    "block text-sm font-base text-primary-600 font-semibold ml-4":
      !props.disabled,
    "block text-sm font-base text-primary-600 font-semibold": props.disabled,
  });

  const handleChangeInput = useMemo(
    () =>
      debounce((value: string) => {
        onChange?.(value);
      }, 500),
    [onChange],
  );

  return (
    <div>
      {label && (
        <label
          className={`block text-sm font-base text-primary-600 font-semibold ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <MagnifyingGlassIcon
          width={20}
          height={20}
          className="absolute top-1/2 -translate-y-1/2 left-3"
        />

        <input
          {...props}
          onChange={(event) => handleChangeInput(event.currentTarget.value)}
          className={`border rounded-lg border-background-secondary py-2 pl-9 pr-2 bg-transparent ${className}`}
        />
      </div>

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

export default SearchComponent;
