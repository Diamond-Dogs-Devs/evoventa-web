import React from 'react';
import type { FC, ChangeEvent } from 'react';
import cn from 'classnames';

interface SwitchProps {
  id?: string;
  label?: string;
  isChecked?: boolean;
  labelPosition?: 'left' | 'right';
  onChange?: (checked: boolean) => void;
  containerClassName?: string;
  disabled?: boolean;
}

const Switch: FC<SwitchProps> = ({
  id,
  label,
  isChecked = false,
  disabled,
  labelPosition = 'left',
  onChange,
  containerClassName,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.currentTarget.checked);
  };

  const labelClassName = cn('mr-3 text-gray-700 font-medium', {
    '!text-gray-400 cursor-not-allowed': disabled,
  });

  const switchClassName = cn('block w-12 h-6 rounded-full', {
    'bg-background-secondaryAlt': isChecked,
    'bg-background-grayAlt': !isChecked,
    '!bg-gray-300 cursor-not-allowed': disabled,
  });

  return (
    <label
      htmlFor={id}
      className={`flex items-center cursor-pointer ${containerClassName}`}
    >
      {labelPosition === 'left' && (
        <div className={labelClassName}>{label}</div>
      )}
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
        />
        <div className={switchClassName}></div>
        <div
          className={`absolute top-1 left-1 transition-transform duration-200 ease-in ${
            isChecked ? 'transform translate-x-6' : ''
          } bg-white w-4 h-4 rounded-full`}
        ></div>
      </div>
      {labelPosition === 'right' && (
        <div className="ml-3 text-gray-700 font-medium">{label}</div>
      )}
    </label>
  );
};

export default Switch;
