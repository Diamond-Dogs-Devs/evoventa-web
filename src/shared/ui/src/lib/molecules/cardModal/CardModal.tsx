import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { ReactNode } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export type CardModalTypeT = 'primary' | 'success' | 'error' | 'warning';

interface CardModalProps {
  title: string;
  type?: CardModalTypeT;
  open?: boolean;
  children: ReactNode;
}

function CardModal({
  title,
  type = 'primary',
  open,
  children,
}: CardModalProps) {
  const headerColors: { [P in CardModalTypeT]: string } = {
    primary: 'bg-background-secondary text-title-light',
    success: 'bg-success-100 bg-opacity-20 text-title-primary',
    error: 'bg-error-100 bg-opacity-20 text-title-primary',
    warning: 'bg-warning-100 bg-opacity-30 text-title-primary',
  };

  const headerIcons: { [P in CardModalTypeT]: ReactNode | null } = {
    primary: null,
    success: (
      <CheckCircleIcon
        width={51}
        height={51}
        color="green"
        className="stroke-1"
      />
    ),
    error: (
      <ExclamationCircleIcon
        width={51}
        height={51}
        color="red"
        className="stroke-1"
      />
    ),
    warning: (
      <ExclamationTriangleIcon
        width={51}
        height={51}
        color="primary"
        className="stroke-1"
      />
    ),
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => null}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 flex justify-center top-1/3 -translate-y-1/2">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-y-full"
            enterTo="translate-y-1/2"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="-translate-y-0"
            leaveTo="-translate-y-full"
          >
            <Dialog.Panel className="relative flex w-full md:min-w-md md:max-w-lg">
              <div className="flex grow flex-col overflow-y-auto drop-shadow-xl">
                <div className="mt-2 p-6">
                  <div className="bg-white shadow relative rounded-md">
                    <div
                      className={`${headerColors[type]} text-lg flex items-center justify-center gap-4 font-semibold p-6 text-center rounded-t-md`}
                    >
                      {headerIcons[type]}{' '}
                      <span>{title || 'Confirmar acción'}</span>
                    </div>
                    <div className="px-8">{children}</div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default CardModal;
