"use client";
import { useField } from "formik";
import { type FC, type InputHTMLAttributes, useId, useRef } from "react";
import {
  fieldAffixClass,
  fieldBoxClass,
  fieldControlClass,
  fieldErrorClass,
  fieldLabelClass,
} from "../field/fieldStyles";

export type Currency = "MX" | "USD";

interface InputProps {
  label: string;
  name: string;
  currency: Currency;
  className?: string;
}

const InputAmount: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  currency = "MX",
  label,
  name,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [field, { error, touched }] = useField(name);
  const autoId = useId();
  const inputId = props.id ?? `${name}-${autoId}`;
  const errorId = `${inputId}-error`;
  const showError = Boolean(touched && error);

  const valueCurrency: Record<Currency, string> = {
    MX: "$",
    USD: "USD",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "0") {
      e.currentTarget.value = "";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur(e);
  };

  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={inputId} className={fieldLabelClass}>
        {label}
      </label>

      <div
        className={fieldBoxClass({ invalid: showError, disabled: props.disabled })}
      >
        <span className={fieldAffixClass}>{valueCurrency[currency]}</span>

        <input
          {...field}
          {...props}
          id={inputId}
          ref={inputRef}
          type="number"
          inputMode="decimal"
          className={`${fieldControlClass(props.disabled)} tabular-nums`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errorId : undefined}
        />
      </div>

      {showError && (
        <p id={errorId} className={fieldErrorClass}>
          {error}
        </p>
      )}
    </div>
  );
};

InputAmount.displayName = "InputAmount";

export default InputAmount;
