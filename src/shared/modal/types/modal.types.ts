import { ReactNode } from 'react';
import { ModalPositionT, ModalSizeT } from '../../ui/src';

export interface ModalOptions {
  title?: string;
  size?: ModalSizeT;
  position?: ModalPositionT;
  closable?: boolean;
  fullHeight?: boolean;
}

export interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  title?: string;
  size?: ModalSizeT;
  position?: ModalPositionT;
  closable: boolean;
  fullHeight: boolean;
  resolve?: (value: unknown) => void;
}

export interface ModalContextType {
  open: (content: ReactNode, options?: ModalOptions) => void;
  close: () => void;
}
