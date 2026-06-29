import cn from 'classnames';
import { useField } from 'formik';
import {
  type FC,
  type InputHTMLAttributes,
  type ChangeEvent,
  useState,
} from 'react';
import { Spinner } from '../spinner/spinner';

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
  className = '',
  label,
  name,
  options,
  onChange,
  disabled,
  loading,
  ...props
}) => {
  const [field, { error, touched }, { setTouched }] = useField(name);

  const [focus, setFocus] = useState(false);

  const inputContainerClassName = cn(
    'transition w-full cursor-default py-1.5 pl-3 rounded-lg border border-background-secondary text-left bg-transparent flex items-center pr-2',
    {
      '!pr-10': loading,
      '!bg-gray-50 cursor-not-allowed': disabled,
    },
    className
  );

  const inputClassName = cn(
    'border-none h-full w-full bg-transparent border-transparent focus:border-transparent focus:ring-0',
    {
      'cursor-not-allowed': disabled,
    }
  );

  const labelClassName = cn(
    'ease-in duration-100 ml-4 translate-y-2 w-fit text-sm text-primary-600 font-normal',
    {
      '!-translate-y-1 !bg-transparent': focus,
      '!backdrop-blur-xl px-2': !focus,
    }
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    field.onChange(e);

    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setTouched(true);
    field.onBlur(e);
    setFocus(false);
  };

  return (
    <div>
      <div className={labelClassName}>
        <label>{label}</label>
      </div>

      <div className={inputContainerClassName}>
        <select
          {...field}
          {...props}
          name={field.name}
          value={field.value}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={handleBlur}
          className={inputClassName}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {loading && (
          <div className="-mr-5">
            <Spinner size="xs" />
          </div>
        )}
      </div>

      {touched && error && (
        <div className="error text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};

export default SelectFormik;
