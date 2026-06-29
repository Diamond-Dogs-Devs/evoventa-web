'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

export type ModalPositionT = 'left' | 'center' | 'right';

export type ModalSizeT = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

interface ModalProps {
  title?: string;
  open: boolean;
  position?: ModalPositionT;
  size?: ModalSizeT;
  onClose?: () => void;
  fullHeight?: boolean;
  children: React.ReactNode;
}

const modalSize: Record<ModalSizeT, string> = {
  xsmall: 'w-[20rem]',
  small: 'w-[30rem]',
  medium: 'w-[40rem]',
  large: 'w-[50rem]',
  xlarge: 'w-[70rem]',
};

export const Modal = ({
  title,
  open,
  position = 'center',
  size = 'medium',
  onClose,
  fullHeight = false,
  children,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* BACKDROP */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-200 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={classNames(
                'bg-white shadow-xl overflow-hidden flex flex-col',
                modalSize[size],
                fullHeight && 'h-screen',
                position === 'center' && 'rounded-xl',
                'max-h-screen'
              )}
            >
              {/* HEADER */}
              {title && (
                <div
                  className={`px-6 py-4 border-b flex justify-between items-center font-semibold ${
                    title
                      ? 'bg-background-secondary text-white'
                      : 'bg-transparent'
                  }`}
                >
                  <span>{title ?? ''}</span>

                  {onClose && (
                    <button
                      onClick={onClose}
                      className={`${
                        title
                          ? 'text-white hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                      aria-label="Cerrar modal"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}
              {/* BODY */}
              <div className="p-6 overflow-y-auto flex-1">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>,
    document.body
  );
};
