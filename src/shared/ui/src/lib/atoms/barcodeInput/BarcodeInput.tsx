"use client";
import { useField } from "formik";
import { FC, InputHTMLAttributes, ReactNode, useId, useRef } from "react";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { Spinner } from "../spinner/spinner";
import {
  fieldAffixClass,
  fieldBoxClass,
  fieldControlClass,
  fieldErrorClass,
  fieldLabelClass,
} from "../field/fieldStyles";

interface BarcodeInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  className?: string;
  prefix?: string;
  suffix?: string;
  loading?: boolean;
  children?: ReactNode;
  label?: string;
  placeholder?: string;
  scanTimeout?: number;
}

const NUMBER_TYPE = "number";

const BarcodeInput: FC<
  BarcodeInputProps & InputHTMLAttributes<HTMLInputElement>
> = ({
  name,
  className = "",
  label,
  children,
  prefix,
  suffix,
  loading,
  placeholder = "Escanea el código de barras",
  scanTimeout = 100,
  ...props
}) => {
  const [field, { error, touched }, { setValue, setTouched }] = useField(name);

  const bufferRef = useRef("");
  const lastCharTimeRef = useRef(0);
  const autoId = useId();
  const inputId = props.id ?? `${name}-${autoId}`;
  const errorId = `${inputId}-error`;
  const showError = Boolean(touched && error);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const now = performance.now();
    const wasBufferEmpty = bufferRef.current === "";

    if (now - lastCharTimeRef.current > scanTimeout) {
      bufferRef.current = "";
    }

    lastCharTimeRef.current = now;

    if (event.key === "Enter") {
      setTouched(true);

      bufferRef.current = "";

      return;
    }

    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      if (wasBufferEmpty) {
        setValue("");
      }

      bufferRef.current += event.key;
      setValue(bufferRef.current);
    }
  };

  const handleFocus = () => {
    if (
      props.type === NUMBER_TYPE &&
      (field.value === "0" || field.value === 0)
    ) {
      setValue("");
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    field.onBlur(e);
  };

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
        {prefix ? (
          <span className={fieldAffixClass}>{prefix}</span>
        ) : (
          <QrCodeIcon className="h-5 w-5 shrink-0 text-gray-400" aria-hidden />
        )}

        <input
          {...field}
          {...props}
          id={inputId}
          name={field.name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${fieldControlClass(props.disabled)} font-mono tracking-wide placeholder:font-sans placeholder:tracking-normal`}
          autoComplete="off"
          placeholder={placeholder}
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

BarcodeInput.displayName = "BarcodeInput";

export default BarcodeInput;
