import { FC, useState } from 'react';
import cn from 'classnames';
import { useField } from 'formik';
import DatePicker, { type ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Spinner } from '../spinner/spinner';

interface DatePickerFormikProps extends Partial<ReactDatePickerProps> {
  label?: string;
  name: string;
  className?: string;
  loading?: boolean;
  placeholder?: string;
}

export const DatePickerFormik: FC<DatePickerFormikProps> = ({
  label,
  name,
  className,
  loading,
  placeholder,
  ...props
}) => {
  const [field, { error, touched }, { setValue }] = useField({ name });
  const [focus, setFocus] = useState(false);

  const inputContainerClassName = cn(
    'w-full cursor-default py-1.5 pl-3 rounded-lg border border-light-gray-400 text-left bg-transparent flex items-center',
    {
      '!pr-10': loading,
      '!bg-gray-50 cursor-not-allowed': props.disabled,
    },
    className
  );

  const labelClassName = cn(
    'ease-in duration-100 ml-4 translate-y-2 w-fit text-sm text-primary-600 font-thin',
    {
      '!-translate-y-1 !bg-transparent': focus,
      '!backdrop-blur-xl px-2': !focus,
    }
  );

  const inputClassName = cn(
    'border-none h-full w-full bg-transparent border-transparent focus:border-transparent focus:ring-0',
    {
      'cursor-not-allowed': props.disabled,
    }
  );

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label
        className={`block text-sm font-base text-primary-600 font-semibold ${labelClassName} `}
      >
        {label}
      </label>
      <div className={inputContainerClassName}>
        <DatePicker
          className={inputClassName}
          {...field}
          {...props}
          selected={field.value}
          onChange={(date) => setValue(date)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholderText={placeholder}
        />
        {loading && (
          <div className="-mr-5">
            <Spinner size="xs" />
          </div>
        )}
      </div>
      {touched && error && <div className="error">{error}</div>}
    </div>
  );
};
