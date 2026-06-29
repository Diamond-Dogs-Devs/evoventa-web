import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import { useField } from 'formik';
import { FC, InputHTMLAttributes } from 'react';

interface InputProps {
  label: string;
  name: string;
  className?: string;
  prefix?: string;
  suffix?: string;
}
const StepCount: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  className = '',
  label,
  name,
  prefix,
  suffix,
  ...props
}) => {
  const [field, { error, touched }, { setValue }] = useField({
    name,
    type: name,
  });

  const inputClassName = cn('w-full', {
    'rounded-3xl border border-primary-600': !props.disabled,
    'border-x-0 border-t-0 border-b border-primary-600 outline-none disabled':
      props.disabled,
  });
  const labelClassName = cn({
    'block text-sm font-base text-primary-600 font-semibold ml-4':
      !props.disabled,
    'block text-sm font-base text-primary-600 font-semibold': props.disabled,
  });
  const increment = () => {
    setValue((field.value || 0) + 1);
  };

  const decrement = () => {
    if (field.value > 0) {
      setValue(field.value - 1);
    }
  };
  if (props.type === 'checkbox') {
    return (
      <div className={className}>
        <div className="">
          <div className="flex items-center mb-4">
            <input
              id="disabled-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-primary-600 bg-transparent border-primary-600 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label
              htmlFor="disabled-checkbox"
              className="ml-2 text-sm font-medium text-primary-600"
            >
              {label}
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
          <label
            className={`block text-sm font-base text-primary-600 font-semibold ${labelClassName} `}
          >
            {label}
          </label>
          <div className="flex">
            <button
              onClick={decrement}
              type="button"
              className="px-4 opacity-70 hover:opacity-100"
            >
              <MinusSmallIcon width={20} />
            </button>
            <div className="relative">
              {prefix && (
                <span className="absolute top-1/2 transform -translate-y-1/2 left-4">
                  {prefix}
                </span>
              )}
              <input
                {...field}
                {...props}
                className={`${inputClassName} w-14 outline-none`}
                value={field.value}
                style={{ WebkitAppearance: 'none' }}
              />
              {suffix && (
                <span className="absolute top-1/2 transform -translate-y-1/2 right-4">
                  {suffix}
                </span>
              )}
            </div>
            <button
              onClick={increment}
              type="button"
              className="px-4 opacity-70 hover:opacity-100"
            >
              <PlusSmallIcon width={20} />
            </button>
          </div>
        </div>
        {touched && error && (
          <div className="error text-red-500 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
};

StepCount.displayName = 'StepCount';

export default StepCount;
