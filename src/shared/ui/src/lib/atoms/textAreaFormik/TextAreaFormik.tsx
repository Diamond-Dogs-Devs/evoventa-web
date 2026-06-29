import { useField } from 'formik';
import { useState, type ReactNode, type TextareaHTMLAttributes } from 'react';
import cn from 'classnames';

interface ITextAreaProps {
  label?: string | ReactNode;
  name: string;
  className?: string;
  children?: ReactNode;
}
export default function TextAreaFormik({
  className = '',
  label,
  children,
  name,
  ...props
}: ITextAreaProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [field, { error, touched }] = useField({ name, type: name });
  const [focus, setFocus] = useState(false);
  const inputClassName = cn(
    'w-full cursor-default py-1.5 pl-3 rounded-lg border border-background-secondary text-left bg-transparent flex items-center',
    {
      'cursor-not-allowed': props.disabled,
    },
    className
  );

  const labelClassName = cn(
    'ease-in duration-100 ml-4 translate-y-2 w-fit text-sm text-primary-600 font-thin',
    {
      '!-translate-y-1 !bg-transparent': focus,
      '!backdrop-blur-xl bg-white px-2': !focus,
    }
  );

  return (
    <div className={className}>
      <div className="flex flex-col">
        <div>
          <label
            className={`block text-sm font-base text-primary-600 font-semibold ${labelClassName} `}
          >
            {label}
          </label>
          <textarea
            {...field}
            {...props}
            className={inputClassName}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
        {touched && error && (
          <div className="error text-red-500 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
}
