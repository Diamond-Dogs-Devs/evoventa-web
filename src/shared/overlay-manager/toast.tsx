import { isValidElement, cloneElement } from 'react';
import { toast } from 'react-toastify';
import type { ReactNode, ReactElement } from 'react';
import type { ToastOptions } from 'react-toastify';

const DEFAULT_TYPE = 'default';
export interface OpenOptions extends ToastOptions {
  content: string | ReactNode;
  showLoading?: boolean;
  duration?: number;
}

export const useToast = () => {
  const open = ({
    content,
    showLoading,
    type = DEFAULT_TYPE,
    pauseOnHover = false,
    duration = 3000,
    ...rest
  }: OpenOptions) => {
    const toastContent = isValidElement(content)
      ? cloneElement(content as ReactElement, { type })
      : content;

    return toast(toastContent, {
      ...rest,
      type,
      pauseOnHover: pauseOnHover,
      hideProgressBar: !showLoading,
      autoClose: duration ? duration : false,
      className: 'z-[60]',
      ...(type === DEFAULT_TYPE && { progressClassName: 'bg-indigo-600' }),
    });
  };

  const close = (id: string | number) => {
    toast.dismiss(id);
  };

  return {
    open,
    close,
  };
};
