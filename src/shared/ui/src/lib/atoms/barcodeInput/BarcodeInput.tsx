import cn from "classnames";
import { useField } from "formik";
import { FC, InputHTMLAttributes, ReactNode, useRef, useState } from "react";
import { Spinner } from "../spinner/spinner";

interface BarcodeInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
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
  const [focus, setFocus] = useState(false);

  const inputContainerClassName = cn(
    "w-full cursor-default py-1.5 pl-3 rounded-3xl border border-light-gray-400 text-left bg-transparent flex items-center",
    "focus-within:bg-transparent",
    {
      "!pr-10": !!suffix || loading,
      "!bg-gray-50 cursor-not-allowed": props.disabled,
    },
    className,
  );

  const inputClassName = cn(
    "w-full h-full appearance-none bg-transparent text-inherit border-0 outline-none shadow-none",
    "focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 focus:shadow-none",
    "active:bg-transparent disabled:bg-transparent",
    {
      "cursor-not-allowed": props.disabled,
    },
  );

  const labelClassName = cn(
    "ease-in duration-100 ml-4 translate-y-2 w-fit text-sm text-primary-600 font-normal",
    {
      "!-translate-y-1 !bg-transparent": focus,
      "!backdrop-blur-xl px-2": !focus,
    },
  );

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
    setFocus(true);

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
    setFocus(false);
  };

  return (
    <div className={className}>
      <div className="flex flex-col">
        <div>
          <div className={labelClassName}>
            <label>{label}</label>
          </div>

          <div className={inputContainerClassName}>
            {prefix}

            <input
              {...field}
              {...props}
              name={field.name}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className={inputClassName}
              autoComplete="off"
              placeholder={placeholder}
            />

            {loading && (
              <div className="-mr-5">
                <Spinner size="md" />
              </div>
            )}

            {suffix && (
              <span
                className={`-mr-5 ${
                  props.type === "number" ? "right-10" : "right-4"
                }`}
              >
                {suffix}
              </span>
            )}
          </div>
        </div>

        {touched && error && (
          <div className="error text-red-500 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
};

BarcodeInput.displayName = "BarcodeInput";

export default BarcodeInput;
