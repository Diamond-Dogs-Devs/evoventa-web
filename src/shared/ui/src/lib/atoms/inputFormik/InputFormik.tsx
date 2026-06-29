import cn from "classnames";
import { useField } from "formik";
import { FC, InputHTMLAttributes, ReactNode, useState } from "react";
import { Spinner } from "../spinner/spinner";

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
    field.onBlur(e);
    setFocus(false);
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
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={inputClassName}
              autoComplete="off"
              max={max}
              min={min}
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

InputFormik.displayName = "InputFormik";

export default InputFormik;
