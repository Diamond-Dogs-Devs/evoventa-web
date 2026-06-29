import { useContext } from 'react';
import { ModalContext } from '../context/modal.context';
import { ModalContextType } from '../types/modal.types';

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }

  return context;
};
