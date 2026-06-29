'use client';

import { useState, ReactNode, useCallback, useMemo } from 'react';
import { Modal } from '../../ui';
import { ModalContext } from '../context/modal.context';
import { ModalState, ModalOptions } from '../types/modal.types';

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    content: null,
    title: '',
    size: 'medium',
    position: 'center',
    closable: true,
    fullHeight: true,
  });

  const open = useCallback((content: ReactNode, options: ModalOptions = {}) => {
    setModal((prev) => ({
      ...prev,
      isOpen: true,
      content,
      title: options.title,
      size: options.size || 'medium',
      position: options.position || 'center',
      closable: options.closable ?? true,
      resolve: undefined,
      fullHeight: options.fullHeight ?? true,
    }));
  }, []);

  const openAsync = useCallback(
    (content: ReactNode, options: ModalOptions = {}) => {
      return new Promise((resolve) => {
        setModal((prev) => ({
          ...prev,
          isOpen: true,
          content,
          title: options.title,
          size: options.size || 'medium',
          position: options.position || 'center',
          closable: options.closable ?? true,
          resolve,
          fullHeight: options.fullHeight ?? true,
        }));
      });
    },
    []
  );

  const close = useCallback((value?: any) => {
    setModal((prev) => {
      if (!prev.closable) return prev;

      prev.resolve?.(value);

      return {
        ...prev,
        isOpen: false,
        content: null,
        resolve: undefined,
      };
    });
  }, []);

  const value = useMemo(
    () => ({ open, openAsync, close }),
    [open, openAsync, close]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

      {modal.isOpen && (
        <Modal
          open={modal.isOpen}
          title={modal.title || ''}
          size={modal.size}
          position={modal.position}
          onClose={close}
          fullHeight={modal.fullHeight}
        >
          <div className="relative">{modal.content}</div>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
