import cn from "classnames";
import { useField } from "formik";
import { type FC, type InputHTMLAttributes, useRef, useState } from "react";

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
  const [focus, setFocus] = useState(false);

  const isActive =
    focus ||
    (field.value !== undefined &&
      field.value !== null &&
      field.value !== "" &&
      field.value !== 0 &&
      field.value !== "0");

  const inputContainerClassName = cn(
    "w-full cursor-default py-1.5 pl-10 pr-3 rounded-3xl border border-light-gray-400 text-left bg-transparent flex items-center",
    {
      "!bg-gray-50 cursor-not-allowed": props.disabled,
    },
  );

  const inputClassName = cn(
    "w-full bg-transparent border-none text-right outline-none focus:outline-none focus:ring-0 focus:border-transparent appearance-none",
    {
      "cursor-not-allowed": props.disabled,
    },
  );

  const labelClassName = cn(
    "ease-in duration-100 ml-4 translate-y-2 w-fit text-sm text-primary-600 font-normal",
    {
      "!-translate-y-1 !bg-transparent": isActive,
      "!backdrop-blur-xl px-2": !isActive,
    },
  );

  const valueCurrency: Record<Currency, string> = {
    MX: "$",
    USD: "USD",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);

    if (e.currentTarget.value === "0") {
      e.currentTarget.value = "";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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
            <span className="mr-2">{valueCurrency[currency]}</span>

            <input
              {...field}
              {...props}
              ref={inputRef}
              type="number"
              className={inputClassName}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
        </div>

        {touched && error && (
          <div className="text-sm text-red-500">{error}</div>
        )}
      </div>
    </div>
  );
};

InputAmount.displayName = "InputAmount";

export default InputAmount;
