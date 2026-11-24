"use client";
import { useField } from "formik";
import {
  type FC,
  type InputHTMLAttributes,
  type ChangeEvent,
  useId,
} from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Spinner } from "../spinner/spinner";
import {
  fieldBoxClass,
  fieldControlClass,
  fieldErrorClass,
  fieldLabelClass,
} from "../field/fieldStyles";

export type OptionT = {
  value: string | number;
  label: string;
};

interface SelectProps {
  label?: string;
  name: string;
  className?: string;
  options: OptionT[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  loading?: boolean;
}

const SelectFormik: FC<
  SelectProps & InputHTMLAttributes<HTMLSelectElement>
> = ({
  className = "",
  label,
  name,
  options,
  onChange,
  disabled,
  loading,
  ...props
}) => {
  const [field, { error, touched }, { setTouched }] = useField(name);

  const autoId = useId();
  const selectId = props.id ?? `${name}-${autoId}`;
  const errorId = `${selectId}-error`;
  const showError = Boolean(touched && error);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    field.onChange(e);

    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setTouched(true);
    field.onBlur(e);
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className={fieldLabelClass}>
          {label}
        </label>
      )}

      <div
        className={fieldBoxClass({
          invalid: showError,
          disabled,
          className: `relative !pr-0 ${className}`,
        })}
      >
        <select
          {...field}
          {...props}
          id={selectId}
          name={field.name}
          value={field.value}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${fieldControlClass(disabled)} cursor-pointer pr-9`}
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errorId : undefined}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 flex items-center gap-2 text-gray-400">
          {loading && <Spinner size="md" />}
          <ChevronDownIcon className="h-5 w-5" aria-hidden />
        </span>
      </div>

      {showError && (
        <p id={errorId} className={fieldErrorClass}>
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectFormik;
