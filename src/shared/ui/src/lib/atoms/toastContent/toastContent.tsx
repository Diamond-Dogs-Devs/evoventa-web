import React from 'react';
import classNames from 'classnames';
import type { ToastOptions } from 'react-toastify';

export interface ToastContentProps {
  title?: string;
  subtitle?: string;
  description?: string;
  type?: ToastOptions['type'];
}

export default function ToastContent({
  title,
  subtitle,
  description,
  type = 'default',
}: ToastContentProps) {
  const titleClasses = classNames('text-md font-semibold', {
    'text-error-100': type === 'error',
    'text-success-100': type === 'success',
    'text-warning-100': type === 'warning',
    'text-title-primary': type === 'info',
  });

  return (
    <>
      {title && <h1 className={titleClasses}>{title}</h1>}
      {subtitle && <p className="text-sm font-medium text-title-secondary">{subtitle}</p>}
      {description && <p className="text-xs font-light text-title-secondary">{description}</p>}
    </>
  );
}
