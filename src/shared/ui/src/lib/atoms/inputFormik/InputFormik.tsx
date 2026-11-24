"use client";
import { useField } from "formik";
import { FC, InputHTMLAttributes, ReactNode, useId } from "react";
import { Spinner } from "../spinner/spinner";
import {
  fieldAffixClass,
  fieldBoxClass,
  fieldControlClass,
  fieldErrorClass,
  fieldLabelClass,
} from "../field/fieldStyles";

interface InputProps {
  label?: string;
  name: string;
  className?: string;
  prefix?: string;
  suffix?: string;
  loading?: boolean;
  children?: ReactNode;
  max?: number;
  min?: number;
}

const CHECKBOX_TYPE = "checkbox";
const RADIO_TYPE = "radio";
const NUMBER_TYPE = "number";

const InputFormik: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  label,
  children,
  prefix,
  suffix,
  loading,
  name,
  max,
  min,
  ...props
}) => {
  const [field, { error, touched }, { setValue }] = useField(name);

  const autoId = useId();
  const inputId = props.id ?? `${name}-${autoId}`;
  const errorId = `${inputId}-error`;
  const showError = Boolean(touched && error);

  const handleFocus = () => {
    if (
      props.type === NUMBER_TYPE &&
      (field.value === "0" || field.value === 0)
    ) {
      setValue("");
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur(e);
  };

  if (props.type === CHECKBOX_TYPE || props.type === RADIO_TYPE) {
    return (
      <div className={className}>
        <div>
          <div className="flex items-center mb-4">
            <label className="text-sm font-medium text-primary-600 inline-flex gap-2 items-center">
              <input
                {...field}
                {...props}
                type={props.type}
                checked={props.checked || field.value}
                onBlur={field.onBlur}
                className={`w-4 text-primary-600 bg-transparent border-primary-400 ${
                  props.type === CHECKBOX_TYPE
                    ? "focus:ring-primary-500 focus:ring-2 rounded"
                    : ""
                }`}
              />
              <span>{children}</span>
            </label>
          </div>

          {touched && error && (
            <div className="error text-red-500 text-sm">{error}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={fieldLabelClass}>
          {label}
        </label>
      )}

      <div
        className={fieldBoxClass({
          invalid: showError,
          disabled: props.disabled,
          className,
        })}
      >
        {prefix && <span className={fieldAffixClass}>{prefix}</span>}

        <input
          {...field}
          {...props}
          id={inputId}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={fieldControlClass(props.disabled)}
          autoComplete="off"
          max={max}
          min={min}
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errorId : undefined}
        />

        {loading && <Spinner size="md" />}
        {suffix && <span className={fieldAffixClass}>{suffix}</span>}
      </div>

      {showError && (
        <p id={errorId} className={fieldErrorClass}>
          {error}
        </p>
      )}
    </div>
  );
};

InputFormik.displayName = "InputFormik";

export default InputFormik;
